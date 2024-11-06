import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createClient } from 'redis';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Redis Cloud connection details
const redisClient = createClient({
    password: '*******',  // Use your Redis Cloud password here
    socket: {
        host: 'redis-13049.c44.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 13049
    }
});

// Connect to Redis Cloud
redisClient.connect().catch(console.error);

// Serve the frontend (index.html)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// WebSocket connection setup
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle like event from client
    socket.on('like_post', (eventData) => {
        console.log('Like event received:', eventData);

        // Publish the notification to Redis
        redisClient.publish('notifications', JSON.stringify(eventData));

        // You can also send the notification back to the client in real-time
        socket.emit('new_notification', JSON.stringify(eventData));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
