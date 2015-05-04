var express = require('express');
var trucks = require('./trucks');

var idManager = require('./idManager');
idManager.setIds(trucks.getTrucks());

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serveStatic = express.static('public');
app.use(serveStatic);
//A GET route for '/trucks' that sends to the response the list of all food-truck objects in JSON format.
app.get('/trucks', function (request, response){
        var trucklist = trucks.getTrucks();
        response.json(trucklist);
});

//A GET route for '/trucks/:name' that sends to the response the matching food-truck object in JSON format.
app.get('/trucks/:id', function (request, response) {
        var id = request.params.id;
  
        var truck = trucks.getTruck(id);
        if (truck) {
                response.json(truck);
        } else {
                response.status(404).json('Truck not found');
        }
});

//A GET route for '/food-types' that sends to the response the unique list of food types associated with the food trucks in the foodTrucks list.

//A POST route for '/trucks' that posts a new food-truck object consisting of (if they exist) the following values. After creating a new food truck object, add it to the foodTrucks array, then send it to the response: name food type schedule of days payment types accepted website url Facebook page url Twitter url
app.post('/trucks', function (request, response){
        var newTruck = request.body;
        if (newTruck) {
            newTruck.read = false;
            newTruck._id = idManager.getId();
            trucks.addTruck(newTruck);
            response.status(201).json(newTruck);
        } else {
                response.status(400).json('Problem adding truck');
  }
});


//A DELETE route for '/trucks/:name' that sends a delete request that will delete the corresponding food-truck object from the foodTrucks array.
app.delete('/trucks/:id', function (request, response) {
    var id = request.params.id;
  
    trucks.removeTruck(id);
    response.sendStatus(200);
});

app.listen(8000, function () {
    console.log('listening on port 8000');
});
