/**
 * Week 1 Session Content - Introduction to Behavioural Activation
 * Based on Behavioural Activation booklet
 */

module.exports = {
  weekNumber: 1,
  title: "Introduction to Behavioural Activation",
  subtitle: "Understanding how activity affects mood",
  introduction: "Welcome to your first session. I'm so glad you're here. Let's talk about Behavioural Activation and how it can help you.",
  
  sections: [
    {
      heading: "What is Behavioural Activation?",
      content: "Behavioural Activation is an evidence-based coping technique for the treatment of low mood or depression, recommended by the National Institute for Health and Care Excellence (NICE, 2009).\n\nIt focuses on helping you increase your activity levels and re-engage with life, even when you don't feel motivated to do so.",
      therapistMessage: "This isn't just theory - this approach has been proven to work. It's recommended by medical professionals because it really does help people feel better.",
      order: 1
    },
    {
      heading: "Who is this for?",
      content: "You may find this helpful if you have noticed your low mood or depression has stopped you from doing your usual activities, such as the things you normally enjoy.\n\nIt's particularly useful when you find yourself:\n• Withdrawing from social activities\n• Putting off daily tasks\n• Spending more time in bed\n• Avoiding things you used to enjoy\n• Feeling stuck in a cycle of inactivity",
      therapistMessage: "Does this sound familiar? Have you noticed pulling away from things you used to do? That's actually very common, and we're going to work on that together.",
      order: 2
    },
    {
      heading: "How does this workbook work?",
      content: "Behavioural Activation has five steps. It is important to work through one step at a time, only moving on to the next step once you are comfortable with the previous one.\n\nThe Five Steps:\n\n1️⃣ Keep a baseline diary of your activities\n2️⃣ Identify activity types (Routine, Necessary, Pleasurable)\n3️⃣ Rank activities by difficulty\n4️⃣ Schedule activities into your week\n5️⃣ Maintain progress and problem-solve\n\nEach step takes one week, and we'll work through them together.",
      therapistMessage: "We'll take this one step at a time. No rushing. Each week focuses on just one step, so you can really understand it before moving forward.",
      order: 3
    },
    {
      heading: "Understanding the Vicious Cycle",
      content: "When we are feeling low in mood, we may find it difficult to carry out everyday activities and find ourselves withdrawing and avoiding them.\n\nThis creates a vicious cycle:\n\n→ Negative Thoughts\n→ Low Mood/Depression\n→ Withdraw from Activities\n→ Less Achievement, Less Connection, Less Enjoyment\n→ [Feeds back to] Negative Thoughts\n\nThe less we do, the worse we feel. The worse we feel, the less we want to do. And so the cycle continues.",
      therapistMessage: "See how it's a cycle? When we feel low, we stop doing things. But stopping makes us feel worse, which makes us want to do even less. Behavioural Activation helps us break this cycle.",
      order: 4
    },
    {
      heading: "How Does Behavioural Activation Help?",
      content: "Behavioural Activation works by reversing this cycle:\n\n1. Activity can improve our energy\nWe need to 'do' first to get motivation back. Think of it as 'activation before motivation.' You don't need to wait to feel better - action comes first.\n\n2. Activity gives us a sense of achievement\nWhen we complete tasks, even small ones, we get that satisfaction back. Each thing you do is a small win.\n\n3. Activity helps us connect with others\nLow mood can make us isolate ourselves. But connection is so important for feeling better. We'll work on bringing people back into your life.\n\n4. Activity gives us different focus\nWhen we have nothing to do, we tend to dwell on negative thoughts. Activity gives your mind something else to focus on.\n\n5. Activity helps build need for sleep\nWhen we're not active during the day, we often can't sleep at night. Being active helps regulate your sleep cycle naturally.",
      therapistMessage: "This might sound backwards, but we need to 'do' first to get motivation back. Think of it as 'activation before motivation.' You don't need to wait to feel better - action comes first.",
      order: 5
    },
    {
      heading: "Meet Terry - A Case Story",
      content: "Terry is 68 years old and retired. They care for their partner who has health difficulties.\n\nTerry's Story:\nAfter retiring, Terry stopped going to their social club and began putting off daily tasks like showering and getting dressed. Their partner noticed they were irritable and had low energy. Terry felt overwhelmed by even simple tasks.\n\nThrough Behavioural Activation, Terry:\n• Recognized they'd withdrawn from activities\n• Started keeping a diary to see patterns\n• Set regular bed times and meal times\n• Broke down difficult tasks into small steps\n• Gradually increased their activity levels\n• Reconnected with their social club\n\nToday, Terry feels more energized and connected. They still have difficult days, but they know how to break the cycle.",
      therapistMessage: "Let me tell you about Terry. They're 68, retired, and care for their partner. Sound familiar? Here's their story... Terry's journey shows that change is possible, even when things feel overwhelming.",
      order: 6
    }
  ],
  
  taskDescription: "Keep a Baseline Diary",
  
  taskInstructions: [
    "Write down activities as you do them throughout the day (work, chores, anything at home, even time in bed)",
    "Record the time of day and what time you did the activity",
    "Note where you were and who you were with",
    "Rate your mood BEFORE the activity (Low, Tired, Fed Up, Worried, etc.)",
    "Rate your mood AFTER the activity (Better, Same, Worse, Relieved, etc.)",
    "Fill it out just as things are for you right now - be honest, no judgment",
    "Try to record at least 3-4 activities each day",
    "Come back each day this week to log your activities"
  ],
  
  taskExplanation: "Why complete a baseline diary?\n\nIn Behavioural Activation, it's helpful to see how your low mood has affected your activities and routines. This helps identify what you've withdrawn from and how it impacts your mood.\n\nThis week, I want you to track your activities each day. Don't change anything - just write down what you're currently doing. This gives us a starting point.\n\nAt the end of the week, we'll review it together and identify patterns in your mood and activities.",
  
  exampleDiary: {
    name: "Terry's Baseline Diary",
    days: [
      {
        day: "Monday",
        entries: [
          {
            timeOfDay: "Morning",
            time: "9:00 AM",
            activity: "Stayed in bed late",
            location: "Bedroom",
            withWhom: "Alone",
            moodBefore: "Low",
            moodAfter: "Low"
          },
          {
            timeOfDay: "Afternoon",
            time: "2:00 PM",
            activity: "Did some laundry",
            location: "At home",
            withWhom: "Alone",
            moodBefore: "Low",
            moodAfter: "Felt I had achieved something"
          },
          {
            timeOfDay: "Evening",
            time: "8:00 PM",
            activity: "Watched TV and went to bed early",
            location: "Living room/Bedroom",
            withWhom: "Partner",
            moodBefore: "Low, tired",
            moodAfter: "Low, tired"
          }
        ]
      },
      {
        day: "Tuesday",
        entries: [
          {
            timeOfDay: "Morning",
            time: "8:30 AM",
            activity: "Did breakfast for myself and partner",
            location: "Kitchen",
            withWhom: "Partner",
            moodBefore: "Low",
            moodAfter: "A bit happier"
          },
          {
            timeOfDay: "Afternoon",
            time: "1:00 PM",
            activity: "Had some caring tasks to do for my partner",
            location: "At home",
            withWhom: "Partner",
            moodBefore: "Low",
            moodAfter: "Low but pleased to help"
          },
          {
            timeOfDay: "Evening",
            time: "7:30 PM",
            activity: "Sat on sofa, felt tired and was worrying",
            location: "Living room",
            withWhom: "Alone",
            moodBefore: "Low, tired",
            moodAfter: "Worried"
          }
        ]
      }
    ]
  },
  
  completionMessage: "You did it! You completed your first week of Behavioural Activation.\n\nLet me show you what you've accomplished...\n\nYour Week 1 Summary will show:\n• Total days of diary tracking completed\n• Total activities logged\n• Patterns in your mood\n• Activities that improved your mood\n• Activities that kept mood low\n\nThese patterns are really valuable. In our next session, we'll use what you learned to identify different types of activities that can help boost your mood.\n\nYou've taken the first important step. I'm proud of you for showing up and doing the work."
};
