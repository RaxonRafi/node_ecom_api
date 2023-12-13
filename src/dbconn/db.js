const mysql = require('mysql2');

const db = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_ecom',

  
});
db.getConnection((err)=>{

    if(err){

        console.log(err);

    }else{

        console.log("Connected to DB!");
    }
})

module.exports = db;