import Task from "../Models/task.js";
import User from "../Models/user.js";

export const saveSelectedEmails = async (req, res) => {
  try {
    const { userId, selectedEmails } = req.body;

    // Find the logged-in user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve User ObjectId for each selected email
    const users = await User.find({ email: { $in: selectedEmails } });
    const assignedToIds = users.map(user => user._id);

    // Example of saving selected emails with the user's ID in Task model
    const task = new Task({
      title: "Example Task", // Replace with actual task details
      priority: {
        label: "High Priority", // Replace with actual priority details
        color: "#ff0000",
        typeOfPriority: "high",
      },
      checklist: [], // Adjust as per your schema
      dueDate: new Date(), // Replace with actual due date
      status: "todo", // Replace with actual status
      refUserId: userId, // Assign the logged-in user's ID
      assignedTo: assignedToIds, // Assign selected users
    });

    await task.save();

    res.json({ message: "Selected emails saved successfully", success: true });
  } catch (error) {
    console.error("Error saving selected emails:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
