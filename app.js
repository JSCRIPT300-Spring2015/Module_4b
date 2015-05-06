var express = require('express');
var trucks = require('./trucks');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/trucks', function (request, response) {
	response.json(trucks.getTrucks());
});

app.get('/trucks/:name', function (request, response) {
	response.json(trucks.getTruck(request.params.name));
});

app.post('/trucks', function (request, response) {
	var newTruck = request.body;

	trucks.addTruck(newTruck);
	if (newTruck) {
		response.status(201).json(newTruck);
	} else {
		response.status(400).json('Problem adding truck');
	}
});

app.delete('/trucks/:name', function (request, response) {
	trucks.removeTruck(request.params.name);

	response.sendStatus(200);
});

app.listen(3000, function () {
	console.log('listening on port 3000');
});