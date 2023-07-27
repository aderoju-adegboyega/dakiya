const express = require("express");
const router = express.Router();

router.use(require("../eventsApi/routes"));
router.use(require("../loginApi/loginroutes"));
router.use(require("../registrationApi/registrationroutes"));
router.use(require("../NewsLetterApi/storeSubcribers"));
router.use(require("../NewsLetterApi/sendEmail"));
router.use(require("../adminApi/adminRoutes"));
router.use(require("../NewsLetterApi/routes"));
router.use(require("../sendNews"));

router.use(require("../feedbackApi/feedbackroutes"))

module.exports = router;
