const { verifyToken } = require('./jwt');

const authMiddleware = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  if (!tokenWithBearer) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }
  try {
    // Verify the token and attach the decoded user information to the request
    const [, token] = tokenWithBearer.split(' ');
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
