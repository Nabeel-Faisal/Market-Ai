/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  try {
    const email = e.record.get("email");
    const status = e.record.get("status");
    const subscribedAt = e.record.get("subscribed_at");

    const htmlBody = `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Subscription Date:</strong> ${subscribedAt}</p>
    `;

    const mailMessage = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName
      },
      to: [{ address: "info@marketai.ch" }],
      subject: `New Newsletter Subscriber: ${email}`,
      html: htmlBody
    });

    $app.newMailClient().send(mailMessage);
    console.log(`Newsletter subscription email sent successfully for ${email}`);
  } catch (error) {
    console.log(`Error sending newsletter subscription email: ${error.message}`);
  }
  e.next();
}, "newsletter_subscribers");