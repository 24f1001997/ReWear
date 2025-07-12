const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth(), upload.array('images', 5), itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.get('/user/items', auth(), itemController.getUserItems);
router.patch('/:id/status', auth(), itemController.updateItemStatus);

module.exports = router;