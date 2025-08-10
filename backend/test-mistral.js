// Test script for Mistral AI integration
require('dotenv').config();
const AIServiceIntegration = require('./services/aiIntegration');

async function testMistralIntegration() {
  console.log('🧪 Testing Mistral AI Integration...');
  
  const aiService = new AIServiceIntegration();
  
  try {
    // Test basic chat completion
    console.log('\n1. Testing basic chat...');
    const response = await aiService.callMistral('Hello! Please introduce yourself and tell me about your capabilities.', 'mistral-small');
    console.log('✅ Mistral Response:', response);
    
    // Test code analysis
    console.log('\n2. Testing code analysis...');
    const codeAnalysis = await aiService.codeAnalysisWithMistral(
      `function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      }`, 
      'javascript'
    );
    console.log('✅ Code Analysis:', codeAnalysis);
    
    // Test multilingual support
    console.log('\n3. Testing multilingual support...');
    const translation = await aiService.multilingualSupportWithMistral(
      'Hello, how are you today?', 
      'French', 
      'translate'
    );
    console.log('✅ Translation:', translation);
    
    console.log('\n🎉 All Mistral AI tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

if (require.main === module) {
  testMistralIntegration();
}

module.exports = testMistralIntegration;
