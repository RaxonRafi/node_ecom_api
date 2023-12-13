var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    let Token = req.headers['token'];
    
    jwt.verify(Token,"MuhammadRafi2318",(error,decode)=>{
 
     if(error){

         res.status(401).json({status:"invalid Token",data:error});

     }else{

        const email = decode['data'][0]['email']
        req.headers.email = email
        next();

     }
 
    })
 
 }