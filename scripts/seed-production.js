const axios = require('axios');
require('dotenv').config();

const STRAPI_URL = process.env.STRAPI_URL || "https://your-render-app.onrender.com/api";
const STRAPI_LOGIN_URL = `${STRAPI_URL}/auth/local`;

// Admin credentials - should be set in Render environment variables
const identifier = process.env.STRAPI_ADMIN_EMAIL;
const password = process.env.STRAPI_ADMIN_PASSWORD;

// Import seed data
const motivation = require('../src/myquotes.js');
const tips = require('../src/tip/tip.js');

async function seedProductionData() {
  console.log('🌱 Starting production data seeding...');
  
  if (!identifier || !password) {
    console.error('❌ Missing admin credentials. Set STRAPI_ADMIN_EMAIL and STRAPI_ADMIN_PASSWORD in environment variables.');
    return;
  }

  try {
    // Login to get JWT
    const loginRes = await axios.post(STRAPI_LOGIN_URL, {
      identifier,
      password
    });

    const jwt = loginRes.data.jwt;
    console.log('✅ Successfully authenticated');

    // Seed quotes
    console.log('📝 Seeding quotes...');
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
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('duplicate')) {
          console.log(`⏭️  Quote already exists: ${quote.text.slice(0, 50)}...`);
        } else {
          console.error(`❌ Failed to create quote: ${quote.text?.slice(0, 50)}...`);
        }
      }
    }

    // Seed tips
    console.log('💡 Seeding tips...');
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
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('duplicate')) {
          console.log(`⏭️  Tip already exists: ${tip.text.slice(0, 50)}...`);
        } else {
          console.error(`❌ Failed to create tip: ${tip.text?.slice(0, 50)}...`);
        }
      }
    }

    console.log('🎉 Production seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.response?.data || error.message);
  }
}

// Only run if called directly
if (require.main === module) {
  seedProductionData();
}

module.exports = { seedProductionData }; 