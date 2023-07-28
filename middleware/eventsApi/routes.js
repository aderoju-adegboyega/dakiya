const express = require("express");
const EventService = require("./service");

const router = express.Router();

router.post("/events", (req, res) => {
  const { eventName, date, eventImage, eventDetails, tags } = req.body;

  EventService.createEvent(eventName, date, eventImage, eventDetails, tags)
    .then((event) => {
      res.status(201).json({
        message: "Event created successfully",
        success: true,
        event: event,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});


router.get("/events", (req, res) => {
  EventService.getEvents()
    .then((events) => {
      console.log(events)
      if (events.length > 0) {
        res.status(200).json({
          message: "Events fetched successfully",
          success: true,
          events: events,
        });
      } else {
        res.status(404).json({
          message: "No events found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

module.exports = router;
