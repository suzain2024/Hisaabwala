//this model is used for creating the schema of the user i.e name,email,password and also encrypt the password
import mongoose from "mongoose";
import validator from "validator";//checks whether user enters valid detail if not ask user to do it i.e avoid malicious data to maintail data integrity
import jwt from "jsonwebtoken";//for securely authentication of user i.e ask the client to save the detail in local storage or cookies & when needed then generates 
import bcrypt from "bcrypt";
import { type } from "os";
import Transaction from "./TransactionModel.js";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],

    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Minimum length should be 6"],
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
    transactions:{
        type:[],
    },
    createdAt:{
        type: Date, default: Date.now 
    }
});

// User Schema Model - (Name, email, password, creation Date) with validation rules


const User = mongoose.model("User", userSchema);

export default  User;