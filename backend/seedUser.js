import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    await User.deleteMany({});

    const user = new User({
      username: 'admin',       
      password: '123456',
    });

    await user.save();
    console.log('Default user created: admin / 123456');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUser();
