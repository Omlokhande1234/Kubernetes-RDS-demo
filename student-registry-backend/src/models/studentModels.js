const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        rollNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "students",
        timestamps: true,
    }
);

module.exports = Student;