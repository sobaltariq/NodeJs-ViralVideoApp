const mongoose = require("mongoose");
const youTubeDataModel = require("../model/youTubeDataModel");
const userDataModel = require("../model/userDataModel");


// // get all data
// const getAllData = (req, res, next) => {
//     try {
//         youTubeDataModel.find().then((data) => {
//             res.status(200).json({
//                 total: data.length,
//                 data: data
//             })
//         }).catch((err) => {
//             console.log("Error", err);
//             res.status(500).json({
//                 error: "Error while finding all Videos"
//             })
//         })
//     } catch (err) {
//         console.log("Something went wrong when getting all videos");
//     }
// }

// get and show latest data first
const getAllData = (req, res, next) => {
    try {
        youTubeDataModel.find().sort({ _id: -1 }).then((data) => {
            res.status(200).json({
                total: data.length,
                data: data
            });
        }).catch((err) => {
            console.log("Error", err);
            res.status(500).json({
                error: "Error while finding all Videos"
            });
        });
    } catch (err) {
        console.log("Something went wrong when getting all Videos");
    }
};

// add data
const addData = async (req, res) => {
    try {
        console.log("body:", req.body);
        const newYouTubeDataModel = new youTubeDataModel({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            videoId: req.body.videoId,
            url: req.body.url,
            category: req.body.category,
            countries: req.body.countries,
        });
        urlExist = await youTubeDataModel.findOne({ url: req.body.url });
        if (!urlExist) {
            newYouTubeDataModel
                .save()
                .then((data) => {
                    console.log("Data Saved");
                    res.status(201).json({
                        message: "Data Saved",
                        data: newYouTubeDataModel,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(501).json({
                        error: "Something went wrong when saving Data",
                        message: 'Please Fill All The Fields'
                    });
                });
        } else {
            res.status(404).json({
                message: "video url already exists"
            })
        }


    } catch (err) {
        res.status(501).json({
            error: "Internal server error when inserting Data" + err,
        });
        console.log(err.message);
    }
}


// delete data
const deleteData = async (req, res, next) => {
    const userId = req.params.id
    console.log(`delete ${userId}`);

    try {
        youTubeDataModel.findByIdAndDelete(userId).then((data) => {
            if (data) {
                res.status(200).json({
                    message: "deleted"
                })
            } else {
                res.status(404).json({
                    message: "Student not found"
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Error while deleting one Data"
            })
        })

    } catch (err) {
        console.log("Something went wrong when deleting Data" + err);
    }
}


// edit data
const editData = (req, res, next) => {
    const userId = req.params.id
    console.log(`Put: ${userId}`);

    try {
        const updatedData = {
            $set: {
                title: req.body.title,
                videoId: req.body.videoId,
                url: req.body.url,
                category: req.body.category,
                countries: req.body.countries
            }
        }
        // const updatedStudent = { $set: req.body }
        // const updatedStudent = req.body
        youTubeDataModel.findByIdAndUpdate({ _id: userId }, updatedData, { new: true }).then((data) => {
            if (data) {
                console.log("Data Updated Successfully");
                res.status(200).json({
                    message: "Data Updated Successfully",
                    data: data
                })
            }
            else {
                console.log("Data Updated Successfully");
                res.status(404).json({
                    message: "Data not found"
                })
            }
        }).catch((err) => {
            res.status(500).json({
                error: "Error while updating one Data"
            })
        })

    } catch (err) {
        console.log("Something went wrong when updating one Data" + err);
    }

}


module.exports = {
    getAllData,
    addData,
    deleteData,
    editData
}