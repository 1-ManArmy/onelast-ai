const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['conversation', 'note', 'task', 'event', 'document', 'idea', 'reminder'],
    required: true,
    index: true
  },
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  summary: {
    type: String,
    maxlength: 500
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    trim: true,
    lowercase: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived', 'deleted'],
    default: 'active',
    index: true
  },
  metadata: {
    source: {
      type: String,
      enum: ['web', 'mobile', 'api', 'import', 'voice'],
      default: 'web'
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    attachments: [{
      filename: String,
      url: String,
      size: Number,
      type: String
    }],
    aiAnalysis: {
      sentiment: {
        type: String,
        enum: ['positive', 'negative', 'neutral']
      },
      entities: [String],
      keywords: [String],
      confidence: {
        type: Number,
        min: 0,
        max: 1
      }
    }
  },
  connections: [{
    memoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Memory'
    },
    relationshipType: {
      type: String,
      enum: ['related', 'follow-up', 'prerequisite', 'reference', 'duplicate']
    },
    strength: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5
    }
  }],
  reminders: [{
    date: {
      type: Date,
      required: true
    },
    message: String,
    sent: {
      type: Boolean,
      default: false
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
MemorySchema.index({ userId: 1, createdAt: -1 });
MemorySchema.index({ userId: 1, type: 1 });
MemorySchema.index({ userId: 1, tags: 1 });
MemorySchema.index({ userId: 1, category: 1 });
MemorySchema.index({ 'metadata.location': '2dsphere' });
MemorySchema.index({ content: 'text', title: 'text', summary: 'text' });

// Update lastAccessed when memory is viewed
MemorySchema.methods.markAsViewed = function() {
  this.lastAccessed = new Date();
  this.viewCount += 1;
  return this.save();
};

// Static method to find related memories
MemorySchema.statics.findRelated = function(userId, tags, category, limit = 5) {
  return this.find({
    userId,
    status: 'active',
    $or: [
      { tags: { $in: tags } },
      { category: category }
    ]
  })
  .sort({ createdAt: -1 })
  .limit(limit);
};

module.exports = mongoose.model('Memory', MemorySchema);
