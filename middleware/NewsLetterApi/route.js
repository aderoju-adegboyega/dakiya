const express = require("express");
const NewsletterService = require("./newsletterService");

const router = express.Router();

router.post("/create-newsletter", (req, res) => {
  const { title, content } = req.body;

  NewsletterService.createNewsletter(title, content)
    .then((newsletter) => {
      res.status(201).json({
        message: "Newsletter created successfully",
        success: true,
        newsletter: newsletter,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

router.get("/retrieve-newsletters", (req, res) => {
  NewsletterService.getNewsletters()
    .then((newsletters) => {
      if (newsletters.length > 0) {
        res.status(200).json({
          message: "Newsletters fetched successfully",
          success: true,
          newsletters: newsletters,
        });
      } else {
        res.status(404).json({
          message: "No newsletters found",
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
