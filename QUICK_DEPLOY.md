# ⚡ Quick Deploy Guide (2 Minutes)

**For the impatient developer. Just want to deploy fast? Start here.**

---

## Option 1: GitHub + Netlify (Recommended)

### Step 1: Push to GitHub
```bash
# In your portfolio folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/suraj-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to **netlify.com**
2. Click **"New site from Git"**
3. Connect GitHub → Choose `suraj-portfolio` repo
4. Click **Deploy**
5. Wait 2 minutes...

### Step 3: Add Environment Variables
In Netlify dashboard:
- Site settings → Build & deploy → Environment
- Add:
  - `EMAIL_USER`: your-email@gmail.com
  - `EMAIL_PASSWORD`: your-app-password
  - `OWNER_EMAIL`: your-email@gmail.com

✅ **Done!** Your site is live at `https://your-site-name.netlify.app`

---

## Option 2: Netlify CLI (2 minutes)

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

✅ Done!

---

## Test It

1. Visit your live site
2. Fill contact form
3. Check email within 30 seconds
4. You should receive:
   - Email to you (notification)
   - Email to sender (confirmation)

---

## Environment Variables

⚠️ **Your credentials:**
- Gmail App Password: Get from https://myaccount.google.com/apppasswords
- Add to Netlify (never to GitHub)

---

## Continuous Deployment

After connecting GitHub to Netlify:
```bash
# Every push auto-deploys!
git add .
git commit -m "Update site"
git push origin main

# Your site updates in 30 seconds ⚡
```

---

## Rollback (If broken)

```bash
git revert HEAD
git push origin main

# Previous version live in 30 seconds
```

---

## Support Files

Need help? Read these in order:
1. **DEPLOYMENT_CHECKLIST.md** - Testing checklist
2. **GITHUB_NETLIFY_SETUP.md** - Detailed steps
3. **DEPLOYMENT.md** - Troubleshooting

---

## Common Issues

**"Email not sending"**
- Check env vars are in Netlify (not .env)
- Check Netlify function logs

**"Form not working"**
- Check browser console (F12)
- Test locally first: `npm run dev`

**"Site looks old"**
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 5 min for CDN

---

**You got this! 🚀**
