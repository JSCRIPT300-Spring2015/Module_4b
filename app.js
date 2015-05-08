var express = require('express');
var trucks = require('./trucks');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/trucks', function (request, response) {
	response.json(trucks.getTrucks());
});

app.get('/trucks/:name', function (request, response) {
	
	var truck = trucks.getTruck(request.params.name);
	if (truck) {
		response.json(truck);
	} else {
		response.status(404).json('truck not found for: ' + request.params.name);
  	}
});

app.get('/food-types', function (request, response) {
	response.json(trucks.getFoodTypes());
});

app.get('/food-types/:name', function (request, response) {
	
	var foodType = trucks.filterByFoodType(request.params.name);
	if (foodType) {
		response.json(foodType);
	} else {
		response.status(404).json('food type not found for: ' + request.params.name);
  	}
});

app.post('/trucks', function (request, response) {
	var newTruck = request.body;

	if (newTruck) {
		trucks.addTruck(newTruck);
		response.status(201).json(newTruck);
	} else {
		response.status(400).json('Problem adding truck');
	}
});

app.delete('/trucks/:name', function (request, response) {
	trucks.removeTruck(request.params.name);
	trucks.removeTruck(truckName);
	response.sendStatus(200);
});

app.listen(3000, function () {
	console.log('listening on port 3000');
});