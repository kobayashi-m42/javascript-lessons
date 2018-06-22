const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = `${__dirname}`;
  if (req.url === '/Bingo') {
    filePath += `/bingo.html`;
  } else if (req.url.indexOf('/Calendar') === 0) {
    filePath += `/calender.html`;
  } else {
    filePath += req.url;
  }

  fs.readFile(filePath, 'UTF-8', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('not found!');
      res.end();
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] });
    res.end(data);
  });
});

server.listen(port);
console.log(`server start at http://localhost:${port}`);
