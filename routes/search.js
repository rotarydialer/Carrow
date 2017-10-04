var express = require('express');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res) {
    res.render('search', { title: 'Carrow - Search' });
});

module.exports = router;