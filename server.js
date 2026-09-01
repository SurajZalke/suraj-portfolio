const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ── CORS ── must be before everything else, including express.json()
const corsOptions = {
  origin: true,          // reflect the request origin — allows any origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight for every route

app.use(express.json());

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many messages sent from this IP, please try again later.'
});

// Email Configuration
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Twilio Configuration - Manual HTTP Request (bypasses SID format validation)
const twilio_account_sid = process.env.TWILIO_ACCOUNT_SID;
const twilio_auth_token = process.env.TWILIO_AUTH_TOKEN;
let twilioClient = null;

if (twilio_account_sid && twilio_auth_token) {
  // Create a manual Twilio client that works with any SID format
  twilioClient = {
    sendWhatsApp: async (to, body) => {
      const https = require('https');
      return new Promise((resolve, reject) => {
        const auth = Buffer.from(`${twilio_account_sid}:${twilio_auth_token}`).toString('base64');
        
        const postData = new URLSearchParams({
          From: process.env.TWILIO_WHATSAPP_FROM.replace('whatsapp:', ''),
          To: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
          Body: body
        }).toString();

        const options = {
          hostname: 'api.twilio.com',
          path: `/2010-04-01/Accounts/${twilio_account_sid}/Messages.json`,
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };

        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error(`Twilio API error: ${res.statusCode} - ${data}`));
            }
          });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
      });
    }
  };
  console.log('✓ Twilio WhatsApp configured');
}

// Send Email and WhatsApp endpoint
app.post('/api/send-message', limiter, async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    const messageTime = new Date().toLocaleString();

    // ========== SEND EMAIL TO SURAJ ==========
    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #05070a; color: #eef2f6; padding: 20px; border-radius: 8px;">
          <h2 style="color: #54e6ff;">New Message from Your Portfolio</h2>
          <hr style="border-color: #0b0f16;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #54e6ff;">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Time:</strong> ${messageTime}</p>
          <hr style="border-color: #0b0f16;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #0b0f16; padding: 15px; border-radius: 4px; border-left: 3px solid #54e6ff;">
            ${message}
          </p>
          <hr style="border-color: #0b0f16;">
          <p style="font-size: 12px; color: #8a96a5;">This message was sent from your portfolio contact form.</p>
        </div>
      `
    };

    await emailTransporter.sendMail(emailOptions);
    console.log(`✓ Email sent to owner from ${email}`);

    // ========== SEND CONFIRMATION EMAIL TO USER ==========
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Message Received - Suraj Zalke Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; background: #05070a; color: #eef2f6; padding: 20px; border-radius: 8px;">
          <h2 style="color: #54e6ff;">✓ Message Received!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out! Your message has been received and Suraj will get back to you as soon as possible.</p>
          <hr style="border-color: #0b0f16;">
          <p><strong>Your Message:</strong></p>
          <p style="white-space: pre-wrap; background: #0b0f16; padding: 15px; border-radius: 4px; border-left: 3px solid #54e6ff;">
            ${message}
          </p>
          <hr style="border-color: #0b0f16;">
          <p style="font-size: 12px; color: #8a96a5;">
            Expected response time: 24-48 hours<br>
            Contact: surajzalke724@gmail.com
          </p>
        </div>
      `
    };

    await emailTransporter.sendMail(confirmationEmail);
    console.log(`✓ Confirmation email sent to ${email}`);

    // ========== SEND WHATSAPP MESSAGE (Optional) ==========
    if (phone && twilioClient && process.env.TWILIO_WHATSAPP_FROM) {
      try {
        // Format phone number (should be in E.164 format, e.g., +1234567890)
        const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
        const whatsappTo = `whatsapp:${formattedPhone}`;
        
        console.log(`📱 Attempting to send WhatsApp to ${whatsappTo}`);
        await twilioClient.sendWhatsApp(whatsappTo, `Hi ${name}! 👋\n\nThank you for reaching out to Suraj Zalke! Your message has been received. Suraj will get back to you shortly.\n\nBest regards,\nSuraj Zalke\nAI Developer & Software Engineer`);
        
        console.log(`✓ WhatsApp message sent to ${formattedPhone}`);
      } catch (whatsappError) {
        console.log(`⚠ WhatsApp message failed: ${whatsappError.message}`);
        console.log(`⚠ Check your Twilio Account SID and Auth Token`);
        console.log(`⚠ Error details:`, whatsappError);
        // Don't fail the entire request if WhatsApp fails
      }
    }

    res.json({ 
      success: true, 
      message: 'Message sent successfully! Check your email for confirmation.' 
    });

  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Messaging server running on http://localhost:${PORT}`);
});
