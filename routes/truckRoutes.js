/**
 * Created by toq on 06/05/15.
 */
/**
 * Created by toq on 05/05/15.
 */

var express = require('express');
var trucks = require('../trucks');
var router = express.Router();

router.route('/')
    .get(function (request, response) {
        console.log("/trucks is called")
        response.json(trucks.getTrucks());
    })

    .post(function (request, response) {
        var newTruck = request.body;

        trucks.addTruck(newTruck);
        if (newTruck) {
            response.status(201).json(newTruck);
        } else {
            response.status(400).json('Problem adding truck');
        }
    });


router.route('/:name')
    .get(function (request, response) {
        response.json(trucks.getTruck(request.params.name));
    })

    .delete(function (request, response) {
        trucks.removeTruck(request.params.name);

        response.sendStatus(200);
    });

module.exports = router;