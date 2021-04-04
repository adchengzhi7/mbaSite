
const {getPointByStuId,createPoint} =require("./point.controller")
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation")

router.post("/",checkToken,createPoint);
router.get("/:stuId",checkToken,getPointByStuId);

module.exports =router;