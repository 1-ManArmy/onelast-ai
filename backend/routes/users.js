const express = require('express');
const User = require('../models/User');
const Memory = require('../models/Memory');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    // Get memory statistics
    const memoryStats = await Memory.aggregate([
      { $match: { userId: req.user.userId, status: 'active' } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent memories
    const recentMemories = await Memory.find({
      userId: req.user.userId,
      status: 'active'
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('title type createdAt tags');

    // Get memory count by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyStats = await Memory.aggregate([
      {
        $match: {
          userId: req.user.userId,
          status: 'active',
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          subscription: user.subscription,
          stats: user.stats
        },
        memoryStats,
        recentMemories,
        dailyStats
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard data'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get detailed user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Memory type distribution
    const typeDistribution = await Memory.aggregate([
      { $match: { userId, status: 'active' } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    // Most used tags
    const topTags = await Memory.aggregate([
      { $match: { userId, status: 'active' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Memory creation trends (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyTrends = await Memory.aggregate([
      {
        $match: {
          userId,
          status: 'active',
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Category distribution
    const categoryDistribution = await Memory.aggregate([
      { $match: { userId, status: 'active', category: { $exists: true, $ne: null } } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        typeDistribution,
        topTags,
        monthlyTrends,
        categoryDistribution
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching statistics'
    });
  }
});

// @route   POST /api/users/export
// @desc    Export user data
// @access  Private
router.post('/export', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const memories = await Memory.find({
      userId: req.user.userId,
      status: { $ne: 'deleted' }
    }).sort({ createdAt: -1 });

    const exportData = {
      user: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        joinDate: user.stats.joinDate,
        totalMemories: user.stats.totalMemories
      },
      memories: memories.map(memory => ({
        id: memory._id,
        type: memory.type,
        title: memory.title,
        content: memory.content,
        tags: memory.tags,
        category: memory.category,
        priority: memory.priority,
        status: memory.status,
        createdAt: memory.createdAt,
        updatedAt: memory.updatedAt
      })),
      exportDate: new Date().toISOString(),
      totalMemories: memories.length
    };

    res.json({
      success: true,
      message: 'Data exported successfully',
      data: exportData
    });

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error exporting data'
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account (soft delete)
// @access  Private
router.delete('/account', auth, async (req, res) => {
  try {
    // Soft delete user
    await User.findByIdAndUpdate(req.user.userId, {
      isActive: false,
      'subscription.status': 'cancelled'
    });

    // Soft delete all memories
    await Memory.updateMany(
      { userId: req.user.userId },
      { status: 'deleted' }
    );

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });

  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deactivating account'
    });
  }
});

module.exports = router;
