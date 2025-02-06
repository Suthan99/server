const jwt = require('jsonwebtoken');
const User = require('../auth/userModel'); // Assuming your user model is in models/userModel

const protect = async (req, res, next) => {
  let token;

  // Check for token in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, '1231'); // Use your JWT secret key here

      // Get user from the token payload
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Pass control to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token found
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = { protect };
