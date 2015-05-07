
'use strict';
var express = require('express');
var trucks = require('./trucks');
var bodyparser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.set('json spaces', 4);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/trucks', function (request, response){
	response.json(trucks.getTrucks());
});

app.get('/trucks/:name', function (request, response) {
	var truck = trucks.getTruck(decodeURIComponent(request.params.name))
	if (!truck) {
        response.status(404).json('No food truck found for ' + request.params.name);
    } else {
    	response.json(truck);    	
    }   
});

app.post('/trucks', function (request, response) {
    var newTruck = request.body;    
    if (newTruck) {        
        trucks.addTruck(newTruck);
        response.status(201).send(newTruck);
    } else {
        response.status(400).json('problem adding book');
    }
});

app.delete('/trucks/:name', function (request, response) {    
    trucks.removeTruck(request.params.name);
    response.sendStatus(200);
});

app.get('/food-types', function (request, response){
	response.json(trucks.getFoodTypes());
});

app.get('/:food-types/:name', function (request, response) {
	var foodTrucks = trucks.filterByFoodType(request.params.name);
	if (!foodTrucks) {
        response.status(404).json('No food truck type found for ' + request.params.name);
    } else {
    	response.json(foodTrucks);
    }   

});

app.listen(port, function () { console.log('listening on port ' + port); });
