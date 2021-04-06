
const {getPointByStuId,createPoint,getUnReviewPoint,getPointByPointId} =require("./point.controller")
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation")

router.post("/",checkToken,createPoint);
router.get("/unreview",checkToken,getUnReviewPoint);
router.get("/edit/:pointsId",checkToken,getPointByPointId);
router.get("/:stuId",checkToken,getPointByStuId);

module.exports =router;