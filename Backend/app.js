const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://nmnnrb:nmnnrb@cluster0.d3yw8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));







app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));