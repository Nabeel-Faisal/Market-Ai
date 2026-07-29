import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout.jsx';

const RefundPolicy = () => {
  const sections = [
    { id: 'eligibility', title: '1. Refund Eligibility' },
    { id: 'timeframes', title: '2. Refund Timeframes' },
    { id: 'cancellation', title: '3. Cancellation Terms' },
    { id: 'non-refundable', title: '4. Non-Refundable Services' },
    { id: 'process', title: '5. Step-by-Step Process' },
    { id: 'consumer-rights', title: '6. Swiss/EU Consumer Rights' }
  ];

  return (
    <LegalPageLayout 
      title="Refund & Cancellation Policy" 
      lastUpdated="April 16, 2026"
      sections={sections}
      metaDescription="Market Ai Switzerland's transparent refund and cancellation policy for digital agency services."
    >
      <section id="eligibility">
        <h2>1. Refund Eligibility</h2>
        <p>
          Because Market Ai Switzerland provides high-level, custom digital services (such as custom web development, app creation, and bespoke digital marketing strategies), our refund policy is strictly defined.
        </p>
        <p>
          Refunds are only granted under the following circumstances:
        </p>
        <ul>
          <li>We fail to commence the project within 30 days of the agreed-upon start date.</li>
          <li>A critical technical failure on our end prevents the delivery of the core agreed-upon services.</li>
          <li>A mutual agreement is reached to terminate the project before any substantial work (exceeding the initial deposit value) has been completed.</li>
        </ul>
      </section>

      <section id="timeframes">
        <h2>2. Refund Timeframes</h2>
        <p>
          If a refund is approved by our management team, the following timeframes apply:
        </p>
        <ul>
          <li><strong>14-Day Window:</strong> Refund requests must be submitted within 14 days of the incident giving rise to the claim.</li>
          <li><strong>Processing Time:</strong> Approved refunds will be processed and initiated from our accounts within 5 to 10 business days.</li>
          <li><strong>Bank Clearance:</strong> Please allow an additional 3-7 business days for the funds to appear in your account, depending on your financial institution.</li>
        </ul>
      </section>

      <section id="cancellation">
        <h2>3. Cancellation Terms</h2>
        <p>
          Clients may cancel ongoing retainer contracts (e.g., monthly SEO or Digital Marketing) with a standard 30-day written notice period, unless a different term is specified in the primary contract. 
        </p>
        <p>
          For fixed-scope projects (e.g., website builds), cancellation after the project has commenced will result in billing for all hours worked and resources consumed up to the point of cancellation. The initial deposit is generally non-refundable once discovery and strategy phases have begun.
        </p>
      </section>

      <section id="non-refundable">
        <h2>4. Non-Refundable Services</h2>
        <p>The following expenses are strictly non-refundable:</p>
        <ul>
          <li>Third-party software licenses, domain registrations, or hosting fees purchased on your behalf.</li>
          <li>Ad spend directly paid to platforms like Google Ads, Meta Ads, or LinkedIn.</li>
          <li>Completed consulting hours and completed strategic audits.</li>
        </ul>
      </section>

      <section id="process">
        <h2>5. Step-by-Step Refund Process</h2>
        <ol>
          <li>Submit a formal written request outlining the issue to billing@marketai.ch.</li>
          <li>Our accounts team will acknowledge receipt within 48 hours and assign a case manager.</li>
          <li>An internal review of the project deliverables, hours logged, and contract terms will be conducted.</li>
          <li>A resolution meeting will be scheduled with you to discuss the findings and proposed settlement.</li>
          <li>If approved, a refund authorization document must be signed before funds are released.</li>
        </ol>
      </section>

      <section id="consumer-rights">
        <h2>6. Swiss & EU Consumer Rights</h2>
        <p>
          While Market Ai primarily serves B2B (Business to Business) clients where statutory "cooling off" periods do not universally apply, any B2C (Business to Consumer) transactions within the EU/Switzerland will be strictly honored according to the respective consumer protection laws, including the 14-day right of withdrawal where legally applicable for uncommenced digital services.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default RefundPolicy;