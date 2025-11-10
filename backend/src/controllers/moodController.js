const { MoodLog } = require('../models');

/**
 * Get mood logs for a date range
 * @route GET /api/mood
 * @query {string} startDate - Start date (YYYY-MM-DD)
 * @query {string} endDate - End date (YYYY-MM-DD)
 * @query {number} days - Number of days to look back (default: 30)
 */
exports.getMoodLogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate, days = 30 } = req.query;

    let start, end;

    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      end = new Date();
      end.setHours(23, 59, 59, 999);
      start = new Date();
      start.setDate(start.getDate() - parseInt(days));
      start.setHours(0, 0, 0, 0);
    }

    const moodLogs = await MoodLog.find({
      userId,
      date: {
        $gte: start,
        $lte: end
      }
    }).sort({ date: 1 });

    // Calculate overall statistics
    const stats = {
      totalDays: moodLogs.length,
      averageMoodBefore: 0,
      averageMoodAfter: 0,
      averageMoodChange: 0,
      totalEntries: 0,
      bestDay: null,
      worstDay: null
    };

    if (moodLogs.length > 0) {
      const sumBefore = moodLogs.reduce((sum, log) => sum + log.averageMoodBefore, 0);
      const sumAfter = moodLogs.reduce((sum, log) => sum + log.averageMoodAfter, 0);
      const sumChange = moodLogs.reduce((sum, log) => sum + log.moodChange, 0);
      const sumEntries = moodLogs.reduce((sum, log) => sum + log.entryCount, 0);

      stats.averageMoodBefore = sumBefore / moodLogs.length;
      stats.averageMoodAfter = sumAfter / moodLogs.length;
      stats.averageMoodChange = sumChange / moodLogs.length;
      stats.totalEntries = sumEntries;

      // Find best and worst days
      stats.bestDay = moodLogs.reduce((best, log) => 
        log.averageMoodAfter > best.averageMoodAfter ? log : best
      );
      stats.worstDay = moodLogs.reduce((worst, log) => 
        log.averageMoodAfter < worst.averageMoodAfter ? log : worst
      );
    }

    res.json({
      moodLogs,
      stats,
      dateRange: {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error('Get mood logs error:', error);
    res.status(500).json({ error: 'Failed to fetch mood logs' });
  }
};

/**
 * Get mood log for specific date
 * @route GET /api/mood/:date
 * @param {string} date - Date in YYYY-MM-DD format
 */
exports.getMoodLogByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date } = req.params;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const moodLog = await MoodLog.findOne({
      userId,
      date: targetDate
    }).populate('entries');

    if (!moodLog) {
      return res.status(404).json({ error: 'No mood log found for this date' });
    }

    res.json({ moodLog });
  } catch (error) {
    console.error('Get mood log by date error:', error);
    res.status(500).json({ error: 'Failed to fetch mood log' });
  }
};

/**
 * Get mood statistics summary
 * @route GET /api/mood/stats/summary
 */
exports.getMoodStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { days = 30 } = req.query;

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const start = new Date();
    start.setDate(start.getDate() - parseInt(days));
    start.setHours(0, 0, 0, 0);

    const moodLogs = await MoodLog.find({
      userId,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    // Calculate trends
    const trendData = moodLogs.map(log => ({
      date: log.date,
      moodBefore: log.averageMoodBefore,
      moodAfter: log.averageMoodAfter,
      moodChange: log.moodChange,
      entries: log.entryCount
    }));

    // Category breakdown
    const categoryTotals = { Routine: 0, Necessary: 0, Pleasurable: 0 };
    moodLogs.forEach(log => {
      categoryTotals.Routine += log.categories.Routine || 0;
      categoryTotals.Necessary += log.categories.Necessary || 0;
      categoryTotals.Pleasurable += log.categories.Pleasurable || 0;
    });

    res.json({
      trendData,
      categoryTotals,
      totalDays: moodLogs.length,
      dateRange: {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      }
    });
  } catch (error) {
    console.error('Get mood stats error:', error);
    res.status(500).json({ error: 'Failed to fetch mood statistics' });
  }
};
