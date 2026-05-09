const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { Resend } = require('resend');

// ── Resend Setup ─────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/contact — receive a contact form submission and send email notify
router.post('/', async (req, res) => {
  try {
    const { Name, Email, Comments } = req.body;

    if (!Name || !Email || !Comments) {
      return res.status(400).json({ error: 'Name, Email and Comments are required.' });
    }

    // 1. Save to MongoDB
    const newMessage = new Contact({ Name, Email, Comments });
    await newMessage.save();

    // 2. Send email notification via Resend
    try {
      const data = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Resend testing domain
        to: process.env.EMAIL_USER, // Send to yourself
        subject: `📬 Portfolio: New Message from ${Name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #f97316;">New Contact Form Message</h2>
                <p><strong>Name:</strong> ${Name}</p>
                <p><strong>Email:</strong> ${Email}</p>
                <p><strong>Comments:</strong></p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                  ${Comments}
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #888;">This message was sent from your portfolio website.</p>
            </div>
        `,
      });
      console.log('📧 Email notification sent via Resend:', data);
    } catch (emailError) {
      console.error('❌ Error sending email via Resend:', emailError);
    }

    console.log('📬 New contact message stored in MongoDB:', newMessage);
    res.status(201).json({ message: 'Message received and notification sent. Thank you!' });
  } catch (err) {
    console.error('POST /api/contact error:', err.message);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

// GET /api/contact — list all messages (admin use)
router.get('/', async (req, res) => {
  try {
      const messages = await Contact.find().sort({ createdAt: -1 });
      res.json(messages);
  } catch (err) {
      console.error('GET /api/contact error:', err.message);
      res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
