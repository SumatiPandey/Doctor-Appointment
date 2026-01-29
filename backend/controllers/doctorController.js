const Doctor = require("../models/Doctor");
const User = require("../models/User");

// Get All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email phone");

    res.status(200).json({
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "name email phone",
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Doctor Profile (Current logged-in doctor)
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.userId }).populate(
      "userId",
      "name email phone",
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add Doctor (Admin only)
exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      consultationFee,
    } = req.body;

    // Create user with doctor role
    const user = new User({
      name,
      email,
      password,
      role: "doctor",
    });

    await user.save();

    // Create doctor profile
    const doctor = new Doctor({
      userId: user._id,
      specialization,
      experience,
      consultationFee,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Doctor Profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, consultationFee, about, availability } =
      req.body;

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.userId },
      { specialization, experience, consultationFee, about, availability },
      { new: true, runValidators: true },
    ).populate("userId", "name email phone");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.status(200).json({
      message: "Doctor profile updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Doctor (Admin only)
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Delete associated user
    await User.findByIdAndDelete(doctor.userId);

    res.status(200).json({
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Doctors by Specialization
exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.query;

    const query = specialization ? { specialization } : {};
    const doctors = await Doctor.find(query).populate(
      "userId",
      "name email phone",
    );

    res.status(200).json({
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
