# 🍕 HomeBite - Premium Food Delivery Platform

A full-stack food ordering web application designed to connect users with premium home-chef networks. HomeBite allows customers to browse menus, place orders, and manage deliveries while providing restaurant operators with comprehensive order management tools.

---

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Frontend Pages](#-frontend-pages)
- [Database Models](#-database-models)
- [Authentication & Security](#-authentication--security)
- [Payment Integration](#-payment-integration)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Customers
- **User Authentication**: Secure registration and login with JWT tokens
- **Profile Management**: Create profile with name, phone, address, and profile picture
- **Browse Menu**: Explore featured food items with detailed descriptions and prices
- **Shopping Cart**: Add/remove items, view total price dynamically
- **Order Placement**: Place orders with delivery address and contact details
- **Payment Options**: 
  - Cash on Delivery (COD)
  - Online Payment via Cashfree
- **Order Tracking**: View order history and status
- **Contact Support**: Send inquiries and feedback

### For Administrators
- **Order Management**: View all orders, track status, and manage transactions
- **Payment Verification**: Verify online payments and transaction IDs
- **Restaurant Operations**: Monitor customer orders and delivery status

---

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Premium dark theme with glass-morphism effects
- **Vanilla JavaScript** - Dynamic UI interactions and API communication
- **Font Awesome** - Icon library for UI elements
- **Google Fonts** - Typography (Playfair Display, Poppins)

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js v5.2.1** - Web application framework
- **MongoDB v9.7.3** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Libraries & Integrations
- **bcryptjs** - Password hashing and encryption
- **jsonwebtoken (JWT)** - Secure authentication tokens
- **dotenv** - Environment variable management
- **multer** - File upload middleware for profile pictures
- **cloudinary** - Cloud storage for images
- **streamifier** - Stream conversion for file uploads
- **cashfree-pg** - Payment gateway integration
- **cors** - Cross-Origin Resource Sharing middleware
- **nodemon** - Development server auto-restart

---

## 📁 Project Structure

```
HomeBite/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection configuration
│   │   ├── cloudinary.js         # Cloudinary cloud storage setup
│   │   └── cashfree.js           # Cashfree payment gateway config
│   ├── controllers/
│   │   ├── authController.js     # User registration & login logic
│   │   ├── orderController.js    # Order placement & payment verification
│   │   ├── userController.js     # User profile management
│   │   └── contactController.js  # Contact form submissions
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT token verification & protection
│   ├── models/
│   │   ├── User.js               # User schema (profile, contact info)
│   │   ├── Order.js              # Order schema (items, payment, status)
│   │   └── Contact.js            # Contact inquiry schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── orderRoutes.js        # Order management endpoints
│   │   ├── userRoutes.js         # User profile endpoints
│   │   └── contactRoutes.js      # Contact form endpoints
│   └── .env                      # Environment variables (not in repo)
├── public/
│   ├── index.html                # Login & Registration page
│   ├── home.html                 # Dashboard & featured menu
│   ├── menu.html                 # Full menu browse page
│   ├── cart.html                 # Shopping cart & checkout
│   ├── order.html                # Order summary page
│   ├── profile.html              # User profile management
│   ├── about.html                # About & company info
│   ├── contact.html              # Contact us form
│   └── js/
│       ├── auth-guard.js         # Redirect authenticated users
│       └── guest-guard.js        # Redirect non-authenticated users
├── server.js                     # Main Express server entry point
├── package.json                  # Dependencies & project metadata
├── package-lock.json             # Locked dependency versions
├── .gitignore                    # Git ignore rules
└── README.md                     # This file

**How it fits together:**
1. User accesses the application via `index.html` (login/signup)
2. Frontend sends registration/login requests to `/api/auth` endpoints
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage and sent with every authenticated request
5. User browses menu items on `home.html` and adds to cart (`cart.html`)
6. Order placement sends request to `/api/orders/place` with JWT token
7. Payment is processed through Cashfree or COD
8. Order is saved in MongoDB with user reference and status tracking
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local or MongoDB Atlas cloud)
- **Git**

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sonamkumari-git/HomeBite.git
cd HomeBite
```

### Step 2: Install Dependencies
```bash
npm install
```

---

## ⚙️ Configuration

### Step 1: Create Environment File
Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/homebite
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/homebite

# JWT Secret (use a strong random string)
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (for profile image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Cashfree Payment Gateway
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_client_secret

# Server Port
PORT=5000
```

### Step 2: Obtain API Keys
1. **MongoDB**: Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com) for image hosting
3. **Cashfree**: Register at [cashfree.com](https://www.cashfree.com) for payment processing

---

## ▶️ Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at:
- **Frontend**: `http://localhost:5000`
- **API Base URL**: `http://localhost:5000/api`

---

## 📡 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user with profile picture | No |
| POST | `/api/auth/login` | Login user and return JWT token | No |

#### Register Request
```json
{
  "fullName": "Rahul Kumar",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "address": "Room 102, Hostel A",
  "password": "securePassword123",
  "profileImage": "[file]"
}
```

#### Login Request
```json
{
  "email": "rahul@example.com",
  "password": "securePassword123"
}
```

### Order Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/orders/place` | Place new order | Yes |
| POST | `/api/orders/verify` | Verify online payment | Yes |
| GET | `/api/orders/my-orders` | Get user's order history | Yes |

#### Place Order Request
```json
{
  "customerName": "Rahul Kumar",
  "customerPhone": "9876543210",
  "address": "Room 102, Hostel A",
  "items": [
    { "name": "Biryani", "price": 250, "quantity": 2 },
    { "name": "Paneer Tikka", "price": 150, "quantity": 1 }
  ],
  "totalAmount": 650,
  "paymentMethod": "online"
}
```

**Headers Required:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### User Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |

### Contact Endpoints
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact/submit` | Submit contact form | No |

---

## 🌐 Frontend Pages

### 1. **index.html** - Authentication Portal
- **Login Form**: Email and password authentication
- **Sign Up Form**: Full registration with profile picture upload
- **Features**: 
  - Tab switching between login/signup
  - Image preview before upload
  - Form validation
  - Premium dark theme with glass-morphism
- **Guards**: Redirects authenticated users to home page

### 2. **home.html** - Dashboard & Featured Menu
- **Navigation Bar**: Logo, menu links, cart icon, profile
- **Hero Section**: Brand messaging and call-to-action
- **Featured Menu**: Grid of popular food items with images
- **Menu Cards**: Item name, price, description, type badge (Veg/Non-Veg)
- **Interactive Elements**: Hover animations, smooth scrolling

### 3. **menu.html** - Full Menu Catalog
- **Category Filtering**: Browse by food type
- **Search Functionality**: Find items by name or cuisine
- **Item Details**: Full description, price, ratings
- **Add to Cart**: Quick add buttons on menu items

### 4. **cart.html** - Shopping Cart & Checkout
- **Cart Display**: List of selected items with quantities
- **Price Summary**: Itemized breakdown and total
- **Quantity Management**: Increase/decrease item quantity
- **Checkout Form**: Delivery address and contact details
- **Payment Options**: 
  - Cash on Delivery (COD)
  - Online Payment (Cashfree integration)

### 5. **order.html** - Order Summary
- **Order Details**: Order ID, items, total amount
- **Delivery Information**: Address, estimated delivery time
- **Payment Status**: Transaction ID and payment confirmation
- **Order History Link**: Button to view all orders

### 6. **profile.html** - User Profile Management
- **Profile Information**: Name, email, phone, address
- **Profile Picture**: Upload and preview new picture
- **Edit Profile**: Update user details
- **Order History**: View past orders and statuses

### 7. **about.html** - About HomeBite
- **Company Information**: Mission and vision
- **Why Choose Us**: Key benefits and features
- **Team Information**: About the founders
- **Contact Links**: Quick contact options

### 8. **contact.html** - Contact & Support
- **Contact Form**: Name, email, message, category
- **Contact Information**: Phone, address, email
- **Response Time**: Expected support response timeframe
- **Social Links**: Links to social media profiles

### Security Guards
- **auth-guard.js**: Redirects non-authenticated users to login
- **guest-guard.js**: Redirects authenticated users away from login page

---

## 🗄️ Database Models

### User Schema
```javascript
{
  fullName: String (required),
  email: String (required, unique),
  phoneNumber: String (required),
  address: String (required),
  password: String (required, hashed),
  profileImage: String (Cloudinary URL),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Order Schema
```javascript
{
  user: ObjectId (reference to User),
  orderId: String (unique identifier),
  customerName: String,
  customerPhone: String,
  address: String,
  items: Array (food items with quantity),
  totalAmount: Number,
  paymentMethod: String ('cod' or 'online'),
  paymentStatus: String ('pending', 'paid', 'failed'),
  transactionId: String (Cashfree transaction ID),
  status: String ('new', 'confirmed', 'preparing', 'delivered'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Contact Schema
```javascript
{
  name: String,
  email: String,
  phone: String,
  message: String,
  category: String ('feedback', 'complaint', 'inquiry'),
  createdAt: Date (auto)
}
```

---

## 🔐 Authentication & Security

### JWT Implementation
- **Token Generation**: Created upon successful login/registration
- **Token Storage**: Stored in browser localStorage
- **Token Verification**: Validated on every protected API request
- **Expiration**: 30 days (configurable in `.env`)

### Password Security
- **Hashing**: bcryptjs with salt rounds = 10
- **Never Stored in Plain Text**: Passwords are always encrypted
- **Comparison**: Hashed password compared during login

### Protected Routes
All order, payment, and user profile endpoints require:
1. Valid JWT token in Authorization header
2. Token format: `Bearer <JWT_TOKEN>`
3. Token verification through `authMiddleware.js`

### Database Security
- Sensitive data (passwords) excluded from queries with `.select('-password')`
- User authentication checks on order operations
- Orders linked to specific user IDs

---

## 💳 Payment Integration

### Payment Methods Supported

#### 1. Cash on Delivery (COD)
- Simple and immediate order confirmation
- No payment processing required
- Suitable for local deliveries

#### 2. Online Payment (Cashfree)
- PCI compliant payment gateway
- Supports multiple payment instruments:
  - Credit/Debit Cards
  - Net Banking
  - UPI
  - Wallets
- Real-time payment verification
- Transaction ID tracking in database

### Payment Flow
1. User selects payment method at checkout
2. For COD: Order created immediately with "pending" status
3. For Online: Cashfree session initiated with order details
4. Customer completes payment on Cashfree checkout
5. Payment verification endpoint confirms transaction
6. Order status updated to "paid" with transaction ID
7. Confirmation email/SMS sent to customer

---

## 📱 Browser Compatibility
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

We welcome contributions! Here's how to contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/HomeBite.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit**
   ```bash
   git commit -m "Add: your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** describing your changes

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: MongoDB connection refused
- **Solution**: Ensure MongoDB is running locally or check MongoDB Atlas connection string

**Issue**: Cloudinary upload fails
- **Solution**: Verify API keys in `.env` file and check internet connection

**Issue**: Cashfree payment not working
- **Solution**: Check Cashfree credentials and ensure test/production mode matches

**Issue**: JWT token verification error
- **Solution**: Clear localStorage and re-login; check JWT_SECRET in `.env`

**Issue**: CORS errors
- **Solution**: Ensure frontend and backend are running on correct ports

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- **GitHub Issues**: [HomeBite Issues](https://github.com/Sonamkumari-git/HomeBite/issues)
- **Email**: Contact through the application's contact form
- **Discord**: Join our community server (if available)

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Sonam Kumar**
- GitHub: [@Sonamkumari-git](https://github.com/Sonamkumari-git)
- Email: Contact through GitHub

---

## 🎯 Future Enhancements

- [ ] Real-time order tracking with Google Maps integration
- [ ] SMS/Email notifications for order updates
- [ ] Restaurant owner dashboard for order management
- [ ] Advanced filtering and sorting in menu
- [ ] User ratings and reviews system
- [ ] Loyalty points and referral program
- [ ] Multiple language support
- [ ] Admin panel for restaurant management
- [ ] Analytics and reporting dashboard
- [ ] Mobile app (React Native or Flutter)

---

## 🙏 Acknowledgments

- Inspired by popular food delivery platforms
- Thanks to the open-source community for amazing libraries
- Special thanks to Cashfree and Cloudinary for their services

---

**Last Updated**: July 2026  
**Status**: ✅ Active Development
