var jwt = require('jsonwebtoken')

exports.CreateToken=(req,res)=>{

    let Payload ={
        exp:Math.floor(Date.now()/1000)+(60*60),
        data:{Name:"Muhammad Rafi",City:"Chattogram",admin:true}
    }
    let Token = jwt.sign(Payload,"MuhammadRafi2318");
    res.send(Token)
}
exports.DecodeToken=(req,res)=>{

   let Token = req.headers['token-key'];
   
   jwt.verify(Token,"MuhammadRafi2318",(error,decode)=>{

    if(error){
        res.status(404).json({status:"invalid Token",data:error});
    }else{
        res.status(200).json({status:"Success",data:decode});
    }

   })

}