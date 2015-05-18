var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var trucks = require('./trucks');

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/trucks', function (request, response) {
  response.send(trucks.getTrucks());

});

app.get('/trucks/:name', function (request, response) {
  var foundTruck = trucks.getTruck(request.params.name);
  if (foundTruck) {
          response.send(truck);
  } else {
          response.status(404).json('food truck not found: ', request.params.name);
  }
});

app.post('/trucks', function(request, response){
  var newTruck = request.body;
  if(newTruck){
    trucks.addTruck(newTruck);
  response.status(201).send(newTruck);
  } else {
    response.status(400).json('error adding new food-truck');
  }
});

app.delete('/trucks/:name', function (request, response){
  var name = request.params.name;

  trucks.removeTruck(name);
  response.sendStatus(200);
});

app.get('/food-types', function (request, response){
  var types = trucks.getFoodTypes();
  response.send(types);
});

app.listen(port, function() {
  console.log('listening on port ' , port);
});
