export default async (app) => {
  app.onRecordAfterCreateSuccess('analyzer_leads', async (e) => {
    try {
      const record = e.record;

      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
              .header h1 { margin: 0; font-size: 24px; }
              .section { margin-bottom: 20px; }
              .section h2 { color: #2c3e50; font-size: 18px; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
              .info-row { margin-bottom: 10px; }
              .info-label { font-weight: bold; color: #2c3e50; }
              .score-badge { display: inline-block; background-color: #3498db; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold; }
              .cta { background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin-top: 20px; }
              .cta p { margin: 5px 0; }
              ul { margin: 10px 0; padding-left: 20px; }
              li { margin-bottom: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Lead from AI Analyzer</h1>
              </div>

              <div class="section">
                <h2>Lead Information</h2>
                <div class="info-row">
                  <span class="info-label">Full Name:</span> ${escapeHtml(record.get('fullName'))}
                </div>
                <div class="info-row">
                  <span class="info-label">Email:</span> <a href="mailto:${escapeHtml(record.get('email'))}">${escapeHtml(record.get('email'))}</a>
                </div>
                ${record.get('phone') ? `<div class="info-row">
                  <span class="info-label">Phone:</span> ${escapeHtml(record.get('phone'))}
                </div>` : ''}
                <div class="info-row">
                  <span class="info-label">Company Name:</span> ${escapeHtml(record.get('companyName'))}
                </div>
                ${record.get('companyWebsite') ? `<div class="info-row">
                  <span class="info-label">Company Website:</span> <a href="${escapeHtml(record.get('companyWebsite'))}" target="_blank">${escapeHtml(record.get('companyWebsite'))}</a>
                </div>` : ''}
              </div>

              <div class="section">
                <h2>Analysis Results</h2>
                <div class="info-row">
                  <span class="info-label">AI Readiness Score:</span>
                  <span class="score-badge">${record.get('aiReadinessScore')}/100</span>
                </div>
              </div>

              <div class="cta">
                <h3 style="margin-top: 0; color: #2c3e50;">Next Steps</h3>
                <p>Review this lead and contact the prospect to discuss their AI readiness and recommended services.</p>
                <p><strong>Contact Email:</strong> <a href="mailto:${escapeHtml(record.get('email'))}">${escapeHtml(record.get('email'))}</a></p>
                ${record.get('phone') ? `<p><strong>Contact Phone:</strong> ${escapeHtml(record.get('phone'))}</p>` : ''}
              </div>
            </div>
          </body>
        </html>
      `;

      const mailClient = app.newMailClient();

      await mailClient.send({
        from: {
          address: 'noreply@marketai.ch',
          name: 'AI Analyzer',
        },
        to: [{ address: 'info@marketai.ch' }],
        subject: 'New Lead Submission',
        html: emailHtml,
      });
    } catch (error) {
      console.error('Error sending analyzer lead notification email:', error);
      // Continue execution even if email fails
    }

    e.next();
  });
};

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}