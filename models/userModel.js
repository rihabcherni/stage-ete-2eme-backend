const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['administrateur', 'client', 'conducteur', 'operateur'], required: true },
    company: { type: String, required: function() { return this.role === 'client'; } }, // Add this line
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    ville: { type: String, default: '' },
    date_of_birth: { type: Date, default: null },
    is_verified: { type: Boolean, default: false },
    is_accepted: { type: Boolean, default: false },
    photo: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

// Generate Auth Token
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);

const otpSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otp: { type: String, required: true }
});

const OneTimePassword = mongoose.model('OneTimePassword', otpSchema);

module.exports = { User, OneTimePassword };