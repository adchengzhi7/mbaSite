const pool= require("../config/db")

module.exports={
    create:(data,callBack)=>{
        pool.query(
                `INSERT INTO users_details (usersDetails_stuId,usersDetails_psId,usersDetails_cName,usersDetails_type,usersDetails_pass)
                VALUES (?,?,?,?,?)`,
            [
                data.stuId,
                data.psId,
                data.cName,
                data.type,
                data.password,
            ],
            (error,results) =>{
                if(error){
                    console.log(error);
                   return callBack(error);
                }
                return callBack(null,results)
            }
        )
    },
    getStudent:(callBack)=>{
        pool.query(
            'SELECT usersDetails_stuId AS stuId ,usersDetails_cName AS cName , IFNULL((SELECT SUM(`points_credit`) FROM points WHERE points_status >= 1 AND points_stuid=usersDetails_stuId AND points_status != 3),0)AS totalPoint FROM users_details WHERE usersDetails_type=0',
            [],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )

    },
    getUserByStuId:(id,callBack)=>{
        pool.query(
            'SELECT usersDetails_psId AS psId ,usersDetails_cName AS cName ,usersDetails_type AS type FROM users_details WHERE usersDetails_stuId=?',
            [id],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )

    },
    updateUser:(data,callBack) =>{
        pool.query(
            'UPDATE users_details SET usersDetails_cName=?,usersDetails_type=?,usersDetails_psId=?,usersDetails_pass=? WHERE usersDetails_stuId=?',
            [
                data.cName,
                data.type,
                data.psId,
                data.password,
                data.stuId,
            ],
            (error,results)=>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results[0])
            }
        )

    },
    deleteUser:(data,callBack)=>{
        pool.query(
            "DELETE FROM users_details WHERE usersDetails_stuId=?",
            [data.stuId],
            (error,results)=>{
            if(error){
                return callBack(error)
            }
            return callBack(null,results[0])
        })
    },
    getUserByStuIdAll:(id,callBack)=>{
        pool.query(
            'SELECT * FROM users_details WHERE usersDetails_stuId=?',
            [id],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )

    },
}