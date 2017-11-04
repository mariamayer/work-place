var express = require('express');
var router = express.Router();
const Address = require('../models/address-model');

/* GET Addresses listing. */
router.get('/addresses/:perPage/:page', (req, res, next) => {
  const sort = req.query.sortBy;
  const criteria = req.query.criteria=='true' ? 'ascending' : 'descending';
  const perPage = Number(req.params.perPage);
  const page = req.params.page > 0 ? req.params.page : 0;

  Address.count({}, function( err, count){
    Address.find((err, addressesList) => {
        if (err) {
          res.json(err); return;
        }
        res.json(addressesList);
      }).skip(perPage * (page-1)).limit(perPage).sort([[sort, criteria]]);
    });
  });

  /* GET Addresses listing. */
  router.get('/search', (req, res, next) => {
    const string = req.query.search;
    Address.find({ PROPERTY_ADDRESS: new RegExp(string, "i") } ,(err, addressesList) => {
        if (err) {
          res.json(err); return;
        }
        res.json(addressesList);
      });
    });

module.exports = router;
