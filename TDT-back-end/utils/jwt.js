const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // You can customize the token payload as needed
  const payload = {
    userId: user._id,
    email: user.email,
    image: user.image,
    surname: user.surname,
    name: user.name,
    // Add other user-related information if needed
  };
  // Generate and return the JWT token
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const verifyToken = (token) => {
  // Verify and return the decoded token
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
