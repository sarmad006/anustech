const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./admin_user_setup');
require('dotenv').config();

router.post('/login', async (req, res) => {
try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
} catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
const token = req.cookies.token;
if (!token) {
    return res.redirect('/login');
}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
} catch (error) {
    res.redirect('/login');
}
};

router.get('/dashboard', authMiddleware, (req, res) => {
res.render('dashboard');
});

router.get('/logout', (req, res) => {
res.clearCookie('token');
res.redirect('/login');
});

module.exports = router;

