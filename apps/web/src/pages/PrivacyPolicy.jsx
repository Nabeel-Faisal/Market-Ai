import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout.jsx';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'data-collection', title: '2. Data Collection Methods' },
    { id: 'data-usage', title: '3. Purposes of Data Usage' },
    { id: 'third-party', title: '4. Third-Party Services' },
    { id: 'compliance', title: '5. GDPR & Swiss FADP Compliance' },
    { id: 'user-rights', title: '6. Your User Rights' },
    { id: 'contact', title: '7. Privacy Contact' }
  ];

  return (
    <LegalPageLayout 
      title="Privacy Policy" 
      lastUpdated="April 16, 2026"
      sections={sections}
      metaDescription="Read the comprehensive Privacy Policy of Market Ai Switzerland. Learn how we protect your data in compliance with GDPR and Swiss FADP."
    >
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          At Market Ai Switzerland ("we", "us", "our"), protecting your personal data is a priority. This Privacy Policy outlines how we collect, process, and safeguard your personal information when you use our website, services, or interact with us. 
        </p>
        <p>
          This document is designed to comply with both the updated Swiss Federal Act on Data Protection (FADP) and the General Data Protection Regulation (GDPR) of the European Union.
        </p>
      </section>

      <section id="data-collection">
        <h2>2. Data Collection Methods</h2>
        <p>We collect personal information through the following methods:</p>
        <ul>
          <li><strong>Direct Interactions:</strong> When you fill out contact forms, subscribe to our newsletter, request an AI Business Analysis, or communicate with our support team.</li>
          <li><strong>Automated Technologies:</strong> As you interact with our website, we automatically collect technical data about your equipment, browsing actions, and patterns using cookies and similar tracking technologies.</li>
          <li><strong>Third-Party Sources:</strong> We may receive personal data about you from various third parties, such as analytics providers, advertising networks, and search information providers.</li>
        </ul>
      </section>

      <section id="data-usage">
        <h2>3. Purposes of Data Usage</h2>
        <p>Your data is processed strictly for the following purposes:</p>
        <ul>
          <li>To provide and manage our services (e.g., Web Development, App Development, Digital Marketing).</li>
          <li>To process transactions and send related administrative communications.</li>
          <li>To personalize and improve your user experience on our platform.</li>
          <li>To conduct data analysis, system testing, and performance optimization.</li>
          <li>To deliver relevant marketing communications, provided you have explicitly opted in.</li>
        </ul>
      </section>

      <section id="third-party">
        <h2>4. Third-Party Services</h2>
        <p>
          We utilize selected third-party services to analyze website traffic and deliver targeted marketing. These include:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> Used to understand how visitors engage with our site. Data is anonymized before processing.</li>
          <li><strong>Meta Pixel:</strong> Used to measure the effectiveness of our advertising campaigns and to deliver relevant ads to you on Meta platforms.</li>
        </ul>
        <p>
          These providers act as data processors and are contractually bound to handle your data securely and solely in accordance with our instructions.
        </p>
      </section>

      <section id="compliance">
        <h2>5. GDPR & Swiss FADP Compliance</h2>
        <p>
          Our data processing practices adhere strictly to the revised Swiss FADP and EU GDPR. We ensure:
        </p>
        <ul>
          <li><strong>Lawfulness and Transparency:</strong> Data is processed legally and transparently.</li>
          <li><strong>Data Minimization:</strong> We only collect data that is strictly necessary for our specified purposes.</li>
          <li><strong>Storage Limitation:</strong> Personal data is kept only as long as necessary for the purposes for which it was collected.</li>
          <li><strong>Security:</strong> We implement robust technical and organizational measures to prevent unauthorized access, alteration, or loss of data.</li>
        </ul>
      </section>

      <section id="user-rights">
        <h2>6. Your User Rights</h2>
        <p>Under the applicable data protection laws, you possess the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right to Access:</strong> You may request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> You can request that we correct any inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure (Right to be Forgotten):</strong> You may request the deletion of your data, provided no legal retention requirements conflict.</li>
          <li><strong>Right to Restrict Processing:</strong> You can ask us to pause the processing of your personal data under certain conditions.</li>
          <li><strong>Right to Data Portability:</strong> You may request the transfer of your data to another organization in a structured, machine-readable format.</li>
          <li><strong>Right to Object:</strong> You can object to our processing of your data for direct marketing or based on legitimate interests.</li>
        </ul>
      </section>

      <section id="contact">
        <h2>7. Privacy Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, wish to exercise your rights, or want to be notified of any future policy updates, please contact our Data Protection Officer:
        </p>
        <p>
          <strong>Market Ai Switzerland</strong><br />
          Email: privacy@marketai.ch<br />
          Address: Zurich, Switzerland
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;