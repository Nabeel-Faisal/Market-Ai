const { getTransporter, applyCors, isValidEmail } = require('../_mailer');

module.exports = async (req, res) => {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    fullName,
    email,
    phone,
    companyName,
    companyWebsite,
    analysisResults,
    aiReadinessScore,
    recommendedServices,
  } = req.body || {};

  if (!fullName || !isValidEmail(email) || !companyName) {
    res.status(400).json({ error: 'Missing or invalid fields' });
    return;
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Market Ai Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New AI Analyzer lead: ${companyName}`,
      text: [
        `Full name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        `Company: ${companyName}`,
        `Website: ${companyWebsite || '-'}`,
        '',
        `Location: ${analysisResults?.location || '-'}`,
        `Industry: ${analysisResults?.industry || '-'}`,
        `Goals: ${(analysisResults?.goals || []).join(', ') || '-'}`,
        `Budget: ${analysisResults?.budget ?? '-'}`,
        `AI readiness score: ${aiReadinessScore ?? '-'}`,
        `Recommended services: ${(recommendedServices || []).join(', ') || '-'}`,
      ].join('\n'),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('analyzer lead mail error', err);
    res.status(500).json({ error: 'Failed to submit lead' });
  }
};
