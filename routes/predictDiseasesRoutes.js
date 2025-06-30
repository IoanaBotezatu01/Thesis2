const express = require('express');
const { handleDiseasePhotoPrediction } = require('../controllers/predictDiseasesController');
const multer = require('multer');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const upload = multer({ dest: 'public/uploads/' }); 
router.post('/predict-diseases',verifyToken, upload.single('image'),handleDiseasePhotoPrediction );

module.exports = router;