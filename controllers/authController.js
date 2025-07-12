const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //console.log(role)
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user
    user = new User({ name, email, password, role });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Generate JWT
    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Authenticate user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
    // Generate JWT
    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// // Get user profile
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .select('-password')
//       .populate({
//         path: 'items',
//         select: 'title images status'
//       });
      
//     if (!user) return res.status(404).json({ msg: 'User not found' });
    
//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'listedItems',  // Use the virtual field name
        select: 'title images status pointsValue',
        options: { sort: { createdAt: -1 } } // Add sorting if needed
      });
      
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};