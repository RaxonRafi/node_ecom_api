var jwt = require('jsonwebtoken')

exports.CreateToken=(req,res)=>{

    let Payload ={
        exp:Math.floor(Date.now()/1000)+(60*60),
        data:{Name:"Muhammad Rafi",City:"Chattogram",admin:true}
    }
    let Token = jwt.sign(Payload,"MuhammadRafi2318");
    res.send(Token)
}