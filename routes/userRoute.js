const express= require("express");
const router= express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword, updateProfile, getUserDetails, getAllUser, getSingleUser, updateUserRole, deleteUser, updatePassword, updateuser, addconnection, myconnections}=require("../controller/usercontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../midelware/auth");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/me/update").put(updateuser);

router.put("/addconnection",addconnection);
router.get("/myconnections",myconnections)
router.route("/all").get( getAllUser);



module.exports=router;