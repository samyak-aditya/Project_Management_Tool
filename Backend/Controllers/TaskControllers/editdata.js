import Task from '../Models/task.js';

export async function editdata(req, res) {
  try {
    const taskId = req.params.taskId;
    const { title, priority, checklist, status, dueDate } = req.body;

    if (!taskId || !title || !priority || !status || !checklist) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }

    const taskDetails = await Task.updateOne(
      { _id: taskId },
      {
        $set: {
          title,
          priority,
          checklist,
          status,
          dueDate,
        },
      }
    );

    if (taskDetails.nModified === 0) {
      return res.status(404).json({
        message: "Task not found or no changes made",
        success: false,
      });
    }

    res.json({
      message: "Task details updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
