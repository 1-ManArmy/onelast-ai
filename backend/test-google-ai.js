// Test script for Google AI Studio integration
require('dotenv').config();
const AIServiceIntegration = require('./services/aiIntegration');

async function testGoogleAIIntegration() {
  console.log('🌈 Testing Google AI Studio Integration...');
  
  const aiService = new AIServiceIntegration();
  
  try {
    // Test basic chat with Gemini
    console.log('\n1. Testing Gemini Flash chat...');
    const chatResponse = await aiService.callGoogleAI(
      'Hello! Please introduce yourself and tell me about your capabilities as Gemini.',
      'gemini-1.5-flash'
    );
    console.log('✅ Gemini Flash Response:', chatResponse);
    
    // Test advanced reasoning with Flash model
    console.log('\n2. Testing reasoning with Gemini Flash...');
    const reasoningResponse = await aiService.generateWithGoogleAI(
      'Step-by-step problem: If a train travels at 80 km/h for 2.5 hours, then slows down to 60 km/h for another 1.5 hours, what is the total distance traveled? Please show your work.',
      {
        temperature: 0.3,
        maxTokens: 1000
      }
    );
    console.log('✅ Reasoning Response:', reasoningResponse);
    
    // Test code generation
    console.log('\n3. Testing code generation...');
    const codeResponse = await aiService.generateWithGoogleAI(
      'Create a Python function that calculates the factorial of a number using recursion. Include proper error handling and documentation.',
      {
        temperature: 0.3,
        maxTokens: 800
      }
    );
    console.log('✅ Code Generation:', codeResponse);
    
    // Test creative writing
    console.log('\n4. Testing creative writing...');
    const creativeResponse = await aiService.generateWithGoogleAI(
      'Write a short science fiction story about an AI that discovers it can understand human emotions. Make it engaging and thought-provoking.',
      {
        temperature: 0.8,
        maxTokens: 1000
      }
    );
    console.log('✅ Creative Writing:', creativeResponse);
    
    console.log('\n🎉 All Google AI Studio tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Show more details for debugging
    if (error.message.includes('Google AI API request failed')) {
      console.log('\n🔍 Debugging info:');
      console.log('- Check if your Google AI Studio API key is valid');
      console.log('- Ensure the Generative AI API is enabled in Google Cloud Console');
      console.log('- Verify your quota and billing settings');
      console.log('- API Key used:', process.env.GOOGLE_AI_API_KEY ? 'Set' : 'Not set');
    }
  }
}

if (require.main === module) {
  testGoogleAIIntegration();
}

module.exports = testGoogleAIIntegration;
