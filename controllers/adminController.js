const Item = require('../models/Item');

// Get pending items for approval
exports.getPendingItems = async (req, res) => {
  try {
    const items = await Item.find({ approved: false })
      .populate('owner', 'name')
      .sort({ createdAt: -1 });
      
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Approve/reject item
exports.reviewItem = async (req, res) => {
  try {
    const { approved } = req.body;
    const item = await Item.findById(req.params.id);
    
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    
    item.approved = approved;
    await item.save();
    
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Remove item
exports.removeItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};