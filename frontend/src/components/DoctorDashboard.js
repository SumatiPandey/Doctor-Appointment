import React, { useState, useEffect } from "react";
import { appointmentAPI, doctorAPI } from "../services/api";
import Navbar from "./Navbar";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getDoctorAppointments();
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedAppointment || !status) {
      setError("Please select status");
      return;
    }

    try {
      await appointmentAPI.updateAppointmentStatus(selectedAppointment._id, {
        status,
        notes,
      });

      setSuccess("Appointment updated successfully");
      setSelectedAppointment(null);
      setStatus("");
      setNotes("");
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update appointment");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      approved: "text-green-600 bg-green-100",
      rejected: "text-red-600 bg-red-100",
      completed: "text-blue-600 bg-blue-100",
      cancelled: "text-gray-600 bg-gray-100",
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
            Doctor Dashboard
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Your Appointments</h2>

                {appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No appointments
                  </p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div
                        key={apt._id}
                        className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setStatus(apt.status);
                          setNotes(apt.notes);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-lg">
                              {apt.patientId?.name}
                            </p>
                            <p className="text-gray-600">
                              {apt.patientId?.email}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              {new Date(
                                apt.appointmentDate,
                              ).toLocaleDateString()}{" "}
                              at {apt.timeSlot}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {apt.reason || "No reason provided"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(apt.status)}`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              {selectedAppointment && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    Update Appointment
                  </h2>

                  <div className="mb-4 p-4 bg-gray-50 rounded">
                    <p className="font-semibold">
                      {selectedAppointment.patientId?.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {new Date(
                        selectedAppointment.appointmentDate,
                      ).toLocaleDateString()}{" "}
                      at {selectedAppointment.timeSlot}
                    </p>
                  </div>

                  <form onSubmit={handleUpdateStatus} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approve</option>
                        <option value="rejected">Reject</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppointment(null);
                        setStatus("");
                        setNotes("");
                      }}
                      className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
