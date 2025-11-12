/**
 * Seed Session Data
 * Populates the database with Week 1 session content
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const { Session } = require('../models');
const week1Content = require('../data/week1Content');

const seedSessions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing sessions (only in development)
    if (process.env.NODE_ENV === 'development') {
      await Session.deleteMany({});
      console.log('🗑️  Cleared existing sessions');
    }

    // Create Week 1 session
    const week1Session = await Session.create(week1Content);
    console.log('✅ Created Week 1 session:', week1Session.title);

    console.log('\n🎉 Session seeding completed successfully!');
    console.log('\nAvailable sessions:');
    console.log(`- Week ${week1Session.weekNumber}: ${week1Session.title}`);

  } catch (error) {
    console.error('❌ Error seeding sessions:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
  }
};

// Run the seed function
seedSessions();
