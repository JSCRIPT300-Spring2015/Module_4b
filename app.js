'use strict';
var express = require('express');
var app = express();
var trucks = require('./trucks');
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());
app.use(express.static('public'));

app.get('/trucks', function (request, response) {
  response.json(trucks.getTrucks());
});
// the 'name' parameter will be available on the request.params object
app.get('/trucks/:name', function (request, response) {
  var truckName = request.params.name;
  var truck = trucks.getTruck(truckName);
  if(truck) {
    response.json(truck);
  }
  else {
    response.status(404).json('Truck not found');
  }
});
//All foodtypes
app.get('/food-types', function (request, response) {
  var foodList = trucks.getFoodTypes();
  var foodListHTML = '<h1>All Food Types</h1>';
  foodList.forEach(function (foodType) {
    foodListHTML += '<li><a href="/food-types/' + foodType + '/">' + foodType + '</a></li>';
  });
  response.send(foodListHTML);
});

//Foodtypes filtered by food parameter
app.get('/food-types/:food', function (request, response) {
  var foodType = request.params.food;
  response.json(trucks.filterByFoodType(foodType));
});
//Add a truck
app.post('/trucks', function(request, response){
  var newTruck = request.body;
  if(newTruck){
    trucks.addTruck(newTruck);
    response.status(201).send(newTruck);
  }
  else{
    response.status(404).send('Problem adding truck');
  }
});
//Delete a truck
app.delete('/trucks/:name', function(request, response){
  var truckName = request.params.name;
  trucks.removeTruck(truckName);
  response.sendStatus(200);
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});