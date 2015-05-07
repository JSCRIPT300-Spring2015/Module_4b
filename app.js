var express = require('express');

var bodyParser = require('body-parser');


var port = process.env.PORT || 3000;

var truckRouter = require('./routes/truckRoutes');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);

app.use('/trucks', truckRouter);


app.listen(3000, function () {
	console.log('listening on port 3000');
});