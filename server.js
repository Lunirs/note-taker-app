const express = require("express");
const fs = require("fs");
const nodemon = require("nodemon");
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

//get individual note by id and to display in read only
app.get("/api/notes/:id", (req, res) => {
  const index = req.params.id;

  res.json(allNotes[index]);
});
// Delete

// delete individual notes by targetting their specific id
app.delete("/api/notes/:id", (req, res) => {
  // defines the target's id parameter
  const targetId = req.params.id;
  console.log(targetId);
  // read current db for all notes and parse it into an allNotes array
  fs.readFile("./db/db.json", "utf8", (err, note) => {
    if (err) throw err;
    let allNotes = JSON.parse(note);

    // filter the array by keeping all ids that do not equal the target id
    const newAllNotes = allNotes.filter((note) => note.id != targetId);
    res.send(newAllNotes);

    // replace old db with new db with the targetted note deleted
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(newAllNotes, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
  });
});

app.listen(PORT, () =>
  console.log(`Application is ruinning on port http://localhost:${PORT}`)
);
