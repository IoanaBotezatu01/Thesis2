
const SoilRecommendation = require('../models/soilRecommendationModel');

const soilRecommendationController = {
  add: async (req, res) => {
    const { soil, plantation} = req.body;
    try {
        const newSoilRecommendation = new SoilRecommendation({
            soil,
            plantation
        });
        await newSoilRecommendation.save();
      res.status(201).json({ message: 'Soil Recommendation added successfuly!',
        soilRecommendationId:newSoilRecommendation._id
       });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },


  getRecommendationBySoil: async (req, res) => {
    const { soil } = req.params;
    try {
      const soilRecommendation = await SoilRecommendation.find({soil});
      if (!soilRecommendation) {
        return res.status(404).json({ error: 'Recommendation not found' });
      }
      
      res.status(200).json(soilRecommendation);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getRecommendationByPlantation: async (req, res) => {
    const { plantation } = req.params;
    try {
      const soilRecommendation = await SoilRecommendation.find({plantation});
      if (!soilRecommendation) {
        return res.status(404).json({ error: 'Recommendation not found' });
      }
      
      res.status(200).json(soilRecommendation);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
  
  
};

module.exports = soilRecommendationController;