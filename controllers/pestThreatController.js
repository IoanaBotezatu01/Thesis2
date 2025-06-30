
const PestThreat = require('../models/pestThreatModel');

const pestThreatController = {
  add: async (req, res) => {
    const { pest, plantation} = req.body;
    try {
        const newPestThreat = new PestThreat({
            pest,
            plantation
        });
        await newPestThreat.save();
      res.status(201).json({ message: 'Pest Threat added successfuly!',
        pestThreatId:newPestThreat._id
       });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },


  getThreatByPlantation: async (req, res) => {
    const { plantation } = req.params;
    try {
      const pestThreat = await PestThreat.find({plantation});
      if (!pestThreat) {
        return res.status(404).json({ error: 'Threat not found' });
      }
      
      res.status(200).json(pestThreat);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getThreatByPest: async (req, res) => {
    const { pest } = req.params;
    try {
      const pestThreat = await PestThreat.find({pest});
      if (!pestThreat) {
        return res.status(404).json({ error: 'Threat not found' });
      }
      
      res.status(200).json(pestThreat);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
  
  
};

module.exports = pestThreatController;