import React, { useState, useEffect } from "react";
import { authAPI, doctorAPI, appointmentAPI } from "../services/api";
import Navbar from "./Navbar";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add doctor form states
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "General",
    experience: 0,
    consultationFee: 500,
  });

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "doctors") {
      fetchDoctors();
    } else if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await authAPI.getUsers();
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAllDoctors();
      setDoctors(response.data.doctors);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch doctors");
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getAllAppointments();
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await doctorAPI.addDoctor(newDoctor);
      setSuccess("Doctor added successfully");
      setShowAddDoctorForm(false);
      setNewDoctor({
        name: "",
        email: "",
        password: "",
        specialization: "General",
        experience: 0,
        consultationFee: 500,
      });
      fetchDoctors();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add doctor");
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await doctorAPI.deleteDoctor(id);
        setSuccess("Doctor deleted successfully");
        fetchDoctors();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete doctor");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Admin Dashboard
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="flex gap-4 mb-8 overflow-x-auto">
            {["users", "doctors", "appointments"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setLoading(true);
                }}
                className={`px-6 py-2 font-semibold rounded-lg transition whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">All Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Role
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-700"
                                : user.role === "doctor"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-2">{user.phone || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Doctors</h2>
                <button
                  onClick={() => setShowAddDoctorForm(!showAddDoctorForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {showAddDoctorForm ? "Cancel" : "Add Doctor"}
                </button>
              </div>

              {showAddDoctorForm && (
                <form
                  onSubmit={handleAddDoctor}
                  className="mb-8 p-6 bg-gray-50 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">Add New Doctor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newDoctor.name}
                      onChange={(e) =>
                        setNewDoctor({ ...newDoctor, name: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newDoctor.email}
                      onChange={(e) =>
                        setNewDoctor({ ...newDoctor, email: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={newDoctor.password}
                      onChange={(e) =>
                        setNewDoctor({ ...newDoctor, password: e.target.value })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                    <select
                      value={newDoctor.specialization}
                      onChange={(e) =>
                        setNewDoctor({
                          ...newDoctor,
                          specialization: e.target.value,
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="General">General</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="ENT">ENT</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Experience (years)"
                      value={newDoctor.experience}
                      onChange={(e) =>
                        setNewDoctor({
                          ...newDoctor,
                          experience: parseInt(e.target.value),
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Consultation Fee"
                      value={newDoctor.consultationFee}
                      onChange={(e) =>
                        setNewDoctor({
                          ...newDoctor,
                          consultationFee: parseInt(e.target.value),
                        })
                      }
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Add Doctor
                  </button>
                </form>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Specialization
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Experience
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">Fee</th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr
                        key={doctor._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{doctor.userId?.name}</td>
                        <td className="px-4 py-2">{doctor.specialization}</td>
                        <td className="px-4 py-2">{doctor.experience} years</td>
                        <td className="px-4 py-2">${doctor.consultationFee}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleDeleteDoctor(doctor._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">All Appointments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Patient
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Doctor
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Date & Time
                      </th>
                      <th className="px-4 py-2 text-left font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt._id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{apt.patientId?.name}</td>
                        <td className="px-4 py-2">
                          {apt.doctorId?.userId?.name}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(apt.appointmentDate).toLocaleDateString()}{" "}
                          at {apt.timeSlot}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              apt.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : apt.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : apt.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
