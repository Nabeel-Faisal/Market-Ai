import express from 'express';
import { z } from 'zod';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Zod validation schema
const localServiceInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  email: z.string().email('Valid email address is required').toLowerCase().trim(),
  phone: z.string().min(5, 'Phone must be at least 5 characters').trim(),
  city: z.string().min(1, 'City is required').trim(),
  service: z.string().min(1, 'Service is required').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

router.post('/', async (req, res) => {
  // Validate request body
  const validationResult = localServiceInquirySchema.safeParse(req.body);
  
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(e => e.message).join(', ');
    return res.status(400).json({ error: errors });
  }

  const { name, email, phone, city, service, message } = validationResult.data;

  // Create record in PocketBase
  const record = await pb.collection('local_service_inquiries').create({
    name,
    email,
    phone,
    city,
    service,
    message,
    status: 'new',
  });

  logger.info('Local service inquiry submitted', { email, city, service });

  res.json({
    success: true,
    message: 'Thank you for your inquiry. We\'ll contact you soon.',
  });
});

export default router;