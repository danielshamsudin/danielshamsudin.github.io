const db = require("../models");
const Base_price = db.DefaultPrice;
const Op = db.Sequelize.Op;

//create new base_price
/*exports.create = (req, res) => {
    //validate request
    
    if(!req.body.default_price){
        res.status(400).send({
            message: "Default price cannot be empty!"
        });
        return;
    }

    //create base_price
    const base_price = {
        default_price: req.body.default_price
        //published: req.body.published ? req.body.published : false
    };

    //save tut in db
    Base_price.create(base_price).then(data => {
        res.send(data);
    })
    .catch (err => {
        res.status(500).send({
            message: err.message || "Some error occur while creating the default price"
        });
    });
};*/

//find tutorial by id
exports.findOne = (req, res) => {
    const id = req.body.default_price_id;
    Base_price.findByPk(id)
      .then(data => {
          if (data.default_price_id == id){
              res.send({
                data: {
                    default_price: data.default_price
                },
                success: true,
                message: "Default price is found!"
              });
          }
          else{
              res.status(500).send({
                  success: false,
                  message: "Default price not exist!"
              });
          }
      })
      .catch(err => {
        res.status(500).send({
          status: false,
          message: "Default price not exist!"
        });
      });
};

//update tutorial
exports.update = (req, res) => {
    const id = req.params.id;

    Base_price.findByPk(id)
    .then(data => {
        if (data.default_price_id == id){
            Base_price.update(req.body, {
                where: {default_price_id:id}
            }).then(num => {
                if(num == 1){
                    res.send({message: "Updated successfully."});
                }else{
                    res.send({message: "Cannot update"});
                }
            }).catch(err => {
                res.status(500).send({
                    message: "Error when updating"
                });
            });
        }
        else{
            //create custom_price
            const base_price = {
                default_price: req.body.default_price
            };
            //save tut in db
            Base_price.create(base_price).then(data => {
                res.send(data);
            })
            .catch (err => {
                res.status(500).send({
                    message: err.message || "Some error occur while creating the custom_price"
                });
            });
        }
    })
    .catch(err => {
      const base_price = {
        default_price: req.body.default_price
      };
  
      //save tut in db
      Base_price.create(base_price).then(data => {
          res.send(data);
      })
      .catch (err => {
          res.status(500).send({
              message: err.message || "Some error occur while creating the custom_price"
          });
      });
    });
};