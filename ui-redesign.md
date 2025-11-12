# UI Redesign - Therapist-Guided Journey

## Core Philosophy
The app should feel like having a **personal therapist guiding you** through each step. Warm, supportive, conversational, and educational.

**Structure**: 
- ONE session per week (educational content + explanation)
- ONE task for the entire week (daily completion)
- Users return daily to complete that week's task

---

## Main Screens

### 1. Weekly Session Screen (Educational Content)
This is the main session - presented ONCE per week. Users read through all the educational material.

**Week 1: Session One - Introduction to Behavioural Activation**

```
+------------------------------------------------------+
| Session 1: Behavioural Activation                    |
| [Progress: Session 1 of 5]                  [Profile]|
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "Welcome to your first session. I'm so glad         |
| you're here. Let's talk about Behavioural            |
| Activation and how it can help you."                 |
|                                                      |
| [Continue Reading ↓]                                 |
+------------------------------------------------------+
```

**Scrollable content (full session material):**

```
+------------------------------------------------------+
| What is Behavioural Activation?                      |
+------------------------------------------------------+
|                                                      |
| Behavioural Activation is an evidence based coping   |
| technique for the treatment of low mood or           |
| depression, recommended by the National Institute    |
| for Health and Care Excellence (NICE, 2009).         |
|                                                      |
| [Therapist Avatar]                                   |
| "This isn't just theory - this approach has been     |
| proven to work. It's recommended by medical          |
| professionals because it really does help people     |
| feel better."                                        |
|                                                      |
+------------------------------------------------------+
| Who is this for?                                     |
+------------------------------------------------------+
|                                                      |
| You may find this helpful if you have noticed your   |
| low mood or depression has stopped you from doing    |
| your usual activities, such as the things you        |
| normally enjoy.                                      |
|                                                      |
| [Therapist Avatar]                                   |
| "Does this sound familiar? Have you noticed          |
| pulling away from things you used to do? That's      |
| actually very common, and we're going to work on     |
| that together."                                      |
|                                                      |
+------------------------------------------------------+
| How does this workbook work?                         |
+------------------------------------------------------+
|                                                      |
| Behavioural Activation has five steps. It is         |
| important to work through one step at a time, only   |
| move on to the next step once you are comfortable    |
| with the previous one.                               |
|                                                      |
| [Five Steps Overview:]                               |
| 1️⃣ Keep a baseline diary of your activities         |
| 2️⃣ Identify activity types                           |
| 3️⃣ Rank activities by difficulty                     |
| 4️⃣ Schedule activities                                |
| 5️⃣ Maintain progress                                  |
|                                                      |
| [Therapist Avatar]                                   |
| "We'll take this one step at a time. No rushing.     |
| Each week focuses on just one step, so you can       |
| really understand it before moving forward."         |
|                                                      |
+------------------------------------------------------+
| Understanding the Vicious Cycle                      |
+------------------------------------------------------+
|                                                      |
| When we are feeling low in mood, we may find it      |
| difficult to carry out everyday activities and       |
| find ourselves withdrawing and avoiding them.        |
|                                                      |
| [Diagram: The Vicious Cycle of Low Mood]             |
|                                                      |
|         ┌─────────────────────┐                      |
|         │   Negative          │                      |
|         │   Thoughts          │                      |
|         └──────────┬──────────┘                      |
|                    │                                 |
|         ┌──────────▼──────────┐                      |
|         │  Low Mood/          │                      |
|         │  Depression         │                      |
|         └──────────┬──────────┘                      |
|                    │                                 |
|         ┌──────────▼──────────┐                      |
|         │  Withdraw from      │                      |
|         │  Activities         │                      |
|         └──────────┬──────────┘                      |
|                    │                                 |
|         ┌──────────▼──────────┐                      |
|         │  Less Achievement   │                      |
|         │  Less Connection    │                      |
|         │  Less Enjoyment     │                      |
|         └──────────┬──────────┘                      |
|                    │                                 |
|                    └──────────(feeds back)           |
|                                                      |
| [Therapist Avatar]                                   |
| "See how it's a cycle? When we feel low, we stop     |
| doing things. But stopping makes us feel worse,      |
| which makes us want to do even less. Behavioural     |
| Activation helps us break this cycle."               |
|                                                      |
+------------------------------------------------------+
| [Interactive Exercise]                               |
| Your Own Vicious Cycle                               |
+------------------------------------------------------+
|                                                      |
| [Therapist Avatar]                                   |
| "Let's make this personal to you. Take a moment      |
| to think about YOUR vicious cycle. Tap each box      |
| to add your own notes."                              |
|                                                      |
| [Tappable diagram with text fields:]                 |
|                                                      |
| Thoughts: [What thoughts do you have when low?]      |
| ________________________________________________     |
|                                                      |
| Emotions: [What emotions do you feel?]               |
| ________________________________________________     |
|                                                      |
| Physical: [How does it affect you physically?]       |
| ________________________________________________     |
|                                                      |
| Behaviour: [What have you stopped doing?]            |
| ________________________________________________     |
|                                                      |
| [Save My Cycle]                                      |
|                                                      |
+------------------------------------------------------+
| How Does Behavioural Activation Help?                |
+------------------------------------------------------+
|                                                      |
| 1. Activity can improve our energy                   |
|                                                      |
| [Therapist Avatar]                                   |
| "This might sound backwards, but we need to 'do'     |
| first to get motivation back. Think of it as         |
| 'activation before motivation.' You don't need to    |
| wait to feel better - action comes first."           |
|                                                      |
| 2. Activity gives us a sense of achievement          |
|                                                      |
| [Therapist Avatar]                                   |
| "When we complete tasks, even small ones, we get     |
| that satisfaction back. Each thing you do is a       |
| small win."                                          |
|                                                      |
| 3. Activity helps us connect with others             |
|                                                      |
| [Therapist Avatar]                                   |
| "Low mood can make us isolate ourselves. But         |
| connection is so important for feeling better.       |
| We'll work on bringing people back into your life."  |
|                                                      |
| 4. Activity gives us different focus                 |
|                                                      |
| [Therapist Avatar]                                   |
| "When we have nothing to do, we tend to dwell on     |
| negative thoughts. Activity gives your mind          |
| something else to focus on."                         |
|                                                      |
| 5. Activity helps build need for sleep               |
|                                                      |
| [Therapist Avatar]                                   |
| "When we're not active during the day, we often      |
| can't sleep at night. Being active helps regulate    |
| your sleep cycle naturally."                         |
|                                                      |
+------------------------------------------------------+
| Meet Terry - A Case Story                            |
+------------------------------------------------------+
|                                                      |
| [Therapist Avatar]                                   |
| "Let me tell you about Terry. They're 68, retired,  |
| and care for their partner. Sound familiar? Here's   |
| their story..."                                      |
|                                                      |
| Terry stopped going to their social club after       |
| retirement and began putting off daily tasks. Their  |
| partner noticed they were irritable and had low      |
| energy.                                              |
|                                                      |
| Through Behavioural Activation, Terry:               |
| • Recognized they'd withdrawn from activities        |
| • Started keeping a diary to see patterns            |
| • Set regular bed times and meal times               |
| • Broke down difficult tasks into small steps        |
| • Gradually increased their activity levels          |
|                                                      |
| Today, Terry feels more energized and connected.     |
|                                                      |
| [See Terry's Example Diary →]                        |
|                                                      |
+------------------------------------------------------+
| Your Task This Week                                  |
+------------------------------------------------------+
|                                                      |
| [Therapist Avatar]                                   |
| "Now that you understand what Behavioural            |
| Activation is and why it works, here's what I want   |
| you to do this week..."                              |
|                                                      |
+------------------------------------------------------+
| 📋 WEEK 1 TASK:                                      |
| Keep a Baseline Diary                                |
+------------------------------------------------------+
|                                                      |
| Why complete a baseline diary?                       |
|                                                      |
| In Behavioural Activation, it's helpful to see how   |
| your low mood has affected your activities and       |
| routines. This helps identify what you've            |
| withdrawn from and how it impacts your mood.         |
|                                                      |
| [Therapist Avatar]                                   |
| "This week, I want you to track your activities      |
| each day. Don't change anything - just write down    |
| what you're currently doing. This gives us a         |
| starting point."                                     |
|                                                      |
| How to complete it:                                  |
|                                                      |
| • Write down activities as you do them throughout    |
|   the day (work, chores, anything at home, even      |
|   time in bed)                                       |
|                                                      |
| • Rate your mood BEFORE the activity                 |
|   (Low, Tired, Fed Up, Worried, etc.)                |
|                                                      |
| • Rate your mood AFTER the activity                  |
|   (Better, Same, Worse, Relieved, etc.)              |
|                                                      |
| • Fill it out just as things are for you right now   |
|   - be honest, no judgment                           |
|                                                      |
| [View Example: Terry's Baseline Diary]               |
|                                                      |
| [Therapist Avatar]                                   |
| "Come back each day this week to fill out your       |
| diary. I'll be here to support you. At the end of    |
| the week, we'll review it together in Session 2."    |
|                                                      |
+------------------------------------------------------+
| [✓ Mark Session Complete] [Start This Week's Task →]|
+------------------------------------------------------+
```

---

### 2. Daily Task Screen (Returning Each Day)

Users come back to this screen each day throughout the week to complete their diary entry.

```
+------------------------------------------------------+
| Week 1 Task: Baseline Diary                [Profile]|
+------------------------------------------------------+
| Session 1 of 5 | Day 2 of 7                          |
|                                                      |
| [Therapist Avatar]                                   |
|                                                      |
| "Good morning! Welcome back. Ready to log today's    |
| activities?                                          |
|                                                      |
| Remember, just track what you're doing naturally -   |
| no need to change anything yet. We're just           |
| observing patterns."                                 |
|                                                      |
+------------------------------------------------------+
| TODAY'S ENTRIES:                                     |
|                                                      |
| ✓ Morning: Stayed in bed late                        |
|   Mood before: Low → Mood after: Low                 |
|                                                      |
| [+ Add Activity Entry]                               |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| 💡 Tip: Try to log at least 3 activities today       |
|                                                      |
| [View This Week's Progress]                          |
| [Need Help? View Example Diary]                      |
|                                                      |
+------------------------------------------------------+
| [Home] [This Week's Task] [Progress] [Help]         |
+------------------------------------------------------+
```

---

### 3. Activity Entry Form (Diary Entry)

When user taps "+ Add Activity Entry":

```
+------------------------------------------------------+
| Log Activity                              [Close ✕] |
+------------------------------------------------------+
|                                                      |
| [Therapist Avatar]                                   |
| "Let's record what you did."                         |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| Time of Day:                                         |
| [○ Morning] [○ Afternoon] [○ Evening]               |
|                                                      |
| What did you do?                                     |
| [Text input: e.g., "Went for a walk"]               |
|                                                      |
| Where?                                               |
| [Text input: e.g., "At home", "Park"]               |
|                                                      |
| What time?                                           |
| [Time picker: 2:30 PM]                               |
|                                                      |
| Who were you with?                                   |
| [Text input: e.g., "Alone", "Friend", "Partner"]    |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| How was your mood BEFORE this activity?              |
| [Text input: e.g., "Low", "Tired", "Worried"]       |
|                                                      |
| How was your mood AFTER this activity?               |
| [Text input: e.g., "Better", "Same", "Relieved"]    |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| Any additional notes? (Optional)                     |
| [Text area: Multi-line input]                        |
|                                                      |
| [Save Entry]                                         |
|                                                      |
+------------------------------------------------------+
```

**After saving:**

```
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "Well done! You've logged another activity.          |
| I can see you're doing the work. Keep it up!"        |
|                                                      |
| [Log Another Activity] [View Today's Diary]          |
+------------------------------------------------------+
```

---

### 4. Week Progress View

Shows all diary entries for the current week:

```
+------------------------------------------------------+
| Week 1: Your Baseline Diary                          |
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "Here's what you've tracked so far this week:"       |
|                                                      |
+------------------------------------------------------+
|                                                      |
| MONDAY                                               |
| --------------------------------------------------  |
| Morning: Stayed in bed late                          |
| Mood: Low → Low                                      |
|                                                      |
| Afternoon: Did some laundry                          |
| Mood: Low → Felt I had achieved                      |
|                                                      |
| Evening: Watched TV, went to bed early               |
| Mood: Low, tired → Low, tired                        |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| TUESDAY                                              |
| --------------------------------------------------  |
| Morning: Did breakfast for myself and partner        |
| Mood: Low → A bit happier                            |
|                                                      |
| Afternoon: Had some caring tasks                     |
| Mood: Low → Low but pleased to help                  |
|                                                      |
| [+ Add Today's Activities]                           |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| WEDNESDAY - Not yet recorded                         |
| THURSDAY - Not yet recorded                          |
| FRIDAY - Not yet recorded                            |
| SATURDAY - Not yet recorded                          |
| SUNDAY - Not yet recorded                            |
|                                                      |
+------------------------------------------------------+
| Days Completed: 2 of 7                               |
| Total Activities Logged: 5                           |
|                                                      |
| [Continue]                                           |
+------------------------------------------------------+
```

---

### 5. Week Complete / Transition to Next Session

At the end of Week 1:

```
+------------------------------------------------------+
| Week 1 Complete! 🎉                                  |
+------------------------------------------------------+
| [Therapist Avatar - warm, proud expression]          |
|                                                      |
| "You did it! You completed your first week of        |
| Behavioural Activation.                              |
|                                                      |
| Let me show you what you've accomplished..."         |
|                                                      |
+------------------------------------------------------+
| YOUR WEEK 1 SUMMARY:                                 |
|                                                      |
| ✓ Completed 7 days of diary tracking                 |
| ✓ Logged 21 activities total                         |
| ✓ Identified mood patterns                           |
|                                                      |
| What I've noticed:                                   |
| • Your mood improved after social activities         |
| • Physical activities helped boost energy            |
| • You felt achievement when completing tasks         |
| • Staying in bed tended to keep mood low             |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| [Therapist Avatar]                                   |
| "These patterns are really valuable. In our next     |
| session, we'll use what you learned to identify      |
| different types of activities that can help boost    |
| your mood.                                           |
|                                                      |
| You've taken the first important step. I'm proud    |
| of you for showing up and doing the work."           |
|                                                      |
| [View My Full Diary]                                 |
| [Continue to Session 2 →]                            |
|                                                      |
+------------------------------------------------------+
```

---

### 6. Example Diary View (Terry's Example)

Accessible from the session and task screens:

```
+------------------------------------------------------+
| Example: Terry's Baseline Diary                      |
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "Here's an example from Terry to help guide you:"    |
|                                                      |
+------------------------------------------------------+
| MONDAY                                               |
| --------------------------------------------------  |
| Morning:                                             |
| Stayed in bed late                                   |
| Mood before: Low                                     |
| Mood after: Low                                      |
|                                                      |
| Afternoon:                                           |
| Did some laundry by myself                           |
| Mood before: Low                                     |
| Mood after: Felt I had achieved                      |
|                                                      |
| Evening:                                             |
| Watched TV and went to bed early                     |
| Mood before: Low, tired                              |
| Mood after: Low, tired                               |
|                                                      |
| --------------------------------------------------  |
| TUESDAY                                              |
| --------------------------------------------------  |
| Morning:                                             |
| Did breakfast for myself and partner                 |
| Mood before: Low                                     |
| Mood after: A bit happier                            |
|                                                      |
| Afternoon:                                           |
| Had some caring tasks to do for my partner           |
| Mood before: Low                                     |
| Mood after: Low but pleased to help                  |
|                                                      |
| Evening:                                             |
| Sat on sofa, felt tired and was worrying             |
| Mood before: Low, tired                              |
| Mood after: Worried                                  |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| [View Full Week] [Close]                             |
|                                                      |
+------------------------------------------------------+
```

---

### 7. Home/Dashboard Screen

Main navigation hub:

```
+------------------------------------------------------+
| TherapyDiary                             [Profile]   |
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "Hello [User Name]! Welcome back."                   |
|                                                      |
+------------------------------------------------------+
|                                                      |
| YOUR CURRENT WEEK:                                   |
|                                                      |
| [Card:]                                              |
| ┌─────────────────────────────────────────────┐    |
| │ 📘 Session 1: Behavioural Activation         │    |
| │                                              │    |
| │ Task: Keep a Baseline Diary                  │    |
| │                                              │    |
| │ Progress: Day 3 of 7 completed               │    |
| │ [●●●○○○○]                                    │    |
| │                                              │    |
| │ [Continue Task →]                            │    |
| └─────────────────────────────────────────────┘    |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| QUICK ACTIONS:                                       |
| [+ Log Today's Activity]                             |
| [📊 View This Week's Progress]                       |
| [📖 Re-read This Week's Session]                     |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| YOUR JOURNEY:                                        |
|                                                      |
| ✅ Session 1: Behavioural Activation (Current)       |
| 🔒 Session 2: Identifying Activities                 |
| 🔒 Session 3: Ranking Activities                     |
| 🔒 Session 4: Scheduling Activities                  |
| 🔒 Session 5: Maintaining Progress                   |
|                                                      |
+------------------------------------------------------+
| [Home] [This Week] [My Journey] [Help]              |
+------------------------------------------------------+
```

---

### 8. Help Screen

```
+------------------------------------------------------+
| Need Support?                                        |
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "I'm here to help. What do you need?"                |
|                                                      |
+------------------------------------------------------+
|                                                      |
| COMMON QUESTIONS:                                    |
|                                                      |
| [Expandable sections:]                               |
|                                                      |
| ▸ What if I forget to track activities?              |
| ▸ What if my mood doesn't improve?                   |
| ▸ What if I can't complete the weekly task?          |
| ▸ How do I rate my mood accurately?                  |
| ▸ Can I go back and review previous sessions?        |
| ▸ What if I miss a day?                              |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| RESOURCES:                                           |
| [View Terry's Story]                                 |
| [View Example Diaries]                               |
| [Understanding Behavioural Activation]               |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| 📞 CRISIS SUPPORT:                                   |
|                                                      |
| [Therapist Avatar]                                   |
| "If you're in crisis or need immediate help,        |
| please reach out to these resources:"                |
|                                                      |
| [Emergency Services: 999]                            |
| [Samaritans: 116 123]                                |
| [Crisis Text Line: Text SHOUT to 85258]             |
|                                                      |
+------------------------------------------------------+
```

---

### 9. My Journey Screen (Overall Progress)

```
+------------------------------------------------------+
| My Journey                                           |
+------------------------------------------------------+
| [Therapist Avatar]                                   |
|                                                      |
| "Here's your progress through the program:"          |
|                                                      |
+------------------------------------------------------+
|                                                      |
| ✅ SESSION 1: BEHAVIOURAL ACTIVATION                 |
| Completed Nov 5, 2025                                |
| Task: Baseline Diary (7/7 days completed)            |
| [View Session] [View My Diary]                       |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| 🔒 SESSION 2: IDENTIFYING ACTIVITIES                 |
| Unlocks after Session 1                              |
| Task: Categorize Activities                          |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| 🔒 SESSION 3: RANKING ACTIVITIES                     |
| Unlocks after Session 2                              |
| Task: Rank by Difficulty                             |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| 🔒 SESSION 4: SCHEDULING ACTIVITIES                  |
| Unlocks after Session 3                              |
| Task: Plan Your Week                                 |
|                                                      |
| --------------------------------------------------  |
|                                                      |
| 🔒 SESSION 5: MAINTAINING PROGRESS                   |
| Unlocks after Session 4                              |
| Task: Problem-Solving & Maintenance                  |
|                                                      |
+------------------------------------------------------+
| OVERALL PROGRESS:                                    |
| [●●●●● ○○○○○○○○○○○○○○○○○○○○] 20% Complete           |
|                                                      |
| Total Activities Logged: 21                          |
| Days Active: 7                                       |
| Started: Nov 5, 2025                                 |
|                                                      |
+------------------------------------------------------+
```

---

## Navigation Structure

### Bottom Navigation Bar (Always visible)
```
+------------------------------------------------------+
| [🏠 Home] [📋 This Week] [📈 My Journey] [❓ Help]    |
+------------------------------------------------------+
```

### User Flow Per Week:

1. **Start of Week**: User reads full session (educational content)
2. **Throughout Week**: User returns daily to log activities in task screen
3. **End of Week**: Week summary + unlock next session
4. **Repeat** for 5 weeks total

---

## Key Design Elements

### Therapist Voice
- **Present throughout**: Every screen has therapist guidance
- **Warm and supportive**: "I'm proud of you", "It's okay", "We'll do this together"
- **Educational**: Explains WHY behind each concept
- **Encouraging**: Celebrates effort, not just results
- **Conversational**: Uses "we", "let's", "together"

### Visual Elements
- **Therapist Avatar**: Consistent presence, warm expressions
- **Progress Indicators**: Clear visual feedback on completion
- **Cards & Sections**: Organized, scannable content
- **Soft Color Palette**: Calming blues, greens, warm neutrals
- **Plenty of White Space**: Not overwhelming

### Content Structure
- **One Session = One Week**: All educational content delivered at once
- **One Task = Whole Week**: Same task repeated daily
- **Sequential Progression**: Must complete weeks in order
- **Real Examples**: Terry's story and diaries for guidance

### Week Structure (5 Sessions Total)
- **Week 1**: Understanding & Baseline Diary
- **Week 2**: Identifying Activity Types (Routine/Necessary/Pleasurable)
- **Week 3**: Ranking by Difficulty
- **Week 4**: Scheduling Activities
- **Week 5**: Maintaining Progress & Problem-Solving

---

## Additional Features

### Personalization
- Choose therapist avatar appearance
- Set preferred check-in times
- Customize reminder frequency
- Name preference

### Reminders & Notifications
- "Time to log today's activity"
- "Don't forget your diary entry"
- Encouraging messages
- Gentle, not pushy

### Accessibility
- Large, readable text
- High contrast options
- Text-to-speech for sessions
- Simple, clear language

---

## What Makes This Different

**❌ Old Approach**: Daily different tasks, fragmented experience

**✅ New Approach**: 
- ONE comprehensive session per week
- ONE repeating task for the whole week  
- Therapist explains everything upfront
- Daily completion of same task builds routine
- Feels like real therapy: learn → practice → review
- Educational and supportive throughout

The user learns the concept thoroughly in one session, then practices it consistently all week, just like real therapy homework.

