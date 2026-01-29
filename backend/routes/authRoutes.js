const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  getAllUsers,
} = require("../controllers/authController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authMiddleware, getUserProfile);

// Admin routes
router.get("/users", authMiddleware, roleMiddleware("admin"), getAllUsers);

module.exports = router;
