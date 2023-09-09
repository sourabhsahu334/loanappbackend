const express= require("express");
const router= express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword, updateProfile, getUserDetails, getAllUser, getSingleUser, updateUserRole, deleteUser, updatePassword, updateuser, addconnection, myconnections, applyforloan, checkloans, checkadminrole, getallloans, approveloan, deleterequest}=require("../controller/usercontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../midelware/auth");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/me/update").put(updateuser);
router.route("/applyforloan").post(applyforloan)
router.route("/checkloans").post(checkloans);
router.route("/checkadmin").post(checkadminrole);
router.route("/getallloans").get(getallloans);
router.route("/approveloan").post(approveloan);
router.route("/deleterequest").delete(deleterequest)


router.route("/all").get( getAllUser);



module.exports=router;