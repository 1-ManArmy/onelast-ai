// AutoChat API Test Suite
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
const TEST_TOKEN = 'your-test-jwt-token-here'; // You'll need to get this from login

const autoChatAPI = {
  train: (data) => axios.post(`${BASE_URL}/api/ai/autochat/train`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  reply: (data) => axios.post(`${BASE_URL}/api/ai/autochat/reply`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  analyze: (data) => axios.post(`${BASE_URL}/api/ai/autochat/analyze`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  configure: (data) => axios.post(`${BASE_URL}/api/ai/autochat/configure`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  stats: () => axios.get(`${BASE_URL}/api/ai/autochat/stats`, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  })
};

async function testAutoChat() {
  console.log('🚀 Starting AutoChat API Tests...\n');

  try {
    // Test 1: Style Training
    console.log('📚 Test 1: Training AutoChat Style...');
    const trainingData = {
      conversationSamples: [
        "Hey! Thanks for reaching out. How can I help?",
        "Got it! I'll look into that for you.",
        "Absolutely! Let me get back to you shortly.",
        "Thanks for the message! I appreciate you contacting me."
      ],
      platform: 'general',
      personality: 'friendly'
    };

    const trainingResponse = await autoChatAPI.train(trainingData);
    console.log('✅ Training Response:', JSON.stringify(trainingResponse.data, null, 2));
    console.log('');

    // Test 2: Auto-Reply Generation
    console.log('🤖 Test 2: Generating Auto-Reply...');
    const replyData = {
      incomingMessage: "Hi, I'm interested in your services. Can you tell me more?",
      context: "Business inquiry",
      platform: 'email',
      urgency: 'medium'
    };

    const replyResponse = await autoChatAPI.reply(replyData);
    console.log('✅ Reply Response:', JSON.stringify(replyResponse.data, null, 2));
    console.log('');

    // Test 3: Conversation Analysis
    console.log('🔍 Test 3: Analyzing Conversation...');
    const analysisData = {
      conversation: [
        "Hello, I need help with my order",
        "Sure, I can help with that. What's your order number?",
        "It's #12345. The delivery is delayed.",
        "Let me check that for you right away."
      ],
      platform: 'support_chat'
    };

    const analysisResponse = await autoChatAPI.analyze(analysisData);
    console.log('✅ Analysis Response:', JSON.stringify(analysisResponse.data, null, 2));
    console.log('');

    // Test 4: Configuration
    console.log('⚙️ Test 4: Configuring AutoChat...');
    const configData = {
      platforms: ['email', 'telegram', 'twitter'],
      responseDelay: { min: 3, max: 10 },
      workingHours: { start: '09:00', end: '17:00' },
      autoReplyEnabled: true,
      filterKeywords: ['urgent', 'asap', 'help'],
      personalitySettings: {
        formality: 'casual',
        enthusiasm: 'high',
        helpfulness: 'very_high'
      }
    };

    const configResponse = await autoChatAPI.configure(configData);
    console.log('✅ Configuration Response:', JSON.stringify(configResponse.data, null, 2));
    console.log('');

    // Test 5: Usage Statistics
    console.log('📊 Test 5: Getting Usage Stats...');
    const statsResponse = await autoChatAPI.stats();
    console.log('✅ Stats Response:', JSON.stringify(statsResponse.data, null, 2));
    console.log('');

    console.log('🎉 All AutoChat API tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n💡 Note: You need to set a valid JWT token in TEST_TOKEN variable');
      console.log('   1. Start the server: npm start');
      console.log('   2. Register/login to get a token');
      console.log('   3. Update TEST_TOKEN in this file');
      console.log('   4. Run the test again');
    }
  }
}

// Run the test
if (require.main === module) {
  testAutoChat();
}

module.exports = { testAutoChat, autoChatAPI };
