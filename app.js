const express = require('express');

const app = express();
const path = require('path');

const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/bingo', (req, res) => {
  res.sendFile(path.join(__dirname, 'bingo.html'));
});

app.get('/calender', (req, res) => {
  res.sendFile(path.join(__dirname, 'calender.html'));
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
