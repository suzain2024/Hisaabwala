//this is the backend which performs add,delete,update,get transaction for performing crud operations in the transaction
import  transaction  from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import moment from "moment";


export const addTransactionController=async(req,res)=>{
    try{
        const{ //attributes of a transaction
            title,
            transactionType,
            date,
            amount,
            category,
            description,
            userId,
        }=req.body;
        if(!title||//if any of the field is not field its required to be filled
            !category||
            !description||
            !date||
            !transactionType||
            !userId||
            !amount)
        
       {
     return res.status(400).json({
        success:false,
        message:"Please fill each fields",
    });
  }
  const user=await User.findById(userId);
  if(!user)//if user is not there then simply display message that user not found
  {
    return res.status(400).json({
        success:false,
    message:"User not found",
    });
    
  }
  let newTransaction=await Transaction.create({//for new transaction to be added with these fields
    title:title,
    amount:amount,
    transactionType:transactionType,
    description:description,
    date:date,
    user:userId,
    date:date,
  });
  user.transactions.push(newTransaction);
  user.save();
  return res.status(200).json({
    success:true,
    message:"Transaction added Successfully"
  });
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message,
        });
    }
};
//for getting all the transaction detail
export const getAllTransactionController=async(req,res)=>{
    try{
        const {userId,type,frequency,startDate,endDate}=req.body;
        console.log(userId,type,frequency,startDate,endDate);
        const user=await User.findById(userId);
        if(!user)
        {
            res.status(400).json({
                success:false,
                message:"user not found",
            });
        }
        const query={
            user:userId,
        };
        if(type!=='all')//when transaction type='all
        {
            query.transactionType=type;
        }
        if(frequency!=='custom')//then count the frequency
        {
            query.date={
                $gt:moment().subtract(Number(frequency),"days").toDate()
            };
        }
        else if(startDate && endDate){//if transaction has both start and end date then get both
           query.date={
             $gte:moment(startDate).toDate(),
             $gte:moment(endDate).toDate(),
           };
        }
    
    const transactions=await Transaction.find(query);//found transaction then true
    return res.status(200).json({
       success:true,
       transactions:transactions, 
    });
    }
    catch(err){//if error exists
return res.status(401).json({
      success: false,
      messages: err.message,
    });
    }
}; 
export const deleteTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const transactionElement = await Transaction.findById(transactionId);

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Remove the transaction from user's array
    user.transactions = user.transactions.filter(
      (transaction) => transaction.toString() !== transactionId.toString()
    );

    await user.save(); // Save updated user

    await Transaction.findByIdAndDelete(transactionId); // Delete the transaction

    return res.status(200).json({
      success: true,
      message: "Transaction successfully deleted",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

//for updation of the transaction
export const updateTransactionController=async(req,res)=>{
    try{
        const transactionId=req.params.id;
        const {title,amount,date,description,transactionType,category}=req.body;
        console.log(title,date,description,amount,category,transactionType);
        const transactionElement=await Transaction.findById(transactionId);
        if(!transactionElement){
            return res.status(400).json({
                success:false,
                message:'transaction not found',
            });
           
        }
         if(title)
                transactionElement.title=title;
            if(category)
                 transactionElement.category=category;
            if(date)
                transactionElement.date=date; 
            if(description)
                transactionElement.description=description;
            if(amount)
                 transactionElement.amount=amount; 
            if(transactionType)
                 transactionElement.transactionType=transactionType; 
                await transactionElement.save();
                return res.status(200).json({
                    success:true,
                    message:`Transaction updated successfully`,
                }); 
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message,
        });
    }

};