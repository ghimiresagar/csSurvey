var express = require('express');
var router = express.Router();

router.get('/', function(req, res){ 
    res.send("Server working with out browser open!");
});

module.exports = router;