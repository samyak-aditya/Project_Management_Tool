import Task from '../Models/task.js';

export async function taskdes(req, res) {
  try {
    const taskId = req.params.taskId;

    const taskDetails = await Task.findById(taskId);

    if (!taskDetails) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(taskDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
}
