//  in this file create an express application - use the middle-ware built into express
//  to serve up static files from the public directory (index.html and client.js - you 
//  can also serve up css files from the public directory this way if you want)
//  you need to support a '/trucks' endpoint, and a dynamic route for '/trucks:name'

/*
*  For Module 4b
*  1.  A GET route for '/trucks' that sends to the response the list of all food-truck objects in 
*		JSON format.
*  2.  A GET route for '/trucks/:name' that sends to the response the matching food-truck object in 
*		JSON format.
*  3.  A GET route for '/food-types' that sends to the response the unique list of food types 
*		associated with the food trucks in the foodTrucks list. And in the same app.js file, add 
*		the following three new routes:
*  4.  A POST route for '/trucks' that posts a new food-truck object consisting of (if they exist) 
*		the following values. After creating a new food truck object, add it to the foodTrucks 
*		array, then send it to the response: name food type schedule of days payment types accepted 
*		website url Facebook page url Twitter url
*  5.  A DELETE route for '/trucks/:name' that sends a delete request that will delete the 
*		corresponding food-truck object from the foodTrucks array.
*/
var express = require('express');  //require the express module which returns an object/function
var app = express(); //creates and express application instance

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



var serveStatic = express.static('public');

app.use(serveStatic);

//var pageContent = 'Today is . Here are the available food trucks:';
//when this route handler fires

var trucks = require('./trucks');
var truckObject = trucks();
//var dayTrucks = truckObject.filterByDay(dayName);

app.get('/trucks',function(request,response){
	var truckList = truckObject.getTrucks();
	response.send(JSON.stringify(truckList));
});



app.get('/trucks/:name',function(request,response){

  //grab the name from the url ex)http://localhost:3000/trucks/TedsTruck gets foodTruck='TedsTruck'
  //name, food-type, payment methods accepted, description, website, and schedule.
  var foodTruckName = request.params.name;
  var foodTruck = truckObject.getTruck(foodTruckName);
  var truckHTML = '';
  var truckName = foodTruck.name; //string
  
  var foodType = foodTruck.type; //array
  var foodString = '';
  if(foodType){
	// build the foodString - taking into account if blank, one entry, or many
	if(foodType.length===0){
		foodString = 'no entry found';
	}else if(foodType.length>0){
		foodString = foodType[0];
		if(foodType.length>1){
			for(i=1;i<foodType.length;i++){
				foodString = foodString + ', ' + foodType[i];
			}
		}
	}
  }else{
	foodString = 'no foodtypes listed';
  }
  
  var payMethod = foodTruck.payment;  //array
  var payString = '';
  if(payMethod){
		// build the payString - taking into account if blank, one entry, or many
		payString = payMethod[0];
		if(payMethod.length>1){
			for(i=1;i<payMethod.length;i++){
				payString = payString + ', ' + payMethod[i];
			}
		}
  }else{
	  payString = 'No payment methods listed.';
  }
 
  var truckDesc = foodTruck.description; //string
  if(truckDesc === undefined){
	  truckDesc = 'No description available.';
  }
  var truckSite = foodTruck.website; //string
  if(truckSite === undefined){
	truckSite = 'No website available.';
  }
  var truckSchedule = foodTruck.schedule; //array
  var schedString = '';
  if(truckSchedule){
      // build the payString - taking into account if blank, one entry, or many
	schedString = truckSchedule[0];
	if(truckSchedule.length>1){
		for(i=1;i<truckSchedule.length;i++){
			schedString = schedString + ', ' + truckSchedule[i];
		}
	}
  }else{
	  schedString = 'No schedule available for this truck.';
  }
  
  truckHTML = '<ul><li>Truck Name: ' + foodTruckName + '</li><li>Foods: ' + foodString + '</li><li>Payments: ' + payString + '</li><li>Description: ' + truckDesc + '</li><li>Website: ' + truckSite + '</li><li>Schedule: ' + schedString + '</li>';
  
  response.send(truckHTML);
  
});


app.get('/food-types',function(request,response){

  var foodTypes = truckObject.getFoodTypes();
 // var foodString = '';
 // for(i=0;i<foodTypes.length;i++){
//	foodString = foodString + foodTypes[i] + '<br>';
 // }
 // response.send(foodString);
 response.send(foodTypes);
});


app.get('/trucksfood/:name',function(request,response){
	var foodName = request.params.name;
  var filteredTrucks = truckObject.filterByFoodType(foodName);
  var nameString = '';
  for(i=0;i<filteredTrucks.length;i++){
	nameString = nameString + filteredTrucks[i].name + '<br>';
  }
  response.send(nameString);
});

app.post('/trucks',function(request,response){
	var newTruck = request.body;
	if(newTruck){
		newTruck.read = false;
		//newTruck._id = idManager.getId(); //module to go get new id
		truckObject.addTruck(newTruck);
		response.status(201).json(newTruck);
	}else{
		response.status(400).json('problem adding the truck');
	}
});

app.delete('/trucks/:name',function(request,response){
	var name = request.params.name; //get the name
	truckObject.removeTruck(name);
	response.sendStatus(200); //sends back ok in the body
});

app.listen(3000,function(){

 console.log('listening on port 3000');

});


 //now in the browser go to http://localhost:3000 and you'll see the web page