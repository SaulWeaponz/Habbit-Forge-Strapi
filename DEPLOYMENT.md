# 🚀 Deployment Guide for Render + Neon

## Prerequisites

1. **Neon Database Setup**
   - Create a Neon account at [neon.tech](https://neon.tech)
   - Create a new PostgreSQL database
   - Copy the connection string (DATABASE_URL)

2. **Render Account**
   - Sign up at [render.com](https://render.com)
   - Connect your GitHub repository

## Environment Variables Setup

Set these environment variables in your Render dashboard:

### Required Variables:
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
NODE_ENV=production
APP_KEYS=key1,key2,key3,key4
ADMIN_JWT_SECRET=your-super-secret-jwt-key
API_TOKEN_SALT=your-api-token-salt
TRANSFER_TOKEN_SALT=your-transfer-token-salt
```

### Optional Variables (for email functionality):
```
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### For Data Seeding:
```
STRAPI_ADMIN_EMAIL=your-admin-email@example.com
STRAPI_ADMIN_PASSWORD=your-admin-password
STRAPI_URL=https://your-app-name.onrender.com/api
```

## Deployment Steps

### 1. Connect Repository
- Connect your GitHub repository to Render
- Select the `Final_project_strapi/HabbitForgeStrapi` directory as the root

### 2. Configure Build Settings
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: Node

### 3. Set Environment Variables
Add all the required environment variables listed above in the Render dashboard.

### 4. Deploy
- Click "Create Web Service"
- Render will automatically build and deploy your application

### 5. Seed Initial Data (Optional)
After deployment, you can seed your database with initial data:

```bash
# Via Render shell or locally with proper environment variables
npm run seed:production
```

## Database Migration Strategy

### Option 1: Fresh Database (Recommended for first deployment)
1. Deploy to Render with a fresh Neon database
2. Run the seed script to populate initial data
3. Create your admin user through the Strapi admin panel

### Option 2: Migrate Existing Data
If you have existing data in a local database:

1. Export your data from local Strapi
2. Import to Neon database using pg_dump/pg_restore
3. Deploy to Render

## Monitoring & Maintenance

### Health Checks
- Your app includes a health check endpoint at `/_health`
- Monitor logs in the Render dashboard

### Database Backups
- Neon provides automatic backups
- Consider setting up additional backup strategies

### Scaling
- Start with the "Starter" plan
- Upgrade to "Standard" or "Pro" as needed

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**
   - Verify DATABASE_URL is correct
   - Ensure SSL is enabled for Neon
   - Check if database is accessible from Render

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Review build logs in Render dashboard

3. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify values are properly formatted

### Support Resources:
- [Render Documentation](https://render.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **Database Access**: Use connection pooling and SSL
3. **Admin Panel**: Change default admin credentials after first login
4. **API Tokens**: Rotate tokens regularly
5. **CORS**: Configure CORS settings for your frontend domain

## Cost Optimization

- **Neon**: Free tier includes 3GB storage and 0.5GB RAM
- **Render**: Free tier includes 750 hours/month
- Monitor usage and upgrade as needed 