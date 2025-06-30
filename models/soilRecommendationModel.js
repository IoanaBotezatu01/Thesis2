const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const soilRecommendationSchema = new mongoose.Schema({
    soil: {
        type: String,
        required: true
    },
    plantation: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const SoilRecommendation = mongoose.model('SoilRecommendation', soilRecommendationSchema);

  module.exports = SoilRecommendation;