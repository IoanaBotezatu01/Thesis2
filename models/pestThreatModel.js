const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const pestThreatSchema = new mongoose.Schema({
    pest: {
        type: String,
        required: true,
    },
    plantation:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});


const PestThreat = mongoose.model('PestThreat', pestThreatSchema);

  module.exports = PestThreat;