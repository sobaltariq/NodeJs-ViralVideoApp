const express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
const { default: mongoose } = require("mongoose");

const myRouter = require('./api/router/myRouter');


// for env
require('dotenv').config()

const app = express();

// to use json data (post request data) it display data from body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// for mongo db
mongoose.connect("mongodb://localhost:27017/MyApp")
    .then(() => {
        console.log("Mongoose is connected");
    }).catch(() => {
        console.log("Error to connect mongoose");
    })

app.use("/", myRouter);

app.use((req, res) => {
    res.status(404).json({
        error: "Page Not Found",
    });
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`server is connected ${process.env.PORT}`);
})


// npm init
// npm i express mongoose body-parser bcrypt jsonwebtoken nodemon
// npm install mongodb  to connect with mongodb