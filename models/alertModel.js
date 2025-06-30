const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    threat: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true,
    },
    temperature:{
        type:Number,
        required:true
    },
    humidity:{
        type:Number,
        required:true
    },
    precipitation:{
            type:Number,
            required:true
    },
    wind:{
        type:Number,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    alertDate: {
        type: String,
        default: function () {
            const now = new Date();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${month}-${day}`;
        }
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Alerts = mongoose.model('Alerts', alertSchema);

  module.exports = Alerts;