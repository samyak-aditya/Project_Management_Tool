import express from 'express';
import User from '../Models/user.js';


export const getAllEmail=  async (req, res) => {
    console.log('getAllEmail');
    try {
      const users = await User.find({}, 'email'); // Fetch only the email field
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
    }
  };

