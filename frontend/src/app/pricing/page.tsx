'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AI_SERVICES } from '@/lib/aiServices';
import { Check, Star, Zap, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const services = Object.values(AI_SERVICES);

  const bundlePrice = billingPeriod === 'monthly' ? 99 : 999;
  const bundleSavings = billingPeriod === 'monthly' ? 70 : 75;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose individual AI services or get them all with our bundle. 
            No hidden fees, cancel anytime, 30-day money-back guarantee.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg border">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs">(-20%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bundle Offer - Featured */}
        <div className="mb-16">
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Zap className="h-12 w-12 mr-4" />
                <div>
                  <h2 className="text-3xl font-bold">All-Access Bundle</h2>
                  <p className="text-purple-100">Complete access to all 10 AI services</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-bold">${bundlePrice}</span>
                    <span className="text-xl ml-2 opacity-80">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                    <span className="ml-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                      Save {bundleSavings}%
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Access to all 10 AI services</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Unlimited usage across all services</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Early access to new features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>Advanced analytics dashboard</span>
                    </li>
                  </ul>

                  <Link href="/subscribe/bundle">
                    <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center">
                      Get All-Access Bundle
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </Link>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Included Services:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {services.slice(0, 10).map((service) => (
                      <div key={service.id} className="flex items-center text-sm">
                        <span className="mr-2">{service.icon}</span>
                        <span>{service.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          </div>
        </div>

        {/* Individual Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Individual AI Services</h2>
            <p className="text-xl text-gray-600">Pick and choose the AI services you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const price = billingPeriod === 'monthly' ? service.pricing.monthly : service.pricing.yearly;
              const savings = billingPeriod === 'yearly' ? Math.round(((service.pricing.monthly * 12 - service.pricing.yearly) / (service.pricing.monthly * 12)) * 100) : 0;

              return (
                <div key={service.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{service.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600 ml-2">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    {savings > 0 && (
                      <span className="text-green-600 text-sm font-semibold">
                        Save {savings}% yearly
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link href={`/services/${service.id}`}>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:border-gray-400 transition-colors">
                        Learn More
                      </button>
                    </Link>
                    <Link href={`/subscribe/${service.id}?plan=${billingPeriod}`}>
                      <button className={`w-full bg-gradient-to-r ${service.color} text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                        Subscribe Now
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Feature Comparison</h2>
            <p className="text-xl text-gray-600">See what you get with each option</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Individual Service</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-purple-50">
                      <div className="flex items-center justify-center">
                        <Star className="h-4 w-4 text-purple-600 mr-1" />
                        All-Access Bundle
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Number of AI services</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">1 service</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-semibold">All 10 services</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Monthly usage limit</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Service-specific</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-semibold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Customer support</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Standard</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-900 bg-purple-50 font-semibold">Priority</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">API access</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-purple-50">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Early access to new features</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                    <td className="px-6 py-4 text-center bg-purple-50">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Advanced analytics</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                    <td className="px-6 py-4 text-center bg-purple-50">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">White-label options</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                    <td className="px-6 py-4 text-center bg-purple-50">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">Yes, you can cancel your subscription at any time. There are no cancellation fees or long-term commitments.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">We offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact us for a full refund.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I switch between plans?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600">Each service offers a limited free tier. You can also start with our 7-day free trial on any paid plan.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and wire transfers for enterprise customers.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer enterprise pricing?</h3>
                <p className="text-gray-600">Yes, we offer custom enterprise plans with volume discounts. Contact our sales team for a quote.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already transforming their productivity with AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer variant="light" />
    </div>
  );
};

export default PricingPage;
