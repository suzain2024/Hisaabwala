//this page is used for user registration,new registration,login user,update the user,check
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";//for encrypting the password


export const registerControllers=async(req,res,next)=>{
    try{
      const {name,email,password}=req.body;
      if(!name || !email || !password){//ech filds requires to be filled for registration
        return res.status(400).json({
            success:false,
            message:"Please enter all fields",
        });
      }
      let user=await User.findOne({email});
      if(user){//if user already exists
        return res.status(409).json({
            success:false,
            message:"User already exists",
        });
      }
      const salt=await bcrypt.genSalt(10);//hashed method i.e bcrypt for encryption of the password
      const hashedPassword=await bcrypt.hash(password,salt);
      let newUser=await User.create({
        name,
        email,
        password:hashedPassword,
      });
      return res.status(200).json({//when new user is created with all fields
        success:true,
        message:"User Created Successfully",
        user:newUser
      })
    }
    catch(err){//when there is an error
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }
}

export const loginControllers=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)//while login if any of them is missing then user need to refill the details
        {
            return res.status(400).json({
                success:false,
                message:"Please enter each field",
            });
        }
        const user=await User.findOne({email});
        if(!user)//if user not found
        {
            return res.status(401).json({
                success:false,
                message:"User not exists",
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);//for checking the existing password with the password user typed
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Please enter valid details",
            });
            
        }
        delete user.password;
            return res.status(200).json({
                success:true,
                message:`Welcome back,${user.name}`,
            });
    }
    catch(err){//for handling the error
        return res.status(500).json({
         success:false,
         message:err.message,
        });
    }
}
//for setting the profile image of the user
export const setAvatarController=async(req,res,next)=>{
    try{
    const userId=req.params.id;//get user id
    const imageData=req.body.image;//get image of the user
    const userData=await User.findByIdAndUpdate(userId,{
    isAvatarImageSet:true,
    avatarImage:imageData,
    },{new:true});
    return res.status(200).json({
        isSet:userData.isAvatarImageSet,
        image:userData.avatarImage,
    });
    }
    catch(err){//for handling the error
    next(err);
    }
}

//get all the users except the requester
export const allUsers = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "name",
            "avatarImage",
            "_id",
        ]);

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}