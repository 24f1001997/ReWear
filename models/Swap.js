const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  requester: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  requestedItem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },
  offeredItem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  },
  pointsOffered: Number,
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending' 
  },
  type: {
    type: String,
    enum: ['swap', 'redeem'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Swap', swapSchema);