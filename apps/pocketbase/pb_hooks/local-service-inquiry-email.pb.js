/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  try {
    const name = e.record.get("name");
    const email = e.record.get("email");
    const phone = e.record.get("phone");
    const city = e.record.get("city");
    const service = e.record.get("service");
    const message = e.record.get("message");
    const submittedAt = e.record.get("created");

    const htmlBody = `
      <h2>New Local Service Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><strong>Submitted:</strong> ${submittedAt}</p>
    `;

    const mailMessage = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName
      },
      to: [{ address: "info@marketai.ch" }],
      subject: `New Local Service Inquiry - ${service} in ${city} from ${name}`,
      html: htmlBody,
      headers: {
        "Reply-To": email
      }
    });

    $app.newMailClient().send(mailMessage);
    console.log(`Local service inquiry email sent successfully for ${email}`);
  } catch (error) {
    console.log(`Error sending local service inquiry email: ${error.message}`);
  }
  e.next();
}, "local_service_inquiries");