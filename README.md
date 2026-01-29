# Doctor Appointment Management System

A complete MERN (MongoDB, Express.js, React.js, Node.js) full-stack web application for managing doctor appointments online. Patients can book appointments with doctors, doctors can manage their appointments, and admins can oversee the entire system.

## 🎯 Project Overview

**Doctor Appointment Management System** एक full-stack web application है जो patients को doctors के साथ online appointment book करने की facility देता है। System में secure user authentication, role-based access (Patient/Doctor/Admin), appointment scheduling, profile management और admin dashboard features available हैं।

- **Patients** signup/login करके doctors की list देख सकते हैं, appointment book कर सकते हैं और appointment status track कर सकते हैं।
- **Doctors** अपने appointments manage कर सकते हैं, उन्हें approve/reject कर सकते हैं।
- **Admin** doctors को add/remove कर सकता है और पूरे system को control कर सकता है।

## 🚀 Features

### Patient Features

- User registration and login
- Browse available doctors
- Filter doctors by specialization
- Book appointments with doctors
- View appointment status
- Cancel appointments
- Update profile

### Doctor Features

- Complete doctor profile with specialization
- View assigned appointments
- Approve/Reject appointments
- Mark appointments as completed
- Add notes to appointments
- Manage availability

### Admin Features

- Add new doctors
- Delete doctors
- View all users
- Monitor all appointments
- System overview and statistics

### Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Protected API endpoints
- Secure session management

## 🏗️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend

- **React.js** - UI library
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

### Tools & Technologies

- **Git** - Version control
- **npm** - Package manager
- **REST API** - API architecture

## 📁 Project Structure

```
DoctorAppointment/
├── backend/
│   ├── models/
│   │   ├── User.js           # User model (Patient, Doctor, Admin)
│   │   ├── Doctor.js         # Doctor profile model
│   │   └── Appointment.js    # Appointment model
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── doctorController.js     # Doctor management
│   │   └── appointmentController.js # Appointment handling
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   ├── doctorRoutes.js     # Doctor endpoints
│   │   ├── appointmentRoutes.js # Appointment endpoints
│   │   └── userRoutes.js       # User endpoints
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification & authorization
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── server.js              # Express server setup
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables
│   └── README.md              # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js                # Login page
│   │   │   ├── Signup.js               # Registration page
│   │   │   ├── PatientDashboard.js     # Patient dashboard
│   │   │   ├── DoctorDashboard.js      # Doctor dashboard
│   │   │   ├── AdminDashboard.js       # Admin dashboard
│   │   │   ├── ProtectedRoute.js       # Protected routes wrapper
│   │   │   └── Navbar.js               # Navigation bar
│   │   ├── context/
│   │   │   └── AuthContext.js          # Auth context & hooks
│   │   ├── services/
│   │   │   └── api.js                  # Axios API calls
│   │   ├── App.js                      # Main App component
│   │   ├── index.js                    # React entry point
│   │   └── index.css                   # Global styles
│   ├── public/
│   │   └── index.html                  # HTML template
│   ├── package.json                    # Frontend dependencies
│   ├── tailwind.config.js              # Tailwind configuration
│   ├── .env.example                    # Environment variables
│   └── README.md                       # Frontend documentation
│
└── README.md                           # Project documentation
```

## 📚 Database Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (patient/doctor/admin),
  phone: String,
  createdAt: Date
}
```

### Doctor Model

```javascript
{
  userId: ObjectId (User reference),
  specialization: String,
  experience: Number,
  availability: Boolean,
  consultationFee: Number,
  about: String,
  createdAt: Date
}
```

### Appointment Model

```javascript
{
  patientId: ObjectId (User reference),
  doctorId: ObjectId (Doctor reference),
  appointmentDate: Date,
  timeSlot: String,
  reason: String,
  status: String (pending/approved/rejected/completed/cancelled),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # User login
GET    /api/auth/profile           # Get user profile (Protected)
GET    /api/auth/users             # Get all users (Admin)
```

### Doctors

```
GET    /api/doctors                # Get all doctors
GET    /api/doctors/:id            # Get doctor by ID
GET    /api/doctors/specialization # Get doctors by specialization
GET    /api/doctors/profile/me     # Get doctor profile (Protected)
PUT    /api/doctors/profile        # Update doctor profile (Protected)
POST   /api/doctors                # Add doctor (Admin)
DELETE /api/doctors/:id            # Delete doctor (Admin)
```

### Appointments

```
POST   /api/appointments           # Book appointment (Patient)
GET    /api/appointments/patient   # Get patient appointments (Protected)
GET    /api/appointments/doctor    # Get doctor appointments (Protected)
GET    /api/appointments/admin/all # Get all appointments (Admin)
GET    /api/appointments/:id       # Get appointment by ID (Protected)
PUT    /api/appointments/:id/status # Update status (Doctor/Admin)
PUT    /api/appointments/:id/cancel # Cancel appointment (Patient)
```

### Users

```
GET    /api/users/me               # Get current user (Protected)
PUT    /api/users/me               # Update profile (Protected)
```

## 🔒 Authentication & Authorization

The system uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** - User provides credentials
2. **Token Generation** - Server returns JWT token
3. **Token Storage** - Token stored in localStorage
4. **Request Interception** - Token sent with every API request
5. **Token Verification** - Server verifies token validity
6. **Role-based Access** - Routes protected by user role

### Token Structure

```
Header: Authorization: Bearer <jwt_token>
Payload: { userId, role, expiresIn: 7d }
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

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

4. Configure `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/doctor-appointment
JWT_SECRET=your_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

5. Start the server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

4. Configure `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the application:

```bash
npm start
```

Application will open at `http://localhost:3000`

## 🧪 Testing the Application

### Test Accounts

#### Admin

- Email: `admin@example.com`
- Password: `password123`

#### Doctor

- Email: `doctor@example.com`
- Password: `password123`

#### Patient

- Email: `patient@example.com`
- Password: `password123`

_Note: You can create test accounts by signing up_

### Test Workflow

1. **Patient** signs up and logs in
2. **Patient** books an appointment with a doctor
3. **Doctor** logs in and views the appointment
4. **Doctor** approves/rejects the appointment
5. **Admin** can see all appointments and manage doctors

## 📖 How to Use

### For Patients

1. Sign up with your email and password
2. Login to your account
3. Go to "Book Appointment" tab
4. Select a doctor from the list
5. Choose your preferred date and time
6. Add appointment reason (optional)
7. Click "Book Appointment"
8. Go to "My Appointments" to view status
9. You can cancel pending appointments

### For Doctors

1. Sign up as a doctor (or admin adds you)
2. Login to your account
3. View all your appointments in the dashboard
4. Click on an appointment to update its status
5. Select status: Approve, Reject, or Complete
6. Add notes if needed
7. Click Update

### For Admins

1. Login with admin account
2. Go to "Users" tab to see all registered users
3. Go to "Doctors" tab to:
   - View all doctors
   - Add new doctors with specialization
   - Delete doctors
4. Go to "Appointments" tab to monitor all appointments

## 🎨 UI Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Tailwind CSS** - Modern and clean styling
- **User-friendly Interface** - Intuitive navigation
- **Form Validation** - Client-side validation
- **Error Handling** - Clear error messages
- **Loading States** - Loading indicators
- **Status Badges** - Visual status indicators

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ CORS enabled
- ✅ Input validation
- ✅ Token expiration (7 days)
- ✅ Secure password storage

## 📝 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/doctor-appointment
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Error Handling

The application handles various error scenarios:

- Invalid credentials
- Duplicate email registration
- Unauthorized access
- Invalid token
- Server errors
- Network errors
- Form validation errors

## 📦 Dependencies

### Backend

- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors

### Frontend

- react
- react-router-dom
- axios
- tailwindcss

See `package.json` files for complete dependency lists.

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. Prepare MongoDB Atlas connection string
2. Set environment variables
3. Deploy to hosting service
4. Update frontend API URL

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables for API URL

## 📞 Support

For issues or questions:

1. Check the README files in backend and frontend directories
2. Review API documentation
3. Check console for error messages

## 🤝 Contributing

Feel free to fork this project and submit pull requests.

## 📄 License

ISC

## 👨‍💻 Author

Doctor Appointment Management System

---

## 🎓 Learning Outcomes

By building this project, you'll learn:

- Full-stack MERN development
- JWT authentication implementation
- Role-based authorization
- REST API design
- Mongoose schemas and models
- React hooks and Context API
- Tailwind CSS styling
- Form validation
- Error handling
- Database design

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [JWT Introduction](https://jwt.io/introduction)

---

**Happy Coding! 🎉**
