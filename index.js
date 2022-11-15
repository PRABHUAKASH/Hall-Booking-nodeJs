const express = require("express");
const hallBookingRouter = require ('./router/hallBookingRouter');
const mongo = require('./connect');
const dotenv=require("dotenv");

dotenv.config();
mongo.connect();

const app = express();
app.use(express.json());

app.use("/",(req,res,next) =>{
    console.log("came first");
    var auth = {
        
        Authorised : true
        
    }
    if(auth.Authorised){
        console.log("authorised");
        next();
    }else{
        console.log("Not authorised");
        res.send({"msg" : "Not Authorised"});
    }
});
app.use("/hallbooking",hallBookingRouter);

app.listen(3001);