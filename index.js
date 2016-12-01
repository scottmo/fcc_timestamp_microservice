var express = require("express");
var path = require("path");
var moment = require("moment");

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent file: ', fileName);
    }
  });
});

app.get('/:dateString', function (req, res) {
  var date = req.params.dateString;
  if (isNaN(parseInt(date))) {
    date = moment(date);
  } else {
    date = moment(date, 'X');
  }

  if (date.isValid()) {
    res.json({
      unix: date.format("X"),
      natural: date.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(port, function () {
  console.log('Listening on port ' + port + '!');
});
