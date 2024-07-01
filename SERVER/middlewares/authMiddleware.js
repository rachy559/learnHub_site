const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  console.log("start authenticateToken");
  const authHeader = req.headers['authorization'];
  //Extracting token from authorization header
  const token = authHeader && authHeader.split(" ")[1];//[0]
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


const authenticateAdmin = (req, res, next)=>{
  if(!req.user){
     res.status(401).send('Access denied');
  }
  if(user.role === 'Admin'){
    next();
  }
}




// const authorizeRoll = (rolls) => {
//   return async (req, res, next) => {
//       const userRoles = await Roll.findAll({
//           where: { UserId: req.user.id },
//       }).map(roll => roll.rollName);

//       if (!rolls.some(roll => userRoles.includes(roll))) {
//           return res.status(403).json({ message: 'Unauthorized' });
//       }
//       next();
//   };
// };


module.exports = {authenticateToken, authenticateAdmin};

