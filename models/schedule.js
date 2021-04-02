'use strict';

module.exports = (sequelize, DataTypes) => {
    
    var Schedules = sequelize.define('Schedules', {
        schedule_id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true}, 
        group_id: DataTypes.INTEGER, 
        start_date: DataTypes.DATE, 
        end_date: DataTypes.DATE, 
        time: {
            type: DataTypes.STRING, 
            get() {
                return this.getDataValue('time').split(',')
            }
        }, 
        ad_id: {
            type: DataTypes.STRING, 
            get() {
                return this.getDataValue('ad_id').split(',')
            }
        }, 
        ad_name: {
            type: DataTypes.STRING, 
            get() {
                return this.getDataValue('ad_name').split(',')
            }
        }
    }, {
        tableName: 'Schedules'
    });

    return Schedules;
}