var express = require('express');
var router = express.Router();

router.get("/whoami", function (request, response) {
  let headers = request.headers;
  let responseObject = {
    ipaddress: headers['x-forwarded-for'].split(',')[0],
    language: headers['accept-language'].split(',')[0],
    software: headers['user-agent'].match(/\(([^)]*)\)/)[1]
  }
  response.send(responseObject);
});

module.exports = router;