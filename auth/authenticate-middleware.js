/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const tokenSecret = require('./tokenSecret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    jwt.verify(token, tokenSecret.jwt_secret, (err, decodedToken)=>{
      if(err){
        res.status(401).json({message: "Failed to Verify."})
      }else{
        req.decodedToken = decodedToken;
        next();
      }
    })
  }else{
    res.status(401).json({ you: 'shall not pass!' });
  }  
};
