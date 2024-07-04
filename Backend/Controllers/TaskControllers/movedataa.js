import Task from '../Models/task.js';

export async function movedata(req, res) {
  try {
    const taskId = req.params.taskId;
    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json({
      message: "Task moved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error moving task",
      success: false,
    });
  }
}
