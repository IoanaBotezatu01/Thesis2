const Solution = require('../models/solutionModel');

const soluionController = {
  add: async (req, res) => {
    const { predictedWeed, description, count, total } = req.body;
    try {
        const newSolution = new Solution({
            predictedWeed,
            description,
            count, 
            total
        });
        await newSolution.save();
      res.status(201).json({ message: 'Solution added successfuly!',
        solutionId:newSolution._id
       });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },


  getSolutionByWeed: async (req, res) => {
    const { predictedWeed } = req.params;
    try {
      const solution = await Solution.find({predictedWeed});
      if (!solution) {
        return res.status(404).json({ error: 'Solutions not found' });
      }
      const results = solution.map(sol => ({
        ...sol.toObject(),
        average: sol.count > 0 ? sol.total / sol.count : 0
      }));
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getSolutionById: async (req, res) => {
    const { solutionId } = req.params;
    try {
      const solution = await Solution.findById(solutionId);
      if (!solution) {
        return res.status(404).json({ error: 'Solutions not found' });
      }
      res.status(200).json(solution);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  updateRating: async( req,res) =>{
    const { solutionId } = req.params;
    const { rating } = req.body; 

    try {
      const solution = await Solution.findById(solutionId);
      if (!solution) {
        return res.status(404).json({ error: 'Solution not found' });
      }

      const newCount = (solution.count || 0) + 1;
      const newTotal = (solution.total || 0) + rating;
      const newAverage = newTotal / newCount;

      solution.count = newCount;
      solution.total = newTotal;

      await solution.save();

      res.status(200).json({
        message: 'Rating updated successfully!',
        newRating: newAverage,
        count: newCount,
        total: newTotal
      });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};

module.exports = soluionController;