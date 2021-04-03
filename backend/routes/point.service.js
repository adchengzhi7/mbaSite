const pool= require("../config/db")

module.exports={
    
    getPointByStuId:(id,callBack)=>{
        pool.query(
            'SELECT * FROM points WHERE points_stuid=?',
            [id],
            (error,results)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )

    },
}