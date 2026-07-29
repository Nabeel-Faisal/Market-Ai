import express from 'express';
import { z } from 'zod';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Zod validation schema
const serviceInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Valid email address is required').toLowerCase().trim(),
  phone: z.string().min(5, 'Phone must be at least 5 characters').trim(),
  service: z.string().min(1, 'Service is required').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

router.post('/', async (req, res) => {
  // Validate request body
  const validationResult = serviceInquirySchema.safeParse(req.body);
  
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(e => e.message).join(', ');
    return res.status(400).json({ error: errors });
  }

  const { name, email, phone, service, message } = validationResult.data;

  // Create record in PocketBase
  const record = await pb.collection('service_inquiries').create({
    name,
    email,
    phone,
    service,
    message,
    status: 'new',
  });

  logger.info('Service inquiry submitted', { email, service });

  res.json({
    success: true,
    message: 'Thank you for your inquiry. We\'ll contact you soon.',
  });
});

export default router;