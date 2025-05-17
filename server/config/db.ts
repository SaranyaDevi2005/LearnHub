import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Use environment variable or default to localhost MongoDB connection
    const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnhub';
    
    const conn = await mongoose.connect(dbUri);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    
    // Fallback to in-memory storage if MongoDB connection fails
    console.log('Using in-memory storage instead.');
  }
};
