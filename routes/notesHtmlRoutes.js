const router = require("express").Router();
const path = require("path");

//Read

//getting route for home page

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// getting route for note page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = router;
