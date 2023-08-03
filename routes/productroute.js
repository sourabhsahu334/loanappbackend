const express= require("express");

const { isAuthenticatedUser ,authorizeRoles} = require("../midelware/auth");
const { addquestion, getallquestions, deletefroms } = require("../controller/productcontroller");
const router=express.Router();

router.route("/addquestion").post(addquestion);
router.route("/getallquestion").post(getallquestions);
router.route("/deleteform/:id").delete(deletefroms);








module.exports=router;