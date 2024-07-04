import Task from '../Models/task.js';

export async function analytics(req, res) {
  try {
    const userId = req.body.userId;
    const analyticData = {};

    // Count tasks with different statuses
    analyticData.backlogCount = await Task.countDocuments({
      refUserId: userId,
      status: "backlog",
    });

    analyticData.todoCount = await Task.countDocuments({
      refUserId: userId,
      status: "todo",
    });

    analyticData.progressCount = await Task.countDocuments({
      refUserId: userId,
      status: "progress",
    });

    analyticData.completedCount = await Task.countDocuments({
      refUserId: userId,
      status: "done",
    });

    // Count tasks based on priority
    analyticData.lowCount = await Task.countDocuments({
      refUserId: userId,
      "priority.typeOfPriority": "low",
      status: { $ne: "done" },
    });

    analyticData.moderateCount = await Task.countDocuments({
      refUserId: userId,
      "priority.typeOfPriority": "medium",
      status: { $ne: "done" },
    });

    analyticData.highCount = await Task.countDocuments({
      refUserId: userId,
      "priority.typeOfPriority": "high",
      status: { $ne: "done" },
    });

    // Count tasks with due dates where status is not done
    analyticData.dueDateNotDoneCount = await Task.countDocuments({
      refUserId: userId,
      status: { $ne: "done" },
      dueDate: { $exists: true },
    });

    res.json({
      data: analyticData,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching analytics data",
      success: false,
    });
  }
}
