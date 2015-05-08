var express = require('express');

var app = express();
var trucks = require('./trucks');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/trucks', function (request, response) {
	response.send(trucks.getTrucks());
});

// List all trucks
app.get('/trucks/:name', function (request, response) {
	var name = request.params.name;
	var truck = trucks.getTruck(name);

	if (truck) {
		response.json(truck);
	} else {
		response.status(404).json('That truck wasn\'t found.');
	}
});

// Add new truck
app.post('/trucks', function (request, response) {
	var newTruck = request.body;
	if (newTruck) {
		trucks.addTruck(newTruck);
		response.status(201).send(newTruck);
	} else {
		response.status(400).json('There was a problem adding the new truck.');
	}
});

// Update trucks list
app.put('/trucks/:name', function (request, response) {
	var truck = trucks.getTruck(request.params.id);
	var updatedTrucks;

	if (truck && request.body) {
		request.body._name = book._name;
		updatedTrucks = trucks.updateBook(request.body);
		response.send(updatedTrucks);
	} else {
		response.status(404).json('Could not locate truck for update.');
	}
});

// Delete truck from list
app.delete('/trucks/:name', function (request, response) {
	var truckName = request.params.name;

	trucks.removeTruck(truckName);
	response.sendStatus(200);
});


app.listen(3000, function () {
	console.log('listening on port 3000');
});
