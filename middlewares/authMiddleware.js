const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || '';

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, userName: user.userName },
    secretKey,
    { expiresIn: '1h' }
  );
}

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json(
    { status: {
            code: 'API4003',
            description: 'Sin autorización'
        } 
    });

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) return res.status(401).json(
        { status: 
            {
                code: 'API4001', 
                description: 'Fallo al verificar autorización'
            } 
        });
    req.user = decoded; 
    next();
  });
}

module.exports = { generateToken, verifyToken };
