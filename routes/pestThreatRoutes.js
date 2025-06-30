const express = require('express');
const pestThreatController = require('../controllers/pestThreatController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, pestThreatController.add );
router.get('/byPest/:pest',verifyToken, pestThreatController.getThreatByPest);
router.get('/byPlantation/:plantation',verifyToken,pestThreatController.getThreatByPlantation);
module.exports = router;