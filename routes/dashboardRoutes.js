const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticate, requireRoles } = require('../middlewares/auth');

router.get('/summary', authenticate, requireRoles(['Analyst', 'Admin']), dashboardController.getSummary);
router.get('/category-totals', authenticate, requireRoles(['Analyst', 'Admin']), dashboardController.getCategoryTotals);

module.exports = router;