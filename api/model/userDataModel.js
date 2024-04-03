const mongoose = require("mongoose");

const userData = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("UserData", userData);