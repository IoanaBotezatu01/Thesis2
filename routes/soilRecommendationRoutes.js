const express = require('express');
const soilRecommendationController = require('../controllers/soilRecommendationController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, soilRecommendationController.add );
router.get('/bySoil/:soil',verifyToken, soilRecommendationController.getRecommendationBySoil);
router.get('/byPlantation/:plantation',verifyToken,soilRecommendationController.getRecommendationByPlantation);
module.exports = router;