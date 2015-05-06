var express = require('express');
var trucks = require('./trucks');
var bodyparser = require('body-parser');
var app = express();

// to use the "static" middle-ware, we call it from our express object
// this will allow us to serve up static files from "public"
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

app.route('/trucks')
	.get(function (req, res) {
		res.json(trucks.getTrucks());
	})
	.post(function (req, res) {
		var newTruck = req.body;
		if (newTruck) {
			trucks.addTruck(newTruck);
			res.status(201).send(newTruck);
		} else {
			res.status(400).send('unable to add new truck');
		}
	});

// I doubt we would want to serve either html or json from a single route on a
// production site, but I thought this was nifty.  HTML was from last time
app.route('/trucks/:name.:json?')
	.get(function (req, res) {
		var truck = trucks.getTruck(req.params.name);
		if (req.params.json === 'json') {
			res.json(truck);
		} else {
			var truckStringName = '<h1>'+ truck.name + '</h1>';
			var truckString = '';
			// Make sure each property exists, add it to the string if it does
			if (truck.type) {
				truckString += 'Food Type: ' + truck.type.join(', ') + '<br>';
			}
			if (truck.payment) {
				truckString += 'Payment Methods: ' + truck.payment.join(', ') + '<br>';
			}
			if (truck.description) {
				truckString += 'Description: ' + truck.description + '<br>';
			}
			if (truck.website) {
				truckString += 'Website: <a href="' + truck.website + '">' +
						truck.website + '</a><br>';
			}
			if (truck.schedule) {
				truckString += 'Schedule: ' + truck.schedule.join(', ');
			}
			res.send(truckStringName + truckString);
		}
	})
	.put(function (req, res) {
		if (req.body) {
			// Send name from the route parameter, seperate from form body
			// Not necessary, just for practice!
			var updatedTruck = trucks.updateTruck(req.params.name, req.body);
			res.send(updatedTruck);
		} else {
			res.status(404).json('unable to locate truck');
		}
	})
	.delete(function (req, res) {
		var name = req.params.name;
		trucks.removeTruck(name);
		res.sendStatus(200);
	});

app.get('/food-types', function (req, res) {
	res.json(trucks.getFoodTypes());
});

app.get('/food-types/:name', function (req, res) {
	var type = req.params.name;
	var typeTrucks = trucks.filterByFoodTypes(type);
	var typeStringName = '<h1>' + type + '</h1><br>';
	var typeTruckList = '';

	typeTrucks.forEach(function (truck) {
		typeTruckList += '<li><a href="/trucks/' + truck.name + '/">' + 
				truck.name + '</a></li>';
	});
	res.send(typeStringName + '<ul>' + typeTruckList + '</ul>');
});

app.listen(3000, function () {
	console.log('server started on port 3000');
});
