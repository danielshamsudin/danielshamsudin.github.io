const dbConfig = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST, 
    dialect: dbConfig.dialect, 
    opeatorsAliases: false, 

    pool: {
        max: dbConfig.pool.max, 
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.invisibleDog = require("./invisibledog_game.js")(sequelize, Sequelize);

/*
db.Advertiser = require("./advertiser.js")(sequelize, Sequelize);
db.Ads = require("./ads.js")(sequelize, Sequelize);
db.AdsPackage = require("./adsPackage.js")(sequelize, Sequelize);
db.AdsSchedule = require("./adsSchedule.js")(sequelize, Sequelize);
db.Signage = require("./signage.js")(sequelize, Sequelize);
db.SignageGroup = require("./group.js")(sequelize, Sequelize);
db.CustomPrice = require("./CustomPrice.js")(sequelize, Sequelize);
db.States = require("./States.js")(sequelize, Sequelize);
db.Schedule = require("./Schedule.js")(sequelize, Sequelize);
db.DefaultPrice = require("./DefaultPrice.js")(sequelize, Sequelize);
*/

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;