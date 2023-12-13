const mongoose = require('mongoose');
const Article = require("../db/Article");
const User = require("../db/User");

const create = async (req, res) => {
  try {
    const { title, content, image  } = req.body;
    const {userId} = req.user

    const article = new Article({ title, content, image, userId });
    await article.save();

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllOnlyUser = async (req,res) =>{
  try {
    const {userId} = req.user
    // Find the user to exclude
    const userToExclude = await User.findById(userId);
    if (!userToExclude) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Find all articles excluding the user
    const articles = await Article.find({ userId: { $ne: userToExclude._id } }).populate('userId', 'name surname image');;
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getByArticleId = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found." });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.user;
    // Convert userId to ObjectId
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    // Find all articles where the userId matches
    const articles = await Article.find({ userId: userIdObjectId });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const id = req.params.id;
    const article = await Article.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true }
    );
    if (!article) {
      return res.status(404).json({ error: "Article not found." });
    }
    res.json({message:"Article updated successfully."});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found." });
    }
    res.json({ message: "Article deleted successfully." });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  create,
  getAllOnlyUser,
  getByArticleId,
  getByUserId,
  update,
  remove,
};
