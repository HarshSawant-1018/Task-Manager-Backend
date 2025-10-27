const express = require("express");
const {protect , adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserdashboarddata, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updatetaskChecklist } = require("../controllers/taskController");

const router = express.Router();

// Task management routes

router.get("/dashboard-data",protect, getDashboardData);
router.get("/user-dashboard-data",protect, getUserdashboarddata);
router.get("/",protect, getTasks); // Get all tasks (admin: all, user: assigned)
router.get("/:id",protect, getTaskById); 
router.post("/",protect, adminOnly, createTask); //Create a task(admin only)
router.put("/:id",protect, updateTask); //update task details
router.delete("/:id",protect, adminOnly,deleteTask); //delete task admin only
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo",protect, updatetaskChecklist);

module.exports = router;