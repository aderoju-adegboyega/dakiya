const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const Newsletter = require('./newsletterSchema');
const Subscribe = require('./subscribeModel');

const app = express();
app.use(bodyParser.json());

const fetchSubscribers = async () => {
    return await Subscribe.find();
};

const sendEmail = async (email, message) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: 'dakiya587@gmail.com',
            pass: 'cdgrpsbkdbogooat',
        },
    });

    const mailOptions = {
        from: 'dakiya587@gmail.com',
        to: email,
        subject: 'Newsletter',
        text: message,
    };

    return transporter.sendMail(mailOptions);
};



app.post('/subscribe', async (req, res) => {
    const { email, message } = req.body;

    try {
        await sendEmail(email, message);
        console.log('Email sent to:', email);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

module.exports = app;
