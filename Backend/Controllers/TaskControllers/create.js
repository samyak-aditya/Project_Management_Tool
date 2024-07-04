import Task from '../Models/task.js';

export async function createe(req,res) {
    try{
        const { title, priority, checklist, dueDate, status } = req.body;

        if(!title || !priority || !checklist) {
            return res.status(401).json({
              message: "Bad Request!",
              success: false,
            });
        }
        const taskDetails = new Task({
            title,
            priority,
            checklist,
            dueDate, 
            status,
            refUserId: req.body.userId,
          });
      
          await taskDetails.save();
          res.json({
            message: "Task added successfully",
            success: true,
          });

    }catch(error){
        res.status(400).json({
            message: "Something went wrong, please! try again later",
            success: false,
          });
    }
}