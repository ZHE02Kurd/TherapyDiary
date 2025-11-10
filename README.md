# TherapyDiary

A mental health mobile/web application based on **Behavioural Activation** therapy to help users manage depression and low mood through activity tracking, mood monitoring, and structured scheduling.

## 🎯 Project Overview

TherapyDiary is a digital implementation of the Behavioural Activation therapeutic approach. It helps users:
- 📝 Keep a digital diary of daily activities and mood
- 📚 Build and categorize an activity library (Routine, Necessary, Pleasurable)
- 📊 Rank activities by difficulty level (Easiest, Moderate, Difficult)
- 📅 Schedule activities in advance
- 📈 Track mood trends over time

## 🏗️ Project Structure

```
TherapyDiary/
├── backend/                  # Node.js + Express API
│   ├── src/
│   │   ├── routes/          # API endpoints (auth, diary, activities)
│   │   ├── models/          # Database schemas (User, Activity, DiaryEntry, etc.)
│   │   ├── controllers/     # Business logic (auth, diary, activity controllers)
│   │   ├── middleware/      # Auth, validation
│   │   ├── scripts/         # Database seed script
│   │   └── server.js        # Express app entry
│   ├── API_TESTING_GUIDE.md # Complete API documentation
│   ├── DATABASE_MODELS.md    # Database schema documentation
│   └── package.json
│
├── frontend/                 # React Native + Expo mobile app
│   ├── src/
│   │   ├── screens/         # App screens (Login, Register, Home, Diary, Activities, Profile)
│   │   ├── navigation/      # Navigation configuration
│   │   ├── context/         # React Context (Authentication)
│   │   ├── services/        # API client and service methods
│   │   ├── constants/       # Configuration and theme
│   │   ├── components/      # Reusable components (to be added)
│   │   └── utils/           # Utility functions (to be added)
│   ├── App.js              # Main app component
│   ├── README.md           # Frontend documentation
│   └── package.json
│
├── docs/                     # Documentation
│   ├── app-planning-guide.md
│   ├── app-sketches.md
│   ├── RESEARCH_AND_DEVELOPMENT.md
│   └── AI_AGENT_ONBOARDING.md
│
├── FRONTEND_STATUS.md        # Current frontend development status
└── README.md                # This file
```

## ✅ Completed Tasks

### Phase 1: Backend Infrastructure ✓
- [x] Created project folder structure
- [x] Initialized backend Node.js project
- [x] Installed core dependencies (Express, Mongoose, JWT, bcrypt)
- [x] Created Express server with middleware and error handling
- [x] Set up environment configuration (.env.example)
- [x] Created .gitignore for security

### Phase 2: Database & Models ✓
- [x] Created User model with authentication methods
- [x] Created Activity model with 70+ pre-populated activities
- [x] Created DiaryEntry model with mood tracking
- [x] Created ScheduledActivity model for calendar
- [x] Created MoodLog model for daily aggregation
- [x] Added database seed script

### Phase 3: Authentication System ✓
- [x] Built registration endpoint with validation
- [x] Built login endpoint with JWT generation
- [x] Created JWT authentication middleware
- [x] Added profile management endpoints
- [x] Implemented password change functionality

### Phase 4: Diary API ✓
- [x] CRUD operations for diary entries
- [x] Date-based entry queries
- [x] Pagination and filtering
- [x] Automatic mood log recalculation
- [x] Time-of-day categorization

### Phase 5: Activity API ✓
- [x] CRUD operations for activities
- [x] Category filtering (Routine/Necessary/Pleasurable)
- [x] Difficulty filtering (Easiest/Moderate/Difficult)
- [x] Text search functionality
- [x] Activity ranking system
- [x] Custom activity creation

### Phase 6: Frontend Foundation ✓
- [x] Initialized React Native + Expo project
- [x] Installed navigation dependencies
- [x] Created API service layer with axios
- [x] Built authentication context for state management
- [x] Created app navigation structure
- [x] Built Login and Register screens
- [x] Created Home, Diary, Activities, Profile screens
- [x] Integrated with backend API
- [x] Started Expo development server

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   # Copy the example .env file
   Copy-Item .env.example .env
   
   # Edit .env and update these values:
   # - DATABASE_URL: Your MongoDB connection string
   # - JWT_SECRET: A secure random string
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Test the API:**
   Visit http://localhost:3000/api/health in your browser

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API connection (Optional):**
   - For physical device testing, edit `src/constants/config.js`
   - Update `LOCAL_NETWORK` with your computer's IP address
   - Default `localhost` works for emulators

4. **Start Expo development server:**
   ```bash
   npx expo start
   ```

5. **Run the app:**
   - **Android Emulator:** Press `a` in terminal
   - **iOS Simulator:** Press `i` in terminal (Mac only)
   - **Web Browser:** Press `w` in terminal
   - **Physical Device:** Scan QR code with Expo Go app

### Full Stack Testing

1. **Start backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend** (Terminal 2):
   ```bash
   cd frontend
   npx expo start
   ```

3. **Test the flow:**
   - Register a new account in the app
   - Login with your credentials
   - Navigate through all screens
   - Test profile and logout

### MongoDB Setup Options

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod --dbpath ./data
```

**Option 2: MongoDB Atlas (Recommended)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Get connection string
4. Update `DATABASE_URL` in `.env`

## 🛠️ Tech Stack

### Backend
- **Framework:** Express.js 4.x
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt for password hashing
- **Validation:** express-validator
- **Development:** nodemon for auto-reload

### Frontend
- **Framework:** React Native 0.81 with Expo 54
- **Navigation:** React Navigation 7 (Stack & Bottom Tabs)
- **State Management:** React Context API
- **HTTP Client:** Axios with interceptors
- **Storage:** Expo SecureStore for JWT tokens
- **UI:** React Native core components + custom styling
- **Development:** Expo Go for testing, Hot reload

## 📋 Next Steps

### Backend (Optional - Core Complete)
1. **Schedule API** - Endpoints for scheduled activities and calendar
2. **Mood Analytics API** - Trend analysis and statistics
3. **Testing** - Unit and integration tests

### Frontend (Priority)
1. **Diary Management UI** - Create/edit diary entries, mood sliders, activity picker
2. **Activity Library UI** - Browse activities, filtering, custom creation
3. **Mood Visualization** - Charts and graphs for mood trends
4. **Schedule Calendar** - Activity scheduling and reminders
5. **Enhanced Profile** - Settings, preferences, data export

## 📚 Documentation

- [App Planning Guide](app-planning-guide.md) - Product vision and features
- [App Sketches](app-sketches.md) - Screen wireframes
- [R&D Tasks](RESEARCH_AND_DEVELOPMENT.md) - Development roadmap
- [AI Agent Onboarding](AI_AGENT_ONBOARDING.md) - Technical architecture guide
- [Backend README](backend/README.md) - Backend-specific documentation
- [API Testing Guide](backend/API_TESTING_GUIDE.md) - Complete API reference
- [Database Models](backend/DATABASE_MODELS.md) - Schema documentation
- [Frontend README](frontend/README.md) - Frontend setup and architecture
- [Frontend Status](FRONTEND_STATUS.md) - Current development status

## 🎯 User Personas

**Sarah (16)** - Stressed student, needs simple scheduling for homework balance  
**Mark (45)** - Therapist client, following structured BA program  
**Chloe (29)** - Self-help seeker, wants activity ideas and structure

## 📊 Current Status

**Backend:** ✅ Core API Complete (Auth, Diary, Activities)  
**Frontend:** ✅ Foundation Complete (Navigation, Auth Screens)  
**Database:** ✅ All models created with validation  
**Authentication:** ✅ Full JWT system implemented  
**API Endpoints:** ✅ 20+ endpoints operational

### What's Working Now:
- ✅ User registration and login
- ✅ JWT authentication with secure storage
- ✅ API integration layer complete
- ✅ Navigation between screens
- ✅ Profile display and logout
- ✅ Backend serving 70+ pre-populated activities
- ✅ All CRUD operations for diary and activities

### What's Next:
- 🚧 Build diary entry form and list UI
- 🚧 Build activity browsing and filtering UI
- 🚧 Add mood visualization charts
- 📅 Schedule API endpoints
- 📊 Mood analytics API endpoints

## 🤝 Contributing

This is a personal mental health project. Development is following the Behavioural Activation booklet principles to ensure therapeutic accuracy.

## 📄 License

ISC

---

**Built with ❤️ to help people manage depression through evidence-based Behavioural Activation therapy**
