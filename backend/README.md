# Doctor Appointment System - Backend

Backend API for the Doctor Appointment Management System built with Node.js, Express.js, and MongoDB.

## Features

- User Authentication with JWT
- Role-based Authorization (Patient, Doctor, Admin)
- Doctor Management
- Appointment Booking & Management
- Profile Management
- Secure Password Hashing with bcrypt

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/doctor-appointment
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/specialization?specialization=Cardiology` - Get doctors by specialization
- `GET /api/doctors/profile/me` - Get doctor profile (Protected - Doctor only)
- `PUT /api/doctors/profile` - Update doctor profile (Protected - Doctor only)
- `POST /api/doctors` - Add new doctor (Protected - Admin only)
- `DELETE /api/doctors/:id` - Delete doctor (Protected - Admin only)

### Appointments

- `POST /api/appointments` - Book appointment (Protected - Patient only)
- `GET /api/appointments/patient` - Get patient appointments (Protected - Patient)
- `GET /api/appointments/doctor` - Get doctor appointments (Protected - Doctor)
- `GET /api/appointments/admin/all` - Get all appointments (Protected - Admin)
- `GET /api/appointments/:id` - Get appointment by ID (Protected)
- `PUT /api/appointments/:id/status` - Update appointment status (Protected - Doctor/Admin)
- `PUT /api/appointments/:id/cancel` - Cancel appointment (Protected - Patient)

### Users

- `GET /api/users/me` - Get current user (Protected)
- `PUT /api/users/me` - Update user profile (Protected)
- `GET /api/auth/users` - Get all users (Protected - Admin)

## Project Structure

```
backend/
├── models/
│   ├── User.js           - User model
│   ├── Doctor.js         - Doctor model
│   └── Appointment.js    - Appointment model
├── controllers/
│   ├── authController.js       - Authentication logic
│   ├── doctorController.js     - Doctor management logic
│   └── appointmentController.js - Appointment logic
├── routes/
│   ├── authRoutes.js       - Auth endpoints
│   ├── doctorRoutes.js     - Doctor endpoints
│   ├── appointmentRoutes.js - Appointment endpoints
│   └── userRoutes.js       - User endpoints
├── middleware/
│   └── authMiddleware.js   - JWT verification & role checking
├── config/
│   └── db.js              - MongoDB connection
├── server.js              - Main server file
├── package.json           - Dependencies
└── .env.example           - Environment variables example
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## User Roles

- **Patient**: Can book appointments, view their appointments, update profile
- **Doctor**: Can view their appointments, approve/reject appointments, update profile
- **Admin**: Full access - manage doctors, users, and all appointments

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Environment Variables

```env
MONGODB_URI     - MongoDB connection string
JWT_SECRET      - Secret key for JWT tokens
PORT            - Server port (default: 5000)
NODE_ENV        - Environment (development/production)
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC
