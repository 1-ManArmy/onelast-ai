// MongoDB initialization script
db = db.getSiblingDB('onelast-ai');

// Create collections
db.createCollection('users');
db.createCollection('memories');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

db.memories.createIndex({ "userId": 1, "createdAt": -1 });
db.memories.createIndex({ "userId": 1, "type": 1 });
db.memories.createIndex({ "userId": 1, "tags": 1 });
db.memories.createIndex({ "content": "text", "title": "text", "summary": "text" });

print('Database initialized successfully!');
