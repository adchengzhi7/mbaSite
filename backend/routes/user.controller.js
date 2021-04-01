const{ 
    create,
    getUserByStuId,
    getUser,
    updateUser,
    deleteUser,
    getUserByStuIdAll
 } =require("../routes/user.service")

const {genSaltSync,hashSync,compareSync} = require("bcrypt") 
const {sign} = require("jsonwebtoken");
const { json } = require("express");

module.exports={
    createUser:(req,res) =>{
        const body = req.body;
        const salt =genSaltSync(10)
        body.password =hashSync(body.password,salt);
        create(body,(err,result)=>{
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
    getUserByStuId:(req,res)=>{
        const stuId = req.params.stuId;
        getUserByStuId(stuId,(err,results)=>{
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
    getUser:(req,res)=>{
        getUser((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            })
        })

        
    },
    updateUser:(req,res) =>{
        const body = req.body;
        const salt =genSaltSync(10);
        body.password =hashSync(body.password,salt);
        updateUser(body,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                success:0,
                message:"Failed to update User"
                })
            }
            return res.json({
                success:1,
                message:"updated successfully"
            })
        })
    },
    deleteUser:(req,res)=>{
        const data = req.body;
        deleteUser(data,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!result){
                return res.json({
                    success:'0',
                    message:'Record Not Found'
                })
            }
            return res.json({
                success:1,
                message:'users delete successfully'
            })
            
        })

    },
    login:(req,res)=>{
        const body= req.body;
        getUserByStuIdAll(body.user,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                res.json({
                    success:0,
                    message:"請輸入正確的 學號 及 密碼！"

                })
            }else{
                const result = compareSync(body.password,results.usersDetails_pass);
                if(result){
                    results.usersDetails_pass = undefined;
                    results.usersDetails_psId = undefined;

                    const jsontoken = sign({result:results},"mbaNccuMba",{
                        expiresIn:"1h"
                    });
                    return res.json({
                        success:1,
                        message:"login successfully",
                        token:jsontoken
                    });

                }else{
                    return res.json({
                        success :0,
                        message:"Invalid email or password"
                    })
                }
            }
            
        })

    },
    logout:(req,res)=>{

    }
}