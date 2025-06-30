const express = require('express');
const alertController = require('../controllers/alertController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, alertController.add );
router.get('/',verifyToken, alertController.getAllAlerts);
router.get('/:alertId',verifyToken,alertController.getAlertById);
router.get('/affect/:userId',verifyToken,alertController.getAlertsWithPlantationStatus)
module.exports = router;