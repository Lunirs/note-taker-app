const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Create

// post to /api/notes
app.post("/api/notes", (req, res) => {
  //take new note info
  const { title, text } = req.body;
  // if both title and text exists, build new note with an id value
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    //need to obtain read file first before we write new note into database
    fs.readFile("./db/db.json", (err, note) => {
      if (err) throw err;
      const noteArr = JSON.parse(note);
      noteArr.push(newNote);
      console.log(noteArr);

      // write the new note into the database

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(noteArr, null, 2),
        "utf8",
        (err) => {
          if (err) return console.err;
          res.json(newNote);
        }
      );
    });
  }
});

//Read

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

// Delete

app.listen(PORT, () =>
  console.log(`Application is ruinning on port http://localhost:${PORT}`)
);
