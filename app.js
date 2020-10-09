// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/Date.js");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const listItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render("list.ejs", {listTitle: day, newListItems: listItems });

});

app.get("/work", function(req, res) {

  let title = "Work List";
  res.render("list.ejs", {listTitle: title,newListItems: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/work", function(req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/", function(req, res) {

  const item = req.body.newItem;
  if (req.body.list === "Work") {

    workItems.push(item);
    res.redirect("/work");

  } else {

    listItems.push(item);
    res.redirect("/");

  }
});

app.listen(3000, function() {
  console.log("Server is running on the port 3000.");
});
