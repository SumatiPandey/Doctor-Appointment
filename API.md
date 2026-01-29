# API Documentation

## 📡 Base URL

```
http://localhost:5000/api
```

## 🔑 Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

---

## 👤 Authentication Endpoints

### 1. Register User

```
POST /auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

---

### 2. Login User

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

---

### 3. Get User Profile

```
GET /auth/profile
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "9876543210"
  }
}
```

---

### 4. Get All Users (Admin Only)

```
GET /auth/users
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "count": 5,
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient"
    },
    ...
  ]
}
```

---

## 👨‍⚕️ Doctor Endpoints

### 1. Get All Doctors

```
GET /doctors
```

**Response (200):**

```json
{
  "count": 3,
  "doctors": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Dr. Smith",
        "email": "smith@example.com",
        "phone": "9876543210"
      },
      "specialization": "Cardiology",
      "experience": 10,
      "availability": true,
      "consultationFee": 500,
      "about": "Expert cardiologist"
    },
    ...
  ]
}
```

---

### 2. Get Doctor by ID

```
GET /doctors/:id
```

**Response (200):**

```json
{
  "doctor": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": { ... },
    "specialization": "Cardiology",
    "experience": 10,
    "availability": true,
    "consultationFee": 500
  }
}
```

---

### 3. Get Doctors by Specialization

```
GET /doctors/specialization?specialization=Cardiology
```

**Response (200):**

```json
{
  "count": 2,
  "doctors": [ ... ]
}
```

**Specializations:**

- General
- Cardiology
- Dermatology
- ENT
- Orthopedics
- Pediatrics

---

### 4. Get Doctor Profile (Current Doctor)

```
GET /doctors/profile/me
Authorization: Bearer <doctor_token>
```

**Response (200):**

```json
{
  "doctor": { ... }
}
```

---

### 5. Update Doctor Profile

```
PUT /doctors/profile
Authorization: Bearer <doctor_token>
```

**Request Body:**

```json
{
  "specialization": "Cardiology",
  "experience": 12,
  "consultationFee": 600,
  "about": "Senior cardiologist",
  "availability": true
}
```

**Response (200):**

```json
{
  "message": "Doctor profile updated successfully",
  "doctor": { ... }
}
```

---

### 6. Add Doctor (Admin Only)

```
POST /doctors
Authorization: Bearer <admin_token>
```

**Request Body:**

```json
{
  "name": "Dr. Johnson",
  "email": "johnson@example.com",
  "password": "password123",
  "specialization": "ENT",
  "experience": 8,
  "consultationFee": 400
}
```

**Response (201):**

```json
{
  "message": "Doctor added successfully",
  "doctor": { ... }
}
```

---

### 7. Delete Doctor (Admin Only)

```
DELETE /doctors/:id
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "message": "Doctor deleted successfully"
}
```

---

## 📅 Appointment Endpoints

### 1. Book Appointment (Patient)

```
POST /appointments
Authorization: Bearer <patient_token>
```

**Request Body:**

```json
{
  "doctorId": "507f1f77bcf86cd799439012",
  "appointmentDate": "2024-02-15",
  "timeSlot": "10:00 AM",
  "reason": "Regular checkup"
}
```

**Response (201):**

```json
{
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "507f1f77bcf86cd799439013",
    "patientId": "507f1f77bcf86cd799439011",
    "doctorId": { ... },
    "appointmentDate": "2024-02-15T00:00:00.000Z",
    "timeSlot": "10:00 AM",
    "reason": "Regular checkup",
    "status": "pending",
    "notes": "",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Get Patient Appointments

```
GET /appointments/patient
Authorization: Bearer <patient_token>
```

**Response (200):**

```json
{
  "count": 2,
  "appointments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "patientId": { ... },
      "doctorId": { ... },
      "appointmentDate": "2024-02-15",
      "timeSlot": "10:00 AM",
      "reason": "Regular checkup",
      "status": "pending",
      "notes": ""
    },
    ...
  ]
}
```

---

### 3. Get Doctor Appointments

```
GET /appointments/doctor
Authorization: Bearer <doctor_token>
```

**Response (200):**

```json
{
  "count": 5,
  "appointments": [ ... ]
}
```

---

### 4. Get All Appointments (Admin Only)

```
GET /appointments/admin/all
Authorization: Bearer <admin_token>
```

**Response (200):**

```json
{
  "count": 15,
  "appointments": [ ... ]
}
```

---

### 5. Get Appointment by ID

```
GET /appointments/:id
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "appointment": { ... }
}
```

---

### 6. Update Appointment Status (Doctor/Admin)

```
PUT /appointments/:id/status
Authorization: Bearer <doctor_or_admin_token>
```

**Request Body:**

```json
{
  "status": "approved",
  "notes": "Patient should avoid heavy meals"
}
```

**Status Options:**

- pending
- approved
- rejected
- completed
- cancelled

**Response (200):**

```json
{
  "message": "Appointment updated successfully",
  "appointment": { ... }
}
```

---

### 7. Cancel Appointment (Patient)

```
PUT /appointments/:id/cancel
Authorization: Bearer <patient_token>
```

**Response (200):**

```json
{
  "message": "Appointment cancelled successfully"
}
```

---

## 👥 User Endpoints

### 1. Get Current User

```
GET /users/me
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "phone": "9876543210"
  }
}
```

---

### 2. Update User Profile

```
PUT /users/me
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "name": "John Updated",
  "phone": "9876543210"
}
```

**Response (200):**

```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## 🔍 Time Slots

Available appointment time slots:

```
9:00 AM
10:00 AM
11:00 AM
2:00 PM
3:00 PM
4:00 PM
```

---

## 📊 Appointment Status Flow

```
booking → pending → [approved/rejected]
                        ↓
                    approved → completed
                       ↓
                    cancelled (by patient)
```

---

## ❌ Error Responses

### 400 - Bad Request

```json
{
  "message": "Please provide all required fields"
}
```

### 401 - Unauthorized

```json
{
  "message": "No authentication token, access denied"
}
```

### 403 - Forbidden

```json
{
  "message": "Access denied. Insufficient permissions."
}
```

### 404 - Not Found

```json
{
  "message": "Resource not found"
}
```

### 500 - Server Error

```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## 🔄 Rate Limiting

Currently not implemented. Consider adding for production.

---

## 🔐 Security Notes

1. **Token Expiration:** 7 days
2. **Password:** Minimum 6 characters (hashed with bcrypt)
3. **CORS:** Enabled for localhost
4. **Headers:** Content-Type: application/json

---

## 🧪 Testing with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "patient"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Doctors

```bash
curl http://localhost:5000/api/doctors
```

### Get Profile (with token)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/profile
```

---

## 📝 API Versioning

Current API version: v1
All endpoints: `/api/...`

Future versions may use: `/api/v2/...`

---

## 🚀 Testing Tools

- **Postman** - https://www.postman.com/
- **Thunder Client** - VS Code Extension
- **REST Client** - VS Code Extension
- **cURL** - Command line

---

## 📞 Support

For API issues:

1. Check request/response format
2. Verify token in Authorization header
3. Check console logs on server
4. Review this documentation
