const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const plantationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    locationId:{
        type:String,
        required:true
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


const Plantation = mongoose.model('Plantation', plantationSchema);

  module.exports = Plantation;