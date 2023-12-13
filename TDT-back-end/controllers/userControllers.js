const User = require("../db/User");
const  { generateToken } =  require("../utils/jwt");
const updateUser = async (req, res) => {
  const {userId} = req.user;
  try {
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update user data
    const { name, surname, email, password, image } = req.body;
    // You can add more validation or modification logic as needed
    existingUser.name = name || existingUser.name;
    existingUser.surname = surname || existingUser.surname;
    existingUser.email = email || existingUser.email;
    existingUser.image = image || existingUser.image;
    if (password) {
      // If a new password is provided, hash and update it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      existingUser.password = hashedPassword;
    }
    // Save the updated user
    const updatedUser = await existingUser.save();
    const token = generateToken(updatedUser);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateUser,
};
