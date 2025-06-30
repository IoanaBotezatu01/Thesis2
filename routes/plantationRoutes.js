const express = require('express');
const plantationController = require('../controllers/plantationController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, plantationController.add );
router.get('/byuser/:userId',verifyToken, plantationController.getPlantationsByUserId );
router.get('/bylocation/:locationId',verifyToken,plantationController.getPlantationsByLocationId)

module.exports = router;