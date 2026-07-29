import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout.jsx';

const CookiePolicy = () => {
  const sections = [
    { id: 'what-are-cookies', title: '1. What Are Cookies' },
    { id: 'types-of-cookies', title: '2. Types of Cookies We Use' },
    { id: 'consent', title: '3. Consent Mechanism' },
    { id: 'third-party', title: '4. Third-Party Cookies' },
    { id: 'duration', title: '5. Cookie Duration' },
    { id: 'management', title: '6. Managing Cookies in Browsers' },
    { id: 'contact', title: '7. Contact Us' }
  ];

  return (
    <LegalPageLayout 
      title="Cookie Policy" 
      lastUpdated="April 16, 2026"
      sections={sections}
      metaDescription="Learn how Market Ai Switzerland uses cookies and similar technologies to improve your experience on our platform."
    >
      <section id="what-are-cookies">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information to the site owners.
        </p>
      </section>

      <section id="types-of-cookies">
        <h2>2. Types of Cookies We Use</h2>
        <p>We classify the cookies used on our website into the following categories:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Strictly necessary for the basic functionality of the website, such as security, network management, and accessibility. You may disable these by changing your browser settings, but this may affect how the website functions.</li>
          <li><strong>Preference Cookies:</strong> Allow the website to remember choices you make (such as your preferred language or the region you are in) to provide enhanced, more personal features.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
          <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display ads that are relevant and engaging for the individual user.</li>
        </ul>
      </section>

      <section id="consent">
        <h2>3. Consent Mechanism</h2>
        <p>
          When you first visit our website, you are presented with a cookie consent banner. By clicking "Accept All", you consent to the use of all cookies as described in this policy. You can manage your preferences or withdraw your consent at any time by clicking on the "Cookie Settings" link in the footer of our website.
        </p>
      </section>

      <section id="third-party">
        <h2>4. Third-Party Cookies</h2>
        <p>
          In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> One of the most widespread and trusted analytics solutions on the web, helping us understand how you use the site and ways that we can improve your experience.</li>
          <li><strong>Meta Pixel:</strong> Used to track the actions of users after they are redirected to our website by clicking on a Facebook or Instagram advertisement.</li>
        </ul>
      </section>

      <section id="duration">
        <h2>5. Cookie Duration</h2>
        <p>
          The length of time a cookie will stay on your browsing device depends on whether it is a "persistent" or "session" cookie:
        </p>
        <ul>
          <li><strong>Session Cookies:</strong> Will only stay on your device until you stop browsing (close your browser).</li>
          <li><strong>Persistent Cookies:</strong> Stay on your browsing device after you have finished browsing until they expire or are deleted (usually between 30 days and 2 years).</li>
        </ul>
      </section>

      <section id="management">
        <h2>6. Managing Cookies in Browsers</h2>
        <p>
          You have the right to decide whether to accept or reject non-essential cookies. In addition to our consent banner, you can set or amend your web browser controls to accept or refuse cookies. Here's how to manage cookies on popular browsers:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings {'>'} Privacy and security {'>'} Cookies and other site data.</li>
          <li><strong>Mozilla Firefox:</strong> Options {'>'} Privacy & Security {'>'} Cookies and Site Data.</li>
          <li><strong>Apple Safari:</strong> Preferences {'>'} Privacy {'>'} Block all cookies.</li>
          <li><strong>Microsoft Edge:</strong> Settings {'>'} Cookies and site permissions.</li>
        </ul>
      </section>

      <section id="contact">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or other technologies, please email us at privacy@marketai.ch.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default CookiePolicy;