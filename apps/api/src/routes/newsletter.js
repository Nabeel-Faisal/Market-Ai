import express from 'express';
import { z } from 'zod';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Zod validation schema
const newsletterSchema = z.object({
  email: z.string().email('Valid email address is required').toLowerCase().trim(),
});

router.post('/', async (req, res) => {
  // Validate request body
  const validationResult = newsletterSchema.safeParse(req.body);
  
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(e => e.message).join(', ');
    return res.status(400).json({ error: errors });
  }

  const { email } = validationResult.data;

  try {
    // Create new subscriber record
    await pb.collection('newsletter_subscribers').create({
      email,
      status: 'active',
    });

    logger.info('Newsletter signup', { email });

    res.json({
      success: true,
      message: 'Thank you for subscribing!',
    });
  } catch (error) {
    // Handle duplicate email gracefully
    if (error.status === 400 && error.message && error.message.includes('duplicate')) {
      logger.info('Newsletter signup - already subscribed', { email });
      return res.json({
        success: true,
        message: 'Thank you for subscribing!',
      });
    }
    // Re-throw other errors to be caught by errorMiddleware
    throw error;
  }
});

export default router;