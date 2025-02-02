import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  Model: String,
  Id: Number,
  "Inspection Status": String,
  Location: String
}, { 
  strict: false,
  collection: 'bamot'
});

// בדיקה שהמודל לא מוגדר כבר
const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);

export default Equipment;