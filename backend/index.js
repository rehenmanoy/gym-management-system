const express = require('express');
const http = require('http');
const mongoose = require("mongoose");
const bcrypt =require("bcrypt");
const bodyParser =require("body-parser");
const cors=require('cors');

//route inititializations
const admin = require('./routes/adminroute')
const user = require('./routes/userroute')


var app = express();
var server = http.createServer(app);

const port = process.env.PORT || 5550;

mongoose.Promise = global.Promise;
//live
mongoose.connect('mongodb+srv://rehenmanoy:wadproject@mircroproject.9t5hp.mongodb.net/?retryWrites=true&w=majority&appName=mircroproject',

    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("DataBase connected.");
        console.log("Fetched Live Data.")
    },
        err => {

            console.log("db connection error");
            console.log(err)
        });

app.use(cors());    
app.use(express.json());
app.use(bodyParser.json({limit:'150mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'150mb'}));
app.use('/admin',admin)
app.use('/user',user)

server.listen(port, () => {
    console.log(`Server with ws capability running on port ${port}`);
    console.log("Database Connection Initiated")
});