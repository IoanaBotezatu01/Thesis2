const express = require('express');
const reviewController = require('../controllers/reviewCntroller');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/add',verifyToken, reviewController.add );
router.get('/byUser/:userId',verifyToken, reviewController.getReviewByUser );
router.get('/bySolution/:solutionId', verifyToken,reviewController.getReviewBySolution)
router.get('/byId/:reviewId',verifyToken,reviewController.getReviewById);
module.exports = router;