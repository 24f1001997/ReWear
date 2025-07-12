// const auth = (roles = []) => {
//   return (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) return res.status(401).send('Access denied');
//     console.log(token);
//     try {
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = verified;
      
//       if (roles.length && !roles.includes(verified.role)) {
//         return res.status(403).send('Forbidden');
//       }
      
//       next();
//     } catch (err) {
//       res.status(400).send('Invalid token');
//     }
//   };
// };

// module.exports = auth;
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    // 1. Extract token from header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    
    if (!authHeader) {
      console.error('No authorization header found');
      return res.status(401).send('Access denied. No token provided.');
    }

    // 2. Handle different token formats
    let token;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      token = authHeader;
    }

    console.log('Received token:', token); // Log the token for debugging

    if (!token) {
      console.error('Token not found in header');
      return res.status(401).send('Access denied. Invalid token format.');
    }

    try {
      // 3. Verify token with detailed error handling
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', verified);
      
      // 4. Check role permissions
      if (roles.length && !roles.includes(verified.role)) {
        console.error(`User role ${verified.role} not authorized for this route`);
        return res.status(403).send('Forbidden');
      }
      
      req.user = verified;
      next();
    } catch (err) {
      // 5. Detailed error logging
      console.error('Token verification failed:', err.message);
      
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Token expired');
      }
      
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send('Invalid token');
      }
      
      res.status(400).send('Invalid token');
    }
  };
};

module.exports = auth;