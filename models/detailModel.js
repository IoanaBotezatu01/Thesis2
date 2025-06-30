const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    prediction: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Details = mongoose.model('Details', detailSchema);

  module.exports = Details;