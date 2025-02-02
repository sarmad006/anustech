const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
    console.log('Admin user already exists');
    return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create admin user
    const adminUser = new User({
    email: adminEmail,
    password: hashedPassword,
    isAdmin: true
    });

    await adminUser.save();
    console.log('Admin user created successfully');
} catch (error) {
    console.error('Error creating admin user:', error);
}
}

module.exports = { createAdminUser, User };

