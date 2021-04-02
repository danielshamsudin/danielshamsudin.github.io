'use strict';
const jwt    = require('jsonwebtoken');
const moment = require('moment'); 
module.exports = (sequelize, DataTypes) => {

  var Signage = sequelize.define('Signage', {
    signage_id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true} ,
    company_id: DataTypes.STRING,
    group_id: DataTypes.STRING,
    name: DataTypes.STRING,
    mac_address: DataTypes.STRING,
    location: DataTypes.STRING,
    // longitude: DataTypes.STRING,
    // latitude: DataTypes.STRING,
    fps: DataTypes.INTEGER,
    category: DataTypes.STRING,
    enable_camera: DataTypes.BOOLEAN,
    enable_tracking: DataTypes.BOOLEAN,
    ws_key: DataTypes.STRING,
    registered: DataTypes.BOOLEAN,
    updated_by: DataTypes.STRING,
    created_by: DataTypes.STRING,
    assigned_ads: DataTypes.STRING,
    cpu: DataTypes.STRING,
    camera: DataTypes.STRING,
    memory: DataTypes.STRING,
    gpu: DataTypes.STRING,
    os: DataTypes.STRING,
    storage: DataTypes.STRING,
    drive: DataTypes.STRING,
    publish: DataTypes.BOOLEAN,
    last_connect: 'TIMESTAMP',
    remark: DataTypes.STRING,
    error: DataTypes.STRING,
    layout_id: DataTypes.INTEGER
  }, {
   // freezeTableName: true,
    tableName: 'Signage',
    timestamps: true,
    getterMethods: {
      cpu:function(){
  
        try{
          if(this.getDataValue('cpu') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('cpu'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      camera:function(){
  
        try{
          if(this.getDataValue('camera') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('camera'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      memory:function(){
  
        try{
          if(this.getDataValue('memory') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('memory'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      gpu:function(){
  
        try{
          if(this.getDataValue('gpu') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('gpu'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      os:function(){
  
        try{
          if(this.getDataValue('os') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('os'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      storage:function(){
  
        try{
          if(this.getDataValue('storage') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('storage'))     

        } catch(err)
        {
          console.log("err "+err)
          return null;
        }
  
      },
      drive:function(){
  
        try{
          if(this.getDataValue('drive') === undefined)
          {
            return 
          }

          return JSON.parse(this.getDataValue('drive'))     

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
      last_connect:function(){
        if(this.getDataValue('last_connect'))
          return moment(this.getDataValue('last_connect'), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        else if(this.getDataValue('last_connect') === undefined)
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
      assigned_ads:function(){
        try{
          if(this.getDataValue('assigned_ads') !== null&&this.getDataValue('assigned_ads') !== undefined)
          {
            return JSON.parse("[" + this.getDataValue('assigned_ads') + "]")   
          }
        } catch(err)
        { console.log("assigned_ads "+this.getDataValue('assigned_ads'))
          console.log("assigned_ads err "+err)
          return null;
        }
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
          console.log("category err "+err)
          return null;
        }
  
      },

      
    },

  });

  Signage.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    delete json['mac_address'];

    return json;
  };

  Signage.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration_signage);
    return jwt.sign({signage_id:this.signage_id,mac_address:this.mac_address,name:this.name,company_id:this.company_id}, CONFIG.jwt_encryption_signage, {expiresIn: expiration_time});
  };

  Signage.associate = function(models) {
    Signage.belongsTo(models.Ads, {
       foreignKey: 'assigned_ads'
    });

    Signage.belongsTo(models.SignageGroup, {
      foreignKey: 'group_id'
    });

    Signage.hasOne(models.CustomPrice, {
      foreignKey: 'signage_id'
    });

    /*Signage.belongsTo(models.Company, {
      foreignKey: 'company_id'
    });*/

  };

  
  return Signage;
};