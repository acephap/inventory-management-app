// backend/redisClient.js

const redis = require('redis');

// Create a Redis client; adjust configuration as needed
const client = redis.createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

// Log any errors
client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
client.connect().catch(err => {
  console.error('Redis connection error:', err);
});

module.exports = client;
