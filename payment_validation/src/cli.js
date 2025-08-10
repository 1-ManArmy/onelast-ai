#!/usr/bin/env node

const axios = require('axios');
const readline = require('readline');
require('dotenv').config();

class PaymentValidationCLI {
  constructor() {
    this.baseURL = `http://localhost:${process.env.PORT || 3001}/api`;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    console.log('\n🎯  Payment Validation System CLI');
    console.log('=====================================\n');

    while (true) {
      try {
        const choice = await this.showMenu();
        await this.handleChoice(choice);
      } catch (error) {
        console.error('❌ Error:', error.message);
      }
    }
  }

  showMenu() {
    return new Promise((resolve) => {
      console.log('\nChoose an option:');
      console.log('1. 🔍 Validate Payment');
      console.log('2. 💳 Authorize Card ($1 charge + refund)');
      console.log('3. 🏦 BIN Lookup');
      console.log('4. 🔍 Detect Card Type');
      console.log('5. 📊 Get Stats');
      console.log('6. ❤️  Health Check');
      console.log('7. 🧪 Test with Sample Data');
      console.log('8. 🚪 Exit\n');

      this.rl.question('Enter your choice (1-8): ', (answer) => {
        resolve(parseInt(answer));
      });
    });
  }

  async handleChoice(choice) {
    switch (choice) {
      case 1:
        await this.validatePayment();
        break;
      case 2:
        await this.authorizeCard();
        break;
      case 3:
        await this.binLookup();
        break;
      case 4:
        await this.detectCardType();
        break;
      case 5:
        await this.getStats();
        break;
      case 6:
        await this.healthCheck();
        break;
      case 7:
        await this.testSampleData();
        break;
      case 8:
        console.log('\n👋 Goodbye!');
        process.exit(0);
        break;
      default:
        console.log('❌ Invalid choice. Please try again.');
    }
  }

  async validatePayment() {
    console.log('\n💳 Payment Validation');
    console.log('=====================');

    const cardData = await this.getCardData();
    const amount = await this.prompt('Amount (e.g., 99.99): ');
    const currency = await this.prompt('Currency (e.g., USD): ') || 'USD';

    try {
      console.log('\n⏳ Validating payment...');
      
      const response = await axios.post(`${this.baseURL}/validate-payment`, {
        ...cardData,
        amount: parseFloat(amount),
        currency: currency.toUpperCase()
      });

      this.displayValidationResult(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async authorizeCard() {
    console.log('\n💳 Card Authorization (Charge $1 + Auto Refund)');
    console.log('=================================================');

    const cardData = await this.getCardData();

    try {
      console.log('\n⏳ Authorizing card...');
      
      const response = await axios.post(`${this.baseURL}/authorize-card`, cardData);

      this.displayAuthorizationResult(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async binLookup() {
    console.log('\n🏦 BIN Lookup');
    console.log('==============');

    const bin = await this.prompt('Enter BIN (first 6-8 digits): ');

    try {
      console.log('\n⏳ Looking up BIN...');
      
      const response = await axios.get(`${this.baseURL}/bin-lookup/${bin}`);

      console.log('\n✅ BIN Information:');
      console.log(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      this.handleError(error);
    }
  }

  async detectCardType() {
    console.log('\n🔍 Card Type Detection');
    console.log('======================');

    const cardNumber = await this.prompt('Enter card number: ');

    try {
      console.log('\n⏳ Detecting card type...');
      
      const response = await axios.post(`${this.baseURL}/detect-card-type`, {
        cardNumber
      });

      console.log('\n✅ Card Type Information:');
      console.log(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      this.handleError(error);
    }
  }

  async getStats() {
    console.log('\n📊 System Statistics');
    console.log('====================');

    try {
      console.log('\n⏳ Fetching stats...');
      
      const response = await axios.get(`${this.baseURL}/stats`);

      console.log('\n✅ System Stats:');
      console.log(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      this.handleError(error);
    }
  }

  async healthCheck() {
    console.log('\n❤️  Health Check');
    console.log('=================');

    try {
      console.log('\n⏳ Checking system health...');
      
      const [generalHealth, stripeHealth] = await Promise.allSettled([
        axios.get(`${this.baseURL.replace('/api', '')}/health`),
        axios.get(`${this.baseURL}/stripe-health`)
      ]);

      console.log('\n✅ General Health:');
      if (generalHealth.status === 'fulfilled') {
        console.log(JSON.stringify(generalHealth.value.data, null, 2));
      } else {
        console.log('❌ Failed to check general health');
      }

      console.log('\n💳 Stripe Health:');
      if (stripeHealth.status === 'fulfilled') {
        console.log(JSON.stringify(stripeHealth.value.data, null, 2));
      } else {
        console.log('❌ Failed to check Stripe health');
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async testSampleData() {
    console.log('\n🧪 Testing with Sample Data');
    console.log('============================');

    const testCards = [
      {
        name: 'Visa Test Card',
        cardNumber: '4242424242424242',
        expiryMonth: 12,
        expiryYear: 2025,
        cvv: '123',
        holderName: 'John Doe'
      },
      {
        name: 'Mastercard Test Card',
        cardNumber: '5555555555554444',
        expiryMonth: 11,
        expiryYear: 2025,
        cvv: '456',
        holderName: 'Jane Smith'
      },
      {
        name: 'American Express Test Card',
        cardNumber: '378282246310005',
        expiryMonth: 10,
        expiryYear: 2025,
        cvv: '1234',
        holderName: 'Bob Johnson'
      }
    ];

    for (const testCard of testCards) {
      console.log(`\n🧪 Testing ${testCard.name}...`);
      
      try {
        const response = await axios.post(`${this.baseURL}/validate-payment`, {
          ...testCard,
          amount: 1.00,
          currency: 'USD'
        });

        console.log(`✅ ${testCard.name}: ${response.data.success ? 'PASSED' : 'FAILED'}`);
        if (!response.data.success) {
          console.log(`   Error: ${response.data.error}`);
        }
      } catch (error) {
        console.log(`❌ ${testCard.name}: ERROR`);
        console.log(`   Error: ${error.response?.data?.error || error.message}`);
      }
    }
  }

  async getCardData() {
    console.log('\nEnter card details:');
    
    const cardNumber = await this.prompt('Card Number: ');
    const expiryMonth = await this.prompt('Expiry Month (MM): ');
    const expiryYear = await this.prompt('Expiry Year (YYYY): ');
    const cvv = await this.prompt('CVV: ');
    const holderName = await this.prompt('Cardholder Name (optional): ');

    return {
      cardNumber,
      expiryMonth: parseInt(expiryMonth),
      expiryYear: parseInt(expiryYear),
      cvv,
      holderName: holderName || undefined
    };
  }

  displayValidationResult(result) {
    console.log('\n📋 Validation Result:');
    console.log('=====================');
    
    console.log(`✅ Success: ${result.success}`);
    console.log(`🎯 Risk Level: ${result.overallRisk}`);
    console.log(`⏱️  Processing Time: ${result.processingTime}ms`);

    if (result.cardDetails) {
      console.log('\n💳 Card Details:');
      console.log(`   Type: ${result.cardDetails.type}`);
      console.log(`   Brand: ${result.cardDetails.brand}`);
      console.log(`   Last 4: ${result.cardDetails.last4}`);
      console.log(`   Country: ${result.cardDetails.country}`);
    }

    if (result.riskFactors && result.riskFactors.length > 0) {
      console.log('\n⚠️  Risk Factors:');
      result.riskFactors.forEach(factor => {
        console.log(`   • ${factor}`);
      });
    }

    if (result.recommendations && result.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      result.recommendations.forEach(rec => {
        console.log(`   ${rec.type}: ${rec.message}`);
      });
    }
  }

  displayAuthorizationResult(result) {
    console.log('\n📋 Authorization Result:');
    console.log('========================');
    
    console.log(`✅ Success: ${result.success}`);
    console.log(`🆔 Auth ID: ${result.authId}`);
    console.log(`📊 Status: ${result.status}`);
    console.log(`💰 Amount: $${(result.amount / 100).toFixed(2)} ${result.currency.toUpperCase()}`);
    console.log(`⏱️  Processing Time: ${result.processingTime}ms`);

    if (result.success) {
      console.log(`💳 Charge ID: ${result.chargeId}`);
      
      if (result.cardDetails) {
        console.log('\n💳 Card Details:');
        console.log(`   Last 4: ${result.cardDetails.last4}`);
        console.log(`   Brand: ${result.cardDetails.brand}`);
        console.log(`   Funding: ${result.cardDetails.funding}`);
        console.log(`   Country: ${result.cardDetails.country}`);
      }

      console.log('\n🔄 Auto-refund will be processed in 5 seconds...');
    } else {
      console.log(`❌ Error: ${result.error?.message || result.message}`);
    }

    if (result.riskAssessment) {
      console.log('\n🎯 Risk Assessment:');
      console.log(`   Score: ${result.riskAssessment.riskScore}`);
      console.log(`   Level: ${result.riskAssessment.riskLevel}`);
      console.log(`   Recommendation: ${result.riskAssessment.recommendation}`);
    }
  }

  handleError(error) {
    console.log('\n❌ Error occurred:');
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Message: ${error.response.data.error || error.message}`);
      if (error.response.data.details) {
        console.log(`   Details: ${error.response.data.details}`);
      }
    } else {
      console.log(`   Message: ${error.message}`);
    }
  }

  prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('\n🎯 Payment Validation CLI');
  console.log('Usage: node src/cli.js [options]');
  console.log('\nOptions:');
  console.log('  --help, -h     Show this help message');
  console.log('  --test         Run automated tests');
  process.exit(0);
}

if (args.includes('--test')) {
  console.log('🧪 Running automated tests...');
  // Add automated test logic here
  process.exit(0);
}

// Start CLI
const cli = new PaymentValidationCLI();
cli.start().catch(error => {
  console.error('CLI Error:', error);
  process.exit(1);
});
