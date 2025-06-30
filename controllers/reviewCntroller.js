const Review = require('../models/reviewModel');

const reviewController = {
  add: async (req, res) => {
    const { userId, solutionId, rating } = req.body;
    try {
        const newReview = new Review({
            userId,
            solutionId,
            rating
        });
        await newReview.save();
      res.status(201).json({ message: 'Review added successfuly!',
        reviewId:newReview._id
       });
    } catch (error) {
        console.log(error)
      res.status(400).json({ error: error.toString() });
    }
  },


  getReviewByUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const review = await Review.find({userId});
      if (!review) {
        return res.status(404).json({ error: 'Reviews not found' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getReviewBySolution: async (req, res) => {
    const { solutionId } = req.params;
    try {
      const review = await Review.find({solutionId});
      if (!review) {
        return res.status(404).json({ error: 'Reviews not found' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
  getReviewById: async (req, res) => {
    const { reviewId } = req.params;
    try {
      const review = await Review.find({reviewId});
      if (!review) {
        return res.status(404).json({ error: 'Reviews not found' });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },
};

module.exports = reviewController;