import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in environment variables');
}

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      console.log('✅ Using existing MongoDB connection');
      return this.connection;
    }

    try {
      const options = {
        bufferCommands: false,
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 30000, // Increased from 5000
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000, // Added this
        keepAlive: true, // Added this
      };

      console.log('🔄 Connecting to MongoDB...');
      mongoose.connection.on('connected', () => console.log('✅ MongoDB connected successfully'));
      mongoose.connection.on('error', (err) => console.error('❌ MongoDB connection error:', err));
      mongoose.connection.on('disconnected', () => console.log('❗ MongoDB disconnected'));

      const connection = await mongoose.connect(MONGODB_URI, options);
      this.connection = connection;
      return this.connection;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('✅ MongoDB disconnected successfully');
    }
  }

  getConnection() {
    return this.connection;
  }
}

// Create and export a singleton instance
const database = new Database();
export default database;