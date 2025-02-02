import connectDB from '../lib/mongodb';

// התחברות למסד הנתונים בעת אתחול האפליקציה
console.log('🔄 Initializing MongoDB connection...');
connectDB()
  .then(() => console.log('✅ MongoDB initialized successfully'))
  .catch(error => console.error('❌ MongoDB initialization error:', error));

export default function init() {
  // פונקציה ריקה - החיבור כבר בוצע
} 