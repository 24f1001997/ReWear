const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/items/pending', auth(['admin']), adminController.getPendingItems);
router.patch('/items/:id/review', auth(['admin']), adminController.reviewItem);
router.delete('/items/:id', auth(['admin']), adminController.removeItem);

module.exports = router;