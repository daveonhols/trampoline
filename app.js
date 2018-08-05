const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");

const app = express();

app.engine("html", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.get("/", (req, res) => { res.sendFile( path.join(__dirname + "/game.html") )});

app.listen(3000, "0.0.0.0", () => console.log("Starting up..."));
