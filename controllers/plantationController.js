const Plantation = require('../models/plantationModel');

const plantationController = {
  add: async (req, res) => {
    const { userId, locationId, name } = req.body;
    try {
        const newPlantation = new Plantation({
            userId,
            locationId, 
            name
        });
        await newPlantation.save();
      res.status(201).json({ message: 'Plantation added successfuly!' });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },


  getPlantationsByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const plantation = await Plantation.find({userId});
      if (!plantation) {
        return res.status(404).json({ error: 'Plantations not found' });
      }
      res.status(200).json(plantation);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },

  getPlantationsByLocationId: async (req, res) => {
    const { locationId } = req.params;
    try {
      const plantation = await Plantation.find({locationId});
      if (!plantation) {
        return res.status(404).json({ error: 'Plantations not found' });
      }
      res.status(200).json(plantation);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};

module.exports = plantationController;