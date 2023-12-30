// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const convertUnixToGMT = (unixValue) => {
  return new Date(parseInt(unixValue)).toUTCString();
};

const convertGMTToUnix = (GMTValue) => {
  return new Date(GMTValue).getTime();
};

app.get("/api/:date", (req, res) => {
  if (req.params.date.length === 13) {
    let GMT = convertUnixToGMT(req.params.date);
    res.json({ unix: parseInt(req.params.date), utc: GMT });
  } else {
    let unix = convertGMTToUnix(req.params.date);
    let GMT = convertUnixToGMT(unix);
    res.json({ unix: unix, utc: GMT });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
