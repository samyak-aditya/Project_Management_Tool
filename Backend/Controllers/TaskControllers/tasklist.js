import Task from '../Models/task.js';

export async function checklist(req, res) {
  try {
    const taskId = req.params.taskId;
    const itemId = req.params.itemId;
    const { selected } = req.body;

    if (!taskId || !itemId || selected === undefined) {
      return res.status(400).json({
        message: "Bad Request. Please provide taskId, itemId, and selected status.",
        success: false,
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, "checklist._id": itemId },
      { $set: { "checklist.$.selected": selected } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task or checklist item not found",
        success: false,
      });
    }

    res.json({
      task: updatedTask,
      message: "Checklist item updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
}
