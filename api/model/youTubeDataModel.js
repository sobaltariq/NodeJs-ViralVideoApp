const mongoose = require("mongoose");

const youTubeDataModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    countries: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("YouTubeData", youTubeDataModel);