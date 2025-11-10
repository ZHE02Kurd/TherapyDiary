// Database seeding script
// Run with: node src/scripts/seedDatabase.js

require('dotenv').config();
const mongoose = require('mongoose');
const { Activity } = require('../models');
const prePopulatedActivities = require('../models/seedData');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
    
    // Clear existing pre-populated activities
    const deleteResult = await Activity.deleteMany({ userId: null });
    console.log(`🗑️  Removed ${deleteResult.deletedCount} existing pre-populated activities`);
    
    // Insert new activities
    const activities = await Activity.insertMany(prePopulatedActivities);
    console.log(`✨ Successfully added ${activities.length} pre-populated activities`);
    
    // Display summary by category
    const summary = activities.reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📊 Summary:');
    Object.entries(summary).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} activities`);
    });
    
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
