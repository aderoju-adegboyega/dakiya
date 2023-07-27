const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const registerUser = require('./registrationservice');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://am350894:nZGz6JvsDTbg9jZ8@dakiya.jqyk9or.mongodb.net/dakiya';
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

app.post('/registration', connectToMongoDB, async (req, res) => {
    try {
        const registration_data = req.body;
        const { name, email, password } = registration_data;

        const result = await registerUser(name, email, password);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(error.status).json({ error: 'Registration failed', message: error.message, code: error.status });
    }
});

module.exports = app;
