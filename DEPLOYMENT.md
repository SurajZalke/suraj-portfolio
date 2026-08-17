# Deployment Guide - Suraj Zalke Portfolio

This guide will help you deploy your portfolio to GitHub and Netlify.

## Prerequisites

- GitHub account
- Netlify account
- Git installed on your machine

## Step 1: Initialize GitHub Repository

### A. Create a new repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `suraj-portfolio` (or your preferred name)
3. Description: `Personal portfolio with email messaging system`
4. Choose **Public** or **Private**
5. Click **Create repository**

### B. Initialize Git locally

Open your terminal and run these commands in your portfolio folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio with email messaging"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/suraj-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Connect GitHub to Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub (or create an account)
3. Click **"New site from Git"**
4. Select **GitHub** as your Git provider
5. Authorize Netlify to access your repositories
6. Select your `suraj-portfolio` repository
7. Configure build settings:
   - **Build command**: `npm run build` (or leave empty if no build needed)
   - **Publish directory**: `.` (current directory - serves index.html)
8. Click **Deploy site**

### Option B: Deploy from Local Machine

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Step 3: Set Environment Variables on Netlify

After deploying, you need to add environment variables:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add these variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASSWORD`: your-gmail-app-password
   - `OWNER_EMAIL`: your-email@gmail.com

⚠️ **IMPORTANT**: These variables are sensitive. Never commit them to GitHub.

## File Structure for Deployment

```
suraj-portfolio/
├── index.html                    # Main portfolio page
├── server.js                     # Local development server
├── resume-download.js            # Resume download functionality
├── package.json                  # Dependencies
├── .env                         # Local environment (NOT uploaded)
├── .env.example                 # Example environment (safe to upload)
├── .gitignore                   # Files to ignore in Git
├── netlify.toml                 # Netlify configuration
├── netlify/
│   └── functions/
│       └── send-message.js      # Serverless function for messages
└── DEPLOYMENT.md                # This file
```

## Testing Locally Before Deployment

```bash
# Install dependencies
npm install

# Run local server
npm run dev

# Visit http://localhost:3001
```

## After Deployment

1. Your portfolio will be live at: `https://your-site-name.netlify.app`
2. Test the contact form
3. Check that emails are being received
4. Update your portfolio links/resume to use the new URL

## Troubleshooting

### "Build failed" on Netlify

- Check that `package.json` exists with all dependencies
- Verify environment variables are set correctly
- Check build logs in Netlify dashboard

### Emails not sending

- Verify Gmail App Password is correct
- Check environment variables are set in Netlify
- Make sure 2FA is enabled on Gmail
- Check Netlify function logs for errors

### Form endpoint not working

- Update `index.html` form endpoint to: `/api/send-message`
- Or use the full URL: `https://your-site-name.netlify.app/api/send-message`

## Continuous Deployment

After connecting GitHub to Netlify:
- Every push to `main` branch will automatically trigger a deployment
- Netlify will run `npm run build` (or your build command)
- Your site will update within seconds

## Custom Domain

To use your own domain:

1. Go to your Netlify site settings
2. Click **Domain settings**
3. Add your custom domain
4. Follow the DNS setup instructions

## Advanced: WhatsApp Setup

Once deployed, you can set up WhatsApp messaging:

1. Add Twilio credentials to Netlify environment variables
2. Update the serverless function to use Twilio API
3. Templates must be pre-approved by Twilio

See `MESSAGING_SETUP.md` for more details.

## Need Help?

- Netlify docs: https://docs.netlify.com/
- GitHub docs: https://docs.github.com/
- Deployment issues: Check Netlify function logs
