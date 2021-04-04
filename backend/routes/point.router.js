
const {getPointByStuId,createPoint,getUnReviewPoint} =require("./point.controller")
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation")

router.post("/",checkToken,createPoint);
router.get("/unreview",checkToken,getUnReviewPoint);
router.get("/:stuId",checkToken,getPointByStuId);

module.exports =router;