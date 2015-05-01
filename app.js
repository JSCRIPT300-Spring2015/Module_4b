'use strict';
var express = require('express');
var trucks = require('./trucks');
var app = express();

app.use(express.static('public'));
app.get('/', function (request, response) {
  response.redirect('/trucks');
});

app.get('/trucks', function (request, response) {
  response.json(trucks.getTrucks());
});

app.post('/trucks', function (request, response){
  var newTruck = request.body;
  var foodTrucks = trucks.getTruck();
  if (newTruck) {
    var truckNames = _.pluck(foodTrucks, 'name')
    var contains = _.contains(truckNames, newTruck.name)
    if (!contains) {
      trucks.addTruck(newTruck)
      response.status(201).json('Truck added');
    } else {
      response.status(400).json('Truck already exists');
    }
  }else {
    response.status(400).json('Truck not added');
  }
});

app.get('/trucks/:name', function (request, response) {
  response.json(trucks.getTruck(request.params.name));
});

app.delete('/trucks/:name', function (request, response) {
  var truckName  = request.params.name;
  var foodTrucks = trucks.getTruck();
  if (truckName) {
    var truckNames = _.pluck(foodTrucks, 'name')
    var contains = _.contains(truckNames, truckName)
    if (contains) {
      trucks.removeTruck(truckName);
      response.status(200).json('Truck removed');
    } else {
      response.status(400).json('Truck does not exist');
    }
  }else {
    response.status(400).json('Truck not removed');
  }
});

app.get('/food-types', function (request, response) {
  response.json(trucks.getFoodTypes());
});

app.get('/food-types/:name', function (request, response) {
  response.json(trucks.filterByFoodType(request.params.name));
});

app.listen(80, function () {
  console.log('listening on port 80');
});