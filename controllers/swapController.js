const Swap = require('../models/Swap');
const Item = require('../models/Item');
const User = require('../models/User');

// Create swap request
exports.createSwap = async (req, res) => {
  try {
    const { type, requestedItemId, offeredItemId } = req.body;
    
    // Get requested item
    const requestedItem = await Item.findById(requestedItemId);
    if (!requestedItem || requestedItem.status !== 'available') {
      return res.status(400).json({ msg: 'Item not available' });
    }
    
    // Check if user is requesting their own item
    if (requestedItem.owner.toString() === req.user.id) {
      return res.status(400).json({ msg: 'Cannot request your own item' });
    }
    
    let swapData = {
      requester: req.user.id,
      requestedItem: requestedItemId,
      type
    };
    
    if (type === 'swap') {
      // Direct swap
      const offeredItem = await Item.findById(offeredItemId);
      
      // Validate offered item
      if (!offeredItem || offeredItem.owner.toString() !== req.user.id) {
        return res.status(400).json({ msg: 'Invalid offer item' });
      }
      
      swapData.offeredItem = offeredItemId;
    } else {
      // Point redemption
      const user = await User.findById(req.user.id);
      
      if (user.points < requestedItem.pointsValue) {
        return res.status(400).json({ msg: 'Insufficient points' });
      }
      
      swapData.pointsOffered = requestedItem.pointsValue;
    }
    
    // Create swap
    const newSwap = new Swap(swapData);
    await newSwap.save();
    
    // Update item status
    await Item.findByIdAndUpdate(requestedItemId, { status: 'pending' });
    
    res.status(201).json(newSwap);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get user swaps
exports.getUserSwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [
        { requester: req.user.id },
        { 'requestedItem.owner': req.user.id }
      ]
    })
    .populate('requester', 'name')
    .populate('requestedItem', 'title images')
    .populate('offeredItem', 'title images')
    .sort({ createdAt: -1 });
    
    res.json(swaps);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update swap status
exports.updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await Swap.findById(req.params.id)
      .populate('requestedItem')
      .populate('offeredItem');
    
    if (!swap) return res.status(404).json({ msg: 'Swap not found' });
    
    // Check authorization (only item owner can update)
    if (swap.requestedItem.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    swap.status = status;
    await swap.save();
    
    // Handle completed swap
    if (status === 'accepted') {
      // Update items
      await Item.findByIdAndUpdate(swap.requestedItem._id, { status: 'swapped' });
      
      if (swap.type === 'swap') {
        await Item.findByIdAndUpdate(swap.offeredItem._id, { status: 'swapped' });
      } else {
        // Point redemption
        // Deduct points from requester
        await User.findByIdAndUpdate(swap.requester, {
          $inc: { points: -swap.pointsOffered }
        });
        
        // Add points to owner
        await User.findByIdAndUpdate(swap.requestedItem.owner, {
          $inc: { points: swap.pointsOffered }
        });
      }
    } else if (status === 'rejected') {
      // Make item available again
      await Item.findByIdAndUpdate(swap.requestedItem._id, { status: 'available' });
    }
    
    res.json(swap);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};