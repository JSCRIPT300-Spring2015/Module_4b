//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you 
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks:name'

var express = require('express');
var app = express();

var trucks = require('./trucks');

var bodyParser = require('body-parser');
//request.body below
app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json());

var serveStatic = express.static('public') 
app.use(serveStatic);

app.get('/trucks/:name', function (request, response) {     
    
    var truck = trucks.getTruck(request.params.name);
    
    if(!truck) {
    	response.status(404).json('Sorry, cannot find the truck called ' +
    		request.params.name);
    } else {
    	response.json(truck);
    }

});

app.get('/food-types', function(request, response) {

    var foodTypes = trucks.getFoodTypes();
    if (!foodTypes) {
    	response.status(404).json('No food available.');
    } else {
    	response.json(foodTypes);
    }
});

app.get('/trucks', function (request, response) {
    
    var allTrucks = trucks.getTrucks();
    if(!allTrucks) {
        response.status(404).json('No trucks available.');
    } else {
        response.json(allTrucks);
    }
});

app.post('/trucks', function (request, response){
    var newTruck = request.body;
    if (newTruck) {
            newTruck.read = false;
            trucks.addTruck(newTruck);
            response.status(201).json(newTruck);
    } else {
            response.status(400).json('New truck not loaded.')
    }

});

app.delete('/trucks/:name', function (request, response) {
    var truckName = request.params.name;
    trucks.removeTruck(truckName);
    response.sendStatus(200);
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});

