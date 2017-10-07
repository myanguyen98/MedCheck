// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================

// Grabbing our models
var db = require("../models");

/// / Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the todos
    app.get("/api/meds", function(req, res) {

        db.meds.findAll({}).then(function(results) {
            res.json(results);
        });

    });

    // POST route for saving a new todo. You can create a todo using the data on req.body
    app.post("/api/medsDelete", function(req, res) {

        console.log("Meds Data:");
        console.log(req.body);

        db.meds.create({
            name: req.body.name,
            drugClass: req.body.drugClass,
            description: req.body.description,
            frequency: req.body.frequency,
            quantity: req.body.quantity,
            img: req.body.img,
            doctor_Name: req.body.doctor_Name,
            phoneNumber: req.body.phoneNumber
        });

    });

    // DELETE route for deleting todos. You can access the todo's id in req.params.id
    app.delete("/api/medsDelete/:id", function(req, res) {

        console.log("Db Data:");
        console.log(req.body);

        db.meds.destroy({
            where: {
                id: req.body.id
            }
        });
    });


    // PUT route for updating todos. The updated todo will be available in req.body
    app.put("/api/meds", function(req, res) {


    });
};

