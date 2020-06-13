const jwt = require('jsonwebtoken');
const tokenSecret = require('./tokenSecret');

module.exports = tokenMake;

function tokenMake(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = tokenSecret.jwt_secret;
    const options = {
        expiresIn: '1h',
    }
    return jwt.sign( payload, secret, options)
}