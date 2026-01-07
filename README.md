# Kashoe Chess Club Website

A beautiful, modern website for Kashoe Chess Club - a faith-based chess club for kids in Nairobi, Kenya.

## 🎨 Features

### Pages
- **Home**: Hero section with call-to-action, features showcase, and quick links
- **About Us**: Club story, mission, vision, values, and what we offer
- **Events**: Upcoming and past chess tournaments and community events
- **Shop**: E-commerce functionality with products categorized as:
  - Chess Boards
  - Chess Clocks
  - Club Merchandise
  - Lesson Packages
- **Lessons**: Three-tier program (Beginner, Intermediate, Advanced) with registration form
- **Contact**: Contact form with location, email, phone, and social media links

### Key Functionality
- 🛒 Shopping cart with M-Pesa checkout integration (structure ready)
- 📅 Event management system
- 📝 Lesson registration with admin approval workflow
- 💬 Contact form submissions
- 📧 Newsletter subscription
- 🎨 Beautiful child-friendly design with purple, orange, and blue color scheme

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **MongoDB**: NoSQL database using Motor (async driver)
- **Pydantic**: Data validation
- **Python 3.x**

### Frontend
- **React 19**: UI framework
- **Tailwind CSS**: Utility-first styling
- **ShadCN UI**: Component library
- **React Router**: Navigation
- **Axios**: HTTP client
- **Lucide React**: Icons

## 📁 Project Structure

```
/app/
├── backend/
│   ├── server.py          # FastAPI application with all routes
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main application component
│   │   ├── App.css       # Global styles
│   │   ├── components/   # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CartSheet.jsx
│   │   │   └── CheckoutDialog.jsx
│   │   ├── pages/        # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Lessons.jsx
│   │   │   └── Contact.jsx
│   │   └── context/      # React context
│   │       └── CartContext.js
│   ├── package.json
│   └── .env
└── scripts/
    └── seed_data.py      # Sample data seeding script
```

## 🚀 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional category filter)
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product
- `PATCH /api/products/{id}` - Update product

### Events
- `GET /api/events` - Get all events (with optional status filter)
- `GET /api/events/{id}` - Get single event
- `POST /api/events` - Create event

### Lessons
- `POST /api/lessons/register` - Register for lessons
- `GET /api/lessons/registrations` - Get all registrations
- `PATCH /api/lessons/registrations/{id}/status` - Update registration status

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/{id}` - Get single order
- `POST /api/orders` - Create order
- `PATCH /api/orders/{id}/status` - Update order status

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `GET /api/contact/submissions` - Get all contact submissions
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### M-Pesa Integration (Placeholder)
- `POST /api/mpesa/stk-push` - Initiate M-Pesa payment
- `POST /api/mpesa/callback` - Receive M-Pesa callbacks

## 🎨 Design Theme

**Child-Friendly Color Palette:**
- Primary Purple: `#8B5CF6` (wisdom, royalty)
- Orange: `#F97316` (energy, creativity)
- Blue: `#3B82F6` (trust, peace)
- Green: `#10B981` (success)
- Background: Soft cream/white with chess board patterns

## 🔧 Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- Yarn package manager

### Backend Setup
```bash
cd /app/backend
pip install -r requirements.txt
# Backend runs on http://localhost:8001
```

### Frontend Setup
```bash
cd /app/frontend
yarn install
# Frontend runs on http://localhost:3000
```

### Environment Variables

**Backend (.env)**
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=kashoe_chess_club
CORS_ORIGINS=*
```

**Frontend (.env)**
```
REACT_APP_BACKEND_URL=https://your-domain.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### Seeding Sample Data
```bash
python3 /app/scripts/seed_data.py
```

## 📊 Database Collections

- `products` - Chess equipment and merchandise
- `events` - Tournaments and community events
- `lesson_registrations` - Lesson enrollment requests
- `orders` - Shop orders
- `contact_submissions` - Contact form messages
- `newsletter_subscriptions` - Newsletter subscribers

## 🔐 M-Pesa Integration (TODO)

To complete the M-Pesa integration:

1. Register for Safaricom Daraja API
2. Add credentials to backend/.env:
   ```
   MPESA_CONSUMER_KEY=your_key
   MPESA_CONSUMER_SECRET=your_secret
   MPESA_SHORTCODE=your_shortcode
   MPESA_PASSKEY=your_passkey
   ```
3. Implement actual M-Pesa STK Push in `/api/mpesa/stk-push`
4. Implement callback handler in `/api/mpesa/callback`

## 📱 Social Media

- Facebook: https://facebook.com
- Instagram: https://instagram.com
- Twitter/X: https://twitter.com
- YouTube: https://youtube.com

## 📍 Location

**Kashoe Chess Club**
Nairobi, Kenya 🇰🇪

## 🎯 Key Features Implementation Status

✅ Complete:
- All 6 pages (Home, About, Events, Shop, Lessons, Contact)
- Shopping cart functionality
- Product catalog with categories
- Event listing
- Lesson registration form
- Contact form
- Beautiful responsive design
- Header with navigation and cart
- Footer with location and social media
- MongoDB database integration
- RESTful API endpoints

🔄 Ready for Integration:
- M-Pesa payment processing (structure in place)
- Email notifications (simple forwarding setup)
- Admin approval for lesson registrations (API ready)

## 🎨 UI Components

Built with ShadCN UI:
- Cards
- Buttons
- Forms (Input, Textarea, Select)
- Badges
- Dialog/Sheet modals
- Tabs
- Toast notifications

## 📝 Notes

- All products show prices in Kenyan Shillings (KSh)
- Cart persists in localStorage
- All forms have proper validation
- Responsive design works on all devices
- Images are sourced from Unsplash and Pexels
- Chess-themed design elements throughout

## 🤝 Contributing

This is a custom website for Kashoe Chess Club. For modifications or feature requests, please contact the club administrators.

## 📄 License

© 2026 Kashoe Chess Club. All rights reserved.

---

**Built with ❤️ for the children of Kashoe Chess Club, Nairobi, Kenya**
