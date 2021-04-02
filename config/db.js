module.exports = {
    HOST: "localhost", 
    USER: "root", 
    PASSWORD: "", 
    DB: "campaigngame", 
    dialect: "mysql", 
    pool: {
        max: 5, 
        min: 0, 
        acquire: 50000, 
        idle: 15000
    }
};