# GitHub Student Pack — Backend Connection Guide

Your server now uses **SendGrid** (email) and **Twilio** (WhatsApp).
Both are available free through the GitHub Student Developer Pack.

---

## PART 1 — SendGrid (Email)

### Step 1 — Claim the SendGrid offer

1. Go to **https://education.github.com/pack**
2. Sign in with your GitHub account (the one that has student verification)
3. In the search box type **"SendGrid"**
4. Click **"Get access by connecting your GitHub account on SendGrid"**
5. It redirects you to SendGrid — click **"Start for Free"**

> You get **25,000 emails/month free for 12 months**

---

### Step 2 — Create your SendGrid account

1. Sign up at **https://sendgrid.com** using your **college/student email**
2. Verify your email address (check inbox for SendGrid confirmation)
3. Fill in your name and purpose (pick "Transactional Email")
4. Complete the account setup wizard

---

### Step 3 — Verify your Sender Email (REQUIRED)

SendGrid won't send emails from an unverified address.

1. In SendGrid dashboard → go to **Settings → Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in:
   - From Name: `Suraj Zalke`
   - From Email: `surajzalke724@gmail.com` (your actual email)
   - Reply To: `surajzalke724@gmail.com`
4. Click **Create**
5. SendGrid sends a verification email to that address — **open it and click verify**

---

### Step 4 — Create your API Key

1. In SendGrid dashboard → go to **Settings → API Keys**
2. Click **"Create API Key"**
3. Name it: `portfolio-backend`
4. Select **"Full Access"** (or "Restricted" with Mail Send permission)
5. Click **Create & View**
6. **COPY THE KEY NOW** — it is shown only once. It starts with `SG.`

---

### Step 5 — Add to your .env file

Open your `.env` file and add/update these lines:

```
SENDGRID_API_KEY=SG.your-actual-api-key-here
SENDGRID_FROM_EMAIL=surajzalke724@gmail.com
OWNER_EMAIL=surajzalke724@gmail.com
```

> `SENDGRID_FROM_EMAIL` must exactly match the email you verified in Step 3.

---

### Step 6 — Test email is working

Run your server:
```
node server.js
```

Then send a test request (use Postman or your portfolio contact form).
You should see:
```
✓ Email sent to owner from ...
✓ Confirmation email sent to ...
```

---

## PART 2 — Twilio (WhatsApp) — Optional

### Step 1 — Claim the Twilio offer

1. Go to **https://education.github.com/pack**
2. Search for **"Twilio"**
3. Click **"Get access by connecting your GitHub account on Twilio"**
4. You receive **$50 free credit** added to your account

---

### Step 2 — Get your Account SID and Auth Token

1. Log in at **https://console.twilio.com**
2. On the main dashboard you will see:
   - **Account SID** → starts with `AC`
   - **Auth Token** → click the eye icon to reveal it
3. Copy both values

---

### Step 3 — Set up the WhatsApp Sandbox

Twilio uses a sandbox number for testing. To use it:

1. In Twilio console → go to **Messaging → Try it out → Send a WhatsApp message**
2. You'll see a sandbox number like `+14155238886`
3. **On your own WhatsApp**, send this message to that number:
   ```
   join <two-word-code>
   ```
   (Twilio shows the exact phrase, e.g. "join sandy-storm")
4. You'll get a reply confirming you joined the sandbox

---

### Step 4 — Add to your .env file

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token-here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

> Replace the sandbox number with your own Twilio number if you buy one later.

---

### Step 5 — Test WhatsApp

Send a message through your portfolio form with your phone number included.
Your server will log:
```
📱 Attempting to send WhatsApp to whatsapp:+91xxxxxxxxxx
✓ WhatsApp message sent to +91xxxxxxxxxx
```

---

## PART 3 — Final .env file (complete)

Here is what your complete `.env` should look like:

```
# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=surajzalke724@gmail.com
OWNER_EMAIL=surajzalke724@gmail.com

# Twilio (optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Server
PORT=3001
NODE_ENV=production
```

---

## PART 4 — If you deploy to Render / Railway / Netlify

Environment variables from `.env` do NOT get deployed automatically.
You must add them manually in your hosting dashboard.

### Render
1. Go to your service → **Environment** tab
2. Click **Add Environment Variable**
3. Add each key-value pair from your `.env`

### Railway
1. Go to your project → **Variables** tab
2. Click **New Variable**
3. Add each key-value pair

### Netlify (for Netlify Functions)
1. Go to your site → **Site configuration → Environment variables**
2. Click **Add a variable**
3. Add each key-value pair

---

## Quick Checklist

- [ ] Claimed SendGrid offer from education.github.com/pack
- [ ] Created SendGrid account
- [ ] Verified sender email in SendGrid Sender Authentication
- [ ] Created SendGrid API Key (starts with `SG.`)
- [ ] Added `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` to `.env`
- [ ] (Optional) Claimed Twilio offer from education.github.com/pack
- [ ] (Optional) Added Twilio SID, Token, and WhatsApp number to `.env`
- [ ] Ran `node server.js` and tested the contact form
