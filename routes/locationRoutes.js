const express = require('express');
const locationController = require('../controllers/locationController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, locationController.add );
router.get('/:userId',verifyToken, locationController.getLocationByUserId );
router.get('/id/:locationId',verifyToken, locationController.getLocationById)
router.get('/users/nearby',verifyToken,locationController.getUsersByLocation)

module.exports = router;