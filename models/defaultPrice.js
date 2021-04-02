//define sequelize model

module.exports = (sequelize, Sequelize) => {
    const BasePrice = sequelize.define("BasePrice", {
        default_price_id: {type: Sequelize.INTEGER ,primaryKey: true,autoIncrement: true},
        default_price: {type: Sequelize.DOUBLE}
    }, {
        tableName: 'DefaultPrice'
    });

    return BasePrice;
}