const crypto = require('crypto');

console.log('🔐 Generating secure environment variables for Render deployment...\n');

// Generate APP_KEYS (4 random keys)
const appKeys = Array.from({ length: 4 }, () => crypto.randomBytes(32).toString('base64')).join(',');

// Generate JWT secrets
const adminJwtSecret = crypto.randomBytes(32).toString('base64');
const apiTokenSalt = crypto.randomBytes(16).toString('base64');
const transferTokenSalt = crypto.randomBytes(16).toString('base64');

console.log('📋 Copy these environment variables to your Render dashboard:\n');

console.log('=== REQUIRED VARIABLES ===');
console.log(`NODE_ENV=production`);
console.log(`DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require`);
console.log(`APP_KEYS=${appKeys}`);
console.log(`ADMIN_JWT_SECRET=${adminJwtSecret}`);
console.log(`API_TOKEN_SALT=${apiTokenSalt}`);
console.log(`TRANSFER_TOKEN_SALT=${transferTokenSalt}`);

console.log('\n=== OPTIONAL VARIABLES (for email functionality) ===');
console.log(`SMTP_USERNAME=your-email@gmail.com`);
console.log(`SMTP_PASSWORD=your-app-password`);

console.log('\n=== FOR DATA SEEDING ===');
console.log(`STRAPI_ADMIN_EMAIL=your-admin-email@example.com`);
console.log(`STRAPI_ADMIN_PASSWORD=your-admin-password`);
console.log(`STRAPI_URL=https://your-app-name.onrender.com/api`);

console.log('\n⚠️  IMPORTANT NOTES:');
console.log('1. Replace DATABASE_URL with your actual Neon database connection string');
console.log('2. Set up your admin email/password for the Strapi admin panel');
console.log('3. Update STRAPI_URL with your actual Render app URL after deployment');
console.log('4. Keep these secrets secure and never commit them to version control'); 