'use strict';
const jwt    = require('jsonwebtoken');
const moment = require('moment'); 
module.exports = (sequelize, DataTypes) => {

  var Ads = sequelize.define('Ads', {
    ads_id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true} ,
    ads_display_name: DataTypes.STRING,
    adver_id: DataTypes.STRING,
    status: DataTypes.STRING,
    format: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    updated_by: DataTypes.STRING,
    path: DataTypes.STRING,
    category: DataTypes.STRING,
    fps:DataTypes.STRING,
    approver: DataTypes.STRING,
    approve_progress: DataTypes.STRING,
    tracking:DataTypes.BOOLEAN,
    publish:DataTypes.BOOLEAN,
    expired_date:'TIMESTAMP',
    reject_reason: DataTypes.STRING,
  }, {
    freezeTableName: true,
    tableName: 'Ads',
    timestamps: true,
    getterMethods: {
      //  profile_url:  function() {

      //    if(this.getDataValue('profile_pic') != null)
      //      return CONFIG.filePath +'profile/'+this.getDataValue('profile_pic');
      //    else
      //     return CONFIG.filePath +'profile/default-user.png';

      //  },
      approver:function(){
  
        try{
          if(this.getDataValue('approver') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('approver'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      approve_progress:function(){
  
        try{
          if(this.getDataValue('approve_progress') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('approve_progress'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
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
      },
      path:function(){
  
        if(this.getDataValue('path'))
          return CONFIG.filePath+"/video/"+this.getDataValue('path');
        else if(this.getDataValue('path') === undefined)
            return ;
        else 
          return null;
  
      },
      category:function(){
  
        try{
          if(this.getDataValue('category') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('category'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      }

      
    },

  });

  Ads.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    delete json['mac_address'];

    return json;
  };

  Ads.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration_signage);
    return jwt.sign({signage_id:this.signage_id,mac_address:this.mac_address,name:this.name}, CONFIG.jwt_encryption_signage, {expiresIn: expiration_time});
  };


  Ads.associate = function(models) {
    Ads.belongsTo(models.AdsPackage, {
      foreignKey: 'package_id',
      as: 'package_list'
    });

    /*Ads.belongsTo(models.Company, {
      foreignKey: 'company_id'
    });

    Ads.belongsTo(models.Advertiser, {
      foreignKey: 'adver_id'
    });*/


  };

  
  return Ads;
};