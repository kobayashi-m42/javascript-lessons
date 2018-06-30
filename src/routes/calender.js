const express = require('express');

const router = express.Router();

const Calender = require('../../src/server/domain/Calender.js');

router.get('/', (req, res) => {
  const targetDate = Calender.generateTargetDate(req.query.date);
  const calenderObj = Calender.generateCalender(targetDate);

  const renderParams = {
    calender: calenderObj,
    targetDate
  };

  res.render('calender.ejs', renderParams);
});

module.exports = router;
