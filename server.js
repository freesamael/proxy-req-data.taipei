var proxy = require('express-http-proxy');
var app = require('express')();

app.set('port', (process.env.PORT || 3001));

app.use('/', proxy('data.taipei', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  },
  intercept: function(rsp, data, req, res, callback) {
       res.set('Access-Control-Allow-Origin', '*');
       callback(null, data);
  }
}));

app.listen(app.get('port'));
