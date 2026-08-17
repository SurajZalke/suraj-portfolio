# Deployment Guide

## Deploy to Vercel (Recommended - Free & Easy)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Create vercel.json
Create `vercel.json` in your portfolio folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "index.html"
    }
  ],
  "env": {
    "EMAIL_USER": "@email_user",
    "EMAIL_PASSWORD": "@email_password",
    "OWNER_EMAIL": "@owner_email",
    "TWILIO_ACCOUNT_SID": "@twilio_account_sid",
    "TWILIO_AUTH_TOKEN": "@twilio_auth_token",
    "TWILIO_WHATSAPP_FROM": "@twilio_whatsapp_from"
  }
}
```

### Step 3: Deploy
```bash
vercel
```

### Step 4: Add Environment Variables
In Vercel dashboard:
1. Go to your project Settings
2. Click "Environment Variables"
3. Add:
   - `EMAIL_USER`: your-gmail@gmail.com
   - `EMAIL_PASSWORD`: your-app-password
   - `OWNER_EMAIL`: surajzalke724@gmail.com
   - (Optional) Twilio credentials

### Step 5: Redeploy
```bash
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

---

## Deploy to Heroku

### Step 1: Create Heroku Account
- Go to heroku.com
- Sign up (free tier available)

### Step 2: Install Heroku CLI
```bash
npm install -g heroku
```

### Step 3: Login & Create App
```bash
heroku login
heroku create your-portfolio-app
```

### Step 4: Set Environment Variables
```bash
heroku config:set EMAIL_USER=your-gmail@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set OWNER_EMAIL=surajzalke724@gmail.com
```

For Twilio:
```bash
heroku config:set TWILIO_ACCOUNT_SID=your_sid
heroku config:set TWILIO_AUTH_TOKEN=your_token
heroku config:set TWILIO_WHATSAPP_FROM=+1234567890
```

### Step 5: Deploy
```bash
git push heroku main
```

Your site will be live at: `https://your-portfolio-app.herokuapp.com`

---

## Deploy to Railway.app

### Step 1: Create Railway Account
- Go to railway.app
- Sign up with GitHub

### Step 2: Create New Project
- Click "New Project"
- Select "Deploy from GitHub"
- Choose your portfolio repository

### Step 3: Add Environment Variables
- Go to Variables
- Add all `.env` variables:
  - EMAIL_USER
  - EMAIL_PASSWORD
  - OWNER_EMAIL
  - TWILIO credentials (optional)

### Step 4: Deploy
Railway auto-deploys on push to GitHub

Your site will be live at: `https://your-project.up.railway.app`

---

## Deploy to Render.com

### Step 1: Create Render Account
- Go to render.com
- Sign up

### Step 2: Create New Web Service
- Click "New Web Service"
- Connect GitHub repo
- Select your portfolio

### Step 3: Configure
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`

### Step 4: Add Environment Variables
- Click "Environment"
- Add all variables from `.env`

### Step 5: Deploy
- Click "Create Web Service"

Your site will be live at: `https://your-project.onrender.com`

---

## Update Portfolio URL in Code

After deployment, update your contact form to use the new URL:

**In index.html**, find:
```javascript
const response = await fetch('/api/send-message', {
```

Keep it as-is for relative URLs (works automatically)

OR update to absolute URL:
```javascript
const response = await fetch('https://your-deployed-url.com/api/send-message', {
```

---

## Post-Deployment Checklist

- [ ] Test contact form from deployed site
- [ ] Check your email for test message
- [ ] Verify confirmation email works
- [ ] Test WhatsApp (if enabled)
- [ ] Check for any console errors
- [ ] Verify all styling works
- [ ] Test on mobile device
- [ ] Share portfolio URL

---

## Domain Setup (Custom Domain)

### Connect Custom Domain to Vercel
1. Go to Vercel project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions

### Connect Custom Domain to Heroku
1. Add domain to Heroku app:
   ```bash
   heroku domains:add www.yourdomain.com
   ```
2. Update DNS records at your domain registrar
3. Point CNAME to Heroku

### Connect Custom Domain to Railway
1. Go to Railway project
2. Click "Settings"
3. Add custom domain
4. Update DNS records

---

## SSL/HTTPS

All platforms above provide free SSL certificates automatically. Your site will be secure! ✅

---

## Cost Summary

| Platform | Cost | Limit |
|----------|------|-------|
| Vercel | Free | 100GB bandwidth/month |
| Railway | Free | $5 credit/month |
| Render | Free | Auto-sleep after 15min |
| Heroku | Paid | $7+/month |

**Recommendation**: Use Vercel (free tier is generous)

---

## Troubleshooting Deployment

### Site shows 404
- Check that `vercel.json` or build config is correct
- Verify static files are being served

### Emails not sending
- Check environment variables in dashboard
- Verify Gmail app password
- Check server logs for errors

### WhatsApp not working
- Verify Twilio credentials
- Check Twilio trial status
- Sandbox might need re-join

### Slow response
- Free tiers may cold-start (takes 5-30 seconds first request)
- Upgrade to paid plan for always-on

---

## Monitor Your Site

### Vercel Analytics
- Vercel dashboard → Analytics
- Monitor requests, errors, performance

### Heroku Logs
```bash
heroku logs --tail
```

### Railway Logs
- Check logs in dashboard

---

That's it! Your portfolio is now live with a working messaging system! 🚀
