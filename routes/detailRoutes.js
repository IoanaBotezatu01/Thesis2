const express = require('express');
const detailController = require('../controllers/detailController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, detailController.add );
router.get('/:prediction',verifyToken, detailController.getSolutionByPrediction );
module.exports = router;