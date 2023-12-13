const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const authRoutes = require("./routers/authRouters");
const articleRoutes = require('./routers/articleRoutes');
const userRoutes = require("./routers/userRoutes");
require('dotenv').config();
// Connect to MongoDB using Mongoose in local db
mongoose.connect('mongodb://localhost:27017/rec');

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use('/api/auth',authRoutes);
app.use('/api/articles',articleRoutes);
app.use('/api/user',userRoutes);
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
