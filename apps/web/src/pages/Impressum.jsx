import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout.jsx';

const Impressum = () => {
  const sections = [
    { id: 'company-info', title: 'Company Information' },
    { id: 'commercial-register', title: 'Commercial Registry' },
    { id: 'contact', title: 'Contact Details' },
    { id: 'disclaimer', title: 'Disclaimer' },
    { id: 'copyright', title: 'Copyright Notice' }
  ];

  return (
    <LegalPageLayout 
      title="Impressum (Legal Notice)" 
      lastUpdated="April 16, 2026"
      sections={sections}
      metaDescription="Official Impressum and Legal Notice for Market Ai Switzerland, including company registration and contact details."
    >
      <section id="company-info">
        <h2>Company Information</h2>
        <p>
          This Impressum complies with the requirements of Article 3 of the Swiss Federal Act Against Unfair Competition (UWG).
        </p>
        <p>
          <strong>Legal Name:</strong> Market Ai Switzerland GmbH (LLC)<br />
          <strong>Address:</strong> Bahnhofstrasse 100, 8001 Zurich, Switzerland<br />
          <strong>Represented By:</strong> Maya Chen, Managing Director
        </p>
      </section>

      <section id="commercial-register">
        <h2>Commercial Registry</h2>
        <p>
          <strong>Company Identification Number (UID):</strong> CHE-123.456.789<br />
          <strong>Commercial Register Office:</strong> Canton of Zurich<br />
          <strong>VAT Number:</strong> CHE-123.456.789 MWST
        </p>
      </section>

      <section id="contact">
        <h2>Contact Details</h2>
        <p>
          <strong>Email:</strong> info@marketai.ch<br />
          <strong>Phone:</strong> +41 44 123 45 67<br />
          <strong>Website:</strong> www.marketai.ch
        </p>
      </section>

      <section id="disclaimer">
        <h2>Disclaimer for Liability</h2>
        <p>
          The author reserves the right not to be responsible for the topicality, correctness, completeness, or quality of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.
        </p>
        <p>
          All offers are not-binding and without obligation. Parts of the pages or the complete publication including all offers and information might be extended, changed or partly or completely deleted by the author without separate announcement.
        </p>
        <h3>Disclaimer for External Links</h3>
        <p>
          References and links to third-party websites lie outside the scope of our responsibility. No liability of any kind is assumed for such websites. Access to and use of such websites occurs entirely at the user's own risk.
        </p>
      </section>

      <section id="copyright">
        <h2>Copyright Notice</h2>
        <p>
          The copyright and any other rights relating to texts, illustrations, photos, or any other data available on this website are the exclusive property of Market Ai Switzerland or of any other expressly mentioned owners. Any reproduction requires the prior written consent of the copyright holder.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Impressum;