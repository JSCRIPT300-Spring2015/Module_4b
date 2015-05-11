var express = require('express');
var trucks = require('./trucks');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

var port = process.env.PORT || 3020;

// Serve home directory using static pages
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/trucks', function (request, response) {
	response.json(trucks.getTrucks());
});

app.get('/trucks/:name', function (request, response) {
	var name = request.params.name;
	var truck = trucks.getTruck(name);
	
	if(truck) {
		response.send(truck);
	} else {
		response.status(404).json('Truck not found');
	}
});

app.get('/food-types', function (request, response) {
	response.json(trucks.getFoodTypes());
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
	console.log('IM HERE');
	trucks.removeTruck(request.params.name);
	response.sendStatus(200);
});

app.listen(port, function () {
	console.log('Listening on port ' + port);
	console.log('Go to http://localhost:' + port + ' to view');

});