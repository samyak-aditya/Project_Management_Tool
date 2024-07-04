import User from '../Models/user.js';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";

dotenv.config();

export async function supdate(req, res) {
  try {
    const userId = req.body.userId;
    const { name, password } = req.body;

    if (!name && (!password || !password.oldPassword || !password.newPassword)) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }

    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (name) {
      userDetails.name = name;
    }

    if (password && password.oldPassword && password.newPassword) {
      const isMatch = await bcrypt.compare(password.oldPassword, userDetails.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Old password is incorrect",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password.newPassword, 10);
      userDetails.password = hashedPassword;
    }

    await userDetails.save();
    res.json({
      message: "User information updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
