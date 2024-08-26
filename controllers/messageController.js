const Message = require('../models/messageModel');
const { User } = require('../models/userModel');

exports.createMessage = async (req, res) => {
  const { user, role, message } = req.body;
  const newMessage = new Message({ user, role, message });
  await newMessage.save();
  res.send({ success: true, message: newMessage });
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
};

exports.getAllUsersChat = async (req, res) => {
  try {
    const users = await User.find({}, 'first_name last_name photo role _id');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};