const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  getAppointmentById,
} = require("../controllers/appointmentController");
const {
  authMiddleware,
  roleMiddleware,
} = require("../middleware/authMiddleware");

// Patient routes
router.post("/", authMiddleware, roleMiddleware("patient"), bookAppointment);
router.get(
  "/patient",
  authMiddleware,
  roleMiddleware("patient"),
  getPatientAppointments,
);
router.put(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware("patient"),
  cancelAppointment,
);

// Doctor routes
router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("doctor"),
  getDoctorAppointments,
);
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("doctor", "admin"),
  updateAppointmentStatus,
);

// Admin routes
router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAppointments,
);

// General
router.get("/:id", authMiddleware, getAppointmentById);

module.exports = router;
