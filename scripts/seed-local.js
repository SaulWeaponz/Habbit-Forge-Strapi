const axios = require('axios');
require('dotenv').config();

// Configuration - Update these values
const STRAPI_URL = "https://your-app-name.onrender.com/api"; // Replace with your actual Render URL
const STRAPI_LOGIN_URL = `${STRAPI_URL}/auth/local`;

// Admin credentials - Set these in your local .env file
const identifier = process.env.STRAPI_ADMIN_EMAIL;
const password = process.env.STRAPI_ADMIN_PASSWORD;

// Import seed data
const motivation = require('../src/myquotes.js');
const tips = require('../src/tip/tip.js');

async function seedProductionData() {
  console.log('🌱 Starting production data seeding from local machine...');
  console.log(`Target URL: ${STRAPI_URL}`);
  
  if (!identifier || !password) {
    console.error('❌ Missing admin credentials. Set STRAPI_ADMIN_EMAIL and STRAPI_ADMIN_PASSWORD in your local .env file.');
    console.log('\n📝 Create a .env file in the project root with:');
    console.log('STRAPI_ADMIN_EMAIL=your-admin-email@example.com');
    console.log('STRAPI_ADMIN_PASSWORD=your-admin-password');
    return;
  }

  try {
    // Login to get JWT
    console.log('🔐 Authenticating...');
    const loginRes = await axios.post(STRAPI_LOGIN_URL, {
      identifier,
      password
    });

    const jwt = loginRes.data.jwt;
    console.log('✅ Successfully authenticated');

    // Seed quotes
    console.log('📝 Seeding quotes...');
    let quotesCreated = 0;
    let quotesSkipped = 0;
    
    for (const quote of motivation) {
      try {
        await axios.post(
          `${STRAPI_URL}/quotes`,
          { data: quote },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(`✅ Created quote: ${quote.text.slice(0, 50)}...`);
        quotesCreated++;
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('duplicate')) {
          console.log(`⏭️  Quote already exists: ${quote.text.slice(0, 50)}...`);
          quotesSkipped++;
        } else {
          console.error(`❌ Failed to create quote: ${quote.text?.slice(0, 50)}...`);
          console.error('Error:', error.response?.data || error.message);
        }
      }
    }

    // Seed tips
    console.log('💡 Seeding tips...');
    let tipsCreated = 0;
    let tipsSkipped = 0;
    
    for (const tip of tips) {
      try {
        await axios.post(
          `${STRAPI_URL}/tips`,
          { data: tip },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(`✅ Created tip: ${tip.text.slice(0, 50)}...`);
        tipsCreated++;
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('duplicate')) {
          console.log(`⏭️  Tip already exists: ${tip.text.slice(0, 50)}...`);
          tipsSkipped++;
        } else {
          console.error(`❌ Failed to create tip: ${tip.text?.slice(0, 50)}...`);
          console.error('Error:', error.response?.data || error.message);
        }
      }
    }

    console.log('\n🎉 Production seeding completed!');
    console.log(`📊 Summary:`);
    console.log(`   Quotes: ${quotesCreated} created, ${quotesSkipped} skipped`);
    console.log(`   Tips: ${tipsCreated} created, ${tipsSkipped} skipped`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.response?.data || error.message);
    if (error.code === 'ENOTFOUND') {
      console.error('💡 Make sure to update STRAPI_URL with your actual Render app URL');
    }
  }
}

// Only run if called directly
if (require.main === module) {
  seedProductionData();
}

module.exports = { seedProductionData }; 