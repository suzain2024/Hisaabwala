//this router defines the routes for the transaction in ur expense system
import express from 'express';//which makes code modular and clean
import { addTransactionController,deleteTransactionController,getAllTransactionController,updateTransactionController } from '../controllers/transactionController.js';
const router=express.Router();
router.route("/addTransaction").post(addTransactionController);//for adding new transaction
router.route("/deleteTransaction/:id").post(deleteTransactionController);//deleting available transaction
router.route("/getTransaction").post(getAllTransactionController);//get all the transaction detail
router.route("/updateTransaction/:id").put(updateTransactionController);//update the transactions
export default router;