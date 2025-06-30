const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    predictedWeed: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Solution = mongoose.model('Solution', solutionSchema);

  module.exports = Solution;