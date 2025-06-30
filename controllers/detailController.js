const Detail = require('../models/detailModel');

const detailController = {
  add: async (req, res) => {
    const { prediction, description, image } = req.body;
    try {
        const newDetail = new Detail({
            prediction,
            description,
            image
        });
        await newDetail.save();
      res.status(201).json({ message: 'Details added successfuly!',
        detailId:newDetail._id
       });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },
  getSolutionByPrediction: async (req, res) => {
    const { prediction } = req.params;
    try {
      const detail = await Detail.find({prediction});
      if (!detail) {
        return res.status(404).json({ error: 'Details not found' });
      }
      
      res.status(200).json(detail);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};

module.exports = detailController;