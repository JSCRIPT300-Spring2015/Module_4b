//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you 
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks:name'



'use strict';

var trucks = require('./trucks');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var serveStatic = express.static('public');

app.use(serveStatic);

 app.get('/trucks', function (request, response) {
  response.json(trucks.getTrucks());
}); 

app.get('/trucks/:name', function (request, response) {     

    var truck = trucks.getTruck(request.params.name);
    
    if(!truck) {
    	response.status(404).json('No truck found for: ' +
    		request.params.name);
    } else {
    	response.send(truck);
    }

});

app.get('/food-types', function (request, response) {     

    var type = trucks.getFoodTypes();
    
    if (!type) {
        response.status(404).json('No food type found for ' + type);
    } else {
        response.json(type);
    }
    

});

// New code starts here
app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json());

app.post('/trucks', function (request, response) {
    var newTruck = request.body;
    
    if (newTruck) {
        trucks.addTruck(newTruck);
        response.status(201).json(newTruck);
    } else {
        response.status(400).json('problem adding ' + newTruck);
    }
    
});

app.delete('/trucks/:name', function (request, response){
    var truckToRemove = request.params.name;
    
    if (truckToRemove){
        trucks.removeTruck(truckToRemove);
        response.sendStatus(200);
    }  else {
        response.status(400).json(truckToRemove + ' not found.');
    }
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});

