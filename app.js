var express = require('express');
var trucks = require("./trucks");
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}))
//detecting json data
app.use(bodyParser.json());//will look for json data in the request.

// set in environment variables 
var port = process.env.PORT || 3000;

app.get('/trucks', function (request, response) {
	response.send(trucks.getTrucks());
});
app.get('/trucks/:name', function(request,response) {
	var name = request.params.name;
	var truck = trucks.getTruck(name);
	if (truck) {
		response.send(truck)
	} else {
		response.status(404).json('food truck not found: ' + name);
	}
});

app.get('/food-types', function(request,response){
	var types = trucks.getFoodTypes();
	response.send(types);
});
app.post('/trucks', function(request, response){
	console.log("post");
	var newTruck = request.body;	
	if (newTruck) {
		trucks.addTruck(newTruck); // adds to array
		response.status(201).json(newTruck);
	} else {
		response.status(400).json('problem adding truck');
	}

	//response.status(400).json('problem adding book');
	//console.log(request.body);
});
app.delete('/trucks/:name', function(request,response) {
	console.log('deleted');
	var name = request.params.name;
	var truck = trucks.getTruck(name);
	if (truck) {
		trucks.removeTruck(name)
	} else {
		response.status(404).json('food truck not found: ' + name);
	}
});

app.listen(port, function () {
	console.log('listiening on port ', port);
});

