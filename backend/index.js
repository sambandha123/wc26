require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const matchRoutes = require('./routes/match');
const predictionRoutes = require('./routes/prediction');
const leaderboardRoutes = require('./routes/leaderboard');
const groupRoutes = require('./routes/group');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => res.send('API is running...'));

// Socket.io for live updates
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
