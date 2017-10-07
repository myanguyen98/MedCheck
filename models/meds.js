// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var meds = {

    selectAll: function(cb) {
        orm.selectAll("meds", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    insertOne: function(cols, vals, cb) {
        orm.insertOne("meds", cols, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("meds", objColVals, condition, function(res) {
            cb(res);
        });
    },

    deleteOne: function(condition, cb) {
        orm.deleteOne("cats", condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = meds;

// Dependencies
// =============================================================
// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");

// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Character" model that matches up with DB
var Character = sequelize.define("character", {
    // the routeName gets saved as a string
    routeName: Sequelize.STRING,
    // the name of the character (a string)
    name: Sequelize.STRING,
    // the character's role (a string)
    role: Sequelize.STRING,
    // the character's age (a string)
    age: Sequelize.INTEGER,
    // and the character's force points (an int)
    forcePoints: Sequelize.INTEGER
}, {
    timestamps: false
});
// Syncs with DB
Character.sync();
// Makes the Character Model available for other files (will also create a table)
module.exports = Character;