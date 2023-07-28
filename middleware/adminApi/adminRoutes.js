const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminLoginService = require('./adminService'); // Import the admin login service
let Event;

if (mongoose.models['Events']) {
    Event = mongoose.model('Events');
} else {
    Event = require('../eventsApi/Schema');
}
const Subscribe = require('../NewsLetterApi/subscribeModel');
const User = require('../registrationApi/registrationschema');



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

app.post('/admin/login', connectToMongoDB, async (req, res) => { // Change the route to /admin/login
    try {
        const data = req.body;
        const email = data.email;
        const password = data.password;

        const result = await adminLoginService(email, password); // Use the admin login service

        return res.status(200).json({ message: 'Admin login successful', name: result.name });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(error.status).json({ message: error.message, code: error.status });
    }
});

app.get('/admin/dashdata', connectToMongoDB, async (req, res) => {
    try {
        const eventCount = await Event.countDocuments();
        const subscriberCount = await Subscribe.countDocuments();
        const userCount = await User.countDocuments(); // Count the number of users

        return res.status(200).json({
            eventCount,
            subscriberCount,
            userCount // Return the user count
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

app.post('/admin/logout', connectToMongoDB, async (req, res) => {
    try {
        const data = req.body;
        const adminId = data.adminId; // Assuming the admin's ID is sent in the request body

        // Update the admin's status to 'offline'
        await Admin.updateOne(
            { _id: adminId },
            { $set: { status: 'offline' } }
        );


        return res.status(200).json({ message: 'Admin logout successful' });
    } catch (error) {
        console.error('Error during admin logout:', error);
        return res.status(500).json({ message: error.message });
    }
});

module.exports = app;

