import User from '../Models/user.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt';

dotenv.config();

export async function registerr(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    const userResponse = await userData.save();

    const token = jwt.sign(
      { userId: userResponse._id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: "User successfully registered",
      token,
      username: name,
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
