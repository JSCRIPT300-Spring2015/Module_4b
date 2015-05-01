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

});

app.get('/trucks/:name', function (request, response) {
  response.json(trucks.getTruck(request.params.name));
});

app.delete('/trucks/:name', function (request, response) {

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