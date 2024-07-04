import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../Models/user.js'; // Ensure you have the correct path to your User model

dotenv.config();

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Bad Request! Invalid Credentials",
        success: false,
      });
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const token = jwt.sign({ userId: userDetails._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({
      message: "User logged in successfully",
      token: token,
      username: userDetails.name,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  }
}
