import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// הגדרת __dirname עבור ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// טעינת משתני הסביבה
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error('❌ Missing MONGO_URI environment variable');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// סכמה של הציוד
const equipmentSchema = new mongoose.Schema({
  modelNumber: String,
  licenseNumber: String,
  lastMaintenance: Date,
  nextMaintenance: Date,
  status: String,
  location: String,
  heightLimit: String,
  operator: String,
  notes: String
}, {
  collection: 'bamot',
  timestamps: true,
  strict: false
});

const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);

async function initServer() {
  try {
    // התחברות למונגו
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'equipmentdb'
    });

    console.log('✅ MongoDB Connected');

    // API Routes
    app.get('/api/equipment', async (req, res) => {
      try {
        const equipment = await Equipment.find()
          .sort({ createdAt: -1 })
          .lean()
          .exec();
        
        console.log(`✅ Found ${equipment.length} items`);
        res.json(equipment);
      } catch (error) {
        console.error('❌ GET Error:', error);
        res.status(500).json({ 
          error: 'שגיאה בטעינת הנתונים',
          details: error.message 
        });
      }
    });

    app.post('/api/equipment', async (req, res) => {
      try {
        const equipment = new Equipment(req.body);
        const result = await equipment.save();
        
        console.log('✅ Saved successfully:', result);
        res.status(201).json(result);
      } catch (error) {
        console.error('❌ POST Error:', error);
        res.status(500).json({ 
          error: 'שגיאה בשמירת הציוד',
          details: error.message 
        });
      }
    });

    // Health check
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK',
        mongo: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
      });
    });

    // הפעלת השרת
    app.listen(PORT, () => {
      console.log(`✅ API Server running on port ${PORT}`);
      console.log(`🔗 Health check at http://localhost:${PORT}/health`);
    });
    
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    process.exit(1);
  }
}

// טיפול בשגיאות לא מטופלות
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

// ניקוי בעת סגירת האפליקציה
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
});

// הפעלת השרת
initServer();

export default app;
