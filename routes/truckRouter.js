/**
 * Created by toq on 07/05/15.
 */
var express = require('express');
var router = express.Router();
var trucks = require('../trucks');




router.route('/trucks')
    .get(function (request, response) {
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

router.route('/trucks/:name')
    .get(function (request, response) {
        response.json(trucks.getTruck(request.params.name));
    })
    .delete(function (request, response) {
        trucks.removeTruck(request.params.name);

        response.sendStatus(200);
    });

module.exports = router;