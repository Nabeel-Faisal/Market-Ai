/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const leadName = e.record.get("fullName");
  const leadEmail = e.record.get("email");
  const phone = e.record.get("phone") || "N/A";
  const companyName = e.record.get("companyName");
  const companyWebsite = e.record.get("companyWebsite") || "N/A";
  const aiReadinessScore = e.record.get("aiReadinessScore") || "N/A";
  const recommendedServices = e.record.get("recommendedServices");
  
  let servicesHtml = "N/A";
  if (recommendedServices && Array.isArray(recommendedServices)) {
    servicesHtml = recommendedServices.map(service => "<li>" + service + "</li>").join("");
    servicesHtml = "<ul>" + servicesHtml + "</ul>";
  } else if (recommendedServices && typeof recommendedServices === "object") {
    servicesHtml = "<pre>" + JSON.stringify(recommendedServices, null, 2) + "</pre>";
  }
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "info@marketai.ch" }],
    subject: "New AI Readiness Analysis Lead",
    html: "<h2>New AI Readiness Analysis Lead</h2>" +
          "<p><strong>Lead Name:</strong> " + leadName + "</p>" +
          "<p><strong>Lead Email:</strong> " + leadEmail + "</p>" +
          "<p><strong>Phone:</strong> " + phone + "</p>" +
          "<p><strong>Company Name:</strong> " + companyName + "</p>" +
          "<p><strong>Company Website:</strong> " + companyWebsite + "</p>" +
          "<p><strong>AI Readiness Score:</strong> " + aiReadinessScore + "</p>" +
          "<p><strong>Recommended Services:</strong></p>" + servicesHtml
  });
  
  $app.newMailClient().send(message);
  e.next();
}, "analyzer_leads");