const { client } = require('../config/database');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
       
        this.password = await bcrypt.hash(this.password, 10);
        next(); 
    } catch (error) {
        return next(error); 
    }
});
const User = mongoose.model('User', userSchema);

  module.exports = User;