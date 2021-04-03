const pool= require("../config/db")

module.exports={
    
    getPointByStuId:(id,callBack)=>{
        pool.query(
            'SELECT points_type.pointsType_descp AS section,points.points_title as section_title,  concat(points.points_regYear, points.points_regSemester) as semester,points.points_credit AS point , points.points_status AS status FROM points INNER JOIN points_type ON points.points_type=points_type.pointsType_id WHERE points_stuid=?',
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