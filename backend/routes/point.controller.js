const{getPointByStuId} =require("../routes/point.service")
const { json } = require("express");

module.exports={
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