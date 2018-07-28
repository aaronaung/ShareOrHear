const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const creds = require("./server.config.json");
const SOH_API = require("./soh.api");

// === CONNECT TO DB & REGISTER SOH_API ===
const connection = mysql.createConnection({
  host: creds.SQL_HOST,
  user: creds.SQL_USER,
  password: creds.SQL_PW,
  database: creds.SQL_DB
});
connection.connect();

const SOH = new SOH_API(connection);
// === APPLY MIDDLEWARES ===
app.use(cors());
app.use(bodyParser.json());

// === HANDLE ROUTES ===
app.post("/edit", async (req, res) => {
  res.json(await SOH.getStorybyCred(req.body));
});

app.post("/share", async (req, res) => {
  res.json(await SOH.insertStory([Object.values(req.body)]));
});

app.post("/hear", async (req, res) => {
  res.json(await SOH.getStoriesbyTags(req.body));
});

app.post("/update", async (req, res) => {
  res.json(await SOH.updateStory([Object.values(req.body.story)]));
});

// === START SERVER ===
app.listen(8000, () => {
  console.log("API LISTENING AT 8000");
});
