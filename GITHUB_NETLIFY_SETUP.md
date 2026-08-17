# GitHub & Netlify Deployment Guide

Complete step-by-step guide to deploy your portfolio to GitHub and Netlify.

## Quick Start (5 minutes)

### 1. Create GitHub Repository

```bash
# Open Git Bash/Terminal in your portfolio folder
git init
git add .
git commit -m "Initial commit: Suraj Zalke Portfolio"
```

Go to https://github.com/new and create a repository named `suraj-portfolio`

```bash
git remote add origin https://github.com/YOUR_USERNAME/suraj-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Netlify

**Option A: GUI (Easiest)**
1. Go to https://netlify.com
2. Click **"New site from Git"**
3. Select **GitHub** → Authorize → Choose `suraj-portfolio`
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
5. Click **Deploy**

**Option B: CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### 3. Add Environment Variables

In Netlify dashboard:
- Site settings → Build & deploy → Environment
- Add variables:
  - `EMAIL_USER`: your-email@gmail.com
  - `EMAIL_PASSWORD`: your-app-password
  - `OWNER_EMAIL`: your-email@gmail.com

**Done!** Your site is live at `https://your-site.netlify.app`

---

## Detailed Setup

### Part 1: GitHub Setup (Local)

#### Prerequisites
- Git installed: https://git-scm.com/downloads
- GitHub account: https://github.com/signup

#### Step 1A: Initialize Git Repository

```bash
cd "c:\Users\suraj\OneDrive\Desktop\suraj protfolio"
git init
```

#### Step 1B: Add Files to Git

```bash
# Add all files
git add .

# Or add specific files (if needed)
git add index.html server.js package.json netlify.toml netlify/

# Verify what's being added
git status
```

Your `.gitignore` automatically excludes:
- `node_modules/` (dependencies)
- `.env` (sensitive credentials)
- `.DS_Store` (system files)

#### Step 1C: Create Initial Commit

```bash
git commit -m "Initial commit: Suraj Zalke Portfolio with email messaging"
```

#### Step 1D: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `suraj-portfolio`
   - **Description**: Personal portfolio with email messaging system
   - **Visibility**: Public (or Private)
3. **Do NOT** initialize with README/gitignore (you already have these)
4. Click **Create repository**

#### Step 1E: Push to GitHub

GitHub will show commands like these. Copy and paste them:

```bash
git remote add origin https://github.com/YOUR_USERNAME/suraj-portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

✅ **Your code is now on GitHub!**

---

### Part 2: Netlify Deployment

#### Prerequisites
- Netlify account: https://netlify.com/signup

#### Option A: Deploy from GitHub (Recommended)

**Step 2A1: Connect GitHub**
1. Go to https://app.netlify.com
2. Sign in with GitHub (or click "Sign up")
3. Click **"New site from Git"**
4. Click **GitHub**
5. Click **Authorize Netlify**
6. Authorize and return to Netlify

**Step 2A2: Select Repository**
1. You should see your repositories
2. Click **`suraj-portfolio`**

**Step 2A3: Configure Build**
1. **Owner**: Your GitHub account (auto-filled)
2. **Branch to deploy**: `main`
3. **Build command**: (leave empty - no build needed)
4. **Publish directory**: `.` (current directory)
5. Click **Deploy site**

Netlify will now:
- Clone your repository
- Install dependencies
- Deploy your site

⏳ **Wait 2-3 minutes for deployment to complete...**

#### Option B: Deploy Manually (CLI)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify (opens browser)
netlify login

# Deploy to production
netlify deploy --prod
```

---

### Part 3: Configure Environment Variables

Your site needs credentials to send emails.

**On Netlify Dashboard:**

1. Go to https://app.netlify.com
2. Click your site name
3. Navigate to **Site settings** (top menu)
4. Click **Build & deploy** (left sidebar)
5. Click **Environment** (left sidebar)
6. Click **Edit variables**
7. Add three variables:

| Key | Value |
|-----|-------|
| `EMAIL_USER` | your-email@gmail.com |
| `EMAIL_PASSWORD` | your-16-char-app-password |
| `OWNER_EMAIL` | your-email@gmail.com |

⚠️ **Important**: These values are sensitive! Never commit `.env` to GitHub.

**To redeploy with new env vars:**
```bash
git push origin main
# Netlify will auto-deploy
```

---

### Part 4: Testing

#### Test Locally First
```bash
# Install dependencies
npm install

# Start local server
npm run dev

# Visit http://localhost:3001
# Test the contact form
# Check email
```

#### Test on Netlify
1. Visit `https://your-site-name.netlify.app`
2. Fill out contact form
3. Check that:
   - ✅ Email received in your inbox
   - ✅ Confirmation email received by sender
   - ✅ No console errors

---

## Continuous Deployment

After connecting GitHub to Netlify, every push to `main` automatically:
1. Triggers a build
2. Runs your app
3. Deploys to production

**Example workflow:**

```bash
# Make changes locally
# ... edit files ...

# Commit and push
git add .
git commit -m "Update portfolio content"
git push origin main

# Netlify automatically deploys within seconds!
```

---

## Project Structure

What gets deployed to Netlify:

```
suraj-portfolio/
├── index.html                    ✅ Main page
├── resume-download.js            ✅ Resume functionality
├── package.json                  ✅ Dependencies
├── netlify.toml                  ✅ Netlify config
├── netlify/functions/
│   └── send-message.js          ✅ Email function
├── .env                         ❌ NOT uploaded (gitignore)
├── node_modules/                ❌ NOT uploaded (gitignore)
└── .env.example                 ✅ Safe version
```

---

## Common Issues & Solutions

### Issue: "Failed to build"
**Solution:**
- Check Netlify build logs (Site → Deploys → Click deploy)
- Verify `package.json` exists
- Check for syntax errors

### Issue: "Form not sending"
**Solution:**
- Verify environment variables are set in Netlify
- Check Netlify function logs: Site → Functions → send-message
- Test locally with `npm run dev` first

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push origin main
```

### Issue: "CORS error"
**Solution:**
- Already handled by Netlify serverless functions
- The endpoint is on the same domain, so no CORS needed

### Issue: "Site won't deploy"
**Solution:**
1. Check GitHub Actions (if using CI/CD)
2. Verify `netlify.toml` exists
3. Check branch name is `main`
4. Go to Site settings → Build & deploy → Trigger deploy

---

## Advanced: Custom Domain

To use your own domain (e.g., surajzalke.com):

1. Go to Netlify Site settings
2. Click **Domain management**
3. Click **Add domain**
4. Enter your domain: `surajzalke.com`
5. Update DNS records at your registrar
6. Wait for DNS propagation (5-48 hours)
7. SSL certificate auto-generates

---

## Advanced: Automatic Deployments

Netlify automatically deploys when you push to GitHub. To test this:

```bash
# Make a small change to index.html
# ... edit something ...

git add .
git commit -m "Test auto-deploy"
git push origin main

# Watch deployments at: app.netlify.com → your site → Deploys
# Site will be live in 30 seconds!
```

---

## Advanced: Preview Deployments

Netlify creates preview deploys for pull requests!

```bash
# Create a feature branch
git checkout -b new-feature
# ... make changes ...
git add .
git commit -m "Add new feature"
git push origin new-feature

# Create a Pull Request on GitHub
# Netlify automatically creates a preview URL
# Test changes before merging to main
```

---

## Environment Variables Security

**❌ WRONG:**
```
# Never commit this!
# .env
EMAIL_PASSWORD=my-real-password
```

**✅ CORRECT:**
```
# Commit this safe version
# .env.example
EMAIL_USER=example@gmail.com
EMAIL_PASSWORD=ENTER_YOUR_APP_PASSWORD_HERE
```

Real values go in Netlify dashboard → **Build & deploy → Environment**

---

## Summary

✅ Code on GitHub
✅ Site on Netlify  
✅ Auto-deployment enabled
✅ Environment variables secure
✅ Email system ready

**Your site is live!** 🚀

---

## Helpful Links

- **GitHub Docs**: https://docs.github.com/
- **Netlify Docs**: https://docs.netlify.com/
- **Git Guide**: https://git-scm.com/doc
- **Netlify CLI**: https://docs.netlify.com/cli/get-started/
- **Gmail App Passwords**: https://myaccount.google.com/apppasswords

---

## Next Steps

1. ✅ Deploy to GitHub & Netlify (you are here!)
2. 🔜 Optional: Set up WhatsApp messaging
3. 🔜 Optional: Add custom domain
4. 🔜 Optional: Set up automatic tests
5. 🔜 Optional: Add analytics

Reach out if you need help! 🎉
