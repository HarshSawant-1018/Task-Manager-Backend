const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/",protect, adminOnly, getUsers);//Get all users 
router.get("/:id",protect, getUserById); //Get a specidfic user
//router.delete("/:id",protect,adminOnly,deleteUser); // delete A User (AdminOnly)

module.exports = router;