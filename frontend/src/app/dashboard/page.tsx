'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { userAPI, memoryAPI } from '@/lib/api';
import { 
  Brain, 
  Search, 
  Calendar, 
  TrendingUp,
  MessageSquare,
  FileText,
  CheckSquare,
  Lightbulb,
  LogOut
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ModernButton } from '@/components/ui/ModernButton';
import { motion } from 'framer-motion';

interface User {
  firstName?: string;
  username: string;
  stats: {
    totalMemories: number;
    joinDate: string;
  };
}

interface MemoryStat {
  _id: string;
  count: number;
}

interface RecentMemory {
  _id: string;
  type: string;
  title?: string;
  content: string;
  createdAt: string;
}

interface DailyStat {
  count: number;
}

interface DashboardData {
  user: User;
  memoryStats: MemoryStat[];
  recentMemories: RecentMemory[];
  dailyStats: DailyStat[];
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMemoryContent, setNewMemoryContent] = useState('');
  const [newMemoryType, setNewMemoryType] = useState('note');
  const [isAddingMemory, setIsAddingMemory] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchDashboardData();
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await userAPI.getDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryContent.trim()) return;

    setIsAddingMemory(true);
    try {
      await memoryAPI.create({
        type: newMemoryType,
        content: newMemoryContent,
      });
      setNewMemoryContent('');
      fetchDashboardData(); // Refresh dashboard
    } catch (error) {
      console.error('Error adding memory:', error);
    } finally {
      setIsAddingMemory(false);
    }
  };

  const getMemoryTypeIcon = (type: string) => {
    switch (type) {
      case 'conversation':
        return <MessageSquare className="h-4 w-4" />;
      case 'task':
        return <CheckSquare className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'idea':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getMemoryTypeColor = (type: string) => {
    switch (type) {
      case 'conversation':
        return 'bg-blue-100 text-blue-800';
      case 'task':
        return 'bg-green-100 text-green-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      case 'idea':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">OneLast AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.firstName || user?.username}!
              </span>
              <button
                onClick={logout}
                title="Sign out"
                className="text-gray-500 hover:text-gray-700 p-2 rounded-md"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Quick Add Memory */}
        <div className="mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Add New Memory
              </h3>
              <form onSubmit={handleAddMemory}>
                <div className="flex space-x-4">
                  <select
                    value={newMemoryType}
                    onChange={(e) => setNewMemoryType(e.target.value)}
                    aria-label="Memory type"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="note">Note</option>
                    <option value="conversation">Conversation</option>
                    <option value="task">Task</option>
                    <option value="idea">Idea</option>
                    <option value="document">Document</option>
                  </select>
                  <input
                    type="text"
                    value={newMemoryContent}
                    onChange={(e) => setNewMemoryContent(e.target.value)}
                    placeholder="What would you like to remember?"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isAddingMemory || !newMemoryContent.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAddingMemory ? 'Adding...' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* AI Tools Quick Access */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">AI Tools</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a href="/ai/assistant" className="group">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-indigo-300">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">AI Assistant</p>
                    <p className="text-xs text-gray-500">Intelligent chat</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/ai/voice" className="group">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-indigo-300">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">Voice AI</p>
                    <p className="text-xs text-gray-500">Voice processing</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/ai/chat" className="group">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-indigo-300">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">Interactive Chat</p>
                    <p className="text-xs text-gray-500">Voice + text chat</p>
                  </div>
                </div>
              </div>
            </a>

            <a href="/ai/emoai" className="group">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-indigo-300">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🧠</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">EmoAI</p>
                    <p className="text-xs text-gray-500">Emotion analysis</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Memories
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {dashboardData?.user?.stats?.totalMemories || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      This Week
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {dashboardData?.dailyStats?.reduce((sum, day) => sum + day.count, 0) || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Member Since
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {dashboardData?.user?.stats?.joinDate ? 
                        new Date(dashboardData.user.stats.joinDate).toLocaleDateString() : 
                        'Today'
                      }
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Memories */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Memories
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your latest saved information
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              {dashboardData?.recentMemories?.length ? (
                dashboardData.recentMemories.map((memory) => (
                  <li key={memory._id} className="px-4 py-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMemoryTypeColor(memory.type)}`}>
                          {getMemoryTypeIcon(memory.type)}
                          <span className="ml-1 capitalize">{memory.type}</span>
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {memory.title || 'Untitled'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {memory.content?.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {new Date(memory.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-8 text-center">
                  <div className="text-gray-500">
                    <Brain className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No memories yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start by adding your first memory above.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Memory Type Distribution */}
        {dashboardData && dashboardData.memoryStats && dashboardData.memoryStats.length > 0 && (
          <div className="mt-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Memory Types
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {dashboardData.memoryStats.map((stat) => (
                    <div key={stat._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        {getMemoryTypeIcon(stat._id)}
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {stat._id}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
