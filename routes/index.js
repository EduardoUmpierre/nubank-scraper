var express = require('express');
var casper_wrapper = require('../casper_wrapper');
var router = express.Router();

/**
 * @GET Home page
 */
router.get('/', function (req, res) {
    res.render('index');
});

/**
 * @POST Get data from Nubank
 */
router.post('/data', function (req, res) {
    casper_wrapper(req.body.user, req.body.password).then(function (data) {
        // @todo Insert data in database
        // @todo Handle the error
        res.json(data);
    });
});

module.exports = router;
