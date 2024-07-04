import UserTeam from "../Models/UserTeam.js"; // Assuming your Mongoose model is defined as UserTeam

export const addUsers = async (req, res) => {
  const { userId, selectedEmails } = req.body;

  try {
    // Assuming userId is the ID of the user performing the action
    const team = await UserTeam.findOneAndUpdate(
      { userId: userId }, // Find the team document based on userId
      { $addToSet: { teamMembers: { $each: selectedEmails } } }, // Add selectedEmails to teamMembers array if not already present
      { new: true, upsert: true } // Options to return updated document and create if not exists
    );

    res.status(201).json({ success: true, message: 'Users added to team successfully', team });
  } catch (error) {
    console.error('Error adding users to team:', error);
    res.status(500).json({ success: false, message: 'Failed to add users to team' });
  }
};
