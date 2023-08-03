

const Apifeatures = require("../apiFeatures");
const catchAsyncerror = require("../midelware/catchAsyncerror");
const Questions = require("../models/Questions");

const Todo = require("../models/Todo");


exports.addquestion=async(req,res,next)=>{
   const {questions,id}=req.body;
   try {
    const data = await Questions.create({
      user:id,
      questions:questions,
    });
    await data.save();
    res.json({
      message:"question add",
      success:true
    })
   } catch (error) {
    res.json({
      message:error.message,
      success:false
    })
   }
}



exports.getallquestions=async(req,res,next)=>{
  const {id}=req.body;
  try {
   const data = await Questions.find({user:id});
   
   res.json({
     message:"All questions Success",
     success:true,
     questions:data
   })
  } catch (error) {
   res.json({
     message:error.message,
     success:false
   })
  }
}

exports.deletefroms=async(req,res,next)=>{
  const { id } = req.params;
  try {
   const data = await Questions.deleteOne({_id:id});
   
   res.json({
     message:"forms delete",
     success:true,
     questions:data
   })
  } catch (error) {
   res.json({
     message:error.message,
     success:false
   })
  }
}