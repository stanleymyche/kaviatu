from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Kashoe Chess Club API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============= ENUMS =============
class ProductCategory(str, Enum):
    CHESS_BOARD = "chess_board"
    CHESS_CLOCK = "chess_clock"
    MERCHANDISE = "merchandise"
    LESSON_PACKAGE = "lesson_package"

class OrderStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"

class LessonStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class EventStatus(str, Enum):
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


# ============= MODELS =============

# Product Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: ProductCategory
    price: float
    image_url: Optional[str] = None
    stock: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    category: ProductCategory
    price: float
    image_url: Optional[str] = None
    stock: int = 0

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None


# Event Models
class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    event_date: datetime
    location: str
    image_url: Optional[str] = None
    status: EventStatus = EventStatus.UPCOMING
    max_participants: Optional[int] = None
    current_participants: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class EventCreate(BaseModel):
    title: str
    description: str
    event_date: datetime
    location: str
    image_url: Optional[str] = None
    max_participants: Optional[int] = None


# Lesson Registration Models
class LessonRegistration(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    parent_name: str
    email: EmailStr
    phone: str
    age: int
    lesson_type: str  # e.g., "Beginner", "Intermediate", "Advanced"
    preferred_schedule: str
    message: Optional[str] = None
    status: LessonStatus = LessonStatus.PENDING
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LessonRegistrationCreate(BaseModel):
    student_name: str
    parent_name: str
    email: EmailStr
    phone: str
    age: int
    lesson_type: str
    preferred_schedule: str
    message: Optional[str] = None


# Order Models
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    price: float

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    items: List[OrderItem]
    total_amount: float
    status: OrderStatus = OrderStatus.PENDING
    mpesa_reference: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    items: List[OrderItem]
    total_amount: float


# Contact Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str


# Newsletter Models
class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr


# ============= ROUTES =============

# Health Check
@api_router.get("/")
async def root():
    return {"message": "Kashoe Chess Club API", "status": "active"}


# Product Routes
@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    product_obj = Product(**product.model_dump())
    doc = product_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.products.insert_one(doc)
    return product_obj

@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[ProductCategory] = None,
    is_active: bool = True
):
    query = {"is_active": is_active}
    if category:
        query["category"] = category
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    
    for product in products:
        if isinstance(product['created_at'], str):
            product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if isinstance(product['created_at'], str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return product

@api_router.patch("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_update: ProductUpdate):
    update_data = {k: v for k, v in product_update.model_dump().items() if v is not None}
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.products.update_one(
        {"id": product_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return await get_product(product_id)


# Event Routes
@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    event_obj = Event(**event.model_dump())
    doc = event_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['event_date'] = doc['event_date'].isoformat()
    
    await db.events.insert_one(doc)
    return event_obj

@api_router.get("/events", response_model=List[Event])
async def get_events(status: Optional[EventStatus] = None):
    query = {}
    if status:
        query["status"] = status
    
    events = await db.events.find(query, {"_id": 0}).sort("event_date", -1).to_list(1000)
    
    for event in events:
        if isinstance(event['created_at'], str):
            event['created_at'] = datetime.fromisoformat(event['created_at'])
        if isinstance(event['event_date'], str):
            event['event_date'] = datetime.fromisoformat(event['event_date'])
    
    return events

@api_router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if isinstance(event['created_at'], str):
        event['created_at'] = datetime.fromisoformat(event['created_at'])
    if isinstance(event['event_date'], str):
        event['event_date'] = datetime.fromisoformat(event['event_date'])
    
    return event


# Lesson Registration Routes
@api_router.post("/lessons/register", response_model=LessonRegistration)
async def register_for_lesson(registration: LessonRegistrationCreate):
    registration_obj = LessonRegistration(**registration.model_dump())
    doc = registration_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.lesson_registrations.insert_one(doc)
    return registration_obj

@api_router.get("/lessons/registrations", response_model=List[LessonRegistration])
async def get_lesson_registrations(status: Optional[LessonStatus] = None):
    query = {}
    if status:
        query["status"] = status
    
    registrations = await db.lesson_registrations.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for reg in registrations:
        if isinstance(reg['created_at'], str):
            reg['created_at'] = datetime.fromisoformat(reg['created_at'])
    
    return registrations

@api_router.patch("/lessons/registrations/{registration_id}/status")
async def update_registration_status(registration_id: str, status: LessonStatus):
    result = await db.lesson_registrations.update_one(
        {"id": registration_id},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    return {"message": "Status updated successfully", "status": status}


# Order Routes
@api_router.post("/orders", response_model=Order)
async def create_order(order: OrderCreate):
    order_obj = Order(**order.model_dump())
    doc = order_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.orders.insert_one(doc)
    return order_obj

@api_router.get("/orders", response_model=List[Order])
async def get_orders(status: Optional[OrderStatus] = None):
    query = {}
    if status:
        query["status"] = status
    
    orders = await db.orders.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for order in orders:
        if isinstance(order['created_at'], str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if isinstance(order['created_at'], str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return order

@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: OrderStatus, mpesa_reference: Optional[str] = None):
    update_data = {"status": status}
    if mpesa_reference:
        update_data["mpesa_reference"] = mpesa_reference
    
    result = await db.orders.update_one(
        {"id": order_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return {"message": "Order status updated", "status": status}


# Contact Routes
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(contact: ContactSubmissionCreate):
    contact_obj = ContactSubmission(**contact.model_dump())
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_submissions.insert_one(doc)
    return contact_obj

@api_router.get("/contact/submissions", response_model=List[ContactSubmission])
async def get_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub['created_at'], str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    
    return submissions


# Newsletter Routes
@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    # Check if email already exists
    existing = await db.newsletter_subscriptions.find_one({"email": subscription.email})
    
    if existing:
        # Reactivate if previously unsubscribed
        await db.newsletter_subscriptions.update_one(
            {"email": subscription.email},
            {"$set": {"is_active": True}}
        )
        existing['is_active'] = True
        if isinstance(existing['subscribed_at'], str):
            existing['subscribed_at'] = datetime.fromisoformat(existing['subscribed_at'])
        return NewsletterSubscription(**existing)
    
    subscription_obj = NewsletterSubscription(**subscription.model_dump())
    doc = subscription_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscriptions.insert_one(doc)
    return subscription_obj


# M-Pesa Integration Placeholder (Structure ready for Daraja API)
@api_router.post("/mpesa/stk-push")
async def initiate_mpesa_payment(
    phone_number: str,
    amount: float,
    order_id: str
):
    """
    This is a placeholder for M-Pesa STK Push integration.
    You'll need to add Daraja API credentials in .env:
    - MPESA_CONSUMER_KEY
    - MPESA_CONSUMER_SECRET
    - MPESA_SHORTCODE
    - MPESA_PASSKEY
    """
    # TODO: Implement actual M-Pesa Daraja API integration
    return {
        "message": "M-Pesa integration placeholder",
        "order_id": order_id,
        "amount": amount,
        "phone_number": phone_number,
        "status": "pending"
    }

@api_router.post("/mpesa/callback")
async def mpesa_callback(callback_data: dict):
    """
    This endpoint will receive M-Pesa payment callbacks
    """
    # TODO: Process M-Pesa callback and update order status
    return {"message": "Callback received"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
