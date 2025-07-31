'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AI_SERVICES, SUBSCRIPTION_PLANS, PLAN_BENEFITS, AIService } from '@/lib/aiServices';
import { Check, ArrowRight, Zap } from 'lucide-react';

const ServicesPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS.MONTHLY);
  
  const services = Object.values(AI_SERVICES);

  const PricingCard = ({ service, plan }: { service: AIService, plan: keyof typeof SUBSCRIPTION_PLANS }) => {
    const price = service.pricing[plan];
    const benefits = PLAN_BENEFITS[plan];
    
    return (
      <div className={`relative bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-gradient-to-r ${service.color} transition-all duration-300 transform hover:-translate-y-1`}>
        {benefits.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {benefits.badge}
            </span>
          </div>
        )}
        
        <div className="p-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">{service.icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{service.name}</h3>
              <p className="text-gray-600 text-sm">{service.tagline}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-600 ml-2">/{plan}</span>
            </div>
            {benefits.discount > 0 && (
              <span className="text-green-600 text-sm font-semibold">
                Save {benefits.discount}%
              </span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            {service.description}
          </p>
          
          <ul className="space-y-3 mb-8">
            {service.features.slice(0, 4).map((feature: string, index: number) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="space-y-3">
            <Link href={`/services/${service.id}`}>
              <button className={`w-full bg-gradient-to-r ${service.color} text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center group`}>
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            <Link href={`/subscribe/${service.id}?plan=${plan}`}>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:border-gray-400 transition-colors">
                Subscribe Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Onelast.AI Platform
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/services" className="text-gray-900 font-semibold">Services</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900">Pricing</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Superpower</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            10 specialized AI services designed to transform your productivity, creativity, and success. 
            Each AI is crafted for specific use cases and can be subscribed to individually.
          </p>
          
          {/* Plan Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg border">
              {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`px-6 py-2 rounded-full font-semibold capitalize transition-all ${
                    selectedPlan === plan
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {plan}
                  {PLAN_BENEFITS[plan].discount > 0 && (
                    <span className="ml-1 text-xs">({PLAN_BENEFITS[plan].discount}% off)</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <PricingCard key={service.id} service={service} plan={selectedPlan} />
          ))}
        </div>

        {/* Bundle Offer */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center">
          <Zap className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">All-Access Bundle</h2>
          <p className="text-xl mb-6 opacity-90">
            Get access to all 10 AI services for one low price
          </p>
          <div className="flex items-center justify-center mb-6">
            <span className="text-5xl font-bold">$99</span>
            <span className="text-xl ml-2 opacity-80">/month</span>
            <span className="ml-4 bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
              Save 70%
            </span>
          </div>
          <Link href="/subscribe/bundle">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Get All-Access Bundle
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
