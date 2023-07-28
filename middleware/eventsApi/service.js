const Events = require("./schema");

const getEvents = () => {
  return Events.find({});
};
const createEvent = (eventName, date, eventImage, eventDetails, tags) => {
  const event = new Events({
    eventName,
    date,
    eventImage,
    eventDetails,
    tags,
  });

  return event.save();
};

module.exports = {
  getEvents,
  createEvent,
};
