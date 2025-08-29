import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username: req.body.username, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// 👇 this fixes your "default export" error
export default router;
