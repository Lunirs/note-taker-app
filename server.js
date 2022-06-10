const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//getting route for home page

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// getting route for note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// getting route for the full note database
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./db/db.json"))
);

app.listen(PORT, () =>
  console.log(`Application is ruinning on port http://localhost:${PORT}`)
);
