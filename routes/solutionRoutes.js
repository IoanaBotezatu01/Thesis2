const express = require('express');
const soluionController = require('../controllers/solutionController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, soluionController.add );
router.get('/byWeed/:predictedWeed',verifyToken, soluionController.getSolutionByWeed );
router.get('/byId/:solutionId',verifyToken,soluionController.getSolutionById);
router.put('/updateRating/:solutionId',verifyToken,soluionController.updateRating)

module.exports = router;