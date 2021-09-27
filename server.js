const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
/*
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://USERNAME:PASSWORD@cluster0.epyvo.mongodb.net/DATABASENAME?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

const notesSchema = {
  title: String,
  content: String,
};

const Note = mongoose.model("clients", notesSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save();

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server running on 3000");
});
