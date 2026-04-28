# 🔒 Authentication System - Simple, Secure User Access Made Easy

## 🚀 Getting Started

Welcome to the Authentication System! This application provides a modern and secure way for users to register, log in, and manage their profiles. It is built using Node.js, Express, MongoDB, and JWT authentication.

---

## 📋 Features

* ✅ User Registration
* ✅ User Login
* ✅ Profile Management
* ✅ JWT Authentication (HTTP-only cookies)
* ✅ Secure Backend with MongoDB

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/phani73/authentication.git
cd authentication
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the **server folder**:

```env
MONGO_URI=mongodb+srv://phani:YOUR_PASSWORD@phani.el06ecq.mongodb.net/yourDB
PORT=5000
JWT_SECRET=yourSecretKey
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

---

### 4️⃣ Run the Application

#### Start Backend

```bash
cd server
npm run dev
```

#### Start Frontend

```bash
cd client
npm start
```

---

## 🌐 Application URLs

* Frontend: http://localhost:3000
* Backend: http://localhost:5000

---

## 🛠️ Tech Stack

* Frontend: React.js
* Backend: Node.js + Express
* Database: MongoDB Atlas
* Authentication: JWT + HTTP-only Cookies

---

## 🔐 How It Works

1. User registers with email & password
2. Password is securely hashed
3. JWT token is generated on login
4. Token is stored in HTTP-only cookies
5. Protected routes verify user authentication

---

## 🧪 Troubleshooting

### ❌ MongoDB Connection Error

* Check your `MONGO_URI`
* Ensure IP is allowed in MongoDB Atlas (`0.0.0.0/0`)

### ❌ Login Issues

* Verify credentials
* Check JWT_SECRET consistency

### ❌ CORS Errors

* Ensure `CLIENT_URL` matches frontend URL

---

## 📞 Support

If you face any issues, open an issue here:
👉 https://github.com/phani73/authentication/issues

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make changes
4. Submit a Pull Request

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 Author

**Phani Varma**
GitHub: https://github.com/phani73
