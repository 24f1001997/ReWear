const Item = require('../models/Item');

// Create new item
exports.createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags, pointsValue } = req.body;
    
    const images = req.files.map(file => file.path);
    
    const newItem = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags.split(','),
      images,
      pointsValue,
      owner: req.user.id
    });
    
    await newItem.save();
    
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get all available items
exports.getItems = async (req, res) => {
  try {
    const { category, type, search } = req.query;
    const filter = { status: 'available', approved: true };
    
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: 'i' };
    
    const items = await Item.find(filter)
      .populate('owner', 'name')
      .sort({ createdAt: -1 });
      
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get single item
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'name email');
      
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get user's items
exports.getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
      
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update item status
exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await Item.findById(req.params.id);
    
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    
    // Check ownership
    if (item.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    item.status = status;
    await item.save();
    
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};