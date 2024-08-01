const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  // console.log(user)
    return jwt.sign({name:user.name, email:user.email, phone:user.phone, isVerified: user.isVerified, permission:user.role.permissions}, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE });
}


const authenticateToken = (authToken, res) => {
    const token = authToken && authToken.split(' ')[1];
  
    if (token == null) return res.status(401).json({ message: 'Unauthorized: Token missing' });
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  
      if (err) return res.status(403).json({ message: 'Unauthorized: Invalid token' });

      return res.status(200).json({ user, message: 'Authenticated' })
  
    });
};

module.exports = {generateAccessToken, authenticateToken}