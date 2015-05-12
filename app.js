var express = require('express');
var trucks = require('./trucks');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/trucks', function (request,response) {
	var foodTrucks = trucks.getTrucks();
	response.json(foodTrucks);
});

app.get('/trucks/:name', function (request, response) {
	var truckName = request.params.name;
	var currentTruck = trucks.getTruck(truckName);

	if (currentTruck) {
		response.json(currentTruck);
	} else {
		response.status(404).json('truck not found');
	}
});

app.post('/trucks', function (request, response) {
	var newTruck = request.body;
	if (newTruck) {
		trucks.addTruck(newTruck);
		response.status(201).json(newTruck);
	} else {
		response.status(400).json('problem adding truck');
	};
});

app.delete('/trucks/:name', function (request, response) {
	var name = request.params.name;
	trucks.removeTruck(name);
	response.sendStatus(200);
});

app.listen(8000,function() {
	console.log('listening on port 8000');
});