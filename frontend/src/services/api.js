import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  getUsers: () => api.get("/auth/users"),
};

// Doctor APIs
export const doctorAPI = {
  getAllDoctors: () => api.get("/doctors"),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
  getDoctorProfile: () => api.get("/doctors/profile/me"),
  updateDoctorProfile: (data) => api.put("/doctors/profile", data),
  addDoctor: (data) => api.post("/doctors", data),
  deleteDoctor: (id) => api.delete(`/doctors/${id}`),
  getDoctorsBySpecialization: (specialization) =>
    api.get("/doctors/specialization", { params: { specialization } }),
};

// Appointment APIs
export const appointmentAPI = {
  bookAppointment: (data) => api.post("/appointments", data),
  getPatientAppointments: () => api.get("/appointments/patient"),
  getDoctorAppointments: () => api.get("/appointments/doctor"),
  getAllAppointments: () => api.get("/appointments/admin/all"),
  getAppointmentById: (id) => api.get(`/appointments/${id}`),
  updateAppointmentStatus: (id, data) =>
    api.put(`/appointments/${id}/status`, data),
  cancelAppointment: (id) => api.put(`/appointments/${id}/cancel`),
};

// User APIs
export const userAPI = {
  getCurrentUser: () => api.get("/users/me"),
  updateProfile: (data) => api.put("/users/me", data),
};

export default api;
