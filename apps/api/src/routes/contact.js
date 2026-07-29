import express from 'express';
import { z } from 'zod';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Valid email address is required').toLowerCase().trim(),
  phone: z.string().min(5, 'Phone must be at least 5 characters').trim(),
  subject: z.string().min(1, 'Subject is required').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

router.post('/', async (req, res) => {
  // Validate request body
  const validationResult = contactSchema.safeParse(req.body);
  
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(e => e.message).join(', ');
    return res.status(400).json({ error: errors });
  }

  const { name, email, phone, subject, message } = validationResult.data;

  // Create record in PocketBase
  const record = await pb.collection('contact_submissions').create({
    name,
    email,
    phone,
    subject,
    message,
    status: 'new',
  });

  logger.info('Contact form submitted', { email, name });

  res.json({
    success: true,
    message: 'Thank you for contacting us. We\'ll get back to you soon.',
  });
});

export default router;