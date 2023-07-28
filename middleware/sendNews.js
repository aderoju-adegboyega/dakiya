const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const app = express();
app.use(express.json());
app.use(cors());

const Subscribe = require('./NewsLetterApi/subscribeModel');
const Events = require("./eventsApi/schema");

// Function to send summary email to subscribed users
async function sendSummaryEmail(subscribedUsers, summary) {
    
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
      from: 'dakiya587@gmail.com', // Replace with your email
      subject: 'Summary of Events in the Last Two Weeks',
      text: summary,
    };
  
    for (const user of subscribedUsers) {
      mailOptions.to = user.email;
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Summary email sent to ${user.email}`);
      } catch (error) {
        console.error(`Error sending summary email to ${user.email}:`, error);
      }
    }
  }

  cron.schedule('*/10 * * * * *', async () => {
    try {
        // Get the current date and calculate the date two weeks ago
        const currentDate = new Date();
        const twoWeeksAgo = new Date(currentDate.getTime() - (14 *24 * 60 * 60 * 1000));
        
        // Find all events that occurred in the last two weeks
        const events = await Events.find({
          date: {
            $gte: twoWeeksAgo.toISOString(),
            $lte: currentDate.toISOString(),
          },
        }).maxTimeMS(30000);
        
        //Create a summary of the events
        let summary = 'Summary of Events in the Last Two Weeks:\n\n';
        for (const event of events) {
            
             const eventDate = new Date(event.date);
            // Append the event details to the summary
            summary += `- ${event.eventName} (${eventDate.toDateString()})\n`;
        }

        // Find all subscribed users
        const subscribedUsers = await Subscribe.find();

        // Send the summary email to subscribed users
        await sendSummaryEmail(subscribedUsers, summary)

        console.log('Summary emails sent successfully.');
    } catch (error) {
        console.log('Error sending summary emails:', error);
    }
  });
  module.exports = app;
