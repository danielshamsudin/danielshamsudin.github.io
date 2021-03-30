const db = require("../models");
const invisibleDog = db.invisibledog;
const Op = db.Sequelize.Op;

//create new data
exports.create = (req, res) => {
    //validate request

    if (!req.body.data) {
        res.status(400).send({
            message: "data cannot be empty"
        });
        return;
    }
    //create data
    const data = {
        GUIs: req.body.GUIs,
        performance: req.body.performance,
        gameObj: req.body.gameObj,
        handDetection: req.body.handDetection
    };

    //save tut in db
    data.create(data).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occur while creating the data"
            });
        });
};

