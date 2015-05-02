'use strict';
var express = require('express');
var trucks = require('./trucks');
var _ = require('underscore')
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
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
  console.log(newTruck);
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
  var foodTrucks = trucks.getTrucks();
  if (truckName) {
    var truckNames = _.pluck(foodTrucks, 'name')
    var contains = _.contains(truckNames, truckName)
    if (contains) {
      trucks.removeTruck(truckName);
      response.status(200).json('truck removed');
    } else {
      response.status(400).json('truck does not exist');
    }
  }else {
    response.status(400).json('truck not removed');
  }
});

app.get('/food-types', function (request, response) {
  response.json(trucks.getFoodTypes());
});

app.get('/food-types/:name', function (request, response) {
  response.json(trucks.filterByFoodType(request.params.name));
});

app.put('/trucks', function (request, response) {
  var newTruck = request.body;
  var foodTrucks = trucks.getTrucks();
  if (newTruck) {
    trucks.removeTruck(newTruck.name)
    trucks.addTruck(newTruck)
    response.status(200).json('truck updated')
  } else {
    response.status(400).json('no truck to update')
  }
});

app.listen(80, function () {
  console.log('listening on port 80');
});