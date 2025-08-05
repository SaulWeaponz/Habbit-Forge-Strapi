# ✅ Deployment Checklist for Render + Neon

## Pre-Deployment Setup

### 1. Neon Database Setup
- [ ] Create Neon account at [neon.tech](https://neon.tech)
- [ ] Create new PostgreSQL database
- [ ] Copy the connection string (DATABASE_URL)
- [ ] Test database connection

### 2. Generate Environment Variables
- [ ] Run: `npm run generate:env`
- [ ] Copy generated variables to a secure location
- [ ] Replace placeholder values with actual data

### 3. Render Account Setup
- [ ] Create Render account at [render.com](https://render.com)
- [ ] Connect GitHub repository
- [ ] Select `Final_project_strapi/HabbitForgeStrapi` as root directory

## Deployment Configuration

### 4. Environment Variables in Render
- [ ] Set `NODE_ENV=production`
- [ ] Set `DATABASE_URL` (your Neon connection string)
- [ ] Set `APP_KEYS` (from generated script)
- [ ] Set `ADMIN_JWT_SECRET` (from generated script)
- [ ] Set `API_TOKEN_SALT` (from generated script)
- [ ] Set `TRANSFER_TOKEN_SALT` (from generated script)
- [ ] Set `SMTP_USERNAME` (optional, for email)
- [ ] Set `SMTP_PASSWORD` (optional, for email)

### 5. Build Configuration
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Environment: Node
- [ ] Health Check Path: `/_health`

## Deployment Process

### 6. Initial Deployment
- [ ] Click "Create Web Service" in Render
- [ ] Monitor build logs for any errors
- [ ] Verify deployment success
- [ ] Test health check endpoint: `https://your-app.onrender.com/_health`

### 7. Post-Deployment Setup
- [ ] Access Strapi admin panel: `https://your-app.onrender.com/admin`
- [ ] Create admin user account
- [ ] Set admin credentials in environment variables:
  - `STRAPI_ADMIN_EMAIL`
  - `STRAPI_ADMIN_PASSWORD`
- [ ] Set `STRAPI_URL=https://your-app.onrender.com/api`

### 8. Data Seeding
- [ ] Run seed script: `npm run seed:production`
- [ ] Verify quotes and tips are populated
- [ ] Test API endpoints

## Verification & Testing

### 9. API Testing
- [ ] Test health endpoint: `GET /_health`
- [ ] Test quotes endpoint: `GET /api/quotes`
- [ ] Test tips endpoint: `GET /api/tips`
- [ ] Test admin panel functionality

### 10. Security Verification
- [ ] Verify environment variables are not exposed
- [ ] Test admin authentication
- [ ] Check CORS settings
- [ ] Verify SSL/HTTPS is working

## Monitoring & Maintenance

### 11. Setup Monitoring
- [ ] Enable Render logs monitoring
- [ ] Set up error notifications
- [ ] Monitor database performance
- [ ] Check application uptime

### 12. Backup Strategy
- [ ] Verify Neon automatic backups
- [ ] Test data export functionality
- [ ] Document recovery procedures

## Troubleshooting

### Common Issues & Solutions:
- [ ] **Build fails**: Check Node.js version compatibility
- [ ] **Database connection**: Verify DATABASE_URL and SSL settings
- [ ] **Environment variables**: Ensure all required vars are set
- [ ] **Health check fails**: Verify the `/_health` endpoint
- [ ] **Seeding fails**: Check admin credentials and API URL

## Success Criteria
- [ ] Application deploys successfully
- [ ] Health check returns 200 OK
- [ ] Admin panel is accessible
- [ ] API endpoints return data
- [ ] Database connection is stable
- [ ] SSL/HTTPS is working
- [ ] All environment variables are secure

---

**🎉 Deployment Complete!** Your Strapi application is now live on Render with Neon database. 