'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Onelast.AI Platform
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/services" className="text-gray-700 hover:text-gray-900">Services</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900">Pricing</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Scale className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of our AI services platform. Please read them carefully to understand your rights and responsibilities.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-12">
          
          {/* Agreement Overview */}
          <section>
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Agreement Overview</h2>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">By using our services, you agree to:</h3>
              <ul className="list-disc list-inside text-blue-700 space-y-2">
                <li>Follow these terms and conditions</li>
                <li>Comply with applicable laws and regulations</li>
                <li>Use our services responsibly and ethically</li>
                <li>Respect the rights of other users</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) 
              and Onelast.AI Platform (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) regarding your use of our artificial intelligence services 
              and platform. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Services Available</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>EmoAI:</strong> Emotional intelligence and sentiment analysis</li>
                  <li>• <strong>PDFMind:</strong> PDF processing and document analysis</li>
                  <li>• <strong>ChatRevive:</strong> Conversation enhancement and restoration</li>
                  <li>• <strong>TokBoost:</strong> Social media optimization for TikTok</li>
                  <li>• <strong>YouGen:</strong> YouTube content generation and SEO</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Additional Services</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>AgentX:</strong> Autonomous AI agent platform</li>
                  <li>• <strong>AutoChat:</strong> Automated customer service solutions</li>
                  <li>• <strong>CVSmash:</strong> Resume and career optimization</li>
                  <li>• <strong>GPT-God:</strong> Advanced AI assistant capabilities</li>
                  <li>• <strong>Onelast.AI:</strong> Personal memory and knowledge base</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Service Availability</h4>
                  <p className="text-yellow-700">
                    Services may be updated, modified, or discontinued at any time. We will provide reasonable notice 
                    for significant changes that affect your subscription.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">User Accounts and Registration</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized account access</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Suspension and Termination</h3>
                <p className="text-gray-700 mb-3">We may suspend or terminate your account if you:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Violate these terms or our policies</li>
                  <li>Use services for illegal or harmful purposes</li>
                  <li>Attempt to circumvent security measures</li>
                  <li>Fail to pay subscription fees</li>
                  <li>Provide false or misleading information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Subscription and Billing */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Subscription and Billing</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Subscription Plans</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Weekly Plans:</strong> Charged every 7 days</li>
                  <li><strong>Monthly Plans:</strong> Charged every 30 days</li>
                  <li><strong>Yearly Plans:</strong> Charged annually with discounts</li>
                  <li><strong>Bundle Plans:</strong> Access to multiple AI services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing Terms</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Automatic renewal unless cancelled</li>
                  <li>Charges processed on renewal date</li>
                  <li>Refunds subject to our refund policy</li>
                  <li>Price changes with 30-day notice</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Cancellation Policy</h4>
                  <p className="text-green-700">
                    You can cancel your subscription at any time through your account settings. 
                    Cancellation takes effect at the end of your current billing period.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Acceptable Use Policy</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Permitted Uses</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Personal and commercial use within subscription limits</li>
                  <li>Content creation and optimization</li>
                  <li>Business automation and productivity enhancement</li>
                  <li>Educational and research purposes</li>
                  <li>Integration with your own applications (where supported)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Uses</h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-semibold text-red-800 mb-3">You may NOT use our services to:</h4>
                  <ul className="list-disc list-inside text-red-700 space-y-2">
                    <li>Generate illegal, harmful, or malicious content</li>
                    <li>Violate intellectual property rights</li>
                    <li>Spam, phish, or engage in fraudulent activities</li>
                    <li>Harass, abuse, or harm other individuals</li>
                    <li>Reverse engineer or attempt to extract our AI models</li>
                    <li>Resell or redistribute our services without permission</li>
                    <li>Generate content that violates platform policies (social media, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Intellectual Property Rights</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Rights</h3>
                <p className="text-gray-700 mb-3">
                  All rights, title, and interest in our platform, AI models, software, and related technologies 
                  remain exclusively with Onelast.AI Platform. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Proprietary AI algorithms and models</li>
                  <li>Software code and architecture</li>
                  <li>Trademarks, logos, and branding</li>
                  <li>Documentation and user interfaces</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
                <p className="text-gray-700 mb-3">
                  You retain ownership of content you input into our services. However, you grant us a limited 
                  license to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Process your content to provide AI services</li>
                  <li>Improve our AI models (anonymized and aggregated)</li>
                  <li>Ensure service security and compliance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Disclaimers and Limitations */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Disclaimers and Limitations</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Disclaimers</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>AI-generated content may contain errors or inaccuracies</li>
                  <li>Services provided &quot;as is&quot; without warranties of any kind</li>
                  <li>We do not guarantee continuous, uninterrupted service</li>
                  <li>Results may vary based on input quality and service conditions</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-3">Limitation of Liability</h3>
                <p className="text-yellow-700">
                  Our liability is limited to the amount paid for services in the 12 months preceding any claim. 
                  We are not liable for indirect, incidental, or consequential damages.
                </p>
              </div>
            </div>
          </section>

          {/* Contact and Dispute Resolution */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact and Dispute Resolution</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Legal Department</strong><br />
                    Email: legal@onelast.ai<br />
                    Phone: +1 (555) 123-4567<br />
                    Address: 123 AI Innovation Drive<br />
                    Tech City, TC 12345, USA
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Contact our support team first</li>
                  <li>Formal complaint to legal department</li>
                  <li>Mediation (if required)</li>
                  <li>Arbitration in accordance with applicable laws</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Changes to These Terms</h2>
              <p className="text-blue-800 mb-4">
                We may update these Terms from time to time. We will notify you of significant changes 
                via email or platform notification at least 30 days before they take effect.
              </p>
              <p className="text-blue-700">
                Continued use of our services after changes take effect constitutes acceptance of the new Terms.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
