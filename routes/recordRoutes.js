const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { authenticate, requireRoles } = require('../middlewares/auth');

router.get('/', authenticate, requireRoles(['Viewer', 'Analyst', 'Admin']), recordController.getRecords);

router.post('/', authenticate, requireRoles(['Admin']), recordController.createRecord);
router.put('/:id', authenticate, requireRoles(['Admin']), recordController.updateRecord);
router.delete('/:id', authenticate, requireRoles(['Admin']), recordController.deleteRecord);

module.exports = router;