const User = require("../db/User");
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/jwt');
const register = async (req, res) => {
  try {
    const { email, surname, name, password } = req.body;
    const userExists = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    console.log(userExists, salt, hashedpassword);
    if (userExists) {
      return res.status(401).json("User already exists");
    }
    const user = new User({ name, surname, email, password: hashedpassword });
    await user.save();
    const token = generateToken(user)
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res.status(404).json("Password is incorrect");
    }
    const token = generateToken(userExists)
    // Password is valid, send the user data
    return res.status(200).json(token);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
