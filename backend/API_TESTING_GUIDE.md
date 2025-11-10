# TherapyDiary API Testing Guide

## 🚀 Getting Started

### Start the Server
```bash
cd backend
npm run dev
```

Server will run on: http://localhost:3000

### Health Check
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "TherapyDiary API is running",
  "timestamp": "2025-11-10T..."
}
```

---

## 📋 API Endpoints

### Authentication Endpoints

#### 1. Register New User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "sarah@example.com",
  "password": "Password123",
  "name": "Sarah",
  "age": 16
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "sarah@example.com",
    "name": "Sarah",
    "age": 16,
    "settings": {
      "notifications": true,
      "reminderTime": "09:00",
      "theme": "system"
    },
    "createdAt": "2025-11-10T..."
  }
}
```

**PowerShell Example:**
```powershell
$body = @{
    email = "sarah@example.com"
    password = "Password123"
    name = "Sarah"
    age = 16
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

---

#### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "sarah@example.com",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

**PowerShell Example:**
```powershell
$body = @{
    email = "sarah@example.com"
    password = "Password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body

# Save token for future requests
$token = $response.token
```

---

#### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "user": { ... }
}
```

**PowerShell Example:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/me" `
    -Headers @{ Authorization = "Bearer $token" }
```

---

### Diary Endpoints

#### 4. Create Diary Entry
**POST** `/api/diary`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "activity": "Went for a 15-minute walk",
  "moodBefore": 5,
  "moodAfter": 7,
  "notes": "Felt refreshing and peaceful",
  "activityId": "507f1f77bcf86cd799439011"
}
```

**Response (201):**
```json
{
  "message": "Diary entry created successfully",
  "entry": {
    "_id": "...",
    "userId": "...",
    "activity": "Went for a 15-minute walk",
    "moodBefore": 5,
    "moodAfter": 7,
    "moodChange": 2,
    "notes": "Felt refreshing and peaceful",
    "timeOfDay": "Morning",
    "timestamp": "2025-11-10T...",
    "activityId": {
      "_id": "...",
      "name": "Go for a walk",
      "category": "Pleasurable",
      "difficulty": "Easiest"
    }
  }
}
```

**PowerShell Example:**
```powershell
$entry = @{
    activity = "Went for a 15-minute walk"
    moodBefore = 5
    moodAfter = 7
    notes = "Felt refreshing!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/diary" `
    -Method Post `
    -Headers @{ Authorization = "Bearer $token" } `
    -ContentType "application/json" `
    -Body $entry
```

---

#### 5. Get All Diary Entries
**GET** `/api/diary?page=1&limit=20`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 20)
- `startDate` (optional, ISO date)
- `endDate` (optional, ISO date)
- `timeOfDay` (optional: Morning, Afternoon, Evening, Night)

**Response (200):**
```json
{
  "entries": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

---

#### 6. Get Entries by Date
**GET** `/api/diary/date/2025-11-10`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "date": "2025-11-10",
  "entries": [ ... ],
  "count": 3
}
```

---

#### 7. Update Diary Entry
**PUT** `/api/diary/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "activity": "Went for a 20-minute walk",
  "moodAfter": 8,
  "notes": "Even better than before!"
}
```

---

#### 8. Delete Diary Entry
**DELETE** `/api/diary/:id`

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Diary entry deleted successfully"
}
```

---

### Activity Endpoints

#### 9. Get All Activities
**GET** `/api/activities?category=Pleasurable&difficulty=Easiest`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `category` (optional: Routine, Necessary, Pleasurable)
- `difficulty` (optional: Easiest, Moderate, Difficult)
- `search` (optional: text search)
- `page` (optional, default: 1)
- `limit` (optional, default: 50)

**Response (200):**
```json
{
  "activities": [
    {
      "_id": "...",
      "name": "Go for a walk",
      "category": "Pleasurable",
      "difficulty": "Easiest",
      "description": "Take a leisurely walk outdoors",
      "estimatedDuration": 30,
      "tags": ["physical", "outdoor", "nature"],
      "isCustom": false,
      "isPrePopulated": true
    }
  ],
  "pagination": { ... }
}
```

**PowerShell Example:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/activities?category=Pleasurable" `
    -Headers @{ Authorization = "Bearer $token" }
```

---

#### 10. Get Activities by Category
**GET** `/api/activities/category/Pleasurable`

**Headers:**
```
Authorization: Bearer {token}
```

---

#### 11. Get Activities by Difficulty
**GET** `/api/activities/difficulty/Easiest`

**Headers:**
```
Authorization: Bearer {token}
```

---

#### 12. Create Custom Activity
**POST** `/api/activities`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Play guitar",
  "category": "Pleasurable",
  "difficulty": "Moderate",
  "description": "Practice guitar for relaxation",
  "estimatedDuration": 45,
  "tags": ["music", "creative", "indoor"]
}
```

---

#### 13. Update Custom Activity
**PUT** `/api/activities/:id`

**Headers:**
```
Authorization: Bearer {token}
```

---

#### 14. Update Activity Ranking
**PATCH** `/api/activities/:id/rank`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "difficulty": "Easiest"
}
```

---

#### 15. Delete Custom Activity
**DELETE** `/api/activities/:id`

**Headers:**
```
Authorization: Bearer {token}
```

---

## 🧪 Complete Test Flow

### 1. Register a User
```powershell
$register = @{
    email = "test@example.com"
    password = "Test123456"
    name = "Test User"
    age = 25
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $register

$token = $response.token
Write-Host "Token: $token"
```

### 2. Get Activities
```powershell
$activities = Invoke-RestMethod -Uri "http://localhost:3000/api/activities?category=Pleasurable&limit=5" `
    -Headers @{ Authorization = "Bearer $token" }

$walkActivity = $activities.activities[0]
Write-Host "Activity: $($walkActivity.name)"
```

### 3. Create Diary Entry
```powershell
$entry = @{
    activity = "Went for a walk in the park"
    activityId = $walkActivity._id
    moodBefore = 4
    moodAfter = 7
    notes = "Really helped clear my mind"
} | ConvertTo-Json

$newEntry = Invoke-RestMethod -Uri "http://localhost:3000/api/diary" `
    -Method Post `
    -Headers @{ Authorization = "Bearer $token" } `
    -ContentType "application/json" `
    -Body $entry

Write-Host "Diary entry created! Mood improved by: $($newEntry.entry.moodChange)"
```

### 4. Get Today's Entries
```powershell
$today = Get-Date -Format "yyyy-MM-dd"
$entries = Invoke-RestMethod -Uri "http://localhost:3000/api/diary/date/$today" `
    -Headers @{ Authorization = "Bearer $token" }

Write-Host "Entries today: $($entries.count)"
```

### 5. Create Custom Activity
```powershell
$customActivity = @{
    name = "Meditation practice"
    category = "Pleasurable"
    difficulty = "Moderate"
    description = "10 minutes of mindfulness meditation"
    estimatedDuration = 10
    tags = @("relaxation", "mental-health", "indoor")
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/activities" `
    -Method Post `
    -Headers @{ Authorization = "Bearer $token" } `
    -ContentType "application/json" `
    -Body $customActivity
```

---

## 🔒 Security Notes

- All protected endpoints require `Authorization: Bearer {token}` header
- Tokens expire after 7 days
- Passwords must be at least 8 characters with uppercase, lowercase, and number
- Users can only access their own data

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Please provide a valid email address",
      "value": "invalid-email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required",
  "message": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Entry not found",
  "message": "Diary entry does not exist or you do not have permission to view it"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create diary entry",
  "message": "An error occurred"
}
```

---

## 📊 Next Steps

### Seed the Database
```bash
npm run seed
```

This will populate 70+ pre-defined activities!

### Test with Real Data
1. Register a user
2. Browse activities
3. Create diary entries
4. View mood trends

---

**Happy Testing! 🎉**
