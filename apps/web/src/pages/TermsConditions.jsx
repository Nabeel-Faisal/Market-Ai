import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout.jsx';

const TermsConditions = () => {
  const sections = [
    { id: 'agreement', title: '1. Agreement to Terms' },
    { id: 'usage', title: '2. Service Usage Terms' },
    { id: 'payment', title: '3. Payment & Billing' },
    { id: 'ip-rights', title: '4. Intellectual Property' },
    { id: 'liability', title: '5. Limitation of Liability' },
    { id: 'termination', title: '6. Suspension & Termination' },
    { id: 'governing-law', title: '7. Governing Law' }
  ];

  return (
    <LegalPageLayout 
      title="Terms & Conditions" 
      lastUpdated="April 16, 2026"
      sections={sections}
      metaDescription="Read the Terms and Conditions of Market Ai Switzerland governing the use of our digital services and platform."
    >
      <section id="agreement">
        <h2>1. Agreement to Terms</h2>
        <p>
          These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Market Ai Switzerland ("we," "us" or "our"), concerning your access to and use of our website as well as any related digital services.
        </p>
        <p>
          By accessing the site and using our services, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, you are expressly prohibited from using the site and services.
        </p>
      </section>

      <section id="usage">
        <h2>2. Service Usage Terms</h2>
        <p>
          As a user of our services, you agree to:
        </p>
        <ul>
          <li>Provide accurate, current, and complete information during the consultation and onboarding phases.</li>
          <li>Maintain the security of your account credentials (if applicable).</li>
          <li>Not use the services for any illegal or unauthorized purpose.</li>
          <li>Not interfere with or disrupt the integrity or performance of the services or our infrastructure.</li>
        </ul>
      </section>

      <section id="payment">
        <h2>3. Payment & Billing</h2>
        <p>
          For digital agency services (including Web Development, App Development, and Digital Marketing), billing milestones will be explicitly detailed in a separate Statement of Work (SOW) or project contract. 
        </p>
        <p>
          Standard terms require a deposit prior to project commencement, with subsequent payments tied to project deliverables. Invoices are payable within 14 days of receipt unless otherwise specified. Late payments may incur interest charges at the standard statutory rate under Swiss law.
        </p>
      </section>

      <section id="ip-rights">
        <h2>4. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated in a specific project contract, the website, source code, designs, and all related intellectual property created by Market Ai Switzerland remain our exclusive property until full payment has been received. 
        </p>
        <p>
          Upon final payment, intellectual property rights for the final deliverables are transferred to the client, while we retain the right to use the completed project in our portfolio and marketing materials.
        </p>
      </section>

      <section id="liability">
        <h2>5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Market Ai Switzerland shall not be liable for any indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of our services.
        </p>
        <p>
          Our total liability to you for any cause whatsoever will at all times be limited to the amount paid, if any, by you to us during the six (6) month period prior to any cause of action arising.
        </p>
      </section>

      <section id="termination">
        <h2>6. Suspension & Termination</h2>
        <p>
          We reserve the right, in our sole discretion, to terminate or suspend your access to all or part of our services, with or without notice, for any reason, including, without limitation, breach of these Terms and Conditions.
        </p>
        <p>
          Upon termination, your right to use the services will immediately cease. Any provisions of these terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </section>

      <section id="governing-law">
        <h2>7. Governing Law & Dispute Resolution</h2>
        <p>
          These Terms and Conditions and your use of the services are governed by and construed in accordance with the substantive laws of Switzerland, excluding its conflict of law provisions.
        </p>
        <p>
          Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of Zurich, Switzerland.
        </p>
        <p>
          <strong>Entire Agreement:</strong> These terms, along with any separate Statement of Work, constitute the entire agreement between you and Market Ai Switzerland regarding your use of the services.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsConditions;