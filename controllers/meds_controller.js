var express = require("express");

var router = express.Router();

// Import the model (meds.js) to use its database functions.
var burger = require("../models/meds.js");

// Create selectAll our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            cats: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res) {
    burger.insertOne([
        "name", "eaten"
    ], [
        req.body.name, req.body.eaten
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        eaten: req.body.eaten
    }, condition, function() {
        res.redirect("/");
    });
});


// Export routes for server.js to use.
module.exports = router;
