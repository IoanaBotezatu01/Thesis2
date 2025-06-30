const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    solutionId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

  module.exports = Review;