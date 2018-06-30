const express = require('express');
const ejs = require('ejs');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const calender = require('./src/routes/calender');
const imageUploader = require('./src/routes/imageUploader');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', `${__dirname}/src/views`);
app.engine('ejs', ejs.renderFile);

app.use('/public', express.static('public'));

app.use('/imageUploader', imageUploader);
app.use('/calender', calender);

app.get('/', (req, res) => {
  res.render('sample.ejs', { message: 'Hello there!' });
});

app.get('/bingo', (req, res) => {
  res.sendFile(path.join(__dirname, 'bingo.html'));
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  }
  console.log(`server start at http://localhost:${port}`);
});
