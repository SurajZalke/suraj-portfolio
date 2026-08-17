# Portfolio Messaging System Setup Guide

This guide will help you set up the email and WhatsApp messaging system for your portfolio.

## Overview

The system sends:
- **Email notifications** to you when someone submits a message
- **Confirmation emails** to the sender
- **WhatsApp messages** (optional) to confirm receipt

## Prerequisites

- Node.js (v14+) installed
- npm installed
- Gmail account with 2-factor authentication enabled
- Twilio account (optional, for WhatsApp)

## Step 1: Install Dependencies

```bash
cd "c:\Users\suraj\OneDrive\Desktop\suraj protfolio"
npm install
```

This will install:
- express (server framework)
- nodemailer (email sending)
- twilio (WhatsApp messaging)
- cors (cross-origin requests)
- express-rate-limit (spam prevention)
- dotenv (environment variables)

## Step 2: Set Up Gmail (Email Sender)

### A. Enable 2-Factor Authentication
1. Go to myaccount.google.com
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled

### B. Create an App Password
1. Go to myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Copy this password (you'll need it in Step 3)

## Step 3: Create .env File

Create a file named `.env` in your portfolio folder with:

```
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
OWNER_EMAIL=surajzalke724@gmail.com

# Twilio Configuration (optional for WhatsApp)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=+1234567890

# Server
PORT=3000
NODE_ENV=production
```

### Important Notes:
- Replace `your-email@gmail.com` with your actual Gmail
- Replace with the 16-character app password you generated
- For Twilio (optional), see Step 4

## Step 4: Set Up Twilio (WhatsApp) - OPTIONAL

If you want WhatsApp messaging:

1. Go to twilio.com
2. Create a free account
3. Get your Account SID and Auth Token from the dashboard
4. Set up WhatsApp sandbox: 
   - Go to Twilio Console > Messaging > Try it out > Send an SMS
   - Follow the WhatsApp setup instructions
5. Add credentials to `.env`

## Step 5: Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

You should see:
```
🚀 Messaging server running on http://localhost:3000
```

## Step 6: Update Portfolio URL

If you're hosting your portfolio remotely, update the form endpoint in your HTML:

Change this line in `index.html`:
```javascript
const response = await fetch('/api/send-message', {
```

To:
```javascript
const response = await fetch('http://your-domain.com/api/send-message', {
```

## Step 7: Deploy to Production

### Option A: Use Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Option B: Use Heroku
```bash
npm i -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

### Option C: Use Railway, Render, or any Node.js host

## Features

### ✅ Email Notifications
- Beautiful HTML formatted emails
- Includes all contact details
- Sent to your email and to the user

### ✅ WhatsApp Messages
- Optional confirmation via WhatsApp
- Professional greeting message
- Only sent if user provides phone number

### ✅ Security
- Rate limiting (5 messages per 15 minutes per IP)
- Input validation
- Email format verification
- Honeypot field to catch bots

### ✅ User Experience
- Real-time feedback messages
- Button state changes (Loading → Success/Error)
- Error handling and user-friendly messages
- Automatic form reset on success

## Testing Locally

1. Start the server: `npm run dev`
2. Open your portfolio locally
3. Fill the contact form
4. Check your email for the message

## Troubleshooting

### "Failed to send message"
- Check that `.env` file exists and has correct credentials
- Verify Gmail App Password is correct
- Make sure 2FA is enabled on Gmail

### WhatsApp not working
- Verify Twilio Account SID and Auth Token
- Check that phone number is in E.164 format (+country-code)
- Twilio sandbox might have expired (re-join: text JOIN to the sandbox number)

### Port already in use
```bash
# Change PORT in .env to different number (e.g., 3001)
PORT=3001
```

### CORS errors
- Check that your portfolio is loading from the correct server URL
- Verify CORS is enabled in server.js

## Email Format

### To Owner (You):
- Sender's name, email, phone
- Timestamp
- Full message with nice formatting

### To Sender (User):
- Confirmation message
- Their message quoted back
- Your email for follow-up
- Expected response time

## Next Steps

1. Set up your `.env` file with Gmail credentials
2. Install dependencies: `npm install`
3. Test locally: `npm run dev`
4. Deploy to production
5. Update contact email links if needed

## Support

If you need help:
- Check server logs for errors
- Verify all `.env` variables are correct
- Test email credentials on Gmail account
- Check Twilio setup if using WhatsApp

---

Your portfolio now has a professional messaging system! 🚀
