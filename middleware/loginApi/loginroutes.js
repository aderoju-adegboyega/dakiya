const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loginService = require('./loginservice');

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://am350894:nZGz6JvsDTbg9jZ8@dakiya.jqyk9or.mongodb.net/dakiya';

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to connect to the MongoDB database
const connectToMongoDB = async (req, res, next) => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        req.db = mongoose.connection;
        next();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        res.status(500).json({ error: 'Database connection error' });
    }
};

app.post('/login', connectToMongoDB, async (req, res) => {
    try {
        const data = req.body;
        const email = data.email;
        const password = data.password;

        const result = await loginService(email, password);

        return res.status(200).json({ message: 'Login successful', name: result.name });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(error.status).json({ message: error.message, code: error.status });
    }
});

module.exports = app;
