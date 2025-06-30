const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
  register: async (req, res) => {
    const { email, username, password,confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Enter the same password!' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        

        const newUser = new User({
            email,
            username,
            password, 
        });
        await newUser.save();
          
        
        const user = await User.findOne({ email });
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
      res.status(201).json({ message: 'Registration successful',
                            userId: user._id,
                            username: user.username, 
                            token:token });
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            username: user.username, 
            token:token
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
},


  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
};

module.exports = authController;