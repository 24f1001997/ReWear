const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const auth = require('../middleware/auth');

router.post('/', auth(), swapController.createSwap);
router.get('/user', auth(), swapController.getUserSwaps);
router.patch('/:id/status', auth(), swapController.updateSwapStatus);

module.exports = router;