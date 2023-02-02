const express= require("express");
const {getAllproducts, createProduct, getproduct, updateproduct, deleteproduct, createProductReview, Addtodo, getalltodo, getCompleteTodo, getInCompleteTodo, updateTodo, changestatus, change, deleteTodo, deleteAlltodo}= require( '../controller/productcontroller');
const { isAuthenticatedUser ,authorizeRoles} = require("../midelware/auth");
const router=express.Router();


router.route("/todo").post(isAuthenticatedUser,Addtodo);
router.route("/alltodo").get(isAuthenticatedUser,getalltodo);
router.route("/completetodo").get(isAuthenticatedUser,getCompleteTodo);
router.route("/Incompletetodo").get(isAuthenticatedUser,getInCompleteTodo);
router.route("/updateTodo/:id").put(isAuthenticatedUser,updateTodo);
router.route("/change/:id").put(isAuthenticatedUser,change);
router.route("/delete/:id").delete(isAuthenticatedUser,deleteTodo);
router.route("/deleteall").delete(isAuthenticatedUser,deleteAlltodo)






module.exports=router;