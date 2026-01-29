# Complete Setup Instructions

## 📋 Requirements

- Node.js v14+ ([Download](https://nodejs.org/))
- MongoDB Local or MongoDB Atlas ([Learn More](https://www.mongodb.com/))
- Git
- A code editor (VS Code recommended)
- Terminal/Command Prompt

## 🎯 Step-by-Step Setup

### Phase 1: Initial Setup (2 minutes)

#### 1.1 MongoDB Setup

Choose one option:

**Option A: MongoDB Local**

```bash
# Windows
# Download from: https://www.mongodb.com/try/download/community
# Follow installation wizard

# macOS
brew install mongodb-community

# Linux
sudo apt-get install -y mongodb

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account
3. Create a cluster
4. Get connection string
5. Save the connection string for later

---

### Phase 2: Backend Setup (3 minutes)

```bash
# Step 1: Navigate to backend directory
cd backend

# Step 2: Install all dependencies
npm install

# This will install:
# - express (web framework)
# - mongoose (database)
# - jsonwebtoken (authentication)
# - bcryptjs (password hashing)
# - dotenv (environment variables)
# - cors (cross-origin requests)
```

```bash
# Step 3: Create .env file
# Copy content from .env.example or create new file:
# backend/.env

# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/doctor-appointment
JWT_SECRET=doctor_appointment_secret_key_12345
PORT=5000
NODE_ENV=development

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doctor-appointment?retryWrites=true&w=majority
JWT_SECRET=doctor_appointment_secret_key_12345
PORT=5000
NODE_ENV=development
```

```bash
# Step 4: Start backend server
npm run dev

# Expected output:
# Server is running on port 5000
# MongoDB Connected: localhost (or your cloud connection)

# Test the server:
# Open browser: http://localhost:5000/health
# You should see: {"message":"Server is running"}
```

---

### Phase 3: Frontend Setup (3 minutes)

```bash
# Step 1: Open NEW terminal and navigate to frontend
cd frontend

# Step 2: Install all dependencies
npm install

# This will install:
# - react (UI library)
# - react-router-dom (routing)
# - axios (HTTP client)
# - tailwindcss (styling)
```

```bash
# Step 3: Create .env file
# frontend/.env

REACT_APP_API_URL=http://localhost:5000/api
```

```bash
# Step 4: Start frontend development server
npm start

# Browser will automatically open to:
# http://localhost:3000
```

---

## ✅ Verification Checklist

### Backend Health Check

```bash
# In browser or terminal:
curl http://localhost:5000/health

# Should return:
{"message":"Server is running"}
```

### Frontend Loaded

- Browser shows: "Doctor Appointment" with Login/Signup pages
- Port 3000 is accessible

### MongoDB Connected

- Backend console shows: "MongoDB Connected: localhost"
- No connection errors in console

---

## 🧪 Test Your Setup

### Test 1: Create Account

1. Go to `http://localhost:3000/signup`
2. Fill form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: Patient
3. Click "Sign Up"
4. Should redirect to Patient Dashboard

### Test 2: Login

1. Go to `http://localhost:3000/login`
2. Enter:
   - Email: john@example.com
   - Password: password123
3. Click "Login"
4. Should show Patient Dashboard

### Test 3: Book Appointment

1. In Patient Dashboard, click "Book Appointment"
2. You need a doctor first. Let's create one:
   - Open new tab: `http://localhost:3000/signup`
   - Create doctor account:
     - Name: Dr. Smith
     - Email: smith@example.com
     - Password: password123
     - Role: Doctor
3. Go back to patient tab (or login again)
4. Now try to book appointment

### Test 4: Doctor View

1. Login as doctor (smith@example.com)
2. Should see Doctor Dashboard
3. View appointments made by patients

### Test 5: Admin Functions

1. Stop server: `Ctrl + C`
2. Add admin user directly to MongoDB:

   ```bash
   # Connect to MongoDB
   mongo

   # Or use MongoDB Compass GUI
   # Create user with role: "admin"
   ```

3. Login as admin to see Admin Dashboard
4. Add/delete doctors
5. View all users and appointments

---

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

- Make sure MongoDB is running: `mongod`
- Check MongoDB URI in .env
- Use MongoDB Atlas if local install fails

### Issue: Port 5000 Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

```bash
# Change PORT in backend/.env
PORT=5001

# Or kill process:
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: Port 3000 Already in Use

```
Error: Something is already listening on port 3000
```

**Solution:**

- Use different port: `PORT=3001 npm start`
- Or kill the process using port 3000

### Issue: CORS Error in Console

```
Access to XMLHttpRequest... has been blocked by CORS policy
```

**Solution:**

- Check backend `.env` for correct PORT
- Update frontend `.env.REACT_APP_API_URL`
- Make sure backend server is running

### Issue: Dependencies Installation Failed

```
npm ERR! code ERESOLVE
```

**Solution:**

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Cannot find module" error

**Solution:**

```bash
# Reinstall node_modules
rm -rf node_modules
npm install
```

---

## 📊 Database Structure Setup

### Automatic Setup

- MongoDB automatically creates database on first connection
- Collections are created when first document is inserted

### Manual Setup (Optional)

```bash
# Connect to MongoDB
mongo doctor-appointment

# Create collections
db.createCollection("users")
db.createCollection("doctors")
db.createCollection("appointments")

# Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.doctors.createIndex({ userId: 1 }, { unique: true })
```

---

## 🔐 Security Configuration

### Change JWT Secret

**IMPORTANT: For Production!**

1. Open `backend/.env`
2. Change:
   ```env
   JWT_SECRET=your_strong_secret_key_here
   ```
3. Use a strong random string (at least 32 characters)

### Database Security

1. For MongoDB Atlas:
   - Set strong password
   - Configure IP whitelist
   - Use encryption

2. For Local MongoDB:
   - Change default port if exposed to internet
   - Set authentication if needed

---

## 📱 Environment Variables Summary

### Backend Variables

| Variable    | Default                                      | Description         |
| ----------- | -------------------------------------------- | ------------------- |
| MONGODB_URI | mongodb://localhost:27017/doctor-appointment | Database connection |
| JWT_SECRET  | your_jwt_secret_key_here                     | Token signing key   |
| PORT        | 5000                                         | Server port         |
| NODE_ENV    | development                                  | Environment type    |

### Frontend Variables

| Variable          | Default                   | Description     |
| ----------------- | ------------------------- | --------------- |
| REACT_APP_API_URL | http://localhost:5000/api | Backend API URL |

---

## 🚀 Running Both Servers

### Terminal Setup

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Using VS Code

1. Open folder in VS Code
2. Open terminal (Ctrl + `)
3. Split terminal
4. Run both servers simultaneously

---

## 📈 Next Steps

1. **Explore Code**
   - Check models in `backend/models/`
   - Review controllers in `backend/controllers/`
   - Inspect components in `frontend/src/components/`

2. **Customize**
   - Change colors in `frontend/src/index.css`
   - Add more specializations in Doctor model
   - Extend appointment time slots

3. **Deploy**
   - Backend: Railway, Heroku, AWS
   - Frontend: Vercel, Netlify, GitHub Pages
   - Database: MongoDB Atlas

4. **Learn**
   - Study MERN architecture
   - Understand JWT authentication
   - Learn Tailwind CSS

---

## 💡 Useful Commands

```bash
# Backend
cd backend
npm install              # Install packages
npm run dev             # Start with auto-reload
npm start               # Start production

# Frontend
cd frontend
npm install              # Install packages
npm start               # Start dev server
npm run build           # Build for production

# Git
git status              # Check status
git add .              # Add all files
git commit -m "msg"    # Commit changes
git push               # Push to remote
```

---

## 📞 Support Resources

### Documentation Files

- `README.md` - Complete project overview
- `QUICKSTART.md` - Fast setup guide
- `backend/README.md` - Backend API details
- `frontend/README.md` - Frontend details

### Online Resources

- [MERN Stack Guide](https://www.mongodb.com/languages/javascript/mern-stack)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

## ✨ Success!

If you reached here without errors:

- ✅ MongoDB is connected
- ✅ Backend server running (port 5000)
- ✅ Frontend loaded (port 3000)
- ✅ All dependencies installed
- ✅ Ready to develop!

**Happy coding! 🎉**
