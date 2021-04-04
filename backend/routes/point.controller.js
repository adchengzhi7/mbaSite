const{getPointByStuId,createPoint} =require("../routes/point.service")
const { json } = require("express");

module.exports={
    createPoint:(req,res) =>{
        const body = req.body;
       
        createPoint(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data:result
            })
        })
    },
    getPointByStuId:(req,res)=>{
        const stuId = req.params.stuId;
        getPointByStuId(stuId,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.json({
                success:1,
                data:results
            })
        })

    },
    
}