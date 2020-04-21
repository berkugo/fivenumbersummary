var express = require('express');
const csv = require(__dirname + '/csv/csv.js');

var router = express.Router();
router.get('/', function (req, res, next) {

  const data = csv.fiveNS();
  console.log(data);
  res.render('index', { titles: csv.array[0], rows: csv.array.slice(1), fvs: data });
});

module.exports = router;
