const express = require('express');
const {  handleSoilsPhotoPrediction} = require('../controllers/predictSoilsController');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const upload = multer({ dest: 'public/uploads/' }); 
router.post('/predict-soils',verifyToken, upload.single('image'), handleSoilsPhotoPrediction);

module.exports = router;