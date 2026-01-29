const express = require("express");
const router = express.Router();
const {
  getAllDoctors,
  getDoctorById,
  getDoctorProfile,
  addDoctor,
  updateDoctorProfile,
  deleteDoctor,
  getDoctorsBySpecialization,
} = require("../controllers/doctorController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllDoctors);
router.get("/specialization", getDoctorsBySpecialization);
router.get("/:id", getDoctorById);

// Doctor routes
router.get(
  "/profile/me",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorProfile,
);
router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("doctor"),
  updateDoctorProfile,
);

// Admin routes
router.post("/", authMiddleware, roleMiddleware("admin"), addDoctor);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDoctor);

module.exports = router;
