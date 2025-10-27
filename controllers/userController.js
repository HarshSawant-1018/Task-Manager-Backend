const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcrypt");

//@desc Get all users (Admin Only)
//@route GET /api/users/
//@access Private (Admin)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({role: "member"}).select("-password");

        //Add task count to each user
        const userWithTaskCounts = await Promise.all(
            users.map( async (user) => {
                const pendingTasks = await Task.countDocuments({
                    assignedTo : user._id,
                    status: "Pending",
                });

                const inProgressTasks = await Task.countDocuments({
                    assignedTo : user._id,
                    status: "In Progress",
                });

                const completedTask = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Completed",
                });

                return {
                    ...user._doc, //Include all existing user data 
                    pendingTasks,
                    inProgressTasks,
                    completedTask,
                };
            })
        );
         res.status(200).json(userWithTaskCounts);
        
    } catch (error) {
        res.status(500).json({ message:"server error", error: error.message});
    }
};

//@desc Get user by ID 
//@route /api/users/:id
//@access Private
const getUserById = async (req, res) => {
    try {
        const user =  await User.findById(req.params.id).select("-password");
        if(!user){
           return  res.status(404).json({ message: "User not found"})
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message:"server error", error: error.message});
    }
};

//@desc Delete user by id (admin only )
//@route delete /api/users/:id
//@access Private (Admin)
const deleteUser = async (req, res) => {
try {
        
    } catch (error) {
        res.status(500).json({ message:"server error", error: error.message});
    }
};

module.exports = {getUserById,  getUsers}
    