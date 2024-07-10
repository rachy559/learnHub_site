const jwt = require('jsonwebtoken');
require('dotenv').config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split('=')[1];
  if (!token) {
    return res.status(401).send('Access denied');
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Fail authenticateToken - Could not verify token");
    }
    req.user = user;
    next();
  });
};


const authorizeRoll = (roll) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        res.status(401).send('Access denied');
      }
      const userRollName=req.user.rolls;
      if(!roll==userRollName)
        return res.status(403).json({ message: 'Unauthorized' });
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};


module.exports = { authenticateToken, authorizeRoll };

