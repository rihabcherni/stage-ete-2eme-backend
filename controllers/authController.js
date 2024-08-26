const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, OneTimePassword } = require('../models/userModel');
const { registerSchema, loginSchema } = require('../validation/userValidation');

const nodemailer = require('nodemailer');

// Generate OTP
function generateOTP() {
  return Math.floor(10000 + Math.random() * 90000).toString(); // 6-digit OTP
}

// Send OTP via email
async function sendOTPEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// Register User
exports.registerUser = async (req, res) => {
  // Validate request data
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password, first_name, last_name, role, phone, address, ville, date_of_birth, is_verified,is_accepted, photo, company } = req.body;
  
  try {
    let userData = {
      email,
      password,
      first_name,
      last_name,
      role,
      phone,
      address,
      ville,
      date_of_birth,
      is_verified,
      is_accepted,
      photo
    };

    // Add company field if role is client
    if (role === 'client') {
      userData.company = company;
    }

    let user = new User(userData);

    await user.save();

    // Generate OTP
    const otp = generateOTP();
    const otpRecord = new OneTimePassword({ user: user._id, otp });
    await otpRecord.save();

    // Send OTP via email
    await sendOTPEmail(email, otp);

    res.status(201).send('User registered successfully. OTP sent to email.');
  } catch (err) {
    console.error(err.message);
    if (err.code === 11000) { // Check for duplicate key error
      const keyValue = Object.values(err.keyValue)[0];
      res.status(400).json({ error: `The email '${keyValue}' is already in use.` });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const otpRecord = await OneTimePassword.findOne({ user: user._id, otp });
    if (!otpRecord) return res.status(400).send('Invalid or expired OTP');

    user.is_verified = true;
    await user.save();

    // Remove the used OTP
    await OneTimePassword.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'Account verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
// Login User
exports.loginUser = async (req, res) => {
    // Validate request data
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body;
    try{
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
          return res.status(400).send('Invalid email or password');
      }
      const token = user.generateAuthToken();
      res.send({
        token,
        user: {
            role: user.role,
            full_name: user.first_name + ' '+ user.last_name,
            email: user.email,
            userId: user._id
        }
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    // Send OTP or reset link logic here...
    res.send('Password reset instructions sent');
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { otp, newPassword } = req.body;
    // Reset password logic here...
    res.send('Password reset successfully');
};

// Update Password
exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;
    if (!(await user.comparePassword(currentPassword))) {
        return res.status(400).send('Current password is incorrect');
    }
    user.password = newPassword;
    await user.save();
    res.send('Password updated successfully');
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    const user = req.user;
    res.send(user);
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    const user = req.user;
    Object.assign(user, req.body);
    await user.save();
    res.send('Profile updated successfully');
};

// Get User Roles
exports.getUserRoles = async (req, res) => {
    const user = req.user;
    res.send({ roles: user.role });
};

// Logout User
exports.logoutUser = async (req, res) => {
    // Logic to handle logout
    res.send('User logged out successfully');
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get Clients
exports.getClients = async (req, res) => {
  try {
      const clients = await User.find({ role: 'client' });
      res.send(clients);
  } catch (error) {
      console.error("Error fetching clients:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};

// Get Operators
exports.getOperators = async (req, res) => {
  try {
      const operators = await User.find({ role: 'operateur' });
      res.send(operators);
  } catch (error) {
      console.error("Error fetching operators:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};

// Get Administrators
exports.getAdministrators = async (req, res) => {
  try {
      const administrators = await User.find({ role: 'administrateur' });
      res.send(administrators);
  } catch (error) {
      console.error("Error fetching administrators:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};

// Get Conductors
exports.getConductors = async (req, res) => {
  try {
      const conductors = await User.find({ role: 'conducteur' });
      res.send(conductors);
  } catch (error) {
      console.error("Error fetching conductors:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};
