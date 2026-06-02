const db = require('../config/database');

const dealModel = {
  // Get all deals
  getAllDeals: () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM deals ORDER BY created_at DESC';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Get deal by ID
  getDealById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM deals WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  // Create new deal
  createDeal: (dealData) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO deals (
          company_name, opportunity_description, why_ibm, project_name,
          business_owner, close_date, value_usd, metric, economic_buyer,
          decision_criteria, decision_process, identified_pain, champion,
          competition, next_actions, action_date, action_owner,
          metric_complete, economic_buyer_complete, decision_criteria_complete,
          decision_process_complete, identified_pain_complete, champion_complete,
          competition_complete
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const params = [
        dealData.company_name,
        dealData.opportunity_description || null,
        dealData.why_ibm || null,
        dealData.project_name || null,
        dealData.business_owner || null,
        dealData.close_date || null,
        dealData.value_usd || null,
        dealData.metric || null,
        dealData.economic_buyer || null,
        dealData.decision_criteria || null,
        dealData.decision_process || null,
        dealData.identified_pain || null,
        dealData.champion || null,
        dealData.competition || null,
        dealData.next_actions || null,
        dealData.action_date || null,
        dealData.action_owner || null,
        dealData.metric_complete ? 1 : 0,
        dealData.economic_buyer_complete ? 1 : 0,
        dealData.decision_criteria_complete ? 1 : 0,
        dealData.decision_process_complete ? 1 : 0,
        dealData.identified_pain_complete ? 1 : 0,
        dealData.champion_complete ? 1 : 0,
        dealData.competition_complete ? 1 : 0,
      ];

      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          // Return the newly created deal
          dealModel.getDealById(this.lastID)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  },

  // Update deal
  updateDeal: (id, dealData) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE deals SET
          company_name = ?,
          opportunity_description = ?,
          why_ibm = ?,
          project_name = ?,
          business_owner = ?,
          close_date = ?,
          value_usd = ?,
          metric = ?,
          economic_buyer = ?,
          decision_criteria = ?,
          decision_process = ?,
          identified_pain = ?,
          champion = ?,
          competition = ?,
          next_actions = ?,
          action_date = ?,
          action_owner = ?,
          metric_complete = ?,
          economic_buyer_complete = ?,
          decision_criteria_complete = ?,
          decision_process_complete = ?,
          identified_pain_complete = ?,
          champion_complete = ?,
          competition_complete = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      const params = [
        dealData.company_name,
        dealData.opportunity_description || null,
        dealData.why_ibm || null,
        dealData.project_name || null,
        dealData.business_owner || null,
        dealData.close_date || null,
        dealData.value_usd || null,
        dealData.metric || null,
        dealData.economic_buyer || null,
        dealData.decision_criteria || null,
        dealData.decision_process || null,
        dealData.identified_pain || null,
        dealData.champion || null,
        dealData.competition || null,
        dealData.next_actions || null,
        dealData.action_date || null,
        dealData.action_owner || null,
        dealData.metric_complete ? 1 : 0,
        dealData.economic_buyer_complete ? 1 : 0,
        dealData.decision_criteria_complete ? 1 : 0,
        dealData.decision_process_complete ? 1 : 0,
        dealData.identified_pain_complete ? 1 : 0,
        dealData.champion_complete ? 1 : 0,
        dealData.competition_complete ? 1 : 0,
        id,
      ];

      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Deal not found'));
        } else {
          // Return the updated deal
          dealModel.getDealById(id)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  },

  // Delete deal
  deleteDeal: (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM deals WHERE id = ?';
      db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Deal not found'));
        } else {
          resolve({ message: 'Deal deleted successfully', id });
        }
      });
    });
  },

  // Search deals
  searchDeals: (query) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM deals 
        WHERE company_name LIKE ? 
           OR opportunity_description LIKE ?
           OR project_name LIKE ?
        ORDER BY created_at DESC
      `;
      const searchTerm = `%${query}%`;
      db.all(sql, [searchTerm, searchTerm, searchTerm], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
};

module.exports = dealModel;

// Made with Bob
