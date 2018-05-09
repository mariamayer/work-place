var express = require('express');
var router = express.Router();
const Address = require('../models/address-model');
var queryVar = '';

/* GET Addresses listing. */
router.get('/addresses/:perPage/:page', (req, res, next) => {
    const sort = req.query.sortBy;
    const filter = req.query.filter.split(',');
    const criteria = req.query.criteria=='true' ? 'ascending' : 'descending';
    const perPage = Number(req.params.perPage);
    const page = req.params.page > 0 ? req.params.page : 0;

    if( queryVar == '' || filter=='' ){
        queryVar = query(filter);
    }else{
        var newQuery = query(filter);
        Object.assign(queryVar, newQuery);
    }

  Address.count({}, function(err, count){
    Address.find(queryVar ,(err, addressesList) => {
        if (err) {
          res.json(err); return;
        }
        res.json({ "addresses": addressesList, "count": count});
      })
      .skip(perPage * (page-1))
      .limit(perPage)
      .sort([[sort, criteria]]);
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

// Add predefined filters
const query = function(filter){
    var query = {};
    switch(filter[0]) {
    case '':
        return {};
    case 'regex':
        query[filter[1]] = { "$regex": filter[2].toUpperCase() };
        return query;
    case 'not':
        query[filter[1]] = { "$not": filter[2] };
        return query;
    case 'eq':
        query[filter[1]] = { "$eq": filter[2] };
        return query;
    case 'range':
        query[filter[1]] = { "$gte": filter[2] , "$lte": filter[3] };
        return query;
    case 'range-date':
        query[filter[1]] = { "$gte": new Date(filter[2]) , "$lte": new Date(filter[3]) };
        return query;
    }
};
