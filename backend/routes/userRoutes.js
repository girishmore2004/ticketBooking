const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const QRCode = require('qrcode');
const User = require('../models/User');

// Set up file storage for multer
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Save uploaded files to './uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to avoid filename collisions
  },
});

const upload = multer({ storage: storage });

// Nodemailer transporter configuration (use environment variables for sensitive data)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Use your email from environment variables
    pass: process.env.GMAIL_PASS, // Use your Gmail App password
  },
  secure: false, // Use TLS for port 587 (not SSL)
  port: 587,      // Use port 587 (STARTTLS)
  tls: {
    rejectUnauthorized: false,  // This might help bypass SSL verification issues
  },
});

// Function to send confirmation or cancellation email
const sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send email');
  }
};

// 1. Route to fetch pending users
router.get('/pending', async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'Pending' });
    res.status(200).json(pendingUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending users' });
  }
});

// 2. Route to confirm payment for a user
router.post('/confirm/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Update user status to 'Confirmed'
    user.status = 'Confirmed';
    await user.save();

    res.status(200).json({ message: 'Payment confirmed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to confirm payment.' });
  }
});

// 3. Route to generate a ticket and send email with QR code
router.post('/generate-ticket/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ error: 'User not found.' });
    }

    // Generate the QR code
    const qrCodeData = `Ticket for ${user.name}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Update user with ticket details
    user.ticketDetails = { qrCode: qrCodeImage };
    await user.save();

    // Send email with the ticket
    const emailContent = `Hello ${user.name},\n\nYour event ticket is ready! \n\nBest regards,\nEvent Team`;
    await sendEmail(user.email, 'Your Event Ticket', emailContent);

    res.status(200).json({ message: 'Ticket generated and email sent.' });
  } catch (err) {
    console.error('Error in /generate-ticket route:', err);
    res.status(500).json({ error: 'Failed to generate ticket.' });
  }
});


// 4. Route to cancel payment and update user status
router.post('/cancel/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found.' });

    user.status = 'Canceled';
    await user.save();

    res.status(200).json({ message: 'Payment canceled successfully.' });
  } catch (err) {
    console.error('Error canceling payment:', err);
    res.status(500).json({ error: 'Failed to cancel payment.' });
  }
});

// 5. Route to send cancellation email to the user
router.post('/send-cancellation-email/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found.' });

    const emailContent = `Hello ${user.name},\n\nYour payment was not received. Please contact the event organizer for further assistance.`;
    await sendEmail(user.email, 'Payment Cancellation Notice', emailContent);

    res.status(200).json({ message: 'Cancellation email sent.' });
  } catch (err) {
    console.error('Error in sending cancellation email:', err);
    res.status(500).json({ error: 'Failed to send cancellation email.' });
  }
});

// 6. Route for submitting user details (including file upload)
router.post('/submit', upload.single('paymentScreenshot'), async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const paymentScreenshot = req.file ? req.file.path : null;

    // Check if a user with the same email and mobile already exists
    const existingUser = await User.findOne({ email, mobile });
    if (existingUser) {
      return res.status(400).json({ error: 'A user with this email and mobile already exists.' });
    }

    // Create new user and save to database
    const newUser = new User({ name, email, mobile, paymentScreenshot });
    await newUser.save();

    // Send the response immediately after saving the user
    res.status(201).json({ message: 'Submission successful! Event ticket created.' });

    // Send confirmation email asynchronously without blocking the response
    sendEmail(email, 'Event Ticket Submission Confirmation', `Hello ${name},\n\nYour submission has been received successfully! Thank you for your payment.\n\nBest regards,\nEvent Team`)
      .then(() => {
        console.log('Confirmation email sent successfully');
      })
      .catch((emailErr) => {
        console.error('Error sending confirmation email:', emailErr);
      });

  } catch (err) {
    console.error('Error in /submit route:', err);
    res.status(500).json({ error: `Failed to submit user details: ${err.message}` });
  }
});

module.exports = router;
