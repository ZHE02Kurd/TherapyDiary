# Database Models Documentation

This document describes the database schema and models for the TherapyDiary application.

## Overview

The database uses MongoDB with Mongoose ODM. All models include timestamps (`createdAt`, `updatedAt`) and appropriate indexes for performance.

## Models

### 1. User

Stores user account information and preferences.

**Fields:**
- `email` (String, required, unique) - User's email address
- `passwordHash` (String, required) - Bcrypt hashed password
- `name` (String, required) - User's display name
- `age` (Number, optional) - User's age (14-120)
- `settings` (Object)
  - `notifications` (Boolean, default: true)
  - `reminderTime` (String, default: "09:00")
  - `theme` (String, enum: light/dark/system)
- `createdAt` (Date) - Account creation timestamp
- `updatedAt` (Date) - Last update timestamp

**Methods:**
- `comparePassword(candidatePassword)` - Compare plain text password with hash
- `toJSON()` - Override to exclude sensitive fields

**Security Features:**
- Automatic password hashing on save
- Password validation removed from JSON output
- Bcrypt with 10 salt rounds

---

### 2. Activity

Represents activities in the library (both pre-populated and user-custom).

**Fields:**
- `userId` (ObjectId, ref: User) - null for pre-populated activities
- `name` (String, required) - Activity name
- `category` (String, required) - "Routine", "Necessary", or "Pleasurable"
- `difficulty` (String, required) - "Easiest", "Moderate", or "Difficult"
- `description` (String, optional) - Activity description
- `estimatedDuration` (Number) - Duration in minutes (1-480)
- `tags` (Array of Strings) - Searchable tags
- `isCustom` (Boolean) - Automatically true if userId is set
- `isActive` (Boolean, default: true) - Soft delete flag
- `createdAt` (Date)
- `updatedAt` (Date)

**Virtual Fields:**
- `isPrePopulated` - Returns true if userId is null

**Indexes:**
- `userId + isActive` - Query active activities for user
- `category + difficulty` - Filter by category and difficulty
- `tags` - Search by tags
- Text index on `name` and `description` for full-text search

---

### 3. DiaryEntry

Daily activity logs with mood ratings.

**Fields:**
- `userId` (ObjectId, ref: User, required)
- `activity` (String, required) - Description of what was done
- `activityId` (ObjectId, ref: Activity, optional) - Link to activity library
- `moodBefore` (Number, 1-10, optional) - Mood before activity
- `moodAfter` (Number, 1-10, required) - Mood after activity
- `notes` (String, optional) - Additional notes (max 1000 chars)
- `timeOfDay` (String) - "Morning", "Afternoon", "Evening", or "Night"
- `timestamp` (Date, required) - When activity occurred
- `createdAt` (Date)
- `updatedAt` (Date)

**Virtual Fields:**
- `moodChange` - Calculated difference between moodAfter and moodBefore

**Indexes:**
- `userId + timestamp` (descending) - List entries by date
- `userId + timeOfDay` - Filter by time of day
- `activityId` - Link to activities
- `timestamp` (descending) - Sort by date

---

### 4. ScheduledActivity

Planned activities on the calendar.

**Fields:**
- `userId` (ObjectId, ref: User, required)
- `activityId` (ObjectId, ref: Activity, required)
- `activityName` (String, required) - Denormalized for quick display
- `scheduledDate` (Date, required) - Date of activity
- `scheduledTime` (String, required) - Time in HH:MM format
- `completed` (Boolean, default: false)
- `completedAt` (Date, optional)
- `diaryEntryId` (ObjectId, ref: DiaryEntry, optional) - Link to log entry
- `notes` (String, optional)
- `reminderSent` (Boolean, default: false)
- `createdAt` (Date)
- `updatedAt` (Date)

**Virtual Fields:**
- `isOverdue` - True if past scheduled time and not completed
- `isToday` - True if scheduled for today

**Methods:**
- `markComplete()` - Set completed flag and timestamp

**Indexes:**
- `userId + scheduledDate` - Query by user and date
- `userId + completed` - Filter completed/incomplete
- `activityId` - Link to activities
- `scheduledDate + scheduledTime` - Sort chronologically

---

### 5. MoodLog

Aggregated daily mood statistics (generated from diary entries).

**Fields:**
- `userId` (ObjectId, ref: User, required)
- `date` (Date, required) - Date (start of day)
- `averageMoodBefore` (Number, 1-10)
- `averageMoodAfter` (Number, 1-10)
- `moodChange` (Number) - Average mood improvement
- `entryCount` (Number) - Number of diary entries
- `entries` (Array of ObjectIds, ref: DiaryEntry)
- `activitiesCompleted` (Number)
- `categories` (Object)
  - `Routine` (Number)
  - `Necessary` (Number)
  - `Pleasurable` (Number)
- `createdAt` (Date)
- `updatedAt` (Date)

**Static Methods:**
- `calculateForDate(userId, date)` - Recalculate mood log for specific date

**Virtual Fields:**
- `formattedDate` - ISO date string (YYYY-MM-DD)

**Indexes:**
- `userId + date` (unique) - One mood log per user per day
- `userId + date` (descending) - Query recent mood logs

---

## Relationships

```
User (1) ─── (Many) DiaryEntry
User (1) ─── (Many) Activity (custom)
User (1) ─── (Many) ScheduledActivity
User (1) ─── (Many) MoodLog

Activity (1) ─── (Many) DiaryEntry
Activity (1) ─── (Many) ScheduledActivity

DiaryEntry (1) ─── (1) ScheduledActivity (optional)
DiaryEntry (Many) ─── (1) MoodLog
```

---

## Data Flow

### Creating a Diary Entry
1. User logs activity → `DiaryEntry` created
2. MoodLog for that date is recalculated
3. If activity was scheduled → Link `ScheduledActivity` to `DiaryEntry`

### Scheduling an Activity
1. User picks activity from `Activity` library
2. `ScheduledActivity` created with date/time
3. (Optional) Reminder sent at scheduled time
4. When completed → Mark as complete and create `DiaryEntry`

### Mood Tracking
1. User creates multiple `DiaryEntry` records throughout day
2. `MoodLog.calculateForDate()` aggregates all entries for that day
3. `MoodLog` stored for quick retrieval of historical data

---

## Seed Data

The application includes **70+ pre-populated activities**:
- **12 Routine activities** (daily self-care)
- **15 Necessary activities** (responsibilities)
- **43 Pleasurable activities** (enjoyment & social)

To seed the database:
```bash
npm run seed
```

This will:
1. Clear existing pre-populated activities
2. Insert all activities from `seedData.js`
3. Display summary by category

---

## Indexes Strategy

All models are indexed for optimal query performance:

**Most Common Queries:**
1. Get diary entries for user by date → `userId + timestamp`
2. Get scheduled activities for user by date → `userId + scheduledDate`
3. Get mood history for user → `userId + date`
4. Search activities by category/difficulty → `category + difficulty`
5. Full-text search activities → Text index on `name` and `description`

---

## Data Validation

All models include:
- Required field validation
- Data type validation
- Range validation (mood: 1-10, age: 14-120)
- Enum validation (category, difficulty, time of day)
- Max length validation for text fields
- Email format validation
- Time format validation (HH:MM)

---

## Security Considerations

1. **Password Security**
   - Bcrypt hashing with 10 rounds
   - Passwords never stored in plain text
   - Password removed from JSON output

2. **Soft Deletes**
   - Activities use `isActive` flag instead of hard delete
   - Preserves data integrity for historical records

3. **Data Privacy**
   - Mental health data is sensitive
   - All queries scoped to authenticated user
   - No sharing between users without explicit consent

---

## Migration Strategy

For future schema changes:
1. Create migration script in `src/scripts/migrations/`
2. Version migrations (e.g., `001_add_avatar_field.js`)
3. Test on staging database first
4. Document changes in this file

---

## Performance Notes

- **Compound Indexes**: Most queries use compound indexes (userId + date/timestamp)
- **Virtuals**: Computed fields (like `moodChange`) don't take storage space
- **Denormalization**: `activityName` stored in ScheduledActivity for quick display
- **Aggregation**: MoodLog pre-aggregates data to avoid expensive calculations

---

## Example Usage

### Create a User
```javascript
const user = new User({
  email: 'sarah@example.com',
  passwordHash: 'password123', // Will be auto-hashed
  name: 'Sarah',
  age: 16
});
await user.save();
```

### Log a Diary Entry
```javascript
const entry = new DiaryEntry({
  userId: user._id,
  activity: 'Went for a 15-minute walk',
  activityId: walkActivity._id,
  moodBefore: 5,
  moodAfter: 7,
  notes: 'Felt refreshing!'
});
await entry.save();

// Update mood log
await MoodLog.calculateForDate(user._id, new Date());
```

### Schedule an Activity
```javascript
const scheduled = new ScheduledActivity({
  userId: user._id,
  activityId: readingActivity._id,
  activityName: 'Read a book',
  scheduledDate: new Date('2025-11-11'),
  scheduledTime: '19:00'
});
await scheduled.save();
```

### Query Mood History
```javascript
const moodHistory = await MoodLog
  .find({ userId: user._id })
  .sort({ date: -1 })
  .limit(30); // Last 30 days
```

---

For API endpoint documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
