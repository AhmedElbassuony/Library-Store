# 📚 Online Library Store

A full-stack web application that allows users to browse, search, and purchase books online. It includes user authentication, product management, shopping cart functionality, and an admin dashboard.

---

## 🔧 Tech Stack
- **Frontend**: Angular
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT

---

## 👥 User Roles
1. **User**
   - Register / Login
   - View books
   - Search/filter books by author, category, title
   - Add/remove items from cart
   - View order history

2. **Admin**
   - Manage books (Create, Update, Delete)
   - View all users
   - Manage orders

---

## 🗂️ Main Features

### ✅ User Side
- 📖 **Book Browsing**: Paginated listing of all books
- 🔍 **Search & Filter**: By author, title, and category
- 🛒 **Shopping Cart**: Add/remove books, checkout
- 👤 **Profile**: View order history and user details

### ✅ Admin Side
- 📦 **Book Management**: Add, update, or delete books
- 📊 **Order Management**: View all user orders and update statuses
- 👥 **User Management**: View and manage registered users

---

## 📁 Project Structure

```
backend/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── middleware/
  └── server.js

frontend/
  ├── src/
      ├── app/
          ├── components/
          ├── pages/
          ├── services/
          └── app.module.ts
```

---

## 🧪 Sample APIs (Express)

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get JWT
- `GET /api/books` – Get all books
- `GET /api/books/search?q=title` – Search books
- `POST /api/cart` – Add book to cart
- `GET /api/admin/orders` – Get all orders (admin only)

---

## 🔐 Authentication & Authorization

- Uses JWT to protect routes
- Role-based access for admin vs. user

---

## 🧑‍💻 Future Improvements
- Recommendation system
- Book ratings and reviews
- Wishlist / Favorites
- Real payment gateway integration (currently mock checkout)