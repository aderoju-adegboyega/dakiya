const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const validator = require('validator');
const mongoose = require('mongoose');
const saveFeedback = require('./feedbackservice');

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

// Validate the feedback form inputs
function validateFeedbackInputs(name, email, subject, message) {
  if (!name || !email || !subject || !message) {
    return false;
  }

  if (!validator.isEmail(email)) {
    return false;
  }

  return true;
}

router.post('/feedback', connectToMongoDB, async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log('Received form data:', req.body);

  // Validate form inputs
  if (!validateFeedbackInputs(name, email, subject, message)) {
    return res.status(400).send('Invalid form inputs');
  }

  try {
    const result = await saveFeedback(name, email, subject, message); // Save feedback using the updated service

    // Send email notification to administrators
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'parthilpatel666@gmail.com',
        pass: 'gzhbhcdquylprjvs',
      },
    });

    const mailOptions = {
      from: 'parthilpatel666@gmail.com',
      to: 'dakiya587@gmail.com',
      subject: 'New Feedback Submission',
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.send(result.message);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;