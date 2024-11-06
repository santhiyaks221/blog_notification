import { createClient } from 'redis';

// Redis Cloud connection details
const redisClient = createClient({
    password: 'ZSiFoudAz43AWHJtFlx5gPOycJjYJa41',
    socket: {
        host: 'redis-13049.c44.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 13049
    }
});

// Connect to Redis Cloud
redisClient.connect().catch(console.error);

// Publish a message to the "notifications" channel
function sendNotification(eventData) {
    redisClient.publish('notifications', JSON.stringify(eventData));
}

// Example notification
const newNotification = {
    type: 'like',
    postID: 12345,
    user: 'JohnDoe',
    message: 'JohnDoe liked your post!'
};

// Send the example notification
sendNotification(newNotification);
