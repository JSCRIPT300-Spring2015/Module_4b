//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you 
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks/:name'

// express.js module
var express = require('express');
var app = express();

// bodyParser module, takes the request object and parses the data putting it in key value pairs
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
        
// trucks module, trucks.js
var foodTrucks = require('./trucks');

// middleware functions
var serveStatic = express.static('public');
app.use(serveStatic);

// /trucks route returns list of trucks
app.get('/trucks', function (request, response) {
    var trucks = foodTrucks.getTrucks();
    
    if (trucks) {
        response.send(trucks);
    } else {
        response.status(404).send("Trucks not found.");
    }
});

// /trucks/<name of a truck>, return the truck info if found or 404 if not found
// :name is from the express module
app.get('/trucks/:name', function (request, response) {
    var truck = foodTrucks.getTruck(request.params.name);
   
    if (truck) {
        response.send(truck);
    } else {
        response.status(404).send("Truck not found. ", request.params.name);
    }
});

// /food-types, returns all the food types in the list of trucks
app.get('/food-types', function (request, response) {
    var foodTypes = foodTrucks.getFoodTypes();
    
    if (foodTypes) {
        response.send(foodTypes);        
    } else {
        response.status(404).json('No food types found.');
    }
});

// /food-types/<type of food>, returns all the food types for the food type in the list of trucks
// :name is from the express module
app.get('/food-types/:name', function (request, response) {
    var trucks = foodTrucks.filterByFoodType(request.params.name);
    if (trucks) {
        response.send(trucks);
    } else {
        response.status(404).send('Food type not found. ', request.params.name);
    }
});

// A POST route for '/trucks' that posts a new food-truck object consisting of (if they exist) the following values. 
// After creating a new food truck object, add it to the foodTrucks array, then send it to the response: name food type 
// schedule of days payment types accepted website url Facebook page url Twitter url
/* 
		name: 'Buddha Bruddah',
		type: ['Asian'],
		schedule: ['Monday', 'Tuesday','Wednesday','Thursday', 'Friday'],
		payment: ['Cash', 'Cards'],
		description: 'Gourmet Asian mixed plates',
		website: 'http://www.buddhabruddah.com',
		Facebook: 'https://www.facebook.com/BuddhaBruddah'
*/

app.post('/trucks', function (request, response) {
    // request.body == form data
    var newTruck = request.body;
    if (newTruck) {
        foodTrucks.addTruck(newTruck);
        response.status(201).json(newTruck);
    } else {
        response.status(200).send('There was a problem adding the truck.');
    }
});


// A DELETE route for '/trucks/:name' that sends a delete request that will delete the corresponding food-truck object from 
// the foodTrucks array.
app.delete('/trucks/:name', function (request, response) {
    var truck = request.params.name;
    foodTrucks.removeTruck(truck);
    response.sendStatus(200);
});


app.listen(3000, function () {
    console.log('...listening on port 3000...');
});