var express = require('express');
var app = express();
var uaParser = require('ua-parser-js');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('User Story for this project: I can get the IP address, language and operating system for my browser. For response, please, follow this link: <a href="/api/whoami">https://.../api/whoami</a>');
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
  var ua = uaParser(req.headers['user-agent']);

  var ip = req.headers['x-forwarded-for'],
    language = req.headers['accept-language'].split(',', 1),
    software = ua.os;

  res.json({
    "ipaddress": ip,
    "language": language[0],
    "software": software
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});
