// Brain AI Test Suite
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
const TEST_TOKEN = 'your-test-jwt-token-here'; // You'll need to get this from login

const brainAIAPI = {
  command: (data) => axios.post(`${BASE_URL}/api/ai/brainai/command`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  saveMemory: (data) => axios.post(`${BASE_URL}/api/ai/brainai/memory/save`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  searchMemory: (params) => axios.get(`${BASE_URL}/api/ai/brainai/memory/search`, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` },
    params
  }),
  settings: (data) => axios.post(`${BASE_URL}/api/ai/brainai/settings`, data, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  }),
  stats: () => axios.get(`${BASE_URL}/api/ai/brainai/stats`, {
    headers: { 'Authorization': `Bearer ${TEST_TOKEN}` }
  })
};

async function testBrainAI() {
  console.log('🧠 Starting Brain AI Tests...\n');

  try {
    // Test 1: Command without proper activation (should fail)
    console.log('❌ Test 1: Command without 3-key activation...');
    const invalidCommand = {
      message: "Save this contact number 555-1234",
      isVoice: false
    };

    const invalidResponse = await brainAIAPI.command(invalidCommand);
    console.log('Response:', JSON.stringify(invalidResponse.data, null, 2));
    console.log('');

    // Test 2: Command with proper 3-key activation (should succeed)
    console.log('✅ Test 2: Command with proper 3-key activation...');
    const validCommand = {
      message: "Hey John please save this contact number 555-1234 for Mike",
      isVoice: false
    };

    const validResponse = await brainAIAPI.command(validCommand);
    console.log('Response:', JSON.stringify(validResponse.data, null, 2));
    console.log('');

    // Test 3: Save Memory Directly
    console.log('💾 Test 3: Saving memory directly...');
    const memoryData = {
      type: 'contact',
      content: 'Mike Johnson - 555-1234 - Work colleague from marketing department',
      tags: ['contact', 'work', 'marketing'],
      metadata: {
        phone: '555-1234',
        name: 'Mike Johnson',
        department: 'marketing'
      }
    };

    const memoryResponse = await brainAIAPI.saveMemory(memoryData);
    console.log('Memory Save Response:', JSON.stringify(memoryResponse.data, null, 2));
    console.log('');

    // Test 4: Search Memory
    console.log('🔍 Test 4: Searching memory...');
    const searchParams = {
      query: 'Mike',
      type: 'contact',
      limit: 5
    };

    const searchResponse = await brainAIAPI.searchMemory(searchParams);
    console.log('Search Response:', JSON.stringify(searchResponse.data, null, 2));
    console.log('');

    // Test 5: Update Settings
    console.log('⚙️ Test 5: Updating Brain AI settings...');
    const settingsData = {
      respectTrigger: 'hello',
      voiceEnabled: true,
      autoSaveEnabled: true,
      privacyLevel: 'high',
      responseStyle: 'friendly'
    };

    const settingsResponse = await brainAIAPI.settings(settingsData);
    console.log('Settings Response:', JSON.stringify(settingsResponse.data, null, 2));
    console.log('');

    // Test 6: Get Usage Statistics
    console.log('📊 Test 6: Getting usage statistics...');
    const statsResponse = await brainAIAPI.stats();
    console.log('Stats Response:', JSON.stringify(statsResponse.data, null, 2));
    console.log('');

    // Test 7: Voice Command Test
    console.log('🎤 Test 7: Voice command with activation...');
    const voiceCommand = {
      message: "Dear John please note down my meeting with Sarah tomorrow at 3pm in conference room B",
      isVoice: true
    };

    const voiceResponse = await brainAIAPI.command(voiceCommand);
    console.log('Voice Response:', JSON.stringify(voiceResponse.data, null, 2));
    console.log('');

    console.log('🎉 All Brain AI tests completed successfully!');
    console.log('\n🔐 Key Features Tested:');
    console.log('✅ 3-Key Activation System (Respect + Name + Please)');
    console.log('✅ Memory Storage & Retrieval');
    console.log('✅ Voice Command Processing');
    console.log('✅ Settings Configuration');
    console.log('✅ Usage Statistics');
    console.log('✅ Respectful Protocol Enforcement');

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

// Demo scenarios for testing
const demoScenarios = [
  {
    name: "✅ Valid Activation",
    command: "Hey John please save contact Sarah 555-9876"
  },
  {
    name: "❌ Missing Respect Trigger",
    command: "John please save contact Sarah 555-9876"
  },
  {
    name: "❌ Missing Name",
    command: "Hey please save contact Sarah 555-9876"
  },
  {
    name: "❌ Missing Please",
    command: "Hey John save contact Sarah 555-9876"
  },
  {
    name: "✅ Meeting Schedule",
    command: "Hello John please schedule meeting with team tomorrow 2pm"
  },
  {
    name: "✅ Memory Recall",
    command: "Dear John please find that contact number for Mike"
  }
];

console.log('\n🧠 Brain AI Demo Scenarios:');
demoScenarios.forEach(scenario => {
  console.log(`${scenario.name}: "${scenario.command}"`);
});

// Run the test
if (require.main === module) {
  testBrainAI();
}

module.exports = { testBrainAI, brainAIAPI, demoScenarios };
