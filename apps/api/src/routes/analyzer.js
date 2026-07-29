import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Validation helpers
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  // Allow optional phone, but if provided, validate basic format
  if (!phone) return true;
  const phoneRegex = /^[\d\s+\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
};

const isValidUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

router.post('/submit-lead', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    companyName,
    companyWebsite,
    analysisResults,
    aiReadinessScore,
    recommendedServices,
  } = req.body;

  // Validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({
      error: 'Full name is required and must be at least 2 characters',
    });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      error: 'Valid email address is required',
    });
  }

  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({
      error: 'Phone number format is invalid',
    });
  }

  if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
    return res.status(400).json({
      error: 'Company name is required and must be at least 2 characters',
    });
  }

  if (companyWebsite && !isValidUrl(companyWebsite)) {
    return res.status(400).json({
      error: 'Company website URL format is invalid',
    });
  }

  // Save lead to PocketBase
  const leadData = {
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : '',
    companyName: companyName.trim(),
    companyWebsite: companyWebsite ? companyWebsite.trim() : '',
    analysisResults: analysisResults || {},
    aiReadinessScore: aiReadinessScore || 0,
    recommendedServices: recommendedServices || [],
    submittedAt: new Date().toISOString(),
    status: 'new',
  };

  const record = await pb.collection('analyzer_leads').create(leadData);

  logger.info(`Lead submitted: ${record.id} from ${email}`);

  res.json({
    success: true,
    message: 'Lead submitted successfully',
    leadId: record.id,
  });
});

export default router;