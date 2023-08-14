const Exceljs= require('exceljs');
const moment= require('moment');
const cookie= require("cookie");
const cookieParser= require("cookie-parser");
const express = require("express");
const app= express();
const path= require("path");
const port= process.env.PORT || 4000;
const cloudinary= require("cloudinary")



require("./db/conn")
//i am sourabh sahu full stack developer

const bodyParser = require("body-parser");
const fileUpload= require("express-fileupload")



const userRoute=require("./routes/userRoute");

app.use(cookieParser());
app.use(express.json());
var cors = require('cors')

app.use(cors()) 
app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: ['http://localhost:3001', 'http://localhost:3000']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())


app.use("/api/v1",userRoute);


cloudinary.config({
    cloud_name:"dntsvjwjl",
    api_key: 298219331878519,
    api_secret: "Z2QvUjAbSOKzLC5farSRnnJYbtM",
  });
  


app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})