// Pre-populated activities for TherapyDiary
// Based on Behavioural Activation therapy principles

const prePopulatedActivities = [
  // ============================================
  // ROUTINE ACTIVITIES (Daily Self-Care)
  // ============================================
  {
    name: 'Brush teeth',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Morning and evening dental hygiene',
    estimatedDuration: 5,
    tags: ['hygiene', 'morning', 'evening']
  },
  {
    name: 'Take a shower',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Daily shower or bath',
    estimatedDuration: 15,
    tags: ['hygiene', 'self-care']
  },
  {
    name: 'Get dressed',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Change into clean clothes',
    estimatedDuration: 10,
    tags: ['morning', 'self-care']
  },
  {
    name: 'Make the bed',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Tidy up bedroom',
    estimatedDuration: 5,
    tags: ['morning', 'tidying']
  },
  {
    name: 'Eat breakfast',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Have a nutritious morning meal',
    estimatedDuration: 20,
    tags: ['food', 'morning', 'nutrition']
  },
  {
    name: 'Eat lunch',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Have a midday meal',
    estimatedDuration: 30,
    tags: ['food', 'afternoon', 'nutrition']
  },
  {
    name: 'Eat dinner',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Have an evening meal',
    estimatedDuration: 30,
    tags: ['food', 'evening', 'nutrition']
  },
  {
    name: 'Take medication',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Take prescribed medications',
    estimatedDuration: 2,
    tags: ['health', 'medical']
  },
  {
    name: 'Go to bed on time',
    category: 'Routine',
    difficulty: 'Moderate',
    description: 'Maintain regular sleep schedule',
    estimatedDuration: 15,
    tags: ['sleep', 'night', 'health']
  },
  {
    name: 'Drink water',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Stay hydrated throughout the day',
    estimatedDuration: 2,
    tags: ['health', 'hydration']
  },
  {
    name: 'Stretch for 10 minutes',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Light stretching or yoga',
    estimatedDuration: 10,
    tags: ['physical', 'health', 'morning']
  },
  {
    name: 'Prepare tomorrow\'s outfit',
    category: 'Routine',
    difficulty: 'Easiest',
    description: 'Choose clothes for next day',
    estimatedDuration: 5,
    tags: ['evening', 'planning']
  },

  // ============================================
  // NECESSARY ACTIVITIES (Responsibilities)
  // ============================================
  {
    name: 'Grocery shopping',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Buy food and household items',
    estimatedDuration: 60,
    tags: ['shopping', 'errands', 'outdoor']
  },
  {
    name: 'Pay bills',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Handle financial responsibilities',
    estimatedDuration: 30,
    tags: ['finance', 'admin']
  },
  {
    name: 'Clean the house',
    category: 'Necessary',
    difficulty: 'Difficult',
    description: 'General house cleaning',
    estimatedDuration: 90,
    tags: ['cleaning', 'tidying', 'physical']
  },
  {
    name: 'Do laundry',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Wash, dry, and fold clothes',
    estimatedDuration: 60,
    tags: ['cleaning', 'chores']
  },
  {
    name: 'Wash dishes',
    category: 'Necessary',
    difficulty: 'Easiest',
    description: 'Clean up after meals',
    estimatedDuration: 15,
    tags: ['cleaning', 'kitchen']
  },
  {
    name: 'Cook a meal',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Prepare food at home',
    estimatedDuration: 45,
    tags: ['food', 'cooking', 'nutrition']
  },
  {
    name: 'Take out the trash',
    category: 'Necessary',
    difficulty: 'Easiest',
    description: 'Dispose of garbage',
    estimatedDuration: 5,
    tags: ['chores', 'outdoor']
  },
  {
    name: 'Attend appointment',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Doctor, dentist, or other appointments',
    estimatedDuration: 60,
    tags: ['health', 'medical', 'outdoor']
  },
  {
    name: 'Work on assignment',
    category: 'Necessary',
    difficulty: 'Difficult',
    description: 'School or work tasks',
    estimatedDuration: 120,
    tags: ['work', 'study', 'productivity']
  },
  {
    name: 'Answer emails',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Respond to messages',
    estimatedDuration: 30,
    tags: ['work', 'communication', 'admin']
  },
  {
    name: 'Vacuum the floors',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Clean floors throughout home',
    estimatedDuration: 30,
    tags: ['cleaning', 'physical']
  },
  {
    name: 'Clean the bathroom',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Scrub and tidy bathroom',
    estimatedDuration: 30,
    tags: ['cleaning', 'hygiene']
  },
  {
    name: 'Organize workspace',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Tidy desk or work area',
    estimatedDuration: 20,
    tags: ['tidying', 'organization']
  },
  {
    name: 'Change bed sheets',
    category: 'Necessary',
    difficulty: 'Moderate',
    description: 'Replace bedding with clean sheets',
    estimatedDuration: 15,
    tags: ['cleaning', 'hygiene']
  },
  {
    name: 'Water plants',
    category: 'Necessary',
    difficulty: 'Easiest',
    description: 'Care for indoor or outdoor plants',
    estimatedDuration: 10,
    tags: ['gardening', 'nature']
  },

  // ============================================
  // PLEASURABLE ACTIVITIES (Enjoyment & Social)
  // ============================================
  {
    name: 'Read a book',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Enjoy reading for pleasure',
    estimatedDuration: 30,
    tags: ['relaxation', 'learning', 'indoor']
  },
  {
    name: 'Watch a movie or TV show',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Entertainment viewing',
    estimatedDuration: 90,
    tags: ['entertainment', 'relaxation', 'indoor']
  },
  {
    name: 'Listen to music',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Enjoy favorite songs or discover new music',
    estimatedDuration: 30,
    tags: ['music', 'relaxation', 'indoor']
  },
  {
    name: 'Go for a walk',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Take a leisurely walk outdoors',
    estimatedDuration: 30,
    tags: ['physical', 'outdoor', 'nature']
  },
  {
    name: 'Exercise or yoga',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Physical activity or stretching',
    estimatedDuration: 45,
    tags: ['physical', 'health', 'indoor']
  },
  {
    name: 'Call a friend',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Phone chat with friend or family',
    estimatedDuration: 30,
    tags: ['social', 'communication']
  },
  {
    name: 'Play a video game',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Gaming for entertainment',
    estimatedDuration: 60,
    tags: ['entertainment', 'indoor', 'gaming']
  },
  {
    name: 'Draw or paint',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Creative art activities',
    estimatedDuration: 60,
    tags: ['creative', 'art', 'indoor']
  },
  {
    name: 'Write in a journal',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Personal writing and reflection',
    estimatedDuration: 20,
    tags: ['creative', 'reflection', 'indoor']
  },
  {
    name: 'Spend time in nature',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Visit park, garden, or natural area',
    estimatedDuration: 60,
    tags: ['outdoor', 'nature', 'physical']
  },
  {
    name: 'Play with a pet',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Spend quality time with pet',
    estimatedDuration: 20,
    tags: ['social', 'animals', 'indoor']
  },
  {
    name: 'Take photos',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Photography hobby',
    estimatedDuration: 30,
    tags: ['creative', 'outdoor', 'art']
  },
  {
    name: 'Meditation or mindfulness',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Relaxation and mental wellness',
    estimatedDuration: 15,
    tags: ['relaxation', 'mental-health', 'indoor']
  },
  {
    name: 'Bake or cook something special',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Creative cooking or baking',
    estimatedDuration: 90,
    tags: ['cooking', 'creative', 'food']
  },
  {
    name: 'Meet a friend for coffee',
    category: 'Pleasurable',
    difficulty: 'Difficult',
    description: 'Social outing at café',
    estimatedDuration: 90,
    tags: ['social', 'outdoor', 'food']
  },
  {
    name: 'Go to the movies',
    category: 'Pleasurable',
    difficulty: 'Difficult',
    description: 'Watch film at cinema',
    estimatedDuration: 150,
    tags: ['entertainment', 'social', 'outdoor']
  },
  {
    name: 'Practice a musical instrument',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Play music as a hobby',
    estimatedDuration: 30,
    tags: ['music', 'creative', 'indoor']
  },
  {
    name: 'Do a puzzle or brain teaser',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Mental stimulation activity',
    estimatedDuration: 30,
    tags: ['indoor', 'mental', 'relaxation']
  },
  {
    name: 'Garden or plant flowers',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Outdoor gardening activity',
    estimatedDuration: 60,
    tags: ['outdoor', 'nature', 'physical', 'gardening']
  },
  {
    name: 'Have a spa day at home',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Self-care and pampering',
    estimatedDuration: 90,
    tags: ['self-care', 'relaxation', 'indoor']
  },
  {
    name: 'Browse social media',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Check social networks (in moderation)',
    estimatedDuration: 20,
    tags: ['social', 'entertainment', 'indoor']
  },
  {
    name: 'Learn something new online',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Educational videos or courses',
    estimatedDuration: 45,
    tags: ['learning', 'indoor', 'mental']
  },
  {
    name: 'Organize photos or memories',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Create photo albums or scrapbooks',
    estimatedDuration: 60,
    tags: ['creative', 'reflection', 'indoor']
  },
  {
    name: 'Dance to favorite songs',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Move to music for fun',
    estimatedDuration: 15,
    tags: ['music', 'physical', 'indoor']
  },
  {
    name: 'Visit a museum or art gallery',
    category: 'Pleasurable',
    difficulty: 'Difficult',
    description: 'Cultural outing',
    estimatedDuration: 120,
    tags: ['art', 'learning', 'outdoor', 'social']
  },
  {
    name: 'Craft or DIY project',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Hands-on creative project',
    estimatedDuration: 90,
    tags: ['creative', 'indoor', 'art']
  },
  {
    name: 'Watch the sunset or sunrise',
    category: 'Pleasurable',
    difficulty: 'Moderate',
    description: 'Enjoy natural beauty',
    estimatedDuration: 30,
    tags: ['outdoor', 'nature', 'relaxation']
  },
  {
    name: 'Play a board game',
    category: 'Pleasurable',
    difficulty: 'Easiest',
    description: 'Gaming with others or solo',
    estimatedDuration: 60,
    tags: ['entertainment', 'social', 'indoor']
  },
  {
    name: 'Volunteer or help someone',
    category: 'Pleasurable',
    difficulty: 'Difficult',
    description: 'Give back to community',
    estimatedDuration: 120,
    tags: ['social', 'outdoor', 'meaningful']
  },
  {
    name: 'Explore a new place',
    category: 'Pleasurable',
    difficulty: 'Difficult',
    description: 'Visit somewhere new in your area',
    estimatedDuration: 120,
    tags: ['outdoor', 'adventure', 'learning']
  }
];

module.exports = prePopulatedActivities;
