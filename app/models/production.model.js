const sql = require("./db.js");
const production = function(production) {
    this.name = production.name;
    this.price = production.price;
    this.category = production.category;
    this.img = production.img;
    this.brand = production.brand;
    this.size = production.size;
    this.number = production.number;
    this.description = production.description;
    this.color = production.color;
    this.gender = production.gender;
    this.off = production.off;
    this.status_code = production.status_code;
    this.age=production.age;
  };
  production.getAll = result => {
    sql.query("SELECT * FROM production", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };
  production.create = (newCustomer, result) => {
    sql.query("INSERT INTO production SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    });
  };
  production.findById = (customerId, result) => {
    sql.query(`SELECT * FROM production WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  production.updateById = (id, customer, result) => {
    
    sql.query(
      "UPDATE production SET name = ?, price = ?, category = ?,img = ?, brand = ?, size = ?,number = ?, description = ?, color = ?,gender = ?, off = ?, status_code = ?, age = ? WHERE id = ?",
      [customer.name, customer.price, customer.category,customer.img,customer.brand, customer.size, customer.number,customer.description,customer.color, customer.gender, customer.off,customer.status_code,customer.age, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    );
  };
  production.remove = (id, result) => {
    sql.query("DELETE FROM production WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted customer with id: ", id);
      result(null, res);
    });
  };
  module.exports=production