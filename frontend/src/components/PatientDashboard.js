import React, { useState, useEffect } from "react";
import { doctorAPI, appointmentAPI } from "../services/api";
import Navbar from "./Navbar";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("book");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAllDoctors();
      setDoctors(response.data.doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getPatientAppointments();
      setAppointments(response.data.appointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedDoctor || !appointmentDate || !timeSlot) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await appointmentAPI.bookAppointment({
        doctorId: selectedDoctor,
        appointmentDate,
        timeSlot,
        reason,
      });

      setSuccess("Appointment booked successfully!");
      setSelectedDoctor("");
      setAppointmentDate("");
      setTimeSlot("");
      setReason("");
      fetchAppointments();

      setTimeout(() => setActiveTab("appointments"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book appointment");
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await appointmentAPI.cancelAppointment(id);
        fetchAppointments();
        setSuccess("Appointment cancelled successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to cancel appointment");
      }
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.pending;
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Patient Dashboard
          </h1>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("book")}
              className={`px-6 py-2 font-semibold rounded-lg transition ${
                activeTab === "book"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-6 py-2 font-semibold rounded-lg transition ${
                activeTab === "appointments"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              My Appointments
            </button>
          </div>

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

          {activeTab === "book" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Select Doctor
                    </label>
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.userId?.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Reason (Optional)
                    </label>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Describe your symptoms..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </form>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

              {appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No appointments found
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold">
                          Doctor
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Specialization
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Date & Time
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Reason
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((apt) => (
                        <tr key={apt._id} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">
                            {apt.doctorId.userId?.name}
                          </td>
                          <td className="px-4 py-2">
                            {apt.doctorId.specialization}
                          </td>
                          <td className="px-4 py-2">
                            {new Date(apt.appointmentDate).toLocaleDateString()}{" "}
                            at {apt.timeSlot}
                          </td>
                          <td className="px-4 py-2">{apt.reason || "-"}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(apt.status)}`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            {apt.status !== "cancelled" &&
                              apt.status !== "completed" && (
                                <button
                                  onClick={() =>
                                    handleCancelAppointment(apt._id)
                                  }
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                  Cancel
                                </button>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
