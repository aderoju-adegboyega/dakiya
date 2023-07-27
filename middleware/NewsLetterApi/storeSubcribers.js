const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const Subscribe = require('./subscribeModel');

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

app.post('/store', connectToMongoDB, async (req, res) => {
    try {
      
        const {email} = req.body;

        const result = await storeUser(email);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in storing users:', error);
        return res.status(error.status).json({ error: 'Subscription failed', message: error.message, code: error.status });
    }
});

const storeUser = async (email) => {
    try {
      
      // Create a new document in the 'subscribed_users' collection
      const subscribedUser = new Subscribe({
        email,
      });
  
      // Save the subscribedUser document to the 'subscribed_users' collection
      const result = await subscribedUser.save();
  
      return result;
    } catch (error) {
      throw error;
    }
  };
  
module.exports = app;