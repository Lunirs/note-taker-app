const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
//Create

// post to /api/notes
router.post("/notes", (req, res) => {
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
    fs.readFile(path.join(__dirname, "../../db/db.json"), (err, note) => {
      if (err) throw err;
      const noteArr = JSON.parse(note);
      noteArr.push(newNote);
      console.log(noteArr);

      // write the new note into the database

      fs.writeFile(
        path.join(__dirname, "../../db/db.json"),
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

//Create

// getting route for the full note database
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../../db/db.json"))
);

//get individual note by id and to display in read only
router.get("/notes/:id", (req, res) => {
  const index = req.params.id;

  res.json(allNotes[index]);
});

// Delete

// delete individual notes by targetting their specific id
router.delete("/notes/:id", (req, res) => {
  // defines the target's id parameter
  const targetId = req.params.id;
  console.log(targetId);
  // read current db for all notes and parse it into an allNotes array
  fs.readFile(path.join(__dirname, "../../db/db.json"), "utf8", (err, note) => {
    if (err) throw err;
    let allNotes = JSON.parse(note);

    // filter the array by keeping all ids that do not equal the target id
    const newAllNotes = allNotes.filter((note) => note.id !== targetId);
    res.send(newAllNotes);

    // replace old db with new db with the targetted note deleted
    fs.writeFile(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify(newAllNotes, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
  });
});

module.exports = router;
