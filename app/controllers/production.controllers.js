const production = require("../models/production.model.js");
// Retrieve all Customers from the database.
const sql = require("../models/db");
exports.findAll = (req, res) => {
  production.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
exports.create = (req, res) => {
  // Validate request

  sql.query(`SELECT * FROM users WHERE token='${req.headers.authorization}'`, function (err, result, fields) {
    if (err) res.status(200).end(JSON.stringify({ status: 'error' }));
    if (result[0].status === 2) {
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a Customer
      const productions = new production({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        img: req.body.img,
        brand: req.body.brand,
        size: req.body.size,
        number: req.body.number,
        description: req.body.description,
        color: req.body.color,
        gender: req.body.gender,
        off: req.body.off,
        status_code: req.body.status_code,
        age: req.body.age,
      });

      // Save Customer in the database
      production.create(productions, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
    }
  })
};
exports.delete = (req, res) => {
  sql.query(`SELECT * FROM users WHERE token='${req.headers.authorization}'`, function (err, result, fields) {
    if (err) res.status(200).end(JSON.stringify({ status: 'error' }));
    if (result[0].status === 2) {
  production.remove(req.query.deleteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found production with id ${req.query.deleteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete production with id " + req.query.deleteId
        });
      }
    } else res.send({ message: `production was deleted successfully!` });
  });
}})
};
exports.findOne = (req, res) => {
  production.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.send(data);
  });
};
 exports.update = (req, res) => {
  sql.query(`SELECT * FROM users WHERE token='${req.headers.authorization}'`, function (err, result, fields) {
    if (err) res.status(200).end(JSON.stringify({ status: 'error' }));
    if (result[0].status === 2) {
  production.updateById(
    req.params.productionId,
    new production(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.productionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.productionId
          });
        }
      } else res.send(data);
    }
  );
    }
  })
};
exports.getmysql=(req,res)=>{
  sql.query(`SELECT * FROM production WHERE status_code='${req.query.status}' LIMIT ${req.query.page1},${req.query.page2}`,function(err,result,fields){
    if(err)throw err
    res.status(200).send(result)
  })
}