
const {createUser,getUserByStuId,getUser,updateUser,deleteUser,login} =require("./user.controller")
const router = require("express").Router();
const {checkToken} =require("../auth/token_validation")

router.post("/",checkToken,createUser);
router.get("/",checkToken,getUser);
router.get("/:stuId",checkToken,getUserByStuId);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);
router.post("/logout")

module.exports =router;