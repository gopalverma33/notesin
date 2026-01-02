'use client';
import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, User, Database, Mail, Globe, FileText } from 'lucide-react';

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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '0.95rem',
  },
  tableHeader: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#1e293b',
  },
  tableCell: {
    border: '1px solid #e2e8f0',
    padding: '12px',
    verticalAlign: 'top',
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

export default function PrivacyPolicy() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>
            <Shield size={40} />
            Privacy Policy
          </h1>
          <p style={styles.subtitle}>
            Your privacy is important to us. This policy explains how Notesin collects, uses, 
            and protects your personal information when you use our educational platform.
          </p>
        </header>

        {/* Main Content */}
        <main style={styles.mainContent}>
          <div style={styles.lastUpdated}>
            Last updated: 27 September, 2025
          </div>

          {/* Introduction */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <FileText size={24} />
              1. Introduction
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                Welcome to Notesin ("we," "our," or "us"). We are committed to protecting your 
                personal information and your right to privacy. This Privacy Policy explains how 
                we collect, use, disclose, and safeguard your information when you use our 
                educational platform and services.
              </p>
              <p style={styles.paragraph}>
                By accessing or using Notesin, you agree to the terms of this Privacy Policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Database size={24} />
              2. Information We Collect
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We collect several types of information from and about users of our platform:
              </p>

              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', margin: '25px 0 15px 0', color: '#1e293b' }}>
                Personal Information
              </h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Account Information:</span> Name, email address, 
                  educational institution, and profile information when you create an account
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Educational Data:</span> Course notes, study materials, 
                  quiz results, and learning progress
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Payment Information:</span> Billing details for premium 
                  features (processed securely through third-party payment processors)
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Communication Data:</span> Messages, feedback, and 
                  support requests
                </li>
              </ul>

              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', margin: '25px 0 15px 0', color: '#1e293b' }}>
                Automatically Collected Information
              </h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Usage Data:</span> How you interact with our platform, 
                  features used, and time spent
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Device Information:</span> IP address, browser type, 
                  operating system, and device characteristics
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Cookies and Tracking:</span> Information collected 
                  through cookies and similar technologies
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Eye size={24} />
              3. How We Use Your Information
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We use the information we collect for various purposes:
              </p>
              
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Purpose</th>
                    <th style={styles.tableHeader}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}>Service Provision</td>
                    <td style={styles.tableCell}>
                      To provide and maintain our educational platform, including notes, 
                      code labs, AI tools, and other features
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Personalization</td>
                    <td style={styles.tableCell}>
                      To customize your learning experience and provide personalized 
                      study recommendations
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Communication</td>
                    <td style={styles.tableCell}>
                      To send important updates, security alerts, and support messages
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Improvement</td>
                    <td style={styles.tableCell}>
                      To analyze usage patterns and improve our platform's functionality
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Security</td>
                    <td style={styles.tableCell}>
                      To protect against fraud, abuse, and security threats
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Legal Compliance</td>
                    <td style={styles.tableCell}>
                      To comply with legal obligations and enforce our terms of service
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Data Sharing and Disclosure */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Globe size={24} />
              4. Data Sharing and Disclosure
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We do not sell your personal information. We may share your information in 
                the following circumstances:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Service Providers:</span> With trusted third-party 
                  vendors who help us operate our platform (e.g., cloud hosting, payment processing)
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Educational Institutions:</span> With your educational 
                  institution if you access Notesin through an institutional account
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Legal Requirements:</span> When required by law or to 
                  protect our rights and safety
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Business Transfers:</span> In connection with a merger, 
                  acquisition, or sale of assets
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>With Your Consent:</span> When you explicitly give us 
                  permission to share specific information
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Lock size={24} />
              5. Data Security
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We implement appropriate technical and organizational security measures to 
                protect your personal information:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>Encryption of data in transit using SSL/TLS protocols</li>
                <li style={styles.listItem}>Secure storage practices with access controls</li>
                <li style={styles.listItem}>Regular security assessments and monitoring</li>
                <li style={styles.listItem}>Employee training on data protection</li>
                <li style={styles.listItem}>Incident response procedures</li>
              </ul>
              
              <p style={styles.paragraph}>
                While we strive to protect your information, no method of transmission over 
                the Internet or electronic storage is 100% secure. We cannot guarantee absolute 
                security but we work hard to protect your data.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <User size={24} />
              6. Your Rights and Choices
            </h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                You have the following rights regarding your personal information:
              </p>
              
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Access:</span> Request a copy of your personal data
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Correction:</span> Update or correct inaccurate information
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Deletion:</span> Request deletion of your personal data
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Export:</span> Export your data in a portable format
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Opt-out:</span> Unsubscribe from marketing communications
                </li>
                <li style={styles.listItem}>
                  <span style={styles.highlight}>Account Closure:</span> Delete your account and associated data
                </li>
              </ul>
              
              <p style={styles.paragraph}>
                To exercise these rights, please contact us using the information below.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>7. Children's Privacy</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                Notesin is not intended for children under the age of 13. We do not knowingly 
                collect personal information from children under 13. If you believe we have 
                collected information from a child under 13, please contact us immediately.
              </p>
            </div>
          </section>

          {/* International Data Transfers */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>8. International Data Transfers</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                Your information may be transferred to and processed in countries other than 
                your own. We ensure appropriate safeguards are in place to protect your data 
                in accordance with this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>9. Changes to This Policy</h2>
            <div style={styles.sectionContent}>
              <p style={styles.paragraph}>
                We may update this Privacy Policy from time to time. We will notify you of 
                any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
              <p style={styles.paragraph}>
                We encourage you to review this Privacy Policy periodically to stay informed 
                about our information practices.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section style={styles.contactSection}>
            <h3 style={styles.contactTitle}>Contact Us</h3>
            <p style={styles.paragraph}>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <a href="mailto:privacy@notesin.com" style={styles.contactEmail}>
              <Mail size={20} />
              support@notesin.com
            </a>
          </section>
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© 2025 Notesin. All rights reserved.</p>
          <p style={{ marginTop: '10px', fontSize: '0.8rem' }}>
            This Privacy Policy is effective as of September 27, 2025.
          </p>
        </footer>
      </div>
    </div>
  );
}