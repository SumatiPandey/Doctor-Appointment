const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: [true, "Please provide specialization"],
    enum: [
      "Cardiology",
      "Dermatology",
      "ENT",
      "Orthopedics",
      "Pediatrics",
      "General",
    ],
    default: "General",
  },
  experience: {
    type: Number,
    default: 0,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  consultationFee: {
    type: Number,
    default: 500,
  },
  about: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
