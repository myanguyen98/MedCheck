// Author: Alfredo Rodriguez
// File: JS - htmlRoutes.js
// Date: 09/16/2017


var path = require("path");

module.exports = function getSites(app){

    // Basic route that sends the user first to the AJAX Page
    //Main Page Route
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //Creating a friendList route
    app.get("/logged", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/user-page.html"));
    });

    //Creating a friendList route
    app.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/badges.html"));
    });

    //Creating a friendList route
    app.get("/cloudinary", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/dummyCloudinary.html"));
    });

};