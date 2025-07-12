const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['men', 'women', 'kids', 'unisex'],
    required: true 
  },
  type: { type: String, required: true },
  size: { type: String, required: true },
  condition: { 
    type: String, 
    enum: ['new', 'like-new', 'good', 'fair'],
    required: true 
  },
  tags: [{ type: String }],
  images: [{ type: String, required: true }],
  status: { 
    type: String, 
    enum: ['available', 'pending', 'swapped'],
    default: 'available' 
  },
  pointsValue: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);