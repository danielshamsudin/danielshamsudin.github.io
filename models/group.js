'use strict';
const jwt    = require('jsonwebtoken');
const moment = require('moment'); 
module.exports = (sequelize, DataTypes) => {

  var Group = sequelize.define('SignageGroup', {
    group_id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true} ,
    company_id: DataTypes.STRING,
    package_id: DataTypes.STRING,
    name: DataTypes.STRING,
    //signage_list: DataTypes.STRING,
  }, {
   // freezeTableName: true,
    tableName: 'SignageGroup',
    timestamps: true,
    getterMethods: {
      //  profile_url:  function() {

      //    if(this.getDataValue('profile_pic') != null)
      //      return CONFIG.filePath +'profile/'+this.getDataValue('profile_pic');
      //    else
      //     return CONFIG.filePath +'profile/default-user.png';

      //  },
      // signage_list:function(){
      //   try{
      //     if(this.getDataValue('signage_list') !== null&&this.getDataValue('signage_list') !== undefined)
      //     {
      //       return JSON.parse("[" + this.getDataValue('signage_list') + "]")   
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

      
    }

  });


  Group.associate = function(models) {
    Group.hasMany(models.Signage, {
      foreignKey: 'group_id'
      //as: 'signage_list'
    });

    Group.belongsTo(models.AdsSchedule,{
      foreignKey: 'group_id',
      as: 'schedule'
    });

  };

  
  return Group;
};