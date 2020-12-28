const sql = require("../models/db");
exports.Login = (req, res) => {
    sql.query(`SELECT * FROM users WHERE password='${req.body.password}' AND phone='${req.body.username}'`,function(err,result,fields){
        if(err) res.status(200).end(JSON.stringify({status:'error'}))
        res.status(200).end(JSON.stringify(result[0]))
    })
};
exports.getAlluser=(req,res)=>{
    sql.query(`SELECT * FROM users WHERE token='${req.headers.authorization}'`,function(err,result,fields){
        if (err)  res.status(200).end(JSON.stringify({status:'error'}));
       if(result[0].status===2){
        sql.query(`SELECT * FROM users`,function(err1,result1,fields1){
            if (err1)  res.status(200).end(JSON.stringify({status:'error'}));
            res.status(200).end(JSON.stringify(result1))
           })
           
       }
    })
}