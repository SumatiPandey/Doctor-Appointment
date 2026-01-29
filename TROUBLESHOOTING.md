# 🔧 Troubleshooting Guide

## 🆘 Common Issues & Solutions

### Backend Issues

#### ❌ MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Causes:**

- MongoDB not running
- Wrong connection string
- MongoDB Atlas credentials incorrect

**Solutions:**

```bash
# Solution 1: Start MongoDB locally
mongod

# Solution 2: Check if MongoDB is running
# Windows:
sc query MongoDB

# Solution 3: Use MongoDB Atlas
# Update MONGODB_URI in .env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doctor-appointment

# Solution 4: Check connection string
# Should be: mongodb://localhost:27017/doctor-appointment
# NOT: mongodb://27017/doctor-appointment
```

---

#### ❌ Port 5000 Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

```bash
# Solution 1: Use different port
# Edit backend/.env:
PORT=5001

# Solution 2: Kill process using port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Solution 3: Mac/Linux:
lsof -i :5000
kill -9 <PID>

# Solution 4: Find what's using the port
# Windows PowerShell:
Get-NetTCPConnection -LocalPort 5000 | Get-Process
```

---

#### ❌ Cannot Find Module Error

```
Error: Cannot find module 'express'
```

**Solutions:**

```bash
# Solution 1: Install dependencies
cd backend
npm install

# Solution 2: Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install

# Solution 3: Update npm
npm install -g npm@latest

# Solution 4: Check if node_modules exists
ls node_modules
# or
dir node_modules (Windows)
```

---

#### ❌ bcryptjs Compilation Error

```
Error: Module did not self-register: .../bcrypt.node
```

**Solutions:**

```bash
# Solution 1: Reinstall bcryptjs
npm remove bcryptjs
npm install bcryptjs

# Solution 2: Use bcrypt instead
npm remove bcryptjs
npm install bcrypt

# Then update imports:
# Change: const bcrypt = require('bcryptjs');
# To: const bcrypt = require('bcrypt');

# Solution 3: Clear npm cache
npm cache clean --force
npm install
```

---

#### ❌ JWT Token Undefined

```
Error: Cannot read property 'verify' of undefined
```

**Solutions:**

```bash
# Check if jsonwebtoken is installed
npm list jsonwebtoken

# Install if missing
npm install jsonwebtoken

# Check if JWT_SECRET is set
# In backend/.env:
JWT_SECRET=your_secret_key_here

# If not set, add it
echo "JWT_SECRET=doctor_app_secret" >> .env
```

---

#### ❌ Server Running but API Not Responding

```
Error: Cannot GET /api/doctors
```

**Solutions:**

```bash
# 1. Check if server is actually running
# Look for: Server is running on port 5000

# 2. Check routes are mounted
# In server.js, should have:
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));

# 3. Test health endpoint
curl http://localhost:5000/health

# 4. Check for errors in terminal
# Look for any error messages

# 5. Verify file paths
# Routes files should exist in backend/routes/
```

---

### Frontend Issues

#### ❌ Module Not Found (Frontend)

```
Module not found: Can't resolve 'react-router-dom'
```

**Solutions:**

```bash
cd frontend
npm install

# Or install specific package
npm install react-router-dom

# Reinstall all
rm -rf node_modules package-lock.json
npm install
```

---

#### ❌ Port 3000 Already in Use

```
Error: Something is already listening on port 3000
```

**Solutions:**

```bash
# Solution 1: Kill process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution 2: Use different port
PORT=3001 npm start

# Solution 3: Mac/Linux
lsof -i :3000
kill -9 <PID>
```

---

#### ❌ CORS Error

```
Access to XMLHttpRequest from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Causes:**

- Backend not running
- Wrong API URL
- Backend CORS not configured

**Solutions:**

```bash
# 1. Make sure backend is running
# Terminal: npm run dev (in backend folder)

# 2. Check frontend/.env
REACT_APP_API_URL=http://localhost:5000/api

# 3. Verify backend CORS setup
# In backend/server.js:
app.use(cors());

# 4. Restart frontend
npm start
```

---

#### ❌ Blank Login Page / Cannot See Components

```
Nothing renders, blank white page
```

**Solutions:**

```bash
# 1. Check browser console for errors
# Open: DevTools (F12) → Console

# 2. Clear node_modules
cd frontend
rm -rf node_modules package-lock.json
npm install

# 3. Check if public/index.html exists
# Should have: <div id="root"></div>

# 4. Restart frontend
npm start

# 5. Check if Tailwind is working
# Look for styling on page
```

---

#### ❌ Login/Signup Not Working

```
Error after clicking Login
```

**Solutions:**

```bash
# 1. Check if backend is running
# Terminal should show: Server is running on port 5000

# 2. Open browser DevTools → Network tab
# Try login again
# Look for failed requests to /api/auth/login

# 3. Check response status
# Should be 200 for success
# 401 for wrong password
# 400 for missing fields

# 4. Check if token is saved
# DevTools → Application → LocalStorage
# Should have 'token' key after login

# 5. Check console for errors
# DevTools → Console
```

---

#### ❌ Redirected to Login When Should Be Logged In

```
Login successful but redirected back to login
```

**Solutions:**

```bash
# 1. Check if token is in localStorage
# DevTools → Application → LocalStorage

# 2. Check AuthContext
# Make sure login() function saves token:
localStorage.setItem('token', authToken);

# 3. Check ProtectedRoute
# Should check isAuthenticated

# 4. Verify token format
# Token should start with "eyJ"

# 5. Check backend returns valid token
# Login endpoint should return: { token, user }
```

---

### Database Issues

#### ❌ MongoDB Atlas Connection Timeout

```
Error: connect ETIMEDOUT
```

**Solutions:**

```bash
# 1. Check connection string format
# Should be: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# 2. Verify credentials
# Username and password should not have @
# If password has @, use %40

# 3. Check IP whitelist
# MongoDB Atlas → Network Access
# Add your IP or 0.0.0.0/0 for any IP

# 4. Verify database name
# Should match your project name

# 5. Test connection
# Use MongoDB Compass with connection string
```

---

#### ❌ Cannot Create Document in MongoDB

```
Error: Document validation failed
```

**Solutions:**

```bash
# 1. Check model validation
# backend/models/User.js has required fields

# 2. Verify data being sent
# Email must be unique
# Password must be at least 6 characters

# 3. Check Mongoose schema
# All required fields must be provided

# 4. Check for duplicate email
# Clear database and try again
```

---

### Dependency Issues

#### ❌ npm ERR! code ERESOLVE

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

```bash
# Solution 1: Force resolution
npm install --legacy-peer-deps

# Solution 2: Clean install
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Solution 3: Update npm
npm install -g npm@latest

# Solution 4: Use specific versions
# Edit package.json with exact versions
```

---

#### ❌ Outdated Package Warning

```
npm WARN deprecated express-jwt@6.1.2: this library does not support the required RSA algorithms.
```

**Solutions:**

```bash
# 1. Update all packages
npm update

# 2. Audit dependencies
npm audit

# 3. Fix vulnerabilities
npm audit fix

# 4. Force fix (may break compatibility)
npm audit fix --force
```

---

## 🔍 Debugging Tips

### Enable Debug Mode

**Backend:**

```bash
# Set environment variable
export DEBUG=* npm run dev
# or
set DEBUG=* && npm run dev (Windows)

# Or add to package.json:
"dev": "DEBUG=* nodemon server.js"
```

**Frontend:**

```bash
# Add to .env
REACT_APP_DEBUG=true

# Then use in code:
if (process.env.REACT_APP_DEBUG) console.log(...)
```

---

### Check What's Running

```bash
# Check which processes are using ports
# Windows:
netstat -ano

# Mac/Linux:
netstat -tuln

# Or use lsof
lsof -i :5000
lsof -i :3000
```

---

### Verify Installation

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check installed packages
npm list

# Check specific package
npm list express
```

---

## 🧪 Testing Steps

### Test Backend Connectivity

```bash
# 1. Test server is running
curl http://localhost:5000/health

# 2. Test API endpoint
curl http://localhost:5000/api/doctors

# 3. Test with authentication
curl -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/auth/profile
```

---

### Test Frontend Connectivity

```bash
# 1. Open browser console (F12)
# 2. Go to Network tab
# 3. Try login/signup
# 4. Look for API requests
# 5. Check response status and data
```

---

### Test Database Connection

```bash
# Using MongoDB CLI
mongo

# Or MongoDB Compass GUI
# File → Connect → paste connection string

# Check if database exists
show databases

# Check collections
use doctor-appointment
show collections
```

---

## 📋 Pre-Flight Checklist

Before troubleshooting, verify:

- [ ] Node.js installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running or Atlas account active
- [ ] Port 5000 available
- [ ] Port 3000 available
- [ ] .env files created in both folders
- [ ] `npm install` run in both folders
- [ ] No typos in API URL in frontend .env

---

## 🆘 Still Not Working?

**Step 1:** Read the error message carefully

- What exactly is the error?
- Where is it happening (frontend/backend)?
- What was the last thing you did?

**Step 2:** Check these files in order:

```
backend/.env
backend/server.js
backend/config/db.js
frontend/.env
frontend/src/services/api.js
frontend/src/context/AuthContext.js
```

**Step 3:** Search the error online

- Copy exact error message
- Search on Google/Stack Overflow
- Look for similar issues

**Step 4:** Check documentation

- Read backend/README.md
- Read frontend/README.md
- Read SETUP.md
- Read API.md

**Step 5:** Clean and reinstall

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📞 Getting Help

### Information to Provide

When asking for help, provide:

1. Exact error message
2. What you were trying to do
3. Steps you've already tried
4. Your environment (OS, Node version, etc.)
5. Relevant code or configuration

### Resources

- [Stack Overflow](https://stackoverflow.com) - MERN questions
- [MongoDB Support](https://www.mongodb.com/support)
- [Express.js Issues](https://github.com/expressjs/express/issues)
- [React Issues](https://github.com/facebook/react/issues)

---

## ✅ Success Signs

Your setup is working when:

- ✅ Backend shows: "Server is running on port 5000"
- ✅ Backend shows: "MongoDB Connected"
- ✅ Frontend opens to login page
- ✅ You can create account
- ✅ You can login successfully
- ✅ Dashboard displays after login
- ✅ No red errors in console
- ✅ Network tab shows successful API calls

---

**Good luck debugging! You've got this! 💪**
