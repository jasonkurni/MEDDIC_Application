const express = require('express');
const router = express.Router();
const dealController = require('../controllers/dealController');

// GET /api/deals - Get all deals
router.get('/', dealController.getDeals);

// GET /api/deals/search?q=query - Search deals
router.get('/search', dealController.searchDeals);

// GET /api/deals/:id - Get single deal
router.get('/:id', dealController.getDeal);

// POST /api/deals - Create new deal
router.post('/', dealController.createDeal);

// PUT /api/deals/:id - Update deal
router.put('/:id', dealController.updateDeal);

// DELETE /api/deals/:id - Delete deal
router.delete('/:id', dealController.deleteDeal);

module.exports = router;

// Made with Bob
