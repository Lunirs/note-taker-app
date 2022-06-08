const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(PORT, () => console.log(`Application is ruinning on port ${PORT}`));
