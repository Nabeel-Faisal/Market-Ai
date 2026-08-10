const { getTransporter, applyCors, isValidEmail } = require('./_mailer');

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

  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !isValidEmail(email) || !subject || !message) {
    res.status(400).json({ error: 'Missing or invalid fields' });
    return;
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Market Ai Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `New contact form message: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '-'}`,
        '',
        message,
      ].join('\n'),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact mail error', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
