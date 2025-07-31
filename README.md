# 📚 Online Bookstore API

An online bookstore backend built with Node.js, Express, and MongoDB using Mongoose. This API allows users to register, browse books by category or author, add items to their cart, place orders, and write reviews.

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JavaScript (ES6+)

---

## 🚀 Features

- User registration & login
- Book browsing & filtering by category or author
- Shopping cart (stored in user document)
- Order placement with order items
- Review and rating system
- Admin role support
- Timestamps for all documents

---

## 🧩 Data Models

### 🧑‍💻 User
```js
{
  username: String,
  email: String (lowercased, unique),
  password: String,
  address: String,
  phone: String,
  profilePicture: String,
  dateOfBirth: Date,
  role: "user" | "admin",
  gender: "male" | "female",
  cart: [
    {
      book: ObjectId (Book),
      quantity: Number (min: 1)
    }
  ]
}
```

### 📖 Book
```js
{
  title: String,
  author: ObjectId (Author),
  category: [ObjectId (Category)],
  publishedDate: Date,
  summary: String,
  coverImage: String,
  price: Number,
  stock: Number,
  averageRating: Number (default: 0)
}
```

### 🖋️ Author
```js
{
  name: String,
  bio: String,
  dateOfBirth: Date,
  nationality: String,
  profilePicture: String
}
```

### 🗂️ Category
```js
{
  name: String (unique),
  description: String
}
```

### ⭐ Review
```js
{
  book: ObjectId (Book),
  user: ObjectId (User),
  rating: Number (1-5),
  comment: String
}
```

### 📦 OrderItem
```js
{
  order: ObjectId (Order),
  book: ObjectId (Book),
  quantity: Number,
  price: Number
}
```

### 🧾 Order
```js
{
  user: ObjectId (User),
  items: [ObjectId (OrderItem)],
  totalAmount: Number,
  status: "pending" | "shipped" | "delivered" | "cancelled",
  shippingAddress: String
}
```

---

## 📁 Folder Structure (Suggested)

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
│   └── (Define route files here)
│
├── controllers/
│   └── (Business logic)
│
├── middlewares/
│   └── auth.js
│
├── .env
├── server.js
└── README.md
```

---

## 🛠️ Setup & Run

### 1. Clone the repository
```bash
git clone https://github.com/AhmedElbassuony/Library-Store.git
cd Library-Store
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
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

- Recommendation system
- Wishlist functionality
- Book search and pagination
- Email notifications
- Payment integration (e.g. Stripe)

---

## 📝 License

MIT © Ahmed Elbassuony