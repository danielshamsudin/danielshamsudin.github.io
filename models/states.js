'use strict';

module.exports = (sequelize, DataTypes) => {
    
    var States = sequelize.define('States', {
        signage_id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true}, 
        state: DataTypes.STRING
    }, {
        tableName: 'States'
    });

    return States;
}