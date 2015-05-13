var express = require('express');
var trucks = require('./trucks');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
    response.redirect('/trucks');
});

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

app.put('/trucks/:name', function (request, response) {
    var truck = trucks.getTruck(request.params.name);
    var updatedTruck;

    if (truck && request.body) {
        request.body.name = truck.name;
        updatedTruck = trucks.updateTruck(request.body);
        response.send(updatedTruck);
    } else {
        reponse.status(404).json('Could not locate truck for update');
    }
});

app.listen(3000, function () {
	console.log('listening on port 3000');
});