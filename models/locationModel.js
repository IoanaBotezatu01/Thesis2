const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true,
    },
    name:{
        type:String,
        require:true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});


const Location = mongoose.model('Location', locationSchema);

  module.exports = Location;