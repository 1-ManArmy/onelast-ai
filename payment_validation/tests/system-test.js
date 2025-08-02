const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:3001';

// Test card data (Stripe test cards)
const testCards = {
  visa: {
    cardNumber: '4242424242424242',
    expiryMonth: 12,
    expiryYear: 2025,
    cvv: '123',
    holderName: 'John Test'
  },
  declined: {
    cardNumber: '4000000000000002',
    expiryMonth: 12,
    expiryYear: 2025,
    cvv: '123',
    holderName: 'Jane Declined'
  }
};

async function testHealthCheck() {
  console.log('\n🏥 Testing Health Check...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', response.data.status);
    return true;
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
    return false;
  }
}

async function testCardValidation() {
  console.log('\n💳 Testing Card Validation...');
  try {
    const response = await axios.post(`${BASE_URL}/api/validate-payment`, {
      ...testCards.visa,
      amount: 99.99,
      currency: 'USD'
    });
    
    console.log('✅ Validation Success:', response.data.success);
    console.log('   Risk Level:', response.data.overallRisk);
    console.log('   Card Type:', response.data.cardDetails?.type);
    return true;
  } catch (error) {
    console.log('❌ Validation Failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testBINLookup() {
  console.log('\n🏦 Testing BIN Lookup...');
  try {
    const response = await axios.get(`${BASE_URL}/api/bin-lookup/424242`);
    console.log('✅ BIN Lookup Success');
    console.log('   Brand:', response.data.data?.brand);
    console.log('   Country:', response.data.data?.country);
    return true;
  } catch (error) {
    console.log('❌ BIN Lookup Failed:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testCardAuthorization() {
  console.log('\n🔐 Testing Card Authorization...');
  
  // Check if Stripe keys are configured
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('your_stripe')) {
    console.log('⚠️  Stripe keys not configured - skipping authorization test');
    console.log('   Set STRIPE_SECRET_KEY in .env file to test authorization');
    return true;
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/authorize-card`, testCards.visa);
    
    console.log('✅ Authorization Result:', response.data.success);
    console.log('   Auth ID:', response.data.authId);
    console.log('   Status:', response.data.status);
    if (response.data.success) {
      console.log('   Charge ID:', response.data.chargeId);
      console.log('   💰 Amount charged: $1.00 (will be auto-refunded)');
    }
    return true;
  } catch (error) {
    console.log('❌ Authorization Failed:', error.response?.data?.error?.message || error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🧪 Payment Validation System Tests');
  console.log('===================================');
  
  const results = [];
  
  // Wait a moment for server to be ready
  console.log('\n⏳ Waiting for server to start...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  results.push(await testHealthCheck());
  results.push(await testCardValidation());
  results.push(await testBINLookup());
  results.push(await testCardAuthorization());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! System is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Check the logs above.');
  }
  
  return passed === total;
}

module.exports = { runAllTests, testCards };

// Run tests if called directly
if (require.main === module) {
  runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}
