const express = require('express');
const { handlePestPhotoPrediction } = require('../controllers/predictPestsController');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const upload = multer({ dest: 'public/uploads/' }); 
router.post('/predict-pests',verifyToken, upload.single('image'), handlePestPhotoPrediction);

module.exports = router;