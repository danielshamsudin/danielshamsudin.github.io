const db = require("../models");
const Custom_price = db.CustomPrice;
const Op = db.Sequelize.Op;

//create new custom_price
exports.create = (req, res) => {
    //validate request
    
    if(!req.body.custom_price){
        res.status(400).send({
            message: "Custom price cannot be empty!"
        });
        return;
    }
    //create custom_price
    const custom_price = {
        custom_price: req.body.custom_price,
        signage_id: req.body.signage_id
    };

    //save tut in db
    Custom_price.create(custom_price).then(data => {
        res.send(data);
    })
    .catch (err => {
        res.status(500).send({
            message: err.message || "Some error occur while creating the custom_price"
        });
    });
};

//find tutorial by id
exports.findOne = (req, res) => {
    const id = req.body.custom_price_id;
    Custom_price.findByPk(id)
      .then(data => {
          if (data.custom_price_id == id){
              res.send({
                data: {
                    custom_price: data.custom_price
                },
                success: true,
                message: "Custom price is found!"
              });
          }
          else{
              res.status(500).send({
                  success: false,
                  message: "Custom price not exist!"
              });
          }
      })
      .catch(err => {
        res.status(500).send({
          status: false,
          message: "Custom price not exist!"
        });
      });
};

//update tutorial
exports.update = (req, res) => {
    const id = req.params.id;

    Custom_price.findOne({where: {signage_id: id}})
    .then(data => {
        if (data.signage_id == id){
            Custom_price.update(req.body, {
                where: {signage_id:id}
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
            const custom_price = {
                custom_price: req.body.custom_price,
                signage_id: req.body.signage_id
            };
            //save tut in db
            Custom_price.create(custom_price).then(data => {
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
      const custom_price = {
          custom_price: req.body.custom_price,
          signage_id: req.body.signage_id
        };
  
      //save tut in db
      Custom_price.create(custom_price).then(data => {
          res.send(data);
      })
      .catch (err => {
          res.status(500).send({
              message: err.message || "Some error occur while creating the custom_price"
          });
      });
    });
};

//delete by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Custom_price.destroy({
        where: {custom_price_id:id}
    })
    .then (num => {
        if(num==1){
            res.send({
                message: "Deleted."
            });
        }else{
            res.send({
                message:"Cannot delete."
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error, cannot delete."
        });
    });
};