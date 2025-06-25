const morgan=require("morgan")
const express=require("express")
const colors=require("colors")
const dotenv=require("dotenv")
const cors=require()
//rest
const app=express()



app.use(morgan('dev'))
app.use(express.json()) //remembre require is used to bring code or import code from another file
app.use(cors())


const PORT=8087|| process.env.PORT;//either automatically port or fix port
//for database connectivity
const connectDB=require('.config/db');
connectDB();
dotenv.config({path:'./config/config.env'});//config makes our code clean,flexible and reusable
const transactions=require('./routes/transactions');
 if(process.env.NODE_ENV==='development')//the mode can be either in development mode for testing or coding or
 //  for production when app is live for users
 {
    app.use(morgan('dev')); //in development mode
 }
 
 app.use('/api/v1/transactions',transactions);//if the path is this then it send the request to transaction to handle it
if(process.env.NODE_ENV==='production'){  //it means app is live on internet
    app.use(express.static('client/build'));//serves static file based on html,css from react builder app
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));//if anyone reaches any page then let them handle index.html i.e main page file
}

//app.listn listen the request from server like restraunt until the door opens no one can make request 

app.listen(PORT,console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
