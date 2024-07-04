import express from 'express';
const router = express.Router();
import Task from '../Models/task.js'; // Import Task model
import UserTeam from '../Models/UserTeam.js'; // Import UserTeam model
import User from '../Models/user.js'; // Import User model if you have one

export const emailSuggestion = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    let emails = [];

    if (q) {
      // Find users matching the email query
      const users = await User.find({ email: { $regex: new RegExp(q, 'i') } }, 'email');

      // Extract emails from the matched users
      emails = users.map(user => user.email);
    }

    res.json(emails);
  } catch (err) {
    console.error('Error fetching email suggestions:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

  
  

  export const assignTask = async (req, res) => {
    const { taskId, email } = req.body; // Assuming taskId is sent from frontend
  
    try {
      // Find user team by email
      const userTeam = await UserTeam.findOne({ teamMembers: email });
  
      if (!userTeam) {
        return res.status(404).json({ message: 'User team not found' });
      }
  
      // Update task with assigned user team ID
      const updatedTask = await Task.findByIdAndUpdate(taskId, { refUserTeamId: userTeam._id }, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task assigned successfully' });
    } catch (error) {
      console.error('Error assigning task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export default router;
