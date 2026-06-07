const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const prisma = require('../prismaClient');
const { protect, admin } = require('../middleware/authMiddleware');
const { sendPredictionEmail } = require('../utils/email');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();

// Setup Multer for Cloudinary upload
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wc26_payments',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
});
const upload = multer({ storage });

// Submit Prediction
router.post('/', protect, upload.single('screenshot'), async (req, res) => {
  try {
    const { 
      match_id, transaction_id, method, 
      first_center, first_corner, first_scorer, 
      score_a, score_b, yellow_cards_a, yellow_cards_b, red_cards_a, red_cards_b, winner 
    } = req.body;

    const match = await prisma.match.findUnique({ where: { id: match_id } });
    if (!match) return res.status(404).json({ message: 'Match not found' });

    // Check if predictions are closed (15 minutes before match)
    const matchTime = new Date(match.match_time);
    const now = new Date();
    const diffInMinutes = (matchTime - now) / (1000 * 60);

    if (diffInMinutes <= 15) {
      return res.status(400).json({ message: 'Predictions are closed for this match.' });
    }

    // Check prediction limit
    const existingPredictionsCount = await prisma.prediction.count({
      where: { user_id: req.user.id, match_id: match_id }
    });
    
    if (existingPredictionsCount >= 5) {
      return res.status(400).json({ message: 'You have reached the maximum limit of 5 predictions for this match.' });
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        user_id: req.user.id,
        transaction_id,
        method: method.toUpperCase(),
        screenshot_url: req.file ? req.file.path : ''
      }
    });

    // Create prediction
    const prediction = await prisma.prediction.create({
      data: {
        user_id: req.user.id,
        match_id,
        payment_id: payment.id,
        first_center,
        first_corner,
        first_scorer,
        score_a: parseInt(score_a),
        score_b: parseInt(score_b),
        yellow_cards_a: parseInt(yellow_cards_a),
        yellow_cards_b: parseInt(yellow_cards_b),
        red_cards_a: parseInt(red_cards_a),
        red_cards_b: parseInt(red_cards_b),
        winner
      }
    });

    // Fetch details for email
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    // Send email to admin asynchronously
    if (req.file) {
      sendPredictionEmail(prediction, user, match, req.file.path).catch(err => console.error('Email error:', err));
    }

    res.status(201).json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Admin verify prediction
router.put('/:id/verify', protect, admin, async (req, res) => {
  try {
    const prediction = await prisma.prediction.update({
      where: { id: req.params.id },
      data: { status: 'VERIFIED' }
    });

    if (prediction.payment_id) {
      await prisma.payment.update({
        where: { id: prediction.payment_id },
        data: { status: 'APPROVED' }
      });
    }

    res.json(prediction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin get all predictions
router.get('/', protect, admin, async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      include: { user: true, match: true, payment: true },
      orderBy: { id: 'desc' }
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user's predictions
router.get('/my', protect, async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { user_id: req.user.id },
      include: { match: true },
      orderBy: { id: 'desc' }
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
