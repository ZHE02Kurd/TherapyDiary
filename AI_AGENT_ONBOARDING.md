# AI Agent Onboarding Guide - TherapyDiary

## Purpose
Help AI coding agents become productive quickly by describing repository-specific discovery steps, conventions, runtime environment, and common patterns for this mental health therapy app.

---

## Quick Onboarding Checklist (First 15 Minutes)

### 1. **Project Type: Cross-Platform Mental Health Mobile/Web App**
- **Technology Stack**: React Native or Flutter (Frontend), Node.js + Express (Backend), PostgreSQL or MongoDB (Database)
- **Architecture**: Client-Server with RESTful API
- **Build System**: npm/yarn (Node.js), gradle/xcode (mobile builds)

### 2. **Project Structure** (Expected)
```
TherapyDiary/
├── frontend/                     # React Native/Flutter client
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── screens/             # Main app screens
│   │   │   ├── Dashboard.js     # Home/summary screen
│   │   │   ├── Diary.js         # Daily activity & mood logging
│   │   │   ├── ActivityLibrary.js  # Activity browsing/management
│   │   │   ├── Scheduler.js     # Calendar/planning view
│   │   │   └── Progress.js      # Charts & history
│   │   ├── services/            # API communication layer
│   │   ├── utils/               # Helper functions
│   │   └── App.js               # Main app entrypoint
│   ├── package.json
│   └── README.md
│
├── backend/                     # Node.js API server
│   ├── src/
│   │   ├── routes/              # API endpoints
│   │   │   ├── auth.js          # Login/registration
│   │   │   ├── diary.js         # Diary entries
│   │   │   ├── activities.js    # Activity CRUD
│   │   │   ├── schedule.js      # Activity scheduling
│   │   │   └── mood.js          # Mood tracking
│   │   ├── models/              # Database schemas
│   │   │   ├── User.js
│   │   │   ├── DiaryEntry.js
│   │   │   ├── Activity.js
│   │   │   └── MoodLog.js
│   │   ├── middleware/          # Auth, validation, etc.
│   │   ├── controllers/         # Business logic
│   │   └── server.js            # Server entrypoint
│   ├── package.json
│   └── .env.example
│
├── docs/                        # Documentation
│   ├── app-planning-guide.md    # Product planning doc
│   └── Behavioural-Activation-booklet.pdf  # Source material
│
└── README.md                    # Project setup instructions
```

### 3. **Entrypoints**

#### **Frontend (Client-Side)**
Main screens in `frontend/src/screens/`:
- `Dashboard.js` - Home screen with day summary, mood, and scheduled activities
- `Diary.js` - Daily activity logging with mood rating (Step 1 from booklet)
- `ActivityLibrary.js` - Browse and manage "Routine," "Necessary," and "Pleasurable" activities (Step 2)
- `ActivityRanking.js` - Rank activities as "Easiest," "Moderate," or "Difficult" (Step 3)
- `Scheduler.js` - Calendar view for scheduling activities (Step 4)
- `Progress.js` - Mood charts and activity history visualization

#### **Backend (Server-Side)**
API routes in `backend/src/routes/`:
- `auth.js` - User registration, login, JWT token management
- `diary.js` - CRUD operations for diary entries
- `activities.js` - Activity library management (CRUD, categorization)
- `schedule.js` - Activity scheduling and reminders
- `mood.js` - Mood tracking and historical data retrieval

### 4. **Core Features (MVP)**

**User Authentication:**
- Registration with email/password
- Login with JWT token authentication
- Secure password hashing (bcrypt)

**Digital Diary (Step 1):**
- Log daily activities with timestamps
- Rate mood on a scale (e.g., 1-10)
- View diary entry history

**Activity Library (Step 2):**
- Pre-populated activities categorized as:
  - **Routine**: Daily tasks (e.g., "Brush teeth," "Make bed")
  - **Necessary**: Essential activities (e.g., "Grocery shopping," "Pay bills")
  - **Pleasurable**: Enjoyable activities (e.g., "Read a book," "Call a friend")
- User can add/edit/delete custom activities

**Activity Ranking (Step 3):**
- Rank activities by difficulty: "Easiest," "Moderate," "Difficult"
- Filter activities by difficulty level

**Activity Scheduler (Step 4):**
- Calendar/agenda view
- Schedule activities by date/time
- Mark activities as complete

**Mood Tracking:**
- Visual graphs showing mood trends over time
- Correlation between activities and mood

### 5. **Technical Dependencies**

#### **Frontend (React Native Example)**
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-native": "^0.72.x",
    "react-navigation": "^6.x",
    "axios": "^1.x",
    "react-native-chart-kit": "^6.x",
    "react-native-calendars": "^1.x",
    "async-storage": "^1.x"
  }
}
```

#### **Backend (Node.js)**
```json
{
  "dependencies": {
    "express": "^4.x",
    "mongoose": "^7.x",  // or "pg" for PostgreSQL
    "jsonwebtoken": "^9.x",
    "bcrypt": "^5.x",
    "dotenv": "^16.x",
    "cors": "^2.x",
    "express-validator": "^7.x"
  }
}
```

### 6. **Testing Strategy**
- ✅ Unit tests for business logic (Jest)
- ✅ Integration tests for API endpoints (Supertest)
- ✅ Frontend component tests (React Testing Library)
- ✅ E2E tests for critical user flows (optional: Detox, Cypress)

---

## Project-Specific Patterns

### **Common Frontend Patterns**

#### 1. **API Service Layer**
```javascript
// frontend/src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

#### 2. **Screen Component Structure**
```javascript
// frontend/src/screens/Diary.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../services/api';

const DiaryScreen = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    fetchDiaryEntries();
  }, []);
  
  const fetchDiaryEntries = async () => {
    const response = await api.get('/diary');
    setEntries(response.data);
  };
  
  return (
    <View style={styles.container}>
      {/* UI implementation */}
    </View>
  );
};

export default DiaryScreen;
```

### **Common Backend Patterns**

#### 1. **Express Route Structure**
```javascript
// backend/src/routes/diary.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const diaryController = require('../controllers/diary');

router.get('/', authMiddleware, diaryController.getAllEntries);
router.post('/', authMiddleware, diaryController.createEntry);
router.put('/:id', authMiddleware, diaryController.updateEntry);
router.delete('/:id', authMiddleware, diaryController.deleteEntry);

module.exports = router;
```

#### 2. **Database Model (Mongoose Example)**
```javascript
// backend/src/models/DiaryEntry.js
const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  moodRating: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  notes: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);
```

#### 3. **JWT Authentication Middleware**
```javascript
// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

#### 4. **Controller Pattern**
```javascript
// backend/src/controllers/diary.js
const DiaryEntry = require('../models/DiaryEntry');

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await DiaryEntry.find({ userId: req.userId })
      .sort({ timestamp: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch diary entries' });
  }
};

exports.createEntry = async (req, res) => {
  try {
    const { activity, moodRating, notes } = req.body;
    const entry = new DiaryEntry({
      userId: req.userId,
      activity,
      moodRating,
      notes
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create diary entry' });
  }
};
```

---

## How to Run and Debug

### **Backend Development**

#### **Initial Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

#### **Environment Variables (.env)**
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/therapydiary
# or for PostgreSQL: postgresql://user:password@localhost:5432/therapydiary
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

#### **Start Development Server**
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

#### **Run Tests**
```bash
cd backend
npm test
```

### **Frontend Development**

#### **Initial Setup**
```bash
cd frontend
npm install
```

#### **Start Development (React Native)**
```bash
# For iOS
npm run ios

# For Android
npm run android

# For Web (if supported)
npm run web
```

#### **Debugging**
- React Native Debugger: https://github.com/jhen0409/react-native-debugger
- Chrome DevTools: Press `Ctrl+M` (Android) or `Cmd+D` (iOS) → "Debug"
- Console logs: `console.log()`, `console.warn()`, `console.error()`

### **Database Setup**

#### **MongoDB**
```bash
# Install MongoDB locally or use MongoDB Atlas (cloud)
# Start local MongoDB
mongod --dbpath /path/to/data/directory
```

#### **PostgreSQL**
```bash
# Install PostgreSQL
# Create database
createdb therapydiary

# Run migrations (if using a migration tool)
npm run migrate
```

---

## Behavioural Activation Framework

This app is based on a therapeutic framework from the Behavioural Activation booklet. Understanding these steps is crucial:

### **Step 1: Keep a Diary**
- Users log activities throughout the day
- Each activity is tagged with a mood rating
- Goal: Identify patterns between activities and mood

### **Step 2: Categorize Activities**
- **Routine**: Regular daily tasks (e.g., hygiene, meals)
- **Necessary**: Must-do but unpleasant tasks (e.g., chores, errands)
- **Pleasurable**: Enjoyable activities (e.g., hobbies, socializing)

### **Step 3: Rank by Difficulty**
- **Easiest**: Low-effort activities when feeling unmotivated
- **Moderate**: Activities requiring more energy
- **Difficult**: Challenging activities to work up to

### **Step 4: Schedule Activities**
- Plan activities in advance using a calendar
- Start with easier activities when mood is low
- Gradually add more difficult or pleasurable activities

### **Step 5: Review Progress**
- Check mood trends over time
- Celebrate small wins
- Adjust activity plan based on what works

---

## User Personas (From Planning Doc)

### **Sarah, the Stressed Student (Age 16)**
- Low technical skill level
- Wants a calming, minimalist interface
- Primary use: Activity Scheduler to balance homework with breaks
- Found app on app store

### **Mark, the Therapist Client (Age 45)**
- Therapist recommended the app
- Following therapist's guidance
- Primary use: Digital Diary and Activity Ranking
- Low technical skill level

### **Chloe, the Self-Help Seeker (Age 29)**
- Using "selfhelp from books and stuff"
- Found app through online articles
- Primary use: Activity Library for ideas and Activity Ranking
- Wants structure beyond a simple notebook

**Design Implication**: Keep UI simple, accessible, and calming (minimalist design).

---

## Data Models (Expected)

### **User**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  passwordHash: String,
  name: String,
  age: Number,
  createdAt: Date,
  settings: {
    notifications: Boolean,
    reminderTime: String
  }
}
```

### **DiaryEntry**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  activity: String,
  activityId: ObjectId (ref: Activity, optional),
  moodRating: Number (1-10),
  notes: String,
  timestamp: Date
}
```

### **Activity**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, null for pre-populated),
  name: String,
  category: Enum ['Routine', 'Necessary', 'Pleasurable'],
  difficulty: Enum ['Easiest', 'Moderate', 'Difficult'],
  isCustom: Boolean,
  createdAt: Date
}
```

### **ScheduledActivity**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  activityId: ObjectId (ref: Activity),
  scheduledDate: Date,
  scheduledTime: String,
  completed: Boolean,
  completedAt: Date
}
```

### **MoodLog**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  date: Date,
  averageMood: Number,
  entries: [ObjectId] (ref: DiaryEntry)
}
```

---

## API Endpoints (Expected)

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user info (requires auth)

### **Diary Entries**
- `GET /api/diary` - Get all user's diary entries
- `POST /api/diary` - Create new diary entry
- `GET /api/diary/:id` - Get specific entry
- `PUT /api/diary/:id` - Update entry
- `DELETE /api/diary/:id` - Delete entry

### **Activities**
- `GET /api/activities` - Get all activities (pre-populated + user's custom)
- `POST /api/activities` - Create custom activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete custom activity
- `GET /api/activities/category/:category` - Filter by category
- `GET /api/activities/difficulty/:difficulty` - Filter by difficulty

### **Scheduler**
- `GET /api/schedule` - Get user's scheduled activities
- `POST /api/schedule` - Schedule an activity
- `PUT /api/schedule/:id` - Update scheduled activity
- `DELETE /api/schedule/:id` - Remove scheduled activity
- `PATCH /api/schedule/:id/complete` - Mark activity as completed

### **Mood Tracking**
- `GET /api/mood/history` - Get mood history (with date range)
- `GET /api/mood/stats` - Get mood statistics and trends

---

## Common Development Tasks

### **Adding a New Screen**
1. Create component in `frontend/src/screens/`
2. Add navigation route in `App.js` or navigation config
3. Create corresponding API service methods if needed
4. Add to navigation menu/tabs

### **Adding a New API Endpoint**
1. Define route in `backend/src/routes/`
2. Create controller function in `backend/src/controllers/`
3. Add authentication middleware if required
4. Add validation middleware
5. Update frontend API service to call new endpoint
6. Write tests

### **Adding a New Database Model**
1. Create schema in `backend/src/models/`
2. Define relationships to other models
3. Add indexes for commonly queried fields
4. Update seeders/migrations if needed

### **Implementing a Chart/Visualization**
1. Fetch data from `/api/mood/history` or `/api/mood/stats`
2. Use `react-native-chart-kit` or similar library
3. Transform data into chart format
4. Display in `Progress.js` screen

---

## Code Style Conventions

### **JavaScript/Node.js**
- **Indentation**: 2 spaces
- **Naming**:
  - camelCase for variables and functions: `const moodRating = 7;`
  - PascalCase for components/classes: `class DiaryEntry`, `const DiaryScreen`
  - SCREAMING_CASE for constants: `const MAX_MOOD_RATING = 10;`
- **Async/Await**: Prefer async/await over promises
- **Error Handling**: Always use try-catch for async operations
- **Comments**: Use JSDoc for functions, minimal inline comments

### **React/React Native**
- Functional components with hooks (not class components)
- Destructure props: `const MyComponent = ({ title, onPress }) => { ... }`
- Use `useState`, `useEffect` for state management
- Extract reusable components to `components/` folder

### **API Design**
- RESTful principles
- Use proper HTTP verbs (GET, POST, PUT, DELETE, PATCH)
- Return appropriate status codes (200, 201, 400, 401, 404, 500)
- Consistent error response format:
  ```json
  { "error": "Error message here" }
  ```

---

## Security Considerations

### **Authentication**
- Store JWT tokens securely (AsyncStorage on mobile, HttpOnly cookies on web)
- Hash passwords with bcrypt (minimum 10 rounds)
- Implement token expiration and refresh tokens (future)

### **Data Privacy**
- **HIPAA Considerations**: Mental health data is sensitive
- Encrypt data at rest (database encryption)
- Use HTTPS for all API communication
- Implement user data export and deletion (GDPR compliance)

### **Input Validation**
- Validate all user inputs on both client and server
- Use `express-validator` or similar
- Sanitize inputs to prevent XSS attacks
- Use parameterized queries to prevent SQL injection

---

## Deployment

### **Backend Deployment Options**
- **Heroku**: Easy deployment with `git push heroku main`
- **AWS EC2/ECS**: More control, requires configuration
- **DigitalOcean App Platform**: Simple and affordable
- **Railway/Render**: Modern alternatives to Heroku

### **Database Hosting**
- **MongoDB Atlas**: Free tier available, managed MongoDB
- **AWS RDS**: For PostgreSQL
- **Heroku Postgres**: Add-on for Heroku apps

### **Frontend Deployment**
- **Mobile**: Deploy to App Store (iOS) and Google Play (Android)
- **Web**: Netlify, Vercel, or AWS S3 + CloudFront

### **CI/CD** (Future)
- GitHub Actions for automated testing and deployment
- Fastlane for mobile app builds and uploads

---

## Success Metrics (From Planning Doc)

Track these metrics to measure app success:

1. **User Acquisition**: 1,000 downloads in first 3 months
2. **Daily Active Users (DAU)**: Target 20% of total users
3. **User Retention**: 30% of users still active after 1 month
4. **Session Duration**: Average time spent in app per session
5. **Feature Usage**:
   - % of users who log diary entries daily
   - % of users who schedule activities
   - % of users who view their progress charts
6. **User Satisfaction**: App store ratings (target: 4+ stars)

---

## Resources

- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **Express.js Guide**: https://expressjs.com/en/guide/routing.html
- **MongoDB University**: https://university.mongodb.com/
- **JWT.io**: https://jwt.io/introduction
- **Mental Health App Design**: https://www.nngroup.com/articles/mental-health-apps/
- **Behavioural Activation**: See `Behavioural-Activation-booklet.pdf` in project root

---

## Notes for AI Agents

1. **Sensitive Data**: This app handles mental health information - always prioritize security and privacy
2. **User Experience**: Target users have low technical skill - keep UI simple and intuitive
3. **Therapeutic Context**: Features are based on Behavioural Activation therapy - understand the clinical reasoning
4. **Accessibility**: Consider users with depression (low energy, low motivation) - minimize friction
5. **Cross-Platform**: Design for both mobile and web from the start
6. **Offline Support** (Future): Users may want to log entries without internet - consider local storage
7. **Data Export**: Users should be able to export their data (for therapist sharing or personal records)

**When in doubt**: Refer to the `app-planning-guide.md` for product decisions, and the `Behavioural-Activation-booklet.pdf` for therapeutic context.

---

## Suggested Agent Tasks (Ordered)

### **Phase 1: Setup (First Hour)**
1. ✅ Read this onboarding document
2. ✅ Read `app-planning-guide.md`
3. ✅ Review `Behavioural-Activation-booklet.pdf`
4. Create initial project structure (frontend + backend folders)
5. Initialize npm projects and install dependencies
6. Set up database connection

### **Phase 2: MVP Development**
6. **Backend API**:
   - Implement authentication (register, login, JWT)
   - Create database models
   - Build CRUD endpoints for diary, activities, schedule
   - Add validation and error handling
7. **Frontend App**:
   - Set up navigation structure
   - Build Dashboard screen
   - Build Diary screen with mood rating
   - Build Activity Library screen
   - Build Scheduler screen
   - Build Progress screen with charts
8. **Integration**: Connect frontend to backend API
9. **Testing**: Write basic tests for critical flows

### **Phase 3: Polish & Launch Prep**
10. UI/UX refinements (minimalist, calming design)
11. Add loading states and error handling
12. Implement proper form validation
13. Add onboarding tutorial
14. Write README.md with setup instructions
15. Prepare for deployment (environment configs, build scripts)

### **Phase 4: Nice-to-Have Features** (Post-Launch)
16. Push notifications for activity reminders
17. Gamification (points, badges, streaks)
18. Community features (anonymous support groups)
19. Therapist integration (share progress with provider)
20. Resource library (articles, videos about mental health)

---

## Quick Reference Commands

```bash
# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (React Native)
cd frontend
npm install
npm run android  # or npm run ios

# Run tests
npm test

# Database (MongoDB)
mongod --dbpath ./data

# Database (PostgreSQL)
createdb therapydiary
psql therapydiary

# Check API health
curl http://localhost:3000/api/health

# View logs
tail -f backend/logs/app.log
```

---

## If Something Is Missing

### **Missing Information Checklist**
- [ ] README.md with setup instructions → **Create one**
- [ ] .gitignore for node_modules and .env → **Add one**
- [ ] .env.example for environment variables → **Create template**
- [ ] API documentation (Swagger/OpenAPI) → **Add for API clarity**
- [ ] Database migrations/seeders → **Set up for consistent dev environment**
- [ ] Testing setup (Jest config) → **Initialize test framework**
- [ ] Pre-populated activity data → **Create seed data based on booklet**
- [ ] Wireframes/mockups → **Create or request from designer**

### **How to Request Information**
If you cannot find:
- Product requirements → Check `app-planning-guide.md`
- Therapeutic context → Review `Behavioural-Activation-booklet.pdf`
- Technical decisions → Ask about tech stack preferences (React Native vs Flutter, MongoDB vs PostgreSQL)
- Design guidelines → Request wireframes or design system
- User personas → See `app-planning-guide.md` (Sarah, Mark, Chloe)

---

## Next Steps for Agent

1. **Immediate**: Set up project structure (frontend + backend folders)
2. **Next**: Initialize backend with Express + database connection
3. **Then**: Create authentication system
4. **Finally**: Build core screens and connect to API

**Remember**: This app helps people with depression - every feature should reduce friction and make it easier for users to engage with the therapeutic process.
