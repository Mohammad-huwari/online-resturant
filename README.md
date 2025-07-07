online-resturant
  🍽️ Online Restaurant API

A fully functional RESTful back-end API for an online restaurant system built with **Node.js**, **Express**, and **MongoDB**.

Users can sign up, log in, browse the menu, create orders, and manage their accounts securely.  
Admins can manage users, menu items, and all orders with full role-based access control.

---

 🚀 Features

- ✅ JWT Authentication & Role-Based Authorization
- ✅ Sign Up, Log In, Protect & Restrict Routes
- ✅ Forgot Password & Reset Password Flow
- ✅ CRUD operations for Menu Items (Admin only)
- ✅ Orders with multiple items, quantities, total calculation
- ✅ Get My Orders (User) & Get All Orders (Admin)
- ✅ Update Order Status (Admin only)
- ✅ Delete Order (Admin or Owner)
- ✅ Mongoose population for User & MenuItem relations
- ✅ Input validation & ID format checks
- ✅ Environment Variables via `dotenv`

---

🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT & bcryptjs
- Validator

---

⚙️ Getting Started

### 1️⃣ Clone the repo
⚡ Note: Don’t forget to create your .env file with your database URI and JWT secret before running.
```bash
git clone https://github.com/Mohammad-huwari/online-restaurant.git
cd online-restaurant
npm install
npm run dev


