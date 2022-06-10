const router = require("express").Router();

//HTML Route

router.use(require("./notesHtmlRoutes"));

// API Route

router.use("/api", require("./api"));

module.exports = router;
