const pool= require("../config/db")

module.exports={
    createPoint:(data,callBack)=>{
        pool.query(
                `INSERT INTO points (points_type,points_title,points_regYear,points_regSemester,points_credit,points_status,points_stuid,points_englishCredit)
                VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.type,
                data.sectionTitle,
                data.yearSelected,
                data.semesterSelected,
                data.points,
                data.status,
                data.stuId,
                data.englishCredit,
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
    
    getPointByStuId:(id,callBack)=>{
        pool.query(
            'SELECT points_type.pointsType_descp AS section,points.points_title as section_title,  concat(points.points_regYear, points.points_regSemester) as semester,points.points_credit AS point , points.points_status AS status,points.points_englishCredit AS englishCredit FROM points INNER JOIN points_type ON points.points_type=points_type.pointsType_id WHERE points_stuid=?',
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