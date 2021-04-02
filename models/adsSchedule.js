'use strict';
const jwt    = require('jsonwebtoken');
const moment = require('moment'); 
module.exports = (sequelize, DataTypes) => {

  var AdsSchedule = sequelize.define('AdsSchedule', {
    schedule_id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true} ,
    company_id: DataTypes.INTEGER,
    group_id:DataTypes.INTEGER,
    package_id: DataTypes.INTEGER,
    is_alldays: DataTypes.BOOLEAN,
    start_date: 'TIMESTAMP',
    end_date: 'TIMESTAMP'
  }, {
   // freezeTableName: true,
    tableName: 'AdsSchedule',
    timestamps: true,
    getterMethods: {
      // ads_list:function(){
      //   try{
      //     if(this.getDataValue('ads_list') !== null&&this.getDataValue('ads_list') !== undefined)
      //     {
      //       return JSON.parse("[" + this.getDataValue('ads_list') + "]")   
      //     }
      //   } catch(err)
      //   { 
      //     // console.log("ads_list "+this.getDataValue('ads_list'))
      //     // console.log("ads_list err "+err)
      //     return null;
      //   }
      // },
      createdAt:function(){
        if(this.getDataValue('createdAt'))
          return moment(this.getDataValue('createdAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        else if(this.getDataValue('createdAt') === undefined)
            return ;
        else 
          return null;
      },
      updatedAt:function(){
        if(this.getDataValue('updatedAt'))
          return moment(this.getDataValue('updatedAt'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        else if(this.getDataValue('updatedAt') === undefined)
            return ;
        else 
          return null;
      }  
    },

  });

  AdsSchedule.associate = function(models) {
    AdsSchedule.belongsTo(models.AdsPackage, {
      foreignKey: 'package_id',
      through: {
        model: models.Ads
    },
      as: 'package_list'
   });
  };

  
  return AdsSchedule;
};