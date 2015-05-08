var express = require('express');
var router = require('./routes/truckRouter');
var app = express();

var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

app.listen(3000, function () {
    console.log('listening on port 3000 by dennis');
});