'use strict';

module.exports = (sequelize, DataTypes) => {

    var invisibleDog = sequelize.define('invisibleDog', {
        gameID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user: DataTypes.STRING,
        GUIs: DataTypes.STRING,
        performance: DataTypes.STRING,
        gameObj: DataTypes.STRING,
        handDetection: DataTypes.STRING,

    }, {
        // freezeTableName: true,
        tableName: 'invisibledog',
        timestamps: true
    });

    return invisibleDog;
}
/*
getterMethods: {
    gameID: function () {

        try {
            if (this.getDataValue('gameID') === undefined) {
                return
            }

            return JSON.parse(this.getDataValue('gameID'))

        } catch (err) {
            console.log("err " + err)
            return null;
        }

    },
    GUIs: function () {

        try {
            if (this.getDataValue('GUIs') === undefined) {
                return
            }

            return JSON.parse(this.getDataValue('GUIs'))

        } catch (err) {
            console.log("err " + err)
            return null;
        }
    },
    performance: function () {

        try {
            if (this.getDataValue('performance') === undefined) {
                return
            }

            return JSON.parse(this.getDataValue('performance'))

        } catch (err) {
            console.log("err " + err)
            return null;
        }
    },
    gameObj: function () {

        try {
            if (this.getDataValue('gameObj') === undefined) {
                return
            }

            return JSON.parse(this.getDataValue('gameObj'))

        } catch (err) {
            console.log("err " + err)
            return null;
        }
    },
    handDetection: function () {

        try {
            if (this.getDataValue('handDetection') === undefined) {
                return
            }

            return JSON.parse(this.getDataValue('handDetection'))

        } catch (err) {
            console.log("err " + err)
            return null;
        }
    }
}
*/