const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;
const Roll = require('../models/authModel');

const authenticateToken = (req, res, next) => {
  console.log("start authenticateToken");
  const token = req.headers['authorization'].replace('Barear=', '');
  if (!token) {
    return res.status(401).send('Access denied');
  }
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Fail authenticateToken - Could not verify token");
    }
    console.log("pass authenticateToken", user);
    req.user = user;
    next();
  });
};


const authorizeRoll = (rolls) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        res.status(401).send('Access denied');
      }
      console.log(req.user);
      const userId = req.user.userId;
      const userRollNames = await Roll.getRolls(userId);
      if (!rolls.some(roll => userRollNames.includes(roll))) {//אם לפחות אחד מהאלמנטים במערך עומד בתנאי
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = { authenticateToken, authorizeRoll };





 // const authHeader = req.headers['authorization'];
  //Extracting token from authorization header
  // const token = authHeader && authHeader.split(" ")[0];//[0]