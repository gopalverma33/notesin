'use client';
import React from 'react';
import Link from 'next/link';
import { Scale, BookOpen, Code, Users, Shield, AlertTriangle, Mail, Copyright } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '40px 20px',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(135deg, #2563eb, #7c3aed, #0891b2)',
    color: 'white',
    padding: '60px 40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: '0.9',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  mainContent: {
    padding: '60px 40px',
  },
  lastUpdated: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '1rem',
    marginBottom: '40px',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '50px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    paddingBottom: '10px',
    borderBottom: '2px solid #f1f5f9',
  },
  sectionContent: {
    color: '#475569',
    lineHeight: '1.7',
    fontSize: '1.05rem',
  },
  paragraph: {
    marginBottom: '20px',
  },
  list: {
    margin: '20px 0',
    paddingLeft: '24px',
  },
  listItem: {
    marginBottom: '12px',
    lineHeight: '1.6',
  },
  highlight: {
    background: 'linear-gradient(120deg, #dbeafe 0%, #dbeafe 100%)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontWeight: '600',
  },
  warningBox: {
    background: '#fef3cd',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
  },
  importantNote: {
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
  },
  contactSection: {
    background: '#f8fafc',
    padding: '40px',
    borderRadius: '12px',
    marginTop: '40px',
    textAlign: 'center',
  },
  contactTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1e293b',
  },
  contactEmail: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  footer: {
    textAlign: 'center',
    padding: '40px',
    borderTop: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: '0.9rem',
  }
};

export default function TermsOfService() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            <Scale size={40} />
            Terms of Service
          </h1>
          <p style={styles.subtitle}>
            Please read these terms carefully before using Notesin. By accessing our platform, 
            you agree to be bound by these terms and conditions.
          </p>
        </header>

        {/* Main Content */}
        <main style={styles.mainContent}>
          <div style={styles.lastUpdated}>
            Last updated: September 27, 2025
          </div>

          <div style={styles.warningBox}>
            <AlertTriangle size={24} color="#d97706" />
            <div>
              <strong>Important:</strong> These Terms of Service contain important information 
              about your legal rights and obligations. Please read them carefully.
            </div>
          </div>

          {/* Agreement to Terms */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>1. Agreement to Terms</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                By accessing or using Notesin ("Platform"), you agree to be bound by these 
                Terms of Service and our Privacy Policy. If you disagree with any part of 
                these terms, you may not access our Platform.
              </p>
              <p style={styles.paragraph}>
                These terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </div>
          </section>

          {/* Description of Service */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <BookOpen size={24} />
              2. Description of Service
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                Notesin is an educational platform that provides:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Study Notes:</span> Access to educational materials and course notes
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Code Labs:</span> Interactive coding environment with multiple programming languages
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>AI Tools:</span> AI-powered study assistants including text summarization, quiz generation, and concept explanation
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Resume Builder:</span> Professional resume creation tools
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Community Features:</span> Collaboration and knowledge sharing among students
                </li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Users size={24} />
              3. User Accounts
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                When you create an account with us, you must provide accurate, complete, 
                and current information. You are responsible for:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>Maintaining the confidentiality of your account credentials</li>
                <li style={styles.listItem}>All activities that occur under your account</li>
                <li style={styles.listItem}>Notifying us immediately of any unauthorized use</li>
                <li style={styles.listItem}>Ensuring you logout from your account at the end of each session</li>
              </ul>
              
              <div style={styles.importantNote}>
                <strong>Note:</strong> You must be at least 13 years old to create an account. 
                If you are under 18, you need parental consent to use our Platform.
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>4. Acceptable Use</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                You agree not to use the Platform for any unlawful purpose or in any way that 
                violates these terms. Prohibited activities include:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>Violating any applicable laws or regulations</li>
                <li style={styles.listItem}>Infringing upon intellectual property rights</li>
                <li style={styles.listItem}>Harassing, abusing, or harming others</li>
                <li style={styles.listItem}>Uploading malicious code or viruses</li>
                <li style={styles.listItem}>Attempting to gain unauthorized access to systems</li>
                <li style={styles.listItem}>Engaging in any fraudulent activity</li>
                <li style={styles.listItem}>Sharing inappropriate or offensive content</li>
                <li style={styles.listItem}>Impersonating others or providing false information</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Copyright size={24} />
              5. Intellectual Property
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                <strong>Our Content:</strong> The Platform and its original content, features, 
                and functionality are owned by Notesin and are protected by international 
                copyright, trademark, and other intellectual property laws.
              </p>
              
              <p style={styles.paragraph}>
                <strong>Your Content:</strong> You retain ownership of any educational materials, 
                notes, or code you create and upload to the Platform. By submitting content, 
                you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, 
                and display such content for the purpose of providing our services.
              </p>
              
              <p style={styles.paragraph}>
                <strong>Third-Party Content:</strong> Some content may be provided by third parties. 
                You agree to respect all copyright notices and license agreements associated 
                with such content.
              </p>
            </div>
          </section>

          {/* AI Tools Usage */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>6. AI Tools Usage</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                Our AI-powered tools are designed to assist with educational purposes only. 
                Important guidelines:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>AI-generated content should be used as a learning aid, not as a substitute for original work</li>
                <li style={styles.listItem}>You are responsible for verifying the accuracy of AI-generated content</li>
                <li style={styles.listItem}>Do not use AI tools to generate content for academic dishonesty</li>
                <li style={styles.listItem}>Respect your educational institution's policies regarding AI usage</li>
              </ul>
              
              <div style={styles.warningBox}>
                <AlertTriangle size={24} color="#d97706" />
                <div>
                  <strong>Academic Integrity:</strong> Using AI tools to complete assignments 
                  without proper attribution may violate your institution's academic integrity 
                  policies. Always follow your school's guidelines.
                </div>
              </div>
            </div>
          </section>

          {/* Payments and Subscriptions */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Payments and Subscriptions</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                Certain features may require payment. By purchasing a subscription, you agree to:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>Pay all charges at the prices in effect when incurred</li>
                <li style={styles.listItem}>Provide accurate payment information</li>
                <li style={styles.listItem}>Authorize us to charge your chosen payment provider</li>
                <li style={styles.listItem}>Understand that subscriptions auto-renew unless canceled</li>
              </ul>
              
              <p style={styles.paragraph}>
                <strong>Refund Policy:</strong> We offer a 14-day money-back guarantee for new 
                subscriptions. Refund requests must be submitted within 14 days of purchase.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>8. Termination</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We may terminate or suspend your account immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if 
                you breach the Terms.
              </p>
              
              <p style={styles.paragraph}>
                Upon termination, your right to use the Platform will cease immediately. 
                If you wish to terminate your account, you may simply discontinue using 
                the Platform or delete your account through your account settings.
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Disclaimer of Warranties</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                The Platform is provided on an "AS IS" and "AS AVAILABLE" basis. Notesin 
                makes no warranties, expressed or implied, regarding:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>The accuracy, reliability, or completeness of educational content</li>
                <li style={styles.listItem}>The effectiveness of AI-generated suggestions</li>
                <li style={styles.listItem}>Uninterrupted or error-free service</li>
                <li style={styles.listItem}>The suitability of content for your specific educational needs</li>
              </ul>
              
              <p style={styles.paragraph}>
                You use the Platform at your own risk and discretion.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>10. Limitation of Liability</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                To the maximum extent permitted by law, Notesin shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including 
                without limitation:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>Loss of profits, data, or use</li>
                <li style={styles.listItem}>Educational outcomes or academic performance</li>
                <li style={styles.listItem}>Errors or inaccuracies in content</li>
                <li style={styles.listItem}>Interruption of service</li>
                <li style={styles.listItem}>Unauthorized access to your transmissions</li>
              </ul>
            </div>
          </section>

          {/* Governing Law */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>11. Governing Law</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                These Terms shall be governed and construed in accordance with the laws of 
                [Your Country/State], without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>12. Changes to Terms</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We reserve the right, at our sole discretion, to modify or replace these 
                Terms at any time. We will provide notice of material changes through our 
                Platform or via email.
              </p>
              
              <p style={styles.paragraph}>
                By continuing to access or use our Platform after those revisions become 
                effective, you agree to be bound by the revised terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section style={styles.contactSection}>
            <h3 style={styles.contactTitle}>Contact Us</h3>
            <p style={styles.paragraph}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <a href="mailto:legal@notesin.com" style={styles.contactEmail}>
              <Mail size={20} />
              support@notesin.com
            </a>
          </section>
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© 2025 Notesin. All rights reserved.</p>
          <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>
            These Terms of Service are effective as of September 27, 2025.
          </p>
        </footer>
      </div>
    </div>
  );
}