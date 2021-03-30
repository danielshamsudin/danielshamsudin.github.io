//define sequelize model

module.exports = (sequelize, Sequelize) => {
    var CustomPrice = sequelize.define("CustomPrice", {
        custom_price_id: {type: Sequelize.INTEGER ,primaryKey: true,autoIncrement: true},
        custom_price: {type: Sequelize.DOUBLE},
        signage_id: {type: Sequelize.INTEGER}
    }, {
        tableName: 'CustomPrice'
    });

    CustomPrice.associate = function(models){
        CustomPrice.belongsTo(models.Ads, {
            foreignKey: 'signage_id'
        });
    };

    return CustomPrice;
}