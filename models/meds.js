module.exports = function(sequelize, DataTypes) {
    var meds = sequelize.define("meds", {
        name: DataTypes.STRING,
        drugClass: DataTypes.STRING,
        description: DataTypes.TEXT,
        dosage: DataTypes.STRING,
        frequency: DataTypes.STRING,
        quantity: DataTypes.STRING,
        img: DataTypes.TEXT,
        doctor_Name: DataTypes.STRING,
        phoneNumber: DataTypes.STRING
    });
    return meds;
};