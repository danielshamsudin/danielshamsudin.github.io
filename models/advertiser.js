'use strict';
const jwt    = require('jsonwebtoken');
const moment = require('moment'); 

module.exports = (sequelize, DataTypes) => {

    var Advertiser = sequelize.define('Advertiser', {
        id: {type:DataTypes.INTEGER ,primaryKey: true,autoIncrement: true}, 
        name: DataTypes.STRING, 
        description: DataTypes.STRING, 
        company_id: DataTypes.INTEGER, 
        contact: DataTypes.STRING, 
        email: DataTypes.STRING
    }, {
        //freezeTableName: true, 
        tableName: 'Advertiser', 
        getterMethods: {
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

    /*Advertiser.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        delete json['mac_address'];
    
        return json;
    };
    
    Advertiser.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration_signage);
        return jwt.sign({signage_id:this.signage_id,mac_address:this.mac_address,name:this.name}, CONFIG.jwt_encryption_signage, {expiresIn: expiration_time});
    };*/

    return Advertiser;
}