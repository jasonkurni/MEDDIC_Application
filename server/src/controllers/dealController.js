const dealModel = require('../models/dealModel');

const dealController = {
  // Get all deals
  getDeals: async (req, res) => {
    try {
      const deals = await dealModel.getAllDeals();
      res.json({
        success: true,
        data: deals,
        count: deals.length,
      });
    } catch (error) {
      console.error('Error getting deals:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve deals',
        error: error.message,
      });
    }
  },

  // Get single deal by ID
  getDeal: async (req, res) => {
    try {
      const { id } = req.params;
      const deal = await dealModel.getDealById(id);
      
      if (!deal) {
        return res.status(404).json({
          success: false,
          message: 'Deal not found',
        });
      }

      res.json({
        success: true,
        data: deal,
      });
    } catch (error) {
      console.error('Error getting deal:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve deal',
        error: error.message,
      });
    }
  },

  // Create new deal
  createDeal: async (req, res) => {
    try {
      const dealData = req.body;

      // Validate required fields
      if (!dealData.company_name) {
        return res.status(400).json({
          success: false,
          message: 'Company name is required',
        });
      }

      const newDeal = await dealModel.createDeal(dealData);
      
      res.status(201).json({
        success: true,
        data: newDeal,
        message: 'Deal created successfully',
      });
    } catch (error) {
      console.error('Error creating deal:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create deal',
        error: error.message,
      });
    }
  },

  // Update deal
  updateDeal: async (req, res) => {
    try {
      const { id } = req.params;
      const dealData = req.body;

      // Validate required fields
      if (!dealData.company_name) {
        return res.status(400).json({
          success: false,
          message: 'Company name is required',
        });
      }

      const updatedDeal = await dealModel.updateDeal(id, dealData);
      
      res.json({
        success: true,
        data: updatedDeal,
        message: 'Deal updated successfully',
      });
    } catch (error) {
      console.error('Error updating deal:', error);
      
      if (error.message === 'Deal not found') {
        return res.status(404).json({
          success: false,
          message: 'Deal not found',
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to update deal',
        error: error.message,
      });
    }
  },

  // Delete deal
  deleteDeal: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await dealModel.deleteDeal(id);
      
      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error('Error deleting deal:', error);
      
      if (error.message === 'Deal not found') {
        return res.status(404).json({
          success: false,
          message: 'Deal not found',
        });
      }

      res.status(500).json({
        success: false,
        message: 'Failed to delete deal',
        error: error.message,
      });
    }
  },

  // Search deals
  searchDeals: async (req, res) => {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
      }

      const deals = await dealModel.searchDeals(q);
      
      res.json({
        success: true,
        data: deals,
        count: deals.length,
      });
    } catch (error) {
      console.error('Error searching deals:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search deals',
        error: error.message,
      });
    }
  },
};

module.exports = dealController;

// Made with Bob
