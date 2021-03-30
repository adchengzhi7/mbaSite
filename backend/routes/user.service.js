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
    getUser:(callBack)=>{
        pool.query(
            'SELECT usersDetails_stuId,usersDetails_psId,usersDetails_cName,usersDetails_type FROM users_details',
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
            'SELECT usersDetails_psId,usersDetails_cName,usersDetails_type FROM users_details WHERE usersDetails_stuId=?',
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