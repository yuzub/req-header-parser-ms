var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// app.set('views', __dirname + '/views');
// app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.send('I can get the IP address, language and operating system for my browser Example usage: <a href="/api/whoami">https://...com/api/whoami</a>');
});

app.get('/headers', function(req, res) {
  res.set('Content-Type', 'text/plain');
  var s = '';
  for (var name in req.headers) {
    s += name + ': ' + req.headers[name] + '\n';
  }

  res.send(s);
});

app.get('/api/whoami', function(req, res) {
  res.json({
    "ipaddress": req.headers['x-forwarded-for'],
    "language": req.headers['accept-language'],
    "software": "Windows NT 6.1"
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});
