# Kashoe Chess Club - Complete Code Guide

## 📁 Full File Structure

```
/app/
├── backend/
│   ├── server.py                    # Complete FastAPI backend (500 lines)
│   ├── requirements.txt             # Python dependencies
│   └── .env                         # MongoDB & CORS config
│
├── frontend/
│   ├── src/
│   │   ├── App.js                   # Main React app
│   │   ├── App.css                  # Global styles & animations
│   │   ├── index.js                 # React entry point
│   │   ├── index.css                # Tailwind base styles
│   │   │
│   │   ├── components/              # Reusable components
│   │   │   ├── Header.jsx           # Navigation header with cart
│   │   │   ├── Footer.jsx           # Footer with social links
│   │   │   ├── CartSheet.jsx        # Shopping cart sidebar
│   │   │   ├── CheckoutDialog.jsx   # Checkout modal
│   │   │   └── ui/                  # ShadCN UI components (40+ files)
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Homepage
│   │   │   ├── About.jsx            # About page
│   │   │   ├── Events.jsx           # Events listing
│   │   │   ├── Shop.jsx             # Products/shop
│   │   │   ├── Lessons.jsx          # Lesson registration
│   │   │   └── Contact.jsx          # Contact form
│   │   │
│   │   ├── context/
│   │   │   └── CartContext.js       # Shopping cart state
│   │   │
│   │   └── lib/
│   │       └── utils.js             # Utility functions
│   │
│   ├── public/                      # Static assets
│   ├── package.json                 # Dependencies
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── postcss.config.js           # PostCSS config
│   └── .env                        # Frontend environment vars
│
├── scripts/
│   └── seed_data.py                # Database seeding script
│
├── README.md                       # Project documentation
└── CODE_GUIDE.md                  # This file
```

## 🚀 How to Get All Code

### Option 1: View Files in Terminal
```bash
# Backend
cat /app/backend/server.py
cat /app/backend/requirements.txt

# Frontend Core
cat /app/frontend/src/App.js
cat /app/frontend/src/App.css
cat /app/frontend/src/context/CartContext.js

# Components
cat /app/frontend/src/components/Header.jsx
cat /app/frontend/src/components/Footer.jsx
cat /app/frontend/src/components/CartSheet.jsx
cat /app/frontend/src/components/CheckoutDialog.jsx

# Pages
cat /app/frontend/src/pages/Home.jsx
cat /app/frontend/src/pages/About.jsx
cat /app/frontend/src/pages/Events.jsx
cat /app/frontend/src/pages/Shop.jsx
cat /app/frontend/src/pages/Lessons.jsx
cat /app/frontend/src/pages/Contact.jsx
```

### Option 2: Create a Zip Archive
```bash
cd /app
zip -r kashoe-chess-club.zip backend/ frontend/ scripts/ README.md -x "*/node_modules/*" "*/yarn.lock" "*/__pycache__/*"
```

### Option 3: Use Git
```bash
cd /app
git init
git add .
git commit -m "Initial commit - Kashoe Chess Club website"
# Then push to your GitHub repository
```

## 📝 Key Code Files

### Backend (`/app/backend/server.py`)
**Lines: 500** - Complete FastAPI application with:
- Product CRUD operations
- Event management
- Lesson registration system
- Order processing
- Contact form handling
- Newsletter subscriptions
- M-Pesa payment structure

### Frontend Pages

1. **Home.jsx** (8KB) - Hero, features, CTAs
2. **About.jsx** (7.6KB) - Club story, mission, values
3. **Events.jsx** (6.9KB) - Event calendar
4. **Shop.jsx** (7.6KB) - Product catalog with cart
5. **Lessons.jsx** (12.8KB) - Programs & registration form
6. **Contact.jsx** (11KB) - Contact form & info

### Core Components

- **Header.jsx** - Responsive navigation with cart badge
- **Footer.jsx** - Location, social media, links
- **CartSheet.jsx** - Shopping cart sidebar
- **CheckoutDialog.jsx** - M-Pesa checkout modal
- **CartContext.js** - Shopping cart state management

## 🎨 Styling

All styling uses:
- **Tailwind CSS** - Utility-first CSS
- **Custom CSS** in App.css for:
  - Chess pattern backgrounds
  - Floating animations
  - Gradient buttons
  - Card hover effects
  - Custom scrollbar

## 🔧 Configuration Files

### Backend Environment (`.env`)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=kashoe_chess_club
CORS_ORIGINS=*
```

### Frontend Environment (`.env`)
```env
REACT_APP_BACKEND_URL=your-backend-url
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### Package.json Dependencies
```json
{
  "react": "^19.0.0",
  "react-router-dom": "^7.5.1",
  "axios": "^1.8.4",
  "tailwindcss": "^3.4.17",
  "lucide-react": "^0.507.0",
  "@radix-ui/*": "Latest versions",
  "date-fns": "^4.1.0"
}
```

## 📦 Complete Installation Steps

### Prerequisites
```bash
# Check versions
python --version  # Need 3.8+
node --version    # Need 16+
yarn --version    # Need 1.22+
```

### Backend Setup
```bash
cd /app/backend
pip install -r requirements.txt

# Run backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Setup
```bash
cd /app/frontend
yarn install

# Run frontend
yarn start
```

### Seed Sample Data
```bash
python3 /app/scripts/seed_data.py
```

## 📊 Database Collections

The MongoDB database `kashoe_chess_club` contains:

1. **products** - 10 items (boards, clocks, merchandise, lessons)
2. **events** - 4 upcoming events
3. **lesson_registrations** - Student enrollments
4. **orders** - Shop orders
5. **contact_submissions** - Contact form messages
6. **newsletter_subscriptions** - Email subscriptions

## 🎯 API Endpoints

Base URL: `http://localhost:8001/api`

### Products
- `GET /products` - List all products
- `GET /products/{id}` - Get single product
- `POST /products` - Create product
- `PATCH /products/{id}` - Update product

### Events
- `GET /events` - List all events
- `POST /events` - Create event

### Lessons
- `POST /lessons/register` - Register for lessons
- `GET /lessons/registrations` - Get all registrations

### Orders
- `POST /orders` - Create order
- `GET /orders` - List orders

### Contact
- `POST /contact` - Submit contact form
- `GET /contact/submissions` - Get submissions

### Newsletter
- `POST /newsletter/subscribe` - Subscribe

## 🎨 Design System

### Colors
```css
--purple-600: #8B5CF6;  /* Primary */
--orange-500: #F97316;  /* Secondary */
--blue-600: #3B82F6;    /* Accent */
--green-500: #10B981;   /* Success */
```

### Typography
- Font: Poppins (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

### Components
- 40+ ShadCN UI components pre-configured
- Custom card hover effects
- Gradient buttons
- Animated elements

## 📱 Features Implemented

✅ Full e-commerce with shopping cart
✅ M-Pesa payment structure (ready for API keys)
✅ Event management system
✅ Lesson registration with admin approval
✅ Contact form with submissions
✅ Newsletter subscription
✅ Responsive design (mobile, tablet, desktop)
✅ Beautiful child-friendly UI
✅ All CRUD operations
✅ Form validation
✅ Toast notifications
✅ LocalStorage cart persistence

## 🚀 Deployment

### Using Emergent Platform
Already configured! Just deploy using the platform.

### Manual Deployment

#### Backend (FastAPI)
```bash
# Install dependencies
pip install -r requirements.txt

# Run with Gunicorn
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker
```

#### Frontend (React)
```bash
# Build for production
yarn build

# Serve build folder
npx serve -s build
```

## 📞 Support

For questions or modifications:
- Check README.md for detailed documentation
- All code is well-commented
- Each component has data-testid attributes for testing

## 🎉 You're All Set!

All code is complete and working. The website is fully functional with:
- 6 beautiful pages
- Complete backend API
- Shopping cart functionality
- Event listings
- Lesson registration
- Contact forms
- And much more!

**Navigate to http://localhost:3000 to see it live!**

---
Built with ❤️ for Kashoe Chess Club, Nairobi, Kenya 🇰🇪
