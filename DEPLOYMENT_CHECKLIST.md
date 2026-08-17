# Deployment Checklist ✅

Complete this checklist to ensure your portfolio is ready for production on Netlify.

## Pre-Deployment (Local Testing)

- [ ] Install dependencies: `npm install`
- [ ] Start local server: `npm run dev`
- [ ] Test contact form locally
- [ ] Verify emails are received
- [ ] Check that confirmation email is sent
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Check console for errors (F12 → Console)
- [ ] Verify no sensitive data is logged
- [ ] Test resume download functionality

## Git & GitHub Setup

- [ ] Verify `.gitignore` contains `.env` (don't commit credentials)
- [ ] Remove any `.env` from git history if accidentally added
- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Create commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin ...`
- [ ] Push to GitHub: `git push -u origin main`
- [ ] Verify code appears on GitHub website

## Netlify Deployment

- [ ] Create Netlify account (or log in)
- [ ] Connect GitHub to Netlify
- [ ] Select `suraj-portfolio` repository
- [ ] Configure build settings:
  - [ ] Build command: (leave empty)
  - [ ] Publish directory: `.`
- [ ] Trigger initial deployment
- [ ] Wait for deployment to complete (2-3 min)
- [ ] Check deployment status (green checkmark)

## Environment Variables Setup

- [ ] Go to Netlify Site settings
- [ ] Navigate to Build & deploy → Environment
- [ ] Add `EMAIL_USER` environment variable
- [ ] Add `EMAIL_PASSWORD` environment variable
- [ ] Add `OWNER_EMAIL` environment variable
- [ ] Verify all three variables are saved
- [ ] Trigger a new deploy to apply variables

## Post-Deployment Testing

- [ ] Visit your live site: `https://your-site.netlify.app`
- [ ] Test contact form on live site
- [ ] Fill in name, email, message
- [ ] Submit form
- [ ] Check inbox for notification email (5-30 seconds)
- [ ] Check sender's spam folder
- [ ] Verify confirmation email was sent
- [ ] Check email content is correct
- [ ] Verify no console errors on production

## Content & SEO

- [ ] Update page title in HTML
- [ ] Update meta description
- [ ] Update OG tags for social sharing
- [ ] Add your name and image to about section
- [ ] Update all contact information
- [ ] Verify all links are working
- [ ] Check favicon displays correctly

## Security & Best Practices

- [ ] Verify `.env` is NOT in GitHub (check .gitignore)
- [ ] Confirm sensitive credentials are ONLY in Netlify environment
- [ ] Enable HTTPS (automatic on Netlify)
- [ ] Test form rate limiting (send multiple messages)
- [ ] Verify email validation is working
- [ ] Check no personal info in source code

## Continuous Deployment

- [ ] Make a small change to index.html
- [ ] Commit and push to GitHub
- [ ] Verify Netlify auto-deploys (check Deploys tab)
- [ ] Confirm change appears on live site
- [ ] Disable auto-deploy if you want manual control

## Optional: Custom Domain

- [ ] Register domain (if not already done)
- [ ] Go to Netlify Domain settings
- [ ] Add custom domain
- [ ] Update DNS records at registrar
- [ ] Wait for DNS propagation (5-48 hours)
- [ ] Verify SSL certificate auto-generates
- [ ] Test site on custom domain

## Optional: WhatsApp (Advanced)

- [ ] Create WhatsApp template in Twilio
- [ ] Submit template for approval (24-48 hours)
- [ ] Add Twilio credentials to Netlify environment
- [ ] Update server function to use WhatsApp API
- [ ] Test WhatsApp message delivery
- [ ] Verify rate limiting on WhatsApp

## Documentation

- [ ] Update README.md with live site link
- [ ] Document environment variables needed
- [ ] Create troubleshooting guide
- [ ] Add deployment instructions for team members
- [ ] Document any custom setup or configuration

## Final Verification

- [ ] All forms working
- [ ] All links functional
- [ ] All images loading
- [ ] Mobile responsive
- [ ] No JavaScript errors
- [ ] Fast page load (< 3 seconds)
- [ ] No console warnings
- [ ] No hardcoded URLs (use relative paths)

## Go Live! 🚀

- [ ] All items above are complete
- [ ] Shared live link with stakeholders
- [ ] Added to portfolio/resume
- [ ] Set up analytics (Google Analytics optional)
- [ ] Monitor error logs for first week

---

## Rollback Procedure (If Needed)

If something goes wrong:

```bash
# Push previous version
git revert HEAD
git push origin main

# Netlify will auto-deploy the previous version
```

---

## Monitoring

After deployment, monitor:
- Email delivery (check inbox daily)
- Error logs (Netlify → Functions → Logs)
- Site performance (Netlify → Analytics)
- Domain status (Netlify → Domain settings)

---

## Support

If issues occur:
1. Check Netlify deploy logs
2. Check Netlify function logs
3. Review browser console (F12)
4. Test locally with `npm run dev`
5. Check GitHub Actions if using CI/CD

---

**Deployment Date**: ____________

**Live Site URL**: ____________

**Notes**: 
```
_____________________________________________
_____________________________________________
_____________________________________________
```

---

✅ **All set!** Your portfolio is now live and automatically updated with every GitHub push!
