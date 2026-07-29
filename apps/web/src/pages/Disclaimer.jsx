import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout.jsx';

const Disclaimer = () => {
  const sections = [
    { id: 'informational', title: '1. Informational Purposes' },
    { id: 'no-guarantee', title: '2. No Guarantee of Results' },
    { id: 'professional', title: '3. Not Professional Advice' },
    { id: 'third-party', title: '4. Third-Party Services' },
    { id: 'limitation', title: '5. Limitation of Liability' },
    { id: 'modifications', title: '6. Modifications' }
  ];

  return (
    <LegalPageLayout 
      title="Website Disclaimer" 
      lastUpdated="April 16, 2026"
      sections={sections}
      metaDescription="Read the official website disclaimer for Market Ai Switzerland regarding results guarantees and professional advice."
    >
      <section id="informational">
        <h2>1. Informational Purposes Only</h2>
        <p>
          The information contained on the Market Ai Switzerland website and platform is for general informational and educational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics.
        </p>
      </section>

      <section id="no-guarantee">
        <h2>2. No Guarantee of Results</h2>
        <p>
          We showcase case studies, testimonials, and marketing strategies that have yielded positive results for previous clients. However, these examples do not guarantee that you will achieve the exact same or similar results. 
        </p>
        <p>
          Digital marketing, SEO rankings, software adoption, and business intelligence outcomes depend on numerous factors outside our direct control, including your industry, market competition, budget, and economic conditions.
        </p>
      </section>

      <section id="professional">
        <h2>3. Not Professional Advice</h2>
        <p>
          Content on this website, including blog posts and AI analyzer outputs, does not constitute formal legal, financial, or certified business advice. You should consult with appropriate professionals before making any significant business or financial decisions based on the information provided on our platform.
        </p>
      </section>

      <section id="third-party">
        <h2>4. Third-Party Services Disclaimer</h2>
        <p>
          Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with Market Ai. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. 
        </p>
        <p>
          Furthermore, our reference to any specific commercial product, process, or service by trade name, trademark, or manufacturer does not constitute or imply an endorsement or recommendation by Market Ai Switzerland.
        </p>
      </section>

      <section id="limitation">
        <h2>5. Limitation of Liability</h2>
        <p>
          In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
        </p>
      </section>

      <section id="modifications">
        <h2>6. Right to Modify</h2>
        <p>
          We reserve the right to amend this disclaimer at any time without prior notice. By using this website, you agree to be bound by the current version of this disclaimer.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Disclaimer;