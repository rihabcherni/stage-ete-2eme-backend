const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const logger = require('./middleware/logger');
const multer = require('multer');
const path = require('path');

const Message = require('./models/messageModel');

const authRoutes = require('./routes/authRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const orderRoutes = require('./routes/orderRoutes');
const trainRoutes = require('./routes/trainRoutes');
const wagonRoutes = require('./routes/wagonRoutes');
const capteurRoutes = require('./routes/capteurIotRoutes');
const messageRoutes = require('./routes/messageRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const { User } = require('./models/userModel');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/wagon', wagonRoutes);
app.use('/api/capteur', capteurRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/shipment', shipmentRoutes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
  }
});

// Set up multer for file upload
const upload = multer({ storage: storage });
app.post('/upload-photo', upload.single('photo'), async (req, res) => {
  try {
      const userId = req.body.userId;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      // Save the photo path to the database
      user.photo = `/uploads/${req.file.filename}`;
      await user.save();

      res.status(200).json({ message: 'Photo uploaded successfully', photoPath: user.photo });
  } catch (error) {
      res.status(500).json({ error: 'Failed to upload photo' });
  }
});

app.use('/uploads', express.static('uploads'));

// Initialize connected users
const connectedUsers = {};

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Register the user with their socket ID
  socket.on('register', (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket id ${socket.id}`);
  });

  // Load last 10 messages
  Message.find().sort({ timestamp: -1 }).limit(10).exec().then(messages => {
    socket.emit('receiveMessage', { history: messages.reverse() });
  }).catch(err => console.error(err));

  // Handle private messages
  socket.on('privateMessage', async ({ senderId, receiverId, message }) => {
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();

    if (connectedUsers[receiverId]) {
      io.to(connectedUsers[receiverId]).emit('receiveMessage', newMessage);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    for (let [userId, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
