const{ 
    create,
    getUserByStuId,
    getStudent,
    updateUser,
    deleteUser,
    getUserByStuIdAll
 } =require("../routes/user.service")

const {genSaltSync,hashSync,compareSync} = require("bcrypt") 
const {sign} = require("jsonwebtoken");
const { json, response } = require("express");

module.exports={
    createUser:(req,res ) =>{
        const body = req.body;
        const salt =genSaltSync(10)
        if(body.length>1){

            
            const mapLoop = async _ => {
              
                const promises = body.map(async ele => {
                    
                    const newPassword=ele.personalid;
                    ele.password =hashSync(newPassword,salt);
                    ele.type=0;

                    try{
                        const a = await create(ele)
                        ele.success =1;
                        ele.stsMsg = a;
                        return ele

                    }catch(e){
                        ele.success =0;
                        ele.stsMsg = e.code;
                        return ele
                    }


                })
              
                const numFruits = await Promise.all(promises)
                return  res.send(numFruits);

              }
              mapLoop()
           
            

        }else{
            body.password =hashSync(body.password,salt);
            create(body,(err,result)=>{
                if(err){
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
        }
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
    getStudent:(req,res)=>{
        getStudent((err,results)=>{
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
                        message:"請輸入正確的 學號 及 密碼！"

                    })
                }
            }
            
        })

    },
    logout:(req,res)=>{

    }
}