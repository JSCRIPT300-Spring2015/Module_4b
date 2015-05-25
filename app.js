var express = require('express');
var trucks = require('./trucks');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/trucks', function (request, response) {
	response.send(trucks.getTrucks());
});

app.get('/trucks/:name', function (request, response) {
	var name = request.params.name;
	var truck = trucks.getTruck(name);
	if (truck) {
		response.send(truck);
	} else {
		response.status(404).json('food truck not found: ' + name);
	}

});

app.post('/trucks', function (request, response) {
	var newTruck = request.body;
	if (newTruck) {
		trucks.addTruck(newTruck);
		response.status(201).send(newTruck);
	} else {
		response.status(400).json('error adding new food-truck');
	}
});

app.delete('/trucks/:name', function (request, response) {
	var name = request.params.name;

	trucks.removeTruck(name);
	response.sendStatus(200);
});

app.get('/food-types', function (request, response) {
	var types = trucks.getFoodTypes();

	response.send(types);
});

app.get('/food-types/:name', function (request, response) {
	var name = request.params.name;
	var foodTrucks = trucks.filterByFoodType(name);
	if (foodTrucks) {
		response.send(foodTrucks);
	} else {
		response.status(404).json('no food trucks found for ' + name);
	}
});

app.listen(port, function (){
	console.log('listening on port ', port);
});

