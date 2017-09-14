// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var apiRouter = require('./api/router');
var bodyParser = require('body-parser');
var moment = require('moment');

Date.prototype.isValid = function () {
  return this.getTime() === this.getTime();
};

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// API Routes
app.use('/api', apiRouter);


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/oh-no", function (request, response) {
  response.status(200).json({
    unix: null,
    natural: null
  });
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.get("/:date", function (request, response) {
  
  
  let passedDate = request.params.date;
  
  // Check whether the date passed was a unix timestamp = REGEX
  if (passedDate.match(/^[0-9]+$/)) {
    passedDate = parseInt(passedDate, 10);
  }
  let date = new Date(passedDate);
  if (date.isValid()) {
    console.log(date);
    let dateObject;
    if (date) {
      dateObject = {
        unix: date.getTime(),
        natural: moment(date).format('MMMM DD, YYYY')
      }
      return response.status(200).send({ date: dateObject });
    }
  }
  response.redirect('/oh-no');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/date", bodyParser.urlencoded({ extended: true}), function (request, response) {
  
  let passedDate = request.body.date;
  if (!passedDate) {
    response.redirect('/');
  }
  
  // Check whether the date passed was a unix timestamp = REGEX
  if (passedDate.match(/^[0-9]+$/)) {
    passedDate = parseInt(passedDate, 10);
  }
  let date = new Date(passedDate);
  if (date.isValid()) {
    console.log(date);
    let dateObject;
    if (date) {
      dateObject = {
        unix: date.getTime(),
        natural: moment(date).format('MMMM DD, YYYY')
      }
      return response.status(200).send({ date: dateObject });
    }
  }
  response.redirect('/oh-no');
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
