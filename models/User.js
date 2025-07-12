// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   points: { type: Number, default: 100 },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 100 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },  // Include virtuals when converting to JSON
  toObject: { virtuals: true } // Include virtuals when converting to objects
});

// Add virtual field for items
userSchema.virtual('listedItems', {
  ref: 'Item',                 // Reference the Item model
  localField: '_id',           // User's _id field
  foreignField: 'owner',       // Matching field in Item model
  justOne: false               // Return an array of items
});

module.exports = mongoose.model('User', userSchema);