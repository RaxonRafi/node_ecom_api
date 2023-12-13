const TaskModel = require('../models/taskModel')

exports.createTask=(req,res)=>{

    const taskBody = req.body;

    TaskModel.create(taskBody)

     .then((result) => {

        if(result){

            res.status(201).json({message:"Task Created Successfully!",data:result})

        }else{

            res.status(400).json({message:"failed to Create Task!"})

        }
        
     }).catch((err) => {

        res.status(400).json({message:"failed to Create Task",error:err})

     });

}

exports.updateTask=(req,res)=>{

    const taskId = req.params['id']
    const updateBody = req.body
 

    TaskModel.updateOne({_id:taskId},updateBody)

    .then((result)=>{

        res.status(201).json({message:"Task Updated Successfully!",data:result})
  
     })
     .catch((err)=>{
  
       res.status(400).json({message:"failed to Update",error:err})
  
     })

}

exports.deleteTask =(req,res)=>{

    const taskId = req.params['id']
    TaskModel.deleteOne({_id:taskId})
    .then((result) => {

        if (result) {

            res.status(200).json({message:"Task deleted Successfully!",data:result})

            
        }else {

            res.status(400).json({message:"Failed!",data:result})

        }
        
    }).catch((err) => {

        console.log(err)
        
    });

}

exports.listTaskByStatus=(req,res)=>{

    const status = req.params['status'];
    const email = req.headers['email'];

    TaskModel.aggregate([
       {$match:{status:status,email:email}},
       {$project:{
        _id:1,title:1,description:1,status:1,email:1,created_at:{
            $dateToString:{
                date:"$created_at",
                format:"%d-%m-%Y"
            }
        }

       }}
    ])
    .then((result) => {

        if (result) {

            res.status(200).json({message:"Task List!",data:result})

            
        }else {

            res.status(400).json({message:"Failed!",data:result})

        }
    }).catch((err) => {

        console.log(err)
    });

}

exports.taskCount=(req,res)=>{

    const email = req.headers['email'];
    TaskModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count:{}}}}
    ])
    .then((result) => {

        if (result) {

            res.status(200).json({message:"Task Count!",data:result})

            
        }else {

            res.status(400).json({message:"Failed!",data:result})

        }
        
    }).catch((err) => {
        console.log(err)
    });

}