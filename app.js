/*
 * Homework 
 * JSCRIPT300-Spring2015/Module_4b
 * by Diane Zevenbergen
 */

var express = require('express'); 
var trucks = require('./trucks');
var bodyParser = require('body-parser');
var app = express();    

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var serveStatic = express.static('public');
app.use(serveStatic);

// The param method will map a placeholder variable to a callback
app.param('name', function (request, response, next) {
    var name = request.params.name;
    var processedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.processedName = processedName;
    next();
});

// Return a list of food types, in JSON format
app.get('/food-types', function (request, response) {
    var foodList = trucks.getFoodTypes();
    response.json(foodList);
});

// Return a list of trucks, in JSON format
app.get('/trucks', function (request, response) {
    var truckList = trucks.getTrucks();
     response.send(truckList);  
});

// Return truck object that matches name in URL
app.get('/trucks/:name', function (request, response) {
    var foodTruck = trucks.getTruck(request.processedName);

    var truckDetails = trucks.getDetailList(foodTruck);
    
    if (!foodTruck) {
        response.status(404).json("No food truck found that matches '" + request.processedName + "'");
    } else {
        response.send(truckDetails);
    }
});

// Return truck objects that match food type in URL
app.get('/food-types/:name', function (request, response) {
    var trucksArray = trucks.filterByFoodType(request.processedName);

    if (!trucksArray) {
        response.status(404).json('No food truck found with food type "' + request.processedName + '"');
    } else {
        response.send(trucksArray);
    }
});

// Post info for new food truck
app.post('/trucks', function (request, response) {
    var newTruck = request.body;

    if (newTruck) {
        trucks.addTruck(newTruck);
        response.status(201).json(newTruck);
    } else {
        response.status(400).json('problem adding truck');
    }
});

// Delete a truck
app.delete('/trucks/:name', function (request, response) {
    var name = request.params.name;
    trucks.removeTruck(name);
    response.sendStatus(200); 
});

/*
 * Use PUT to update information for a truck
 * Diane's comments:  Not tested - I don't know if there's a way to test this
 * without adding client-side code for the updated information
 */
app.put('/trucks/:name', function (request, response) {
    var truck = trucks.getTruck(request.params.name);
    var updatedTruck = request.body;
    
    if (truck && updatedTruck) {
        updatedTruck.name = truck.name;
        trucks.updateTruck(updatedTruck);
        response.send(updatedTruck);
    } else {
        reponse.status(404).json('Could not locate truck for update');
    }
});


app.listen(3000, function() {
    console.log('listening on port 3000');
});
