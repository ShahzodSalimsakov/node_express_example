var http = require('http');
var fs = require('fs');

function serverStaticFile(res, path, contentType, responseCode) {
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data) {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Error');
      console.log(path)
    } else {
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

http.createServer(function (req, res) {
  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch(path) {
    case '': 
      serverStaticFile(res, '/home.html', 'text/html');
      break;
    case '/about':
      serverStaticFile(res, '/about.html', 'text/html');
      break;
    case '/img/logo.jpg':
    serverStaticFile(res, '/img/logo.jpg', 'image/jpeg');
    break;
    default:
      serverStaticFile(res, '/404.html', 'text/html');
      break;
  }
}).listen(3000);


console.log("Server is running");