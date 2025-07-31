'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { User, Settings, CreditCard, Shield, Bell, Download, Trash2, Edit3 } from 'lucide-react';

const AccountPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your account</h2>
          <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: Download },
  ];

  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
        <button className="flex items-center text-blue-600 hover:text-blue-800">
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={user.name || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={user.email || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={user.username || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
          <input
            type="text"
            value={user.subscriptionType || 'Free'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            readOnly
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          rows={4}
          value={user.bio || ''}
          placeholder="Tell us about yourself..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>

      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  );

  const SubscriptionsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Active Subscriptions</h3>

      <div className="grid gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">EmoAI - Monthly</h4>
              <p className="text-gray-600">Emotional Intelligence & Sentiment Analysis</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Next billing:</span>
              <p className="font-medium">January 31, 2025</p>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <p className="font-medium">$29.99/month</p>
            </div>
            <div>
              <span className="text-gray-500">Auto-renew:</span>
              <p className="font-medium">Enabled</p>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Change Plan</button>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">Cancel</button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">PDFMind - Yearly</h4>
              <p className="text-gray-600">PDF Processing & Analysis</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Next billing:</span>
              <p className="font-medium">December 15, 2025</p>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <p className="font-medium">$249.99/year</p>
            </div>
            <div>
              <span className="text-gray-500">Auto-renew:</span>
              <p className="font-medium">Enabled</p>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Change Plan</button>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">Cancel</button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">Upgrade to All-Access Bundle</h4>
        <p className="text-blue-800 mb-4">Get access to all 10 AI services for just $99/month - Save 70%!</p>
        <Link href="/services" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 inline-block">
          View Bundle Options
        </Link>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Password</h4>
          <p className="text-gray-600 mb-4">Last changed: December 15, 2024</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Change Password
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Add an extra layer of security to your account</p>
              <p className="text-sm text-gray-500 mt-1">Status: Not enabled</p>
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Enable 2FA
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Login Sessions</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-900">Current session - Windows, Chrome</p>
                <p className="text-sm text-gray-500">Started: Today at 10:30 AM</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-gray-900">iPhone, Safari</p>
                <p className="text-sm text-gray-500">Last active: Yesterday at 8:45 PM</p>
              </div>
              <button className="text-red-600 hover:text-red-800 text-sm">Revoke</button>
            </div>
          </div>
          <button className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium">
            Sign out all other sessions
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Notification Preferences</h3>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h4>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Account updates and security alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Subscription and billing notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">New feature announcements</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Tips and best practices</span>
            </label>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h4>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">AI service completions</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Daily usage summaries</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Promotional offers</span>
            </label>
          </div>
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Save Preferences
      </button>
    </div>
  );

  const DataSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Data & Privacy</h3>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Export Your Data</h4>
          <p className="text-gray-600 mb-4">Download a copy of all your account data and AI interactions</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Request Data Export
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h4>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span className="text-gray-700">Allow data to improve AI models (anonymized)</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Personalized recommendations</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span className="text-gray-700">Usage analytics for service improvement</span>
            </label>
          </div>
        </div>

        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
          <h4 className="text-lg font-semibold text-red-900 mb-4">Delete Account</h4>
          <p className="text-red-800 mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'subscriptions':
        return <SubscriptionsSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'data':
        return <DataSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Onelast.AI Platform
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
