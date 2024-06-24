const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //Extracting token from authorization header
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send('Access denied');

  try {
    wt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Could not verify token");
      }
      req.user = user;
    });
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = {authenticateToken};

