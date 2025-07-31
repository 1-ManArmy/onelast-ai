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
              <span className="ml-2 text-xl font-bold text-gray-900">Onelast.AI</span>
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
