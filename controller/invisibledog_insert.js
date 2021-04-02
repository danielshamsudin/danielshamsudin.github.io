const db = require("../models");
const invisibleDog = db.invisibleDog;
const Op = db.Sequelize.Op;

//create new data
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({
            message: "data cannot be empty"
        });
        return;
    }
    
    //create data
    const data = {
        startTime: req.body.starttime,
        performance: req.body.performance,
        handDetection: req.body.handDetection,
        handSize: req.body.handSize,
        gameObj: req.body.gameObj,
        GUIs: req.body.GUIs,
        score: req.body.score
    };

    //save tut in db
    invisibleDog.create(data).then(data => {
        console.log(res.body); // check
        res.send(data); // success
    })
        .catch(err => {
            res.status(500).send({ // server error
                message: err.message || "Some error occur while creating the data"
            });
        });
};

