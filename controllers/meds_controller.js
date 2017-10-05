var express = require("express");

var router = express.Router();

// Import the model (meds.js) to use its database functions.
var meds = require("../models/meds.js");

// Create selectAll our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    meds.selectAll(function (data) {
        var hbsObject = {
            meds: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function (req, res) {
    meds.insertOne([
        "name", "drugClass", "description", "dosage",
        "frequency", "quantity", "img", "doctor_Name", "phoneNumber"
    ], [
        req.body.name, req.body.drugClass, req.body.description, req.body.dosage,
        req.body.frequency, req.body.quantity, req.body.img, req.body.doctor_name,
        req.body.phoneNumber
    ], function () {
        res.redirect("/");
    });
});

router.put("/:id", function (req, res) {

    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    meds.updateOne({
        name: req.body.name
    }, condition, function () {

    });

    meds.updateOne({
        drugClass: req.body.drugClass
    }, condition, function () {

    });

    meds.updateOne({
        description: req.body.description
    }, condition, function () {

    });

    meds.updateOne({
        dosage: req.body.dosage
    }, condition, function () {

    });

    meds.updateOne({
        frequency: req.body.frequency
    }, condition, function () {

    });

    meds.updateOne({
        quantity: req.body.quantity
    }, condition, function () {

    });

    meds.updateOne({
        img: req.body.img
    }, condition, function () {

    });

    meds.updateOne({
        doctor_name: req.body.doctor_name
    }, condition, function () {

    });

    meds.updateOne({
        phoneNumber: req.body.phoneNumber
    }, condition, function () {

    });



});


router.delete("/:id", function (req, res) {

    var condition = "id = " + req.params.id;

    meds.deleteOne(condition, function () {
        res.redirect("/");
    });
});




// Export routes for server.js to use.
module.exports = router;
