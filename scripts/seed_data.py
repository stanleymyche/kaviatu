#!/usr/bin/env python3
"""
Seed sample data for Kashoe Chess Club
"""
import requests
import json
from datetime import datetime, timedelta

BACKEND_URL = "http://localhost:8001/api"

def seed_products():
    """Add sample products"""
    products = [
        {
            "name": "Professional Chess Board",
            "description": "High-quality wooden chess board with 2-inch squares, perfect for tournament play",
            "category": "chess_board",
            "price": 3500.00,
            "image_url": "https://images.unsplash.com/photo-1763635031729-b3db264dd8c0",
            "stock": 15
        },
        {
            "name": "Digital Chess Clock",
            "description": "Tournament-grade digital chess clock with delay and increment modes",
            "category": "chess_clock",
            "price": 2800.00,
            "image_url": "https://images.pexels.com/photos/5477779/pexels-photo-5477779.jpeg",
            "stock": 10
        },
        {
            "name": "Kashoe Chess Club T-Shirt",
            "description": "Official club t-shirt with vibrant colors (Available in kids sizes)",
            "category": "merchandise",
            "price": 800.00,
            "image_url": "https://images.unsplash.com/photo-1745556377753-9efffe9181ef",
            "stock": 50
        },
        {
            "name": "Beginner Chess Set",
            "description": "Colorful chess set with large pieces, perfect for young learners",
            "category": "chess_board",
            "price": 1500.00,
            "image_url": "https://images.pexels.com/photos/7104222/pexels-photo-7104222.jpeg",
            "stock": 25
        },
        {
            "name": "Chess Strategy Book Bundle",
            "description": "Collection of 3 beginner-friendly chess strategy books",
            "category": "merchandise",
            "price": 1200.00,
            "image_url": "https://images.unsplash.com/photo-1745556377790-b1694d9aed26",
            "stock": 20
        },
        {
            "name": "Monthly Lesson Package (4 Sessions)",
            "description": "Four 1-hour chess lessons with expert coaches. Perfect for consistent learning!",
            "category": "lesson_package",
            "price": 4000.00,
            "stock": 100
        },
        {
            "name": "Private Coaching (10 Sessions)",
            "description": "One-on-one personalized chess coaching for rapid improvement",
            "category": "lesson_package",
            "price": 12000.00,
            "stock": 20
        },
        {
            "name": "Kashoe Chess Club Cap",
            "description": "Stylish cap with club logo, one size fits all",
            "category": "merchandise",
            "price": 500.00,
            "stock": 40
        },
        {
            "name": "Travel Chess Set",
            "description": "Portable magnetic chess set, perfect for chess on the go",
            "category": "chess_board",
            "price": 1800.00,
            "stock": 30
        },
        {
            "name": "Analog Chess Clock",
            "description": "Classic mechanical chess clock for traditional gameplay",
            "category": "chess_clock",
            "price": 3200.00,
            "stock": 8
        }
    ]
    
    print("Seeding products...")
    for product in products:
        try:
            response = requests.post(f"{BACKEND_URL}/products", json=product)
            if response.status_code == 200:
                print(f"✓ Added: {product['name']}")
            else:
                print(f"✗ Failed to add: {product['name']}")
        except Exception as e:
            print(f"✗ Error adding {product['name']}: {e}")

def seed_events():
    """Add sample events"""
    today = datetime.now()
    events = [
        {
            "title": "Beginner's Chess Tournament",
            "description": "Fun tournament for kids aged 6-10. Prizes for top 3 players! Registration includes snacks and certificate.",
            "event_date": (today + timedelta(days=14)).isoformat(),
            "location": "Kashoe Chess Club, Nairobi",
            "image_url": "https://images.unsplash.com/photo-1745556377753-9efffe9181ef",
            "max_participants": 30,
            "status": "upcoming"
        },
        {
            "title": "Chess Strategy Workshop",
            "description": "Learn advanced opening strategies and middle-game tactics from our expert coaches",
            "event_date": (today + timedelta(days=7)).isoformat(),
            "location": "Kashoe Chess Club, Nairobi",
            "image_url": "https://images.pexels.com/photos/7104222/pexels-photo-7104222.jpeg",
            "max_participants": 20,
            "status": "upcoming"
        },
        {
            "title": "Inter-School Chess Championship",
            "description": "Annual championship featuring top young players from schools across Nairobi",
            "event_date": (today + timedelta(days=30)).isoformat(),
            "location": "Nairobi Community Center",
            "image_url": "https://images.unsplash.com/photo-1763635031729-b3db264dd8c0",
            "max_participants": 50,
            "status": "upcoming"
        },
        {
            "title": "Family Chess Day",
            "description": "Bring the whole family for a day of chess fun! Activities for all ages and skill levels",
            "event_date": (today + timedelta(days=21)).isoformat(),
            "location": "Kashoe Chess Club, Nairobi",
            "image_url": "https://images.pexels.com/photos/5477779/pexels-photo-5477779.jpeg",
            "max_participants": 40,
            "status": "upcoming"
        }
    ]
    
    print("\nSeeding events...")
    for event in events:
        try:
            response = requests.post(f"{BACKEND_URL}/events", json=event)
            if response.status_code == 200:
                print(f"✓ Added: {event['title']}")
            else:
                print(f"✗ Failed to add: {event['title']}")
        except Exception as e:
            print(f"✗ Error adding {event['title']}: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("Kashoe Chess Club - Seeding Sample Data")
    print("=" * 60)
    
    seed_products()
    seed_events()
    
    print("\n" + "=" * 60)
    print("Seeding complete!")
    print("=" * 60)
