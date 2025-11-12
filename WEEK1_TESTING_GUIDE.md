# Week 1 Testing Guide

## Overview
This guide walks through testing the complete Week 1 Behavioural Activation flow from user registration through daily baseline diary logging.

## Prerequisites
- ✅ Backend server running on `http://localhost:3000`
- ✅ MongoDB Atlas connected
- ✅ Database seeded with Week 1 session content
- Frontend running on Expo

## Test Flow

### 1. User Registration/Login
**Steps:**
1. Open the app
2. Navigate to Register screen
3. Create a new account (or login with existing)
4. Verify login redirects to HomeScreen

**Expected Result:**
- User is authenticated
- JWT token stored
- Redirected to HomeScreen with personalized greeting

---

### 2. HomeScreen Dashboard
**Steps:**
1. Observe the HomeScreen layout
2. Check current week card shows "Session 1: Behavioural Activation"
3. Verify task shows "Keep a Baseline Diary"
4. Check progress bar shows "Day 1 of 7 completed"

**Expected Result:**
```
✅ Greeting: "Good morning/afternoon/evening, [Name]!"
✅ Therapist welcome message displayed
✅ Current Week Card shows:
   - 📘 Session 1: Behavioural Activation
   - Task: Keep a Baseline Diary
   - Progress: Day 1 of 7 completed (0%)
   - 0 entries logged this week
✅ Quick Actions section with 3 buttons
✅ Journey section shows:
   - Session 1: Current (highlighted)
   - Sessions 2-5: Locked 🔒
```

---

### 3. Read Weekly Session Content
**Steps:**
1. Tap "Re-read This Week's Session" OR "Continue Task" button
2. Read through the educational content
3. Scroll through all sections:
   - Introduction (with therapist message)
   - What is Behavioural Activation?
   - The vicious cycle
   - How does Behavioural Activation work?
   - Terry's story
   - Task instructions
4. Tap "Start Task" button at bottom

**Expected Result:**
- Therapist messages appear with avatar
- Content is readable and well-formatted
- "Mark Complete" and "Start Task" buttons visible
- Tapping "Start Task" navigates to DailyTaskScreen

---

### 4. Daily Task Screen
**Steps:**
1. Observe the daily task layout
2. Check day name (e.g., "Tuesday, January 28")
3. Check encouraging message
4. Verify "+ Add Activity Entry" button visible

**Expected Result:**
```
✅ Week title: "Session 1: Behavioural Activation"
✅ Task description: "Keep a Baseline Diary"
✅ Today's date and day name
✅ Encouraging message: "Let's start logging your first activity!"
✅ Empty state initially (no entries yet)
✅ Floating "+ Add Activity Entry" button
```

---

### 5. Log First Activity Entry
**Steps:**
1. Tap "+ Add Activity Entry" button
2. Fill out the form:
   - **Time of Day:** Select "Morning" (or current time)
   - **Activity:** Type "Had breakfast with family"
   - **Location:** Type "Home"
   - **With Whom:** Type "My family"
   - **Mood Before:** Type "Tired and unmotivated"
   - **Mood After:** Type "A bit more energized"
   - **Notes:** (optional) "Nice to connect with everyone"
3. Tap "Save Entry" button

**Expected Result:**
- Form validation works (required fields highlighted if empty)
- Success message appears
- Navigates back to DailyTaskScreen
- New entry card appears showing the activity

---

### 6. Verify Entry on Daily Task Screen
**Steps:**
1. Observe the entry card
2. Check all information is displayed
3. Verify mood before/after are shown

**Expected Result:**
```
✅ Entry card shows:
   - 🌅 Morning (icon based on time of day)
   - "Had breakfast with family"
   - 📍 Home · 👥 My family
   - 😐 Before: Tired and unmotivated
   - 🙂 After: A bit more energized
✅ Entry count updated: "1 activity logged today"
✅ Encouraging message updated
```

---

### 7. Add Multiple Entries (Same Day)
**Steps:**
1. Tap "+ Add Activity Entry" again
2. Log 2-3 more activities throughout the day:
   - **Morning:** "Morning walk" → "Outside" → "Alone" → Moods
   - **Afternoon:** "Read a book" → "Living room" → "Alone" → Moods
   - **Evening:** "Watched TV with partner" → "Home" → "Partner" → Moods
3. Save each entry

**Expected Result:**
- Multiple entry cards appear on DailyTaskScreen
- Entry count updates: "4 activities logged today"
- Encouraging message changes: "Great progress! You've logged 4 activities."

---

### 8. View Week Progress
**Steps:**
1. From DailyTaskScreen, tap back to HomeScreen
2. Tap "View This Week's Progress"
3. Observe the WeekProgressScreen layout
4. Check days section

**Expected Result:**
```
✅ Stats show:
   - "1 of 7 Days Completed"
   - "4 Activities Logged"
✅ Day sections 1-7 displayed
✅ Day 1 (today) expanded with 4 entry cards
✅ Days 2-7 show as empty with "+ Log activities for Day X"
✅ "Complete Week & Continue" button visible but may be disabled (need 7 days)
```

---

### 9. Simulate Multi-Day Logging
**To fully test the week progression:**

**Day 2:**
1. Change device/system date to tomorrow (or wait 24 hours)
2. Navigate to DailyTaskScreen
3. Log 3-5 activities
4. Check WeekProgressScreen shows Day 2 entries

**Day 3-7:**
1. Repeat for each day
2. Log at least 1-2 activities per day
3. Verify progress bar updates on HomeScreen

**Expected Result:**
- Progress bar increments: "Day 2 of 7", "Day 3 of 7", etc.
- Total entry count increases
- WeekProgressScreen shows all days populated
- When 7 days completed, "Complete Week & Continue" button becomes enabled

---

### 10. Complete Week 1
**Steps:**
1. After logging entries for 7 days
2. Go to WeekProgressScreen
3. Review all entries across all days
4. Tap "Complete Week & Continue" button

**Expected Result:**
- (PENDING IMPLEMENTATION) Week complete celebration screen
- User progress updates to Week 2
- Week 2 becomes unlocked
- Redirect to HomeScreen showing Week 2 as current

---

## Current Status

### ✅ Completed Features
- User authentication (login/register)
- Session model with educational content
- UserProgress model tracking journey
- DailyEntry model for baseline diary
- Week 1 content seeded from PDF
- HomeScreen dashboard with current week display
- WeeklySessionScreen for reading content
- DailyTaskScreen for daily logging
- AddEntryScreen for activity entry form
- WeekProgressScreen for week overview
- Navigation routes connected
- API endpoints functional

### 🚧 Pending Features
- Example Diary screen (Terry's entries)
- Week Complete celebration screen
- Week 2-5 content and sessions
- Bottom tab navigation redesign
- Notifications/reminders
- Data persistence across app restarts
- Offline support

---

## Testing Notes

### API Endpoints Used
```
GET  /api/sessions/user/progress        → User's current week and stats
GET  /api/sessions/:weekNumber          → Session educational content
POST /api/sessions/:weekNumber/read     → Mark session as read
POST /api/daily-entries                 → Create new activity entry
GET  /api/daily-entries/week/:weekNum   → Get all week entries
GET  /api/daily-entries/day/:weekNum/:dayNum → Get day entries
PUT  /api/daily-entries/:id             → Update entry
DELETE /api/daily-entries/:id           → Delete entry
POST /api/daily-entries/week/:weekNum/complete → Complete week
```

### Common Issues & Fixes

**Issue:** "Network Error" when logging entry
- **Fix:** Ensure backend is running on port 3000
- **Fix:** Check MongoDB Atlas connection in .env
- **Fix:** Verify frontend API base URL matches backend

**Issue:** Progress not updating
- **Fix:** Pull-to-refresh on HomeScreen
- **Fix:** Restart app to reload auth context

**Issue:** Can't see new entries
- **Fix:** Navigate away and back to DailyTaskScreen
- **Fix:** Check console for API errors

---

## Next Steps After Testing

1. **Implement Week Complete Screen:**
   - Celebratory message with stats
   - Patterns identified (which activities improved mood)
   - Unlock Week 2 button

2. **Build Example Diary Screen:**
   - Show Terry's baseline diary entries
   - Accessible from session and task screens
   - Help users understand format

3. **Create Weeks 2-5 Content:**
   - Extract content from PDF for remaining weeks
   - Create data files (week2Content.js, etc.)
   - Seed database with all sessions

4. **Redesign Bottom Navigation:**
   - Change from Home/Diary/Activities/Analytics/Profile
   - To Home/This Week/My Journey/Help

5. **Add Notifications:**
   - Daily reminders to log activities
   - Week completion notifications
   - Encouragement messages

---

## Success Criteria

Week 1 is fully functional when:
- ✅ User can read Session 1 educational content
- ✅ User can log baseline diary entries daily
- ✅ User can view week progress with all entries
- ✅ Progress bar updates correctly
- ✅ Entry count is accurate
- ✅ User can complete Week 1 and unlock Week 2
- ✅ Data persists across app sessions
- ✅ No crashes or errors during normal flow

---

## Test Checklist

- [ ] User registration works
- [ ] Login redirects to HomeScreen
- [ ] HomeScreen shows current week card
- [ ] Journey section displays locked/unlocked weeks
- [ ] Can navigate to WeeklySessionScreen
- [ ] Educational content displays correctly
- [ ] Therapist messages appear with avatar
- [ ] Can navigate to DailyTaskScreen
- [ ] "+ Add Activity Entry" opens form
- [ ] Form validation works
- [ ] Can save activity entry
- [ ] Entry appears on DailyTaskScreen
- [ ] Can add multiple entries same day
- [ ] WeekProgressScreen shows all days
- [ ] Entry counts are accurate
- [ ] Progress bar updates correctly
- [ ] Can complete 7 days of logging
- [ ] Week complete button becomes enabled
- [ ] Pull-to-refresh updates data
- [ ] Back navigation works correctly
- [ ] No console errors during flow
