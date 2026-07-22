const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/al-sada', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema & Models
const whisperSchema = new mongoose.Schema({
  id: String,
  text: String,
  author: String, // anonymous ID
  journey: { type: Number, default: 0 },
  responses: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  respondedFirst: Boolean,
  myWhispers: [String], // array of whisper IDs
  listeningHistory: [String], // whisper IDs they listened to
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Whisper = mongoose.model('Whisper', whisperSchema);
const Session = mongoose.model('Session', sessionSchema);

// REST Routes
app.get('/api/whispers', async (req, res) => {
  try {
    const whispers = await Whisper.find().sort({ createdAt: -1 }).limit(50);
    res.json(whispers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/whispers', async (req, res) => {
  try {
    const { text, author } = req.body;
    const whisper = new Whisper({
      id: uuidv4(),
      text,
      author
    });
    await whisper.save();
    io.emit('whisper:new', whisper);
    res.json(whisper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/whispers/:id/respond', async (req, res) => {
  try {
    const { responderId } = req.body;
    const whisper = await Whisper.findByIdAndUpdate(
      req.params.id,
      { $inc: { journey: 1 }, $push: { responses: responderId } },
      { new: true }
    );
    io.emit('whisper:update', whisper);
    res.json(whisper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/session', async (req, res) => {
  try {
    const session = new Session({
      sessionId: uuidv4(),
      respondedFirst: false,
      myWhispers: [],
      listeningHistory: []
    });
    await session.save();
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('listen:start', async (data) => {
    const { sessionId, whisperId } = data;
    try {
      await Session.findOneAndUpdate(
        { sessionId },
        { $push: { listeningHistory: whisperId } }
      );
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('whisper:respond', async (data) => {
    const { whisperId, responderId } = data;
    try {
      const whisper = await Whisper.findByIdAndUpdate(
        whisperId,
        { $inc: { journey: 1 }, $push: { responses: responderId } },
        { new: true }
      );
      io.emit('whisper:update', whisper);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
