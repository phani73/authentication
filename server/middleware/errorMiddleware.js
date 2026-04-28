// middleware/errorMiddleware.js

// 🔍 Handle 404 routes
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// ⚠️ Global Error Handler
const errorHandler = (err, req, res, next) => {
  // Default status code
  let statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Internal Server Error";

  // 🧠 Handle invalid MongoDB ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // 🔐 Handle duplicate key error (MongoDB)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // 🔑 Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // 📝 Log error (helpful in dev)
  if (process.env.NODE_ENV !== "production") {
    console.error("❌ ERROR:", err);
  }

  // 📤 Response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export { notFound, errorHandler };
