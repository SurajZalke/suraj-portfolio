# Quick Start: Messaging System

## 3-Minute Setup

### 1. Get Gmail App Password
- Go to myaccount.google.com/apppasswords
- Select "Mail" + your device
- Copy the 16-character password

### 2. Create .env file
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-password
OWNER_EMAIL=surajzalke724@gmail.com
PORT=3000
```

### 3. Install & Run
```bash
npm install
npm run dev
```

### 4. Test
- Open portfolio locally
- Fill contact form
- Check your email ✅

## Features

| Feature | Status |
|---------|--------|
| Email to you | ✅ Works |
| Confirmation email | ✅ Works |
| WhatsApp (optional) | ⚙️ Optional |
| Rate limiting | ✅ Enabled |
| Beautiful formatting | ✅ Yes |

## Commands

```bash
npm install      # Install dependencies
npm run dev      # Start with auto-reload
npm start        # Start normally
```

## What Users Get

1. **Instant confirmation email** with their message quoted back
2. **WhatsApp notification** (if phone provided)
3. **Professional response** from Suraj

## Deployment

```bash
vercel          # To Vercel (easiest)
heroku create   # To Heroku
```

## Need Help?

See `MESSAGING_SETUP.md` for detailed instructions
