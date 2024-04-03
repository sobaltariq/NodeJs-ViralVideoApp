const express = require("express")

const { authChecker, apiKeyMiddleware } = require("../middleware/authChecker");
const path = require('path');

const {
    getAllData,
    addData,
    editData,
    deleteData,
} = require("../controller/dataController");

const router = express.Router();

// post data form
router.get("/form", (req, res, next) => {
    const indexPath = path.join(__dirname, '../../public/index.html');
    res.sendFile(indexPath);
})

// get all html
router.get("/get-all", (req, res, next) => {
    const allPath = path.join(__dirname, '../../public/getAllData.html');
    res.sendFile(allPath);
})

// edit one html
router.get("/edit-one/:id", (req, res, next) => {
    const allPath = path.join(__dirname, '../../public/editOne.html');
    res.sendFile(allPath);
})

// to get data
router.get("/get", apiKeyMiddleware, getAllData);

// to add data
router.post("/add-video", addData);

// to edit data
router.put("/edit/:id",apiKeyMiddleware, editData)

// to delete data
router.delete("/delete/:id",apiKeyMiddleware, deleteData)

module.exports = router;