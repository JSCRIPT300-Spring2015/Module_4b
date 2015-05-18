## Module_4: Assignment

For this assignment, you're going to fork this repository to your own Github account and clone that repository locally. Inside the repo you'll find a placeholder for app.js, a placeholder trucks.js, and a 'public' directory. Inside the public directory you'll find an index.html file and a client.js file.

1. Initialize your project directory and create a package.json file. This file must be part of your pull request with all dependencies required by your project as part of this file.
2. In app.js, build an express server that implements the following RESTful routes. Use your existing implementation from the module_4a homework for the following routes:
  * A __GET__ route for '/trucks' that sends to the response the list of all food-truck objects in JSON format.
  * A __GET__ route for '/trucks/:name' that sends to the response the matching food-truck object in JSON format.
  * A __GET__ route for '/food-types' that sends to the response the unique list of food types associated with the food trucks in the foodTrucks list.
And in the same app.js file, add the following three new routes:
  * A __POST__ route for '/trucks' that posts a new food-truck object consisting of (if they exist) the following values. After creating a new food truck object, add it to the foodTrucks array, then send it to the response:
	name
	food type
	schedule of days
	payment types accepted
	website url
	Facebook page url
	Twitter url
  * A __DELETE__ route for '/trucks/:name' that sends a delete request that will delete the corresponding food-truck object from the foodTrucks array.
3. Using the code from your previous trucks.js module, implement the following methods:
  * __getTrucks()__ - return the entire array of food truck objects
  * __getTruck(name)__ - return the food truck object with the given name
  * __getFoodTypes()__ - return the unique list of food types associated with all food trucks in the foodTrucks array.
  * __filterByFoodTypes(type)__ - return the list of trucks that match the given food type
And add to the trucks module the following new methods:
  * __addTruck(truckObj)__ - add the given truck object to the foodTrucks array
  * __removeTruck(name)__ - remove the given truck object from the foodTrucks array

Just to be clear, you are adding routes to app.js in addition to the routes you already implemented for the Module_4a assignment, and you are adding methods to the trucks.js module in addition to the methods you already implemented for that same assignment. Your express server code should be the same. Make sure you're using the same express.static middleware to serve up static files from the public folder as done in the previous assignment. Additionally, you're going to need to `npm install --save body-parser` and require the body-parser module in your app.js file so you can implement your __POST__ route. See the slides or the Module_4b_example code to find an example of using the body-parser middle-ware. 
4. For the '/' route, you will be serving up the provided index.html file from the public folder.  The client.js script included by this index.html file will make an ajax call to the '/trucks' endpoint and append the returned truck data, in the form of links to '/trucks/:name' endpoints, to a list element on the page. Additionally, there will be a form for adding a new food truck in the page and the client.js code will handle serializing the form data and posting to the '/trucks' route. You can use the provided client.js if you want or you can implement this yourself - the code will be commented out by default.
5. Use a .gitignore file to prevent adding any Node modules you've installed using `npm install` (remember the node_modules is the directory you want to exclude.)
6. EXTRA challenge - **this part is not required**, but is an additional challenge if you want to try it: 
Implement a __PUT__ route in app.js that updates an existing food truck object inside the foodTrucks array. __PUT__ routes should update the entire record, even if only a single value is changing. Along with the __PUT__ route, implement an updateTruck(name) method in your trucks module that your __PUT__ route handler will call to do the actual updating. For the purposes of our foodTrucks array, you cannot update the name property of the truck - you can only update the other properties - add a check in your route handler that checks to make sure the properties being updated are allowed to be updated.

This assignment is due by Thursday, May 7th by 7pm. Once grading has been completed, a :+1: comment will be added to the pull request and the pull request will be closed.

NOTE:
To run, in node.js commandline, run 'nodemon app.js" then go to a browser and run "http://localhost:3000". This throws an error in FireFox so use Chrome.