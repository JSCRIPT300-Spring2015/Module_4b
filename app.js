var express = require('express');
var trucks = require('./trucks');
var bodyParser = require('body-parser');

var app = express();

app.set('port', 3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/trucks')
	.get(function(request, response) {
		var allTrucks = trucks.getTrucks();
		response.send(allTrucks);
	})
	.post(function(request, response) {
		if (request.body) {
			var newTruck = request.body;
			trucks.addTruck(newTruck);
			response.status(201).send(newTruck);
		} else {
			response.status(400).send('problem adding Truck');
		}
	});

app.route('/trucks/:trucks')
	.get(function(request,response) {
		var truckName = request.params.trucks;
		response.send(trucks.getTruck(truckName));
	})
	.delete(function(request, response) {
		name = request.params.trucks;
		var didDelete = trucks.removeTruck(name);
		if(didDelete) {response.sendStatus(200);
		} else {
			response.sendStatus(500);
		}
	});

app.get('/food-types', function(request, response) {
	response.send(trucks.getFoodTypes());
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you 
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks:name'