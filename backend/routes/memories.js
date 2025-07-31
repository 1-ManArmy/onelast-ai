const express = require('express');
const Joi = require('joi');
const Memory = require('../models/Memory');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const createMemorySchema = Joi.object({
  type: Joi.string().valid('conversation', 'note', 'task', 'event', 'document', 'idea', 'reminder').required(),
  title: Joi.string().max(200).optional(),
  content: Joi.string().max(10000).required(),
  summary: Joi.string().max(500).optional(),
  tags: Joi.array().items(Joi.string().trim().lowercase()).optional(),
  category: Joi.string().trim().lowercase().optional(),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').optional(),
  metadata: Joi.object({
    source: Joi.string().valid('web', 'mobile', 'api', 'import', 'voice').optional(),
    location: Joi.object({
      coordinates: Joi.array().items(Joi.number()).length(2).optional()
    }).optional()
  }).optional()
});

const updateMemorySchema = Joi.object({
  title: Joi.string().max(200).optional(),
  content: Joi.string().max(10000).optional(),
  summary: Joi.string().max(500).optional(),
  tags: Joi.array().items(Joi.string().trim().lowercase()).optional(),
  category: Joi.string().trim().lowercase().optional(),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').optional(),
  status: Joi.string().valid('active', 'completed', 'archived').optional()
});

// @route   POST /api/memories
// @desc    Create a new memory
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { error } = createMemorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const memory = new Memory({
      ...req.body,
      userId: req.user.userId
    });

    await memory.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 'stats.totalMemories': 1 }
    });

    // Populate user info
    await memory.populate('userId', 'username firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Memory created successfully',
      data: { memory }
    });

  } catch (error) {
    console.error('Create memory error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating memory'
    });
  }
});

// @route   GET /api/memories
// @desc    Get user's memories with filtering and pagination
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      category,
      tags,
      priority,
      status = 'active',
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { userId: req.user.userId };
    
    if (type) query.type = type;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (status) query.status = status;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [memories, total] = await Promise.all([
      Memory.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('userId', 'username firstName lastName'),
      Memory.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        memories,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get memories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching memories'
    });
  }
});

// @route   GET /api/memories/:id
// @desc    Get a specific memory
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const memory = await Memory.findOne({
      _id: req.params.id,
      userId: req.user.userId
    }).populate('userId', 'username firstName lastName');

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      });
    }

    // Mark as viewed
    await memory.markAsViewed();

    res.json({
      success: true,
      data: { memory }
    });

  } catch (error) {
    console.error('Get memory error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching memory'
    });
  }
});

// @route   PUT /api/memories/:id
// @desc    Update a memory
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { error } = updateMemorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const memory = await Memory.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'username firstName lastName');

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      });
    }

    res.json({
      success: true,
      message: 'Memory updated successfully',
      data: { memory }
    });

  } catch (error) {
    console.error('Update memory error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating memory'
    });
  }
});

// @route   DELETE /api/memories/:id
// @desc    Delete a memory (soft delete)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const memory = await Memory.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { status: 'deleted' },
      { new: true }
    );

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      });
    }

    // Update user stats
    await User.findByIdAndUpdate(req.user.userId, {
      $inc: { 'stats.totalMemories': -1 }
    });

    res.json({
      success: true,
      message: 'Memory deleted successfully'
    });

  } catch (error) {
    console.error('Delete memory error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting memory'
    });
  }
});

// @route   GET /api/memories/search/:query
// @desc    Search memories by content
// @access  Private
router.get('/search/:query', auth, async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const memories = await Memory.find({
      userId: req.user.userId,
      status: 'active',
      $text: { $search: query }
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(parseInt(limit))
    .populate('userId', 'username firstName lastName');

    res.json({
      success: true,
      data: { memories }
    });

  } catch (error) {
    console.error('Search memories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching memories'
    });
  }
});

// @route   GET /api/memories/:id/related
// @desc    Get related memories
// @access  Private
router.get('/:id/related', auth, async (req, res) => {
  try {
    const memory = await Memory.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!memory) {
      return res.status(404).json({
        success: false,
        message: 'Memory not found'
      });
    }

    const relatedMemories = await Memory.findRelated(
      req.user.userId,
      memory.tags,
      memory.category,
      5
    );

    res.json({
      success: true,
      data: { memories: relatedMemories }
    });

  } catch (error) {
    console.error('Get related memories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching related memories'
    });
  }
});

module.exports = router;
