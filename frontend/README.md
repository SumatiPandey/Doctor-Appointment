# Doctor Appointment System - Frontend

React.js frontend for the Doctor Appointment Management System with Tailwind CSS styling.

## Features

- User Authentication (Login/Signup)
- Role-based Access (Patient, Doctor, Admin)
- Patient Dashboard - Book appointments, view status
- Doctor Dashboard - Manage appointments
- Admin Dashboard - Manage doctors and users
- Protected Routes with JWT
- Responsive Design with Tailwind CSS
- Error Handling
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

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

4. Update `.env` with backend URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode

```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.js                 - Login page
│   │   ├── Signup.js                - Registration page
│   │   ├── PatientDashboard.js      - Patient's main dashboard
│   │   ├── DoctorDashboard.js       - Doctor's main dashboard
│   │   ├── AdminDashboard.js        - Admin's main dashboard
│   │   ├── ProtectedRoute.js        - Route protection component
│   │   └── Navbar.js                - Navigation bar
│   ├── context/
│   │   └── AuthContext.js           - Authentication context & hooks
│   ├── services/
│   │   └── api.js                   - Axios API instance & calls
│   ├── App.js                       - Main App component with routing
│   ├── index.js                     - React DOM render
│   └── index.css                    - Global styles
├── public/
│   └── index.html                   - HTML template
├── package.json                     - Dependencies
├── tailwind.config.js               - Tailwind CSS config
└── .env.example                     - Environment variables example
```

## Pages

### Login Page

- Email/Password authentication
- Redirect to respective dashboard based on role
- Link to signup for new users

### Signup Page

- Register as Patient or Doctor
- Form validation
- Automatic login after successful registration

### Patient Dashboard

- **Book Appointment Tab**: Select doctor, date, time slot, and reason
- **My Appointments Tab**: View all bookings with status
- Cancel appointments functionality
- Appointment status tracking (pending, approved, rejected, completed, cancelled)

### Doctor Dashboard

- View all assigned appointments
- Update appointment status (pending, approved, rejected, completed)
- Add notes to appointments
- Click on appointment to update status

### Admin Dashboard

- **Users Tab**: View all registered users
- **Doctors Tab**:
  - View all doctors
  - Add new doctors with specialization and fees
  - Delete doctors
- **Appointments Tab**: View all system appointments

## Authentication

The application uses JWT tokens for authentication:

- Token stored in localStorage
- Automatically attached to API requests
- Automatic redirect to login if token expires
- Role-based route protection

## Available Roles

1. **Patient**
   - Book appointments
   - View appointment status
   - Cancel appointments

2. **Doctor**
   - View assigned appointments
   - Approve/Reject/Complete appointments
   - Add notes to appointments

3. **Admin**
   - View all users
   - Add/Delete doctors
   - View all appointments

## Styling

- **Tailwind CSS** for utility-first styling
- Responsive design for mobile, tablet, and desktop
- Color scheme: Blue-based with appropriate alerts
- Consistent UI components

## API Integration

All API calls are handled through `src/services/api.js`:

- Auth APIs (register, login, profile)
- Doctor APIs (list, add, delete, update)
- Appointment APIs (book, list, update status, cancel)
- User APIs (profile management)

## Environment Variables

```env
REACT_APP_API_URL - Backend API URL (default: http://localhost:5000/api)
```

## Technologies Used

- **React 18** - UI library
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management

## Error Handling

- Network error handling
- 401 Unauthorized redirect to login
- User-friendly error messages
- Form validation

## Responsive Design

- Mobile-first approach
- Tailwind responsive classes
- Grid and flexbox layouts
- Touch-friendly buttons and inputs

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC
