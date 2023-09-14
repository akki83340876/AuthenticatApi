const express = require("express")
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");
 require('./config/connection'); 
require('dotenv').config();
const registerRouter = require('./routes/register.router');
const app = express();

// Add body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/',registerRouter);

app.listen(3001,()=>{
    console.log("Server Started at link http://loacalhost:3001");
});
