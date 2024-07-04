import Task from '../Models/task.js';

export async function deletetask(req, res) {
  try {
    const taskId = req.params.taskId;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in deleting task",
      success: false,
    });
  }
}
