// app/contact/page.js
'use client';

import { Mail, Phone, MessageCircle, Clock, BookOpen, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@notesin.com',
      description: 'For general inquiries and support',
      link: 'mailto:support@notesin.com?subject=NotesIn Support&body=Hello NotesIn Team,',
      button: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      details: '+91 76101 00823',
      description: 'Quick help and immediate assistance',
      link: 'https://wa.me/917610100823?text=Hello%20NotesIn%20Team,%20I%20need%20help%20with...',
      button: 'Message on WhatsApp'
    },
  ];

  const commonQuestions = [
    {
      question: "How do I report an error in study notes?",
      answer: "Email us at support@notesin.com with the subject 'Content Correction'"
    },
    {
      question: "Can I request specific study materials?",
      answer: "Yes! Message us on WhatsApp with your topic requirements"
    },
    {
      question: "Is there mobile app support?",
      answer: "Contact us for any mobile app issues or feature requests"
    }
  ];

  // Safe link handler that works with Next.js
  const handleContactClick = (link, event) => {
    if (isClient) {
      window.open(link, '_blank');
    }
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            We're here to help you succeed! Choose the fastest way to reach us.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <method.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{method.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{method.details}</p>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  
                  {/* Fixed link that works properly */}
                  <a
                    href={method.link}
                    onClick={(e) => handleContactClick(method.link, e)}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{method.button}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Contact Options */}
      

        {/* Response Info */}
        <div className="bg-blue-50 rounded-xl p-6 mb-12 border border-blue-100">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Response Times</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>Email: Within 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💬</span>
              <span>WhatsApp: Within 2 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Urgent: Within 4 hours</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Common Questions</h3>
          <div className="space-y-4">
            {commonQuestions.map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                <h4 className="font-semibold text-gray-900 mb-1">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}