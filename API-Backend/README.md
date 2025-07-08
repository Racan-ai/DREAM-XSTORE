# Express.js Server Component For Designers Den 

This is an **Express.js backend project** built to manage authentication, Google OAuth, and RESTful APIs using **MongoDB**. It features modular directory architecture for better scalability and maintainability.

---

## 🗂️ Project Structure
```
├───config             # Configuration files
├───controllers        # Contains logic for handling requests
├───middleware         # Middleware functions (e.g., authentication)
├───models             # Mongoose schemas and models
└───routes             # Application routes
```

### 🛠️ Key Functionalities
1. **Authentication:**
   - Email/password-based login.
   - Google OAuth integration via `/api/auth/google`.
2. **Middleware:**
   - `auth` middleware for token verification.
3. **Database:**
   - Models for MongoDB collections defined using **Mongoose**.

---

## 📜 API Routes

| Endpoint                 | Method | Description                       |
|--------------------------|--------|-----------------------------------|
| `/api/auth/login`        | POST   | User login (email/password)       |
| `/api/auth/register`     | POST   | User registration                 |
| `/api/auth/google`       | GET    | Google OAuth                      |

### 🛡️ JWT Token Generation
Upon login, a **JWT token** is created:
```javascript
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);
```

---

## 🏗️ Installation

### Using **npm**:
```bash
npm install
```

### Using **yarn**:
```bash
yarn install
```

---

## 🔧 Scripts

- **Development Mode**:
  ```bash
  npm run dev
  ```
  or
  ```bash
  yarn dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```
  or
  ```bash
  yarn start
  ```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PORT=3001
FRONTEND_URL=   # Frontend application URL
BACKEND_URL=    # Backend application URL
MONGODB_URI=    # MongoDB connection string
JWT_SECRET=     # Secret for JWT signing
GOOGLE_CLIENT_ID=      # Google OAuth client ID
GOOGLE_CLIENT_SECRET=  # Google OAuth client secret
GOOGLE_CALLBACK_URL=   # Callback URL for Google OAuth
MAILSERVER_URL=  # appscript deployment url
SHIPROCKET_EMAIL=your_shiprocket_email@example.com
SHIPROCKET_PASSWORD=your_shiprocket_password
```

---

## ✨ Features

- **Secure Authentication**: 
  JWT-based user authentication for session management.
- **Google OAuth**:
  Simplified user login with Google accounts.
- **Scalable Architecture**:
  Organized folder structure for scalability and maintenance.
- **MongoDB Integration**:
  Powerful NoSQL database support using **Mongoose**.

---

## 🚀 Get Started

1. Clone the repository:
   ```bash
   git clone https://github.com/hyperbala/backend-online-shop.git
   cd backend-online-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Set up the `.env` file.

4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. Access the application at `http://localhost:3001`.

---

## API Endpoints

### Auth Routes
- **POST** `/api/auth/register` — Register a new user
  - **Body:** `{ "email": string, "password": string, ... }`
- **POST** `/api/auth/login` — User login
  - **Body:** `{ "email": string, "password": string }`
- **POST** `/api/auth/forgot-password` — Request password reset
  - **Body:** `{ "email": string }`
- **POST** `/api/auth/reset-password` — Reset password
  - **Body:** `{ "token": string, "password": string }`

### Google Auth Routes
- **GET** `/api/auth/google` — Initiate Google OAuth
- **GET** `/api/auth/google/callback` — Google OAuth callback

### User Routes
- **GET** `/users` — Get all users
- **GET** `/users/:id` — Get user by ID
- **PUT** `/users/:id` — Update user by ID
  - **Body:** `{ ...fields to update... }`
- **DELETE** `/users/:id` — Delete user by ID

### Design Routes
- **GET** `/api/designs` — Get all designs
- **POST** `/api/designs` — Create a new design
  - **Body:** `{ ...design fields... }`
- **GET** `/api/designs/:id` — Get design by ID
- **PUT** `/api/designs/:id` — Update design by ID
  - **Body:** `{ ...fields to update... }`
- **DELETE** `/api/designs/:id` — Delete design by ID

---

# Payment Scheduler API

## Overview
This project provides a backend API for managing orders, vendors, and Shiprocket shipping integration for an online shop. It includes endpoints for order placement, delivery price calculation, shipment tracking, vendor sales analytics, and more.

## Environment Variables
Create a `.env` file in the project root with the following variables:

```
SHIPROCKET_EMAIL=your_shiprocket_email@example.com
SHIPROCKET_PASSWORD=your_shiprocket_password
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The API will run on the port specified in your `.env` file (default: 5000).

## API Endpoints

### 1. Add Pickup Location
- **POST** `/add-pickup-location`
- **Body:** JSON object with pickup location details (as required by Shiprocket)
- **Response:** Shiprocket API response for pickup location creation

### 2. Get Delivery Price
- **POST** `/get-delivery-price`
- **Body:**
  ```json
  {
    "pickup_postcode": "string",
    "delivery_postcode": "string"
  }
  ```
- **Response:**
  ```json
  {
    // Shiprocket delivery price response
  }
  ```

### 3. Place Order
- **POST** `/place-order`
- **Body:** JSON object with order details (as required by Shiprocket)
- **Response:** Shiprocket order creation response

### 4. Request Pickup
- **POST** `/request-pickup`
- **Body:**
  ```json
  {
    "shipment_id": "string"
  }
  ```
- **Response:** Shiprocket pickup request response

### 5. Track Shipment
- **GET** `/track-shipment/:shipmentId`
- **Response:** Shiprocket tracking details for the given shipment ID

### 6. Get Delivered Orders
- **GET** `/delivered-orders`
- **Response:**
  ```json
  [
    // Array of delivered order objects
  ]
  ```

### 7. Vendor Sales Data
- **POST** `/vendor-sales`
- **Auth Required:** Yes (JWT in header)
- **Body:** _None required (vendor ID inferred from auth)_
- **Response:**
  ```json
  {
    "sales": [
      { "date": "YYYY-MM-DD", "amount": number }
    ],
    "totalPayment": number,
    "orderCount": number
  }
  ```

### 8. Vendor Orders List
- **POST** `/vendor-orders`
- **Auth Required:** Yes (JWT in header)
- **Body:** _None required (vendor ID inferred from auth)_
- **Response:**
  ```json
  [
    {
      "subtotal": number,
      "shipmentid": "string",
      "date": "ISODate",
      "items": [
        {
          "title": "string",
          "category": "string",
          "price": number,
          "quantity": number,
          "_id": "string"
        }
      ]
    }
  ]
  ```

## Example Request (using curl)

**Get Delivery Price:**
```bash
curl -X POST http://localhost:5000/get-delivery-price \
  -H "Content-Type: application/json" \
  -d '{"pickup_postcode":"110001","delivery_postcode":"560001"}'
```

**Vendor Sales (with JWT):**
```bash
curl -X POST http://localhost:5000/vendor-sales \
  -H "Authorization: Bearer <your_jwt_token>"
```

## Notes
- All endpoints return JSON responses.
- For vendor-specific endpoints, authentication is required. Pass the JWT token in the `Authorization` header.
- Shiprocket API credentials must be valid for shipping-related endpoints to work.

---
For more details, refer to the codebase or contact the maintainer.

## 📜 License

This project is licensed under the [MIT License](LICENSE).