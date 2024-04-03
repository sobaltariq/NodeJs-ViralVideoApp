const userModel = require("../model/userDataModel");
// for env
require('dotenv').config();


const authChecker = async (req, res, next) => {
    try {
        await userModel.findOne({ name: process.env.USER_NAME, password: process.env.USER_PASSWORD }).then((data) => {
            if (data) {
                console.log("userExist auth check");
                next();
            } else {
                console.log("userNotExist");
                res.status(401).json({
                    message: "userNotExist"
                })
            }
        });
    } catch (err) {
        res.json({
            error: "Something went wrong when checking auth"
        })
    }


}

// ############ for making secure ############
const apiKey = 'your-api-key';

// Middleware to check the API key in headers
const apiKeyMiddleware = (req, res, next) => {
    const clientApiKey = req.headers['x-api-key'];

    if (clientApiKey && clientApiKey === apiKey) {
        // API key is valid
        next();
    } else {
        // API key is missing or invalid
        res.status(401).json({
            error: "Unauthorized",
            message: "Invalid API key",
        });
    }
};
// ###############

module.exports = {
    authChecker,
    apiKeyMiddleware
};