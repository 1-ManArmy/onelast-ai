'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, Users, Database } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your privacy is fundamental to our mission. Learn how we protect, use, and manage your data across all our AI services.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Privacy Overview Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Lock className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Encryption</h3>
            <p className="text-gray-600">All data is encrypted in transit and at rest using industry-standard encryption protocols.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Eye className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">We clearly explain what data we collect, why we collect it, and how it&apos;s used.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Control</h3>
            <p className="text-gray-600">You have full control over your data with options to view, edit, or delete at any time.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-12">
          
          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-6">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Name and email address for account creation</li>
                  <li>Profile information you choose to provide</li>
                  <li>Subscription and billing information</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Content you input into our AI services (text, files, images)</li>
                  <li>AI interactions and conversation history</li>
                  <li>Usage patterns and feature preferences</li>
                  <li>Performance metrics and error logs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system and device specifications</li>
                  <li>Usage analytics and performance data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Delivery</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide and maintain our AI services</li>
                  <li>Process your requests and transactions</li>
                  <li>Improve AI model performance</li>
                  <li>Customize your experience</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Communication & Support</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Send service updates and notifications</li>
                  <li>Provide customer support</li>
                  <li>Respond to your inquiries</li>
                  <li>Send marketing communications (with consent)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Detect and prevent fraud</li>
                  <li>Ensure platform security</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect user rights and safety</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Improvement</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Analyze usage patterns</li>
                  <li>Improve service performance</li>
                  <li>Develop new features</li>
                  <li>Conduct research and development</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Sharing and Disclosure</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">We Do NOT Sell Your Data</h3>
              <p className="text-yellow-700">We never sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Sharing</h3>
                <p className="text-gray-700 mb-3">We only share your information in these specific circumstances:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> Trusted third-party services that help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                  <li><strong>Safety & Security:</strong> To protect users, prevent fraud, or address security issues</li>
                  <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale (with user notification)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-sm font-semibold mr-3 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Access Your Data</h4>
                    <p className="text-gray-700 text-sm">View and download all personal information we have about you</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-sm font-semibold mr-3 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Correct Information</h4>
                    <p className="text-gray-700 text-sm">Update or correct any inaccurate personal information</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-sm font-semibold mr-3 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Delete Your Data</h4>
                    <p className="text-gray-700 text-sm">Request deletion of your personal information (subject to legal requirements)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-sm font-semibold mr-3 mt-1">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Restrict Processing</h4>
                    <p className="text-gray-700 text-sm">Limit how we use your personal information</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-sm font-semibold mr-3 mt-1">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Portability</h4>
                    <p className="text-gray-700 text-sm">Export your data in a machine-readable format</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded text-blue-600 flex items-center justify-center text-sm font-semibold mr-3 mt-1">6</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Opt-Out</h4>
                    <p className="text-gray-700 text-sm">Unsubscribe from marketing communications at any time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Exercise Your Rights</h3>
              <p className="text-blue-700 mb-4">To exercise any of these rights, contact us at privacy@onelast.ai or through your account settings.</p>
              <Link href="/account/privacy" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                Manage Privacy Settings →
              </Link>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Safeguards</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>End-to-end encryption for data transmission</li>
                  <li>AES-256 encryption for stored data</li>
                  <li>Multi-factor authentication options</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure cloud infrastructure (Azure/AWS)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Operational Security</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Employee background checks and training</li>
                  <li>Limited access on need-to-know basis</li>
                  <li>Regular backup and disaster recovery</li>
                  <li>24/7 security monitoring</li>
                  <li>Incident response procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy Officer</h4>
                  <p className="text-gray-700">Email: privacy@onelast.ai</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mailing Address</h4>
                  <p className="text-gray-700">
                    Onelast.AI Platform<br />
                    123 AI Innovation Drive<br />
                    Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer variant="light" />
    </div>
  );
};

export default PrivacyPolicyPage;
