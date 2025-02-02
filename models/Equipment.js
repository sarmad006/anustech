import mongoose from 'mongoose';

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

// בדיקה אם המודל כבר קיים
export default mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema); 