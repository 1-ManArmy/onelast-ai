import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ChartBar, 
  Clock, 
  TrendUp, 
  Code, 
  Users, 
  Activity,
  CheckCircle,
  XCircle,
  Timer,
  ArrowLeft
} from '@phosphor-icons/react'

interface APIMetric {
  endpoint: string
  requests: number
  successRate: number
  avgResponseTime: number
  errors: number
  lastUsed: string
}

interface UsageStats {
  totalRequests: number
  totalErrors: number
  avgResponseTime: number
  activeEndpoints: number
  uptime: number
}

const mockEndpoints: APIMetric[] = [
  {
    endpoint: '/api/mood/analyze',
    requests: 1247,
    successRate: 98.2,
    avgResponseTime: 145,
    errors: 23,
    lastUsed: '2 minutes ago'
  },
  {
    endpoint: '/api/mood/insights',
    requests: 892,
    successRate: 99.1,
    avgResponseTime: 89,
    errors: 8,
    lastUsed: '5 minutes ago'
  },
  {
    endpoint: '/api/mood/recommendations',
    requests: 634,
    successRate: 97.8,
    avgResponseTime: 203,
    errors: 14,
    lastUsed: '1 minute ago'
  },
  {
    endpoint: '/api/mood/history',
    requests: 445,
    successRate: 99.5,
    avgResponseTime: 67,
    errors: 2,
    lastUsed: '8 minutes ago'
  },
  {
    endpoint: '/api/agent/create',
    requests: 289,
    successRate: 96.9,
    avgResponseTime: 178,
    errors: 9,
    lastUsed: '12 minutes ago'
  },
  {
    endpoint: '/api/vision/analyze',
    requests: 156,
    successRate: 94.2,
    avgResponseTime: 245,
    errors: 9,
    lastUsed: '15 minutes ago'
  }
]

const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    requests: Math.floor(Math.random() * 100) + 20,
    errors: Math.floor(Math.random() * 5)
  }))
}

interface APIAnalyticsDashboardProps {
  onBack: () => void
}

export function APIAnalyticsDashboard({ onBack }: APIAnalyticsDashboardProps) {
  const [usageStats, setUsageStats] = useState<UsageStats>({
    totalRequests: 3507,
    totalErrors: 56,
    avgResponseTime: 134,
    activeEndpoints: 6,
    uptime: 99.7
  })

  const [hourlyData] = useState(generateHourlyData())
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUsageStats(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 5),
        totalErrors: prev.totalErrors + (Math.random() > 0.9 ? 1 : 0),
        avgResponseTime: Math.floor(prev.avgResponseTime + (Math.random() - 0.5) * 10)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen py-8 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Button>
            <div className="text-2xl font-bold gradient-text">
              One Last AI
            </div>
          </div>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            API Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor your AI API usage, performance metrics, and system health in real-time
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold text-foreground">{usageStats.totalRequests.toLocaleString()}</p>
                </div>
                <ChartBar size={24} className="text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-green-400">
                    {((usageStats.totalRequests - usageStats.totalErrors) / usageStats.totalRequests * 100).toFixed(1)}%
                  </p>
                </div>
                <CheckCircle size={24} className="text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-foreground">{usageStats.avgResponseTime}ms</p>
                </div>
                <Timer size={24} className="text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Endpoints</p>
                  <p className="text-2xl font-bold text-foreground">{usageStats.activeEndpoints}</p>
                </div>
                <Code size={24} className="text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-2xl font-bold text-green-400">{usageStats.uptime}%</p>
                </div>
                <Activity size={24} className="text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="errors">Error Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Usage Chart Placeholder */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>API Usage Trends</CardTitle>
                      <CardDescription>Requests over the last 24 hours</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedTimeframe === '24h' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTimeframe('24h')}
                      >
                        24h
                      </Button>
                      <Button
                        variant={selectedTimeframe === '7d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTimeframe('7d')}
                      >
                        7d
                      </Button>
                      <Button
                        variant={selectedTimeframe === '30d' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedTimeframe('30d')}
                      >
                        30d
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <ChartBar size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Chart visualization would be rendered here</p>
                      <p className="text-sm">Showing {selectedTimeframe} timeframe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Endpoint Performance</CardTitle>
                  <CardDescription>Detailed metrics for each API endpoint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEndpoints.map((endpoint, index) => (
                      <motion.div
                        key={endpoint.endpoint}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-border/50 bg-muted/20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <code className="text-accent font-mono text-sm">{endpoint.endpoint}</code>
                            <p className="text-xs text-muted-foreground">Last used: {endpoint.lastUsed}</p>
                          </div>
                          <Badge 
                            className={endpoint.successRate > 95 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                          >
                            {endpoint.successRate}% success
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Requests</p>
                            <p className="font-medium">{endpoint.requests.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Response</p>
                            <p className="font-medium">{endpoint.avgResponseTime}ms</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Errors</p>
                            <p className="font-medium text-red-400">{endpoint.errors}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="font-medium text-green-400">Healthy</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Response Time Distribution</CardTitle>
                    <CardDescription>Average response times by endpoint</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockEndpoints.map((endpoint) => (
                        <div key={endpoint.endpoint} className="flex items-center justify-between">
                          <code className="text-xs text-muted-foreground">{endpoint.endpoint.split('/').pop()}</code>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-accent rounded-full"
                                style={{ width: `${Math.min(endpoint.avgResponseTime / 3, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{endpoint.avgResponseTime}ms</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>Error Rate Trends</CardTitle>
                    <CardDescription>Error percentage over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <TrendUp size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Error trend chart would be here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="errors" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Recent Error Logs</CardTitle>
                  <CardDescription>Latest errors and exceptions from your API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { time: '2 minutes ago', endpoint: '/api/mood/analyze', error: 'Rate limit exceeded', status: 429 },
                      { time: '5 minutes ago', endpoint: '/api/agent/create', error: 'Invalid parameter', status: 400 },
                      { time: '12 minutes ago', endpoint: '/api/vision/analyze', error: 'Timeout', status: 504 },
                    ].map((log, index) => (
                      <div key={index} className="p-3 rounded-lg border border-red-500/20 bg-red-500/5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <XCircle size={16} className="text-red-400" />
                            <code className="text-sm text-accent">{log.endpoint}</code>
                            <Badge variant="outline" className="text-red-400 border-red-400/50">
                              {log.status}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{log.time}</span>
                        </div>
                        <p className="text-sm text-red-400">{log.error}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
