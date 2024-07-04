import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

// Define schema for user team
const userTeamSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model if you have one
    required: true
  },
  teamMembers: [{
    type: String // Store email addresses directly as strings
  }]
});

// Create model from schema
const UserTeam = model('UserTeam', userTeamSchema);

export default UserTeam;
