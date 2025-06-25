import mongoose from "mongoose";//mongoose is NodeJs library used for developing the schema of the transaction to interact with mongodb
//as mongodb is nosql so dont have table so for real-world app we need this and models is used for performing crud operation

const transactionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"True is required"],
        trim:true,
    },
    date:{
        type:Date,
        required:[true,"Date is required"],
    },
    amount:{
     type:Number,
     required:[true,"Amount is required"],
     default:0,
    },
    category:{
        type:String,
        required:[true,"Category is required"],
    },
   description:{
    type :String,
    required:[true,"Description is required"],
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
   },
   transactionType:{
   type:String,
   required:[true,"Transaction type is required"]
   },
   createdAt:{
   type:Date,
   default:new Date(),
   }
});


const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;