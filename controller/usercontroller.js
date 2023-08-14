const User = require("../models/User");
const sendToken= require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto= require("crypto")
const cloudinary= require("cloudinary");


exports.registerUser=async(req,res,next)=>{
    try {
      // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      //   folder: "avatars",
      //   width: 150,
      //   crop: "scale",
      // });
        const {name,email,password,number,experience,skills,professionalDetails,about,education}=req.body;
        const user = await User.create({
            name,
         email,
        password,
        number:number,
        professionalDetails:professionalDetails,
        about:about,
        experience:experience,
        skills:skills,
        education:education,
      
       
    //  avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },

        });
        const token = user.getJWTToken();
        await user.save(); 

    
       
        const userDataWithoutSensitiveInfo = {
          name: user.name,
          email: user.email,
          _id:user._id,
          number:user.number,
          experience:user.experience,
          skills:user.skills,
          about:user.about,
          professionalDetails:user.professionalDetails,
          friends:user.friends
         
        };
        res.json({success:true, user:userDataWithoutSensitiveInfo,});
    } catch (err) {
        res.json({
            
            message:err.message,
            success:false
        })
    }
};


exports.updateuser=async(req,res,next)=>{
  try {
    const { name, email, number, experience, skills, professionalDetails, about, education, id } = req.body;
    console.log(id)
    const filter = { _id: id }; // Filtering by the _id field
    const update = {
      $set: {
        name,
        email,
        number,
        professionalDetails,
        about,
        experience,
        skills,
        education,
      },
    };
    
    const updateResult = await User.updateOne(filter, update);
  
    if (updateResult.modifiedCount === 1) {
      // The update was successful
      const updatedUser = await User.findOne({ _id: id }); // Retrieve the updated user
  
      const userDataWithoutSensitiveInfo = {
        name: updatedUser.name,
        email: updatedUser.email,
        _id: updatedUser._id,
        number: updatedUser.number,
        experience: updatedUser.experience,
        skills: updatedUser.skills,
        about: updatedUser.about,
        professionalDetails: updatedUser.professionalDetails,
        friends:updatedUser.friends
      };
  
      res.json({ success: true, user: userDataWithoutSensitiveInfo });
    } else {
      res.json({
        success: false,
        error: "User not found or update unsuccessful",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
      success: false,
    });
  }
}  


exports.addconnection=async(req,res,next)=>{
  try {
     const {freindid,id}=req.body;
     const obj={
      status:"pending",
      id:freindid
     }
     await User.updateOne({_id:id},{$push:{
      friends:obj
     }});
     const user = await User.findOne({_id:id});
     res.json({
      success:true,
      user:user
     })
  } catch (error) {
    res.json({
      error:error.message,
      success:false
    })
  }
}

exports.myconnections=async(req,res,next)=>{
  try {
    const {idarray}=req.query;
    console.log(idarray)
    //const newarray = idarray.map(id=>ObjectId(id))
    const users= await User.find({_id:{$in:idarray}});
    res.json({users:users,success:true})
  } catch (error) {
    res.json({error:error.message,success:false})
  }

}

exports.loginUser = async (req, res, next) => {
  try {
      const { email, password } = req.body;
    
      // checking if user has given password and email both
    
      if (!email || !password) {
        return res.status(400).json({
          success:false
        })
      }
    
      const user = await User.findOne({ email }).select("+password");
    
      if (!user) {
        return res.status(400).json({
          success:false
        })
      }
    
      const isPasswordMatched = await user.comparePassword(password);
    
      if (!isPasswordMatched) {
        return res.status(400).json({
          success:false
        })
      }
      const userDataWithoutSensitiveInfo = {
        name: user.name,
        email: user.email,
        _id:user._id,
        number:user.number,
        experience:user.experience,
        skills:user.skills,
        about:user.about,
        professionalDetails:user.professionalDetails,
        friends:user.friends
        // Add other properties you want to include in the response
      };
    
    res.json({
      success:true,
      user:userDataWithoutSensitiveInfo
    })
  } catch (err) {
    res.json({
        success:false,
        message:err.message
    })
  }
  };
  exports.logout = async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });
    } catch (err) {
      res.send(err.message);
    }
  };



  exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return res.json({
        message:"user not found"
      })
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return res.json({
        message:error.message+"f4"
      })
    }
  };


  // Reset Password
exports.resetPassword = async (req, res, next) => {
  // creating token hash
try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken:resetPasswordToken
    });
    console.log(resetPasswordToken)
    console.log(req.params.token);
    const l=JSON.stringify(user.name)
    console.log()
  
    if (!user) {
      return next(
       res.json({success:false,message:"no user"})
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(res.json({
        msg:"Password does not password"
      }));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
} catch (err) {
  res.json({
    error:err.message
  })
}
};


// Get User Detail
exports.getUserDetails = (async (req, res, next) => {
 try {
   const user = await User.findById(req.user.id);
 
   res.status(200).json({
     success: true,
     user,
   });
 } catch (err) {
  
  res.json({
    status:404,
    message:err.message})
 }
});

// update User password
exports.updatePassword = (async (req, res, next) => {
try {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return res.json({message:"password is not matched"});
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.json({message:"password does not match"});
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
} catch (err) {
  res.json({msg:err.message})
}
});

// update User Profile
exports.updateProfile = (async (req, res, next) => {
try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
} catch (err) {
  res.json({msg:err.message})
}
});

// Get all users(admin)
exports.getAllUser = (async (req, res, next) => {
try {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
} catch (err) {
  res.json({msg:err.message})
}
});

// Get single user (admin)
exports.getSingleUser = async (req, res, next) => {
try {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        res.json({
          msg:"user not found"
        })
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
} catch (err) {
  res.json({
    success:false,
    err:err.message
  })
}
};

// update User Role -- Admin
exports.updateUserRole = async (req, res, next) => {
try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
} catch (err) {
  res.json({
    err:err.message
  })
}
};

// Delete User --Admin
exports.deleteUser = async (req, res, next) => {
 try {
   const user = await User.findById(req.params.id);
 
   if (!user) {
     return next(
       res.json({
         msg:"user not found"
       })
     );
   }
 
   const imageId = user.avatar.public_id;
 
   await cloudinary.v2.uploader.destroy(imageId);
 
   await user.remove();
 
   res.status(200).json({
     success: true,
     message: "User Deleted Successfully",
   });
 } catch (err) {
  res.json({
    err:err.message
  })
 }
};

