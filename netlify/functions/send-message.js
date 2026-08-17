const nodemailer = require('nodemailer');

// Email Configuration
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, message, phone } = JSON.parse(event.body);

    // Validate input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Name, email, and message are required' 
        })
      };
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid email format' 
        })
      };
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
            Contact: ${process.env.OWNER_EMAIL}
          </p>
        </div>
      `
    };

    await emailTransporter.sendMail(confirmationEmail);
    console.log(`✓ Confirmation email sent to ${email}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully! Check your email for confirmation.' 
      })
    };

  } catch (error) {
    console.error('Send Message Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      })
    };
  }
};
