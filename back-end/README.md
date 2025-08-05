# 📚 Online Bookstore API

An online bookstore backend built with Node.js, Express, and MongoDB using Mongoose. This API allows users to register, browse books by category or author, manage their shopping cart, place orders, and write reviews.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JavaScript (ES6+)

---

## 🚀 Features

- User registration and authentication
- Book browsing by category and author
- Shopping cart per user
- Order placement with order items
- Review and rating system
- Role-based access (user/admin)
- Timestamps for all documents

---

## 📁 Folder Structure

```
project/
│
├── models/
│   ├── Author.js
│   ├── Book.js
│   ├── Category.js
│   ├── Order.js
│   ├── OrderItem.js
│   ├── Review.js
│   └── User.js
│
├── routes/
│   ├── userRouter.js
│   ├── bookRouter.js
│   └── authorRouter.js
│
├── controllers/
│   └── (Business logic)
│
├── utils/middleware/
│   ├── index.js
│
├── .env
├── server.js
└── README.md
```

---

## 🧩 Data Models

### 🧑‍💻 User

```js
{
  username,
  email,
  password,
  address,
  phone,
  profilePicture,
  dateOfBirth,
  gender,
  role: "user" | "admin",
  cart: [
    {
      book: ObjectId,
      quantity: Number
    }
  ]
}
```

### 📖 Book

```js
{
  title,
  author: ObjectId,
  category: [ObjectId],
  publishedDate,
  summary,
  coverImage,
  price,
  stock,
  averageRating
}
```

### 🖋️ Author

```js
{
  name,
  bio,
  dateOfBirth,
  nationality,
  profilePicture
}
```

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint         | Access    | Description         |
|--------|------------------|-----------|---------------------|
| POST   | `/users`         | Public    | Register new user   |
| POST   | `/users/signin`  | Public    | User login          |

---

### 👤 Users

| Method | Endpoint           | Access          | Description               |
|--------|--------------------|------------------|---------------------------|
| GET    | `/users`           | Admin            | Get all users             |
| GET    | `/users/:id`       | Auth + HasAccess | Get user by ID            |
| PUT    | `/users/:id`       | Auth + HasAccess | Update user profile       |
| DELETE | `/users/:id`       | Auth + HasAccess | Delete user               |

---

### 🛒 Cart

| Method | Endpoint                  | Access    | Description                              |
|--------|---------------------------|-----------|------------------------------------------|
| GET    | `/users/cart`             | Authenticated | Get user cart                           |
| POST   | `/users/cart`             | Authenticated | Replace full cart                       |
| PUT    | `/users/cart`             | Authenticated | Add or update one book in cart         |
| DELETE | `/users/cart`             | Authenticated | Clear the entire cart                  |
| DELETE | `/users/cart/:bookId`     | Authenticated | Remove a specific book from cart       |

---

### 📚 Books

| Method | Endpoint                        | Access    | Description                                |
|--------|----------------------------------|-----------|--------------------------------------------|
| GET    | `/books`                         | Authenticated | Get all books                          |
| GET    | `/books/:id`                     | Authenticated | Get book by ID                         |
| GET    | `/books/author/:authorId`        | Authenticated | Get books by author                   |
| GET    | `/books/category/:categoryId`    | Authenticated | Get books by category                |
| POST   | `/books`                         | Admin        | Create a new book                        |
| PUT    | `/books/:id`                     | Admin        | Update existing book                     |
| DELETE | `/books/:id`                     | Admin        | Delete book                              |

---

### 🖋️ Authors

| Method | Endpoint       | Access    | Description              |
|--------|----------------|-----------|--------------------------|
| GET    | `/authors`     | Authenticated | Get all authors      |
| GET    | `/authors/:id` | Authenticated | Get author by ID     |
| POST   | `/authors`     | Admin        | Create a new author     |
| PUT    | `/authors/:id` | Admin        | Update author           |
| DELETE | `/authors/:id` | Admin        | Delete author           |

---

## ⚙️ Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/AhmedElbassuony/Library-Store.git
cd Library-Store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=yourSecretKey
```

### 4. Run the server

```bash
npm run dev
```

---

## 📬 Future Improvements

- Book search and filtering
- Pagination
- Wishlist
- Email notifications
- Payment integration (e.g. Stripe)
- Full Order API
- Review endpoints

---

## 📝 License

MIT © Ahmed Elbassuony