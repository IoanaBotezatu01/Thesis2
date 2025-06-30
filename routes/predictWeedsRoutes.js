const express = require('express');
const { handleWeedPhotoPrediction } = require('../controllers/predictWeedsController');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); 
router.post('/predict-weeds',verifyToken, upload.single('image'), handleWeedPhotoPrediction);

module.exports = router;
