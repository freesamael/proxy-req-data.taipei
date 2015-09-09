var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/req', function(req, res, next) {
  var path = decodeURIComponent(req.query.url);
  var http = require('http');

  var options = {
    host: 'data.taipei',
    path: path,
    method: 'GET'
  };

  http.get(options, function(response) {
   var data = '';
   response.on('data', function (chunk) {
     data += chunk;
   });

   response.on('end', function () {
     res.send(data);
   });
  });
});

app.listen(3000);
