const mongoose = require("mongoose");

const event = mongoose.Schema({
  eventName: String,
  date: String,
  eventImage: String,
  eventDetails: String,
  tags: [String]
});

const eventSchema = mongoose.model("Events", event);

module.exports = eventSchema;
