const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET); 
      next(); 
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
  
  module.exports = verifyToken;