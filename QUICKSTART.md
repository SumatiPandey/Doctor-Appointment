# Quick Start Guide - Doctor Appointment System

## 🚀 Fast Setup (5 minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start MongoDB locally (if installed)
mongod

# In a new terminal, start the backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### Step 2: Frontend Setup

```bash
# In another terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start the frontend
npm start
```

**Frontend will open:** `http://localhost:3000`

## 📝 Default Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/doctor-appointment
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🔧 Troubleshooting

### MongoDB Connection Error

- Make sure MongoDB is installed and running: `mongod`
- Or use MongoDB Atlas: Replace `MONGODB_URI` with your cloud URI

### Port Already in Use

```bash
# Change PORT in backend .env to different port (e.g., 5001)
PORT=5001
```

### CORS Error

- Make sure backend is running on the correct port
- Check `REACT_APP_API_URL` in frontend .env

### Dependencies Installation Failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Testing the App

1. **Create Account**
   - Go to http://localhost:3000/signup
   - Fill in details and select role (Patient/Doctor)
   - Click Sign Up

2. **Login**
   - Go to http://localhost:3000/login
   - Enter your credentials
   - You'll be redirected to your dashboard

3. **Patient Dashboard**
   - Click "Book Appointment"
   - Select doctor, date, time
   - View appointments in "My Appointments"

4. **Doctor Dashboard**
   - View assignments
   - Click appointment to update status

5. **Admin Dashboard**
   - View/manage users
   - View/add/delete doctors
   - Monitor appointments

## 🌐 Using MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doctor-appointment
   ```

## 📦 Useful Commands

### Backend

```bash
npm install          # Install dependencies
npm run dev         # Start with nodemon
npm start           # Start production server
```

### Frontend

```bash
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

## 🎯 Project Structure Quick Reference

```
Backend:
- server.js         → Main entry point
- models/           → Database schemas
- controllers/      → Business logic
- routes/           → API endpoints
- middleware/       → Auth & validation

Frontend:
- App.js            → Main component & routing
- components/       → UI components
- context/          → Auth state
- services/         → API calls
```

## 🔑 Key Features to Try

1. **Signup as Patient** → Book appointment
2. **Signup as Doctor** → Manage appointments
3. **Login as Admin** → Manage doctors/users
4. **JWT Authentication** → Tokens stored in localStorage
5. **Role-based Routing** → Different dashboards per role

## 📖 For More Details

- See `backend/README.md` for API details
- See `frontend/README.md` for UI details
- See `README.md` for complete project overview

## 🆘 Need Help?

1. Check console for error messages
2. Verify .env files are correct
3. Ensure MongoDB is running
4. Check if ports 5000 and 3000 are available
5. Review README files in each directory

---

**That's it! You're ready to go! 🎉**
