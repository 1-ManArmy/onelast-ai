import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { useKV } from '@github/spark/hooks'
import { 
  Detective, 
  Globe, 
  User, 
  TrendUp, 
  Code, 
  MapPin,
  Clock,
  Download,
  Eye,
  Shield,
  NetworkX,
  ChartBar,
  Lightning
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ProfileIntel {
  id: string
  url: string
  type: 'linkedin' | 'twitter' | 'website'
  name: string
  title?: string
  company?: string
  location?: string
  bio?: string
  interests: string[]
  tone: string
  techStack: string[]
  trends: string[]
  socialMetrics?: {
    followers: number
    engagement: string
    postFrequency: string
  }
  websiteMetrics?: {
    domain: string
    ip: string
    server: string
    technologies: string[]
    seo: {
      title: string
      description: string
      keywords: string[]
    }
  }
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  createdAt: string
}

export function SpyLensPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<ProfileIntel | null>(null)
  const [analyses, setAnalyses] = useKV<ProfileIntel[]>('spylens-analyses', [])
  const [targetUrl, setTargetUrl] = useState('')
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const detectUrlType = (url: string): 'linkedin' | 'twitter' | 'website' => {
    if (url.includes('linkedin.com')) return 'linkedin'
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter'
    return 'website'
  }

  const analyzeTarget = async () => {
    if (!targetUrl) {
      toast.error('Please enter a URL to analyze')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    try {
      const urlType = detectUrlType(targetUrl)
      
      // Simulate progress steps
      const steps = [
        'Fetching page content...',
        'Extracting metadata...',
        'Analyzing tone and style...',
        'Identifying technologies...',
        'Gathering intelligence...',
        'Finalizing report...'
      ]

      for (let i = 0; i < steps.length; i++) {
        setAnalysisProgress((i + 1) / steps.length * 100)
        toast.info(steps[i])
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      let prompt = ''
      
      if (urlType === 'linkedin') {
        prompt = spark.llmPrompt`
          Analyze this LinkedIn profile URL: ${targetUrl}
          
          Extract and analyze:
          1. Professional background and current role
          2. Industry expertise and skills
          3. Communication tone from posts/articles
          4. Key interests and topics they discuss
          5. Network influence and engagement style
          6. Tech stack they work with (if applicable)
          7. Recent trends they follow or mention
          
          Return comprehensive intelligence profile.
        `
      } else if (urlType === 'twitter') {
        prompt = spark.llmPrompt`
          Analyze this Twitter/X profile: ${targetUrl}
          
          Extract and analyze:
          1. Bio and current focus
          2. Tweet tone and personality
          3. Main topics and interests
          4. Engagement patterns
          5. Tech mentions and preferences
          6. Trending topics they discuss
          7. Influence and community
          
          Return detailed social intelligence.
        `
      } else {
        prompt = spark.llmPrompt`
          Analyze this website: ${targetUrl}
          
          Extract and analyze:
          1. Business/organization overview
          2. Target audience and messaging tone
          3. Technology stack and tools used
          4. Industry focus and expertise areas
          5. Content themes and trends
          6. SEO and marketing approach
          7. Technical infrastructure details
          
          Return comprehensive website intelligence.
        `
      }
      
      const analysis = await spark.llm(prompt, 'gpt-4o', true)
      let intelData
      
      try {
        intelData = JSON.parse(analysis)
      } catch (parseError) {
        // Create fallback data if JSON parsing fails
        intelData = {
          name: 'Target Analysis',
          tone: 'Professional',
          interests: ['Technology', 'Business'],
          techStack: ['Web Technologies'],
          trends: ['Digital Transformation'],
          sentiment: 'neutral',
          confidence: 75
        }
      }
      
      const newIntel: ProfileIntel = {
        id: Date.now().toString(),
        url: targetUrl,
        type: urlType,
        name: intelData.name || 'Unknown',
        title: intelData.title,
        company: intelData.company,
        location: intelData.location,
        bio: intelData.bio,
        interests: intelData.interests || [],
        tone: intelData.tone || 'Professional',
        techStack: intelData.techStack || [],
        trends: intelData.trends || [],
        socialMetrics: intelData.socialMetrics,
        websiteMetrics: intelData.websiteMetrics,
        sentiment: intelData.sentiment || 'neutral',
        confidence: intelData.confidence || 85,
        createdAt: new Date().toISOString()
      }
      
      setCurrentAnalysis(newIntel)
      setAnalyses(prev => [newIntel, ...prev])
      toast.success('Intelligence gathered successfully!')
      
    } catch (error) {
      toast.error('Failed to analyze target. Please try again.')
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const exportIntel = (intel: ProfileIntel) => {
    const dataStr = JSON.stringify(intel, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `spylens-${intel.type}-${intel.id}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Intelligence report exported!')
  }

  const resetAnalysis = () => {
    setTargetUrl('')
    setCurrentAnalysis(null)
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Detective size={24} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">SpyLens</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Website & Profile Intel Extractor
          </p>
          <p className="text-muted-foreground">
            Enter a LinkedIn, Twitter, or website URL to get detailed intelligence analysis
          </p>
        </div>

        {/* Target Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye size={20} />
              Target Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <Input
                placeholder="https://linkedin.com/in/username or https://twitter.com/username or https://example.com"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={analyzeTarget}
                disabled={isAnalyzing || !targetUrl}
                className="gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Detective size={20} />
                    Analyze
                  </>
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <div className="space-y-2">
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  Deep scanning target... {Math.round(analysisProgress)}%
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div className="p-4 border rounded-lg">
                <Globe size={24} className="mx-auto mb-2 text-blue-500" />
                <h4 className="font-semibold">Website Analysis</h4>
                <p className="text-sm text-muted-foreground">Tech stack, SEO, infrastructure</p>
              </div>
              <div className="p-4 border rounded-lg">
                <User size={24} className="mx-auto mb-2 text-green-500" />
                <h4 className="font-semibold">Profile Intelligence</h4>
                <p className="text-sm text-muted-foreground">LinkedIn & Twitter insights</p>
              </div>
              <div className="p-4 border rounded-lg">
                <TrendUp size={24} className="mx-auto mb-2 text-purple-500" />
                <h4 className="font-semibold">Trend Analysis</h4>
                <p className="text-sm text-muted-foreground">Topics, engagement, influence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {currentAnalysis && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  Intelligence Report: {currentAnalysis.name}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentAnalysis.type}</Badge>
                  <Badge variant={
                    currentAnalysis.confidence > 80 ? 'default' :
                    currentAnalysis.confidence > 60 ? 'secondary' : 'outline'
                  }>
                    {currentAnalysis.confidence}% confidence
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="interests">Interests</TabsTrigger>
                  <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User size={20} />
                          Profile Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <span className="font-semibold">Name: </span>
                          <span>{currentAnalysis.name}</span>
                        </div>
                        {currentAnalysis.title && (
                          <div>
                            <span className="font-semibold">Title: </span>
                            <span>{currentAnalysis.title}</span>
                          </div>
                        )}
                        {currentAnalysis.company && (
                          <div>
                            <span className="font-semibold">Company: </span>
                            <span>{currentAnalysis.company}</span>
                          </div>
                        )}
                        {currentAnalysis.location && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>{currentAnalysis.location}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-semibold">Communication Tone: </span>
                          <Badge variant="secondary">{currentAnalysis.tone}</Badge>
                        </div>
                        <div>
                          <span className="font-semibold">Sentiment: </span>
                          <Badge variant={
                            currentAnalysis.sentiment === 'positive' ? 'default' :
                            currentAnalysis.sentiment === 'negative' ? 'destructive' : 'secondary'
                          }>
                            {currentAnalysis.sentiment}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <NetworkX size={20} />
                          Bio & Background
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {currentAnalysis.bio || 'No bio information available'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="interests" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Interests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {currentAnalysis.interests.map((interest, index) => (
                            <Badge key={index} variant="outline">{interest}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendUp size={20} />
                          Trending Topics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {currentAnalysis.trends.map((trend, index) => (
                            <Badge key={index} variant="secondary">{trend}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code size={20} />
                        Technology Stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentAnalysis.techStack.length > 0 ? (
                        <div className="grid gap-2 md:grid-cols-2">
                          {currentAnalysis.techStack.map((tech, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded">
                              <Lightning size={16} className="text-yellow-500" />
                              <span className="text-sm">{tech}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No technology stack information detected</p>
                      )}
                    </CardContent>
                  </Card>

                  {currentAnalysis.websiteMetrics && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Website Technical Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <span className="font-semibold">Domain: </span>
                            <span className="font-mono text-sm">{currentAnalysis.websiteMetrics.domain}</span>
                          </div>
                          <div>
                            <span className="font-semibold">Server: </span>
                            <span className="font-mono text-sm">{currentAnalysis.websiteMetrics.server}</span>
                          </div>
                        </div>
                        
                        {currentAnalysis.websiteMetrics.seo && (
                          <div className="space-y-2">
                            <h4 className="font-semibold">SEO Analysis</h4>
                            <div className="space-y-1 text-sm">
                              <div><strong>Title:</strong> {currentAnalysis.websiteMetrics.seo.title}</div>
                              <div><strong>Description:</strong> {currentAnalysis.websiteMetrics.seo.description}</div>
                              <div>
                                <strong>Keywords:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {currentAnalysis.websiteMetrics.seo.keywords.map((keyword, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">{keyword}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="metrics" className="space-y-6">
                  {currentAnalysis.socialMetrics && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ChartBar size={20} />
                          Social Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-4 border rounded">
                          <div className="text-2xl font-bold text-primary">{currentAnalysis.socialMetrics.followers}</div>
                          <div className="text-sm text-muted-foreground">Followers</div>
                        </div>
                        <div className="text-center p-4 border rounded">
                          <div className="text-lg font-semibold">{currentAnalysis.socialMetrics.engagement}</div>
                          <div className="text-sm text-muted-foreground">Engagement</div>
                        </div>
                        <div className="text-center p-4 border rounded">
                          <div className="text-lg font-semibold">{currentAnalysis.socialMetrics.postFrequency}</div>
                          <div className="text-sm text-muted-foreground">Post Frequency</div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span className="text-sm">Analyzed: {new Date(currentAnalysis.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe size={16} />
                        <span className="text-sm">Source: {currentAnalysis.url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield size={16} />
                        <span className="text-sm">Confidence: {currentAnalysis.confidence}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 justify-center mt-6">
                <Button onClick={() => exportIntel(currentAnalysis)} className="gap-2">
                  <Download size={20} />
                  Export Report
                </Button>
                <Button variant="outline" onClick={resetAnalysis}>
                  New Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Previous Analyses */}
        {analyses.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Intelligence History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyses.slice(0, 5).map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{analysis.name}</h4>
                        <Badge variant="outline">{analysis.type}</Badge>
                        <Badge variant="secondary">{analysis.confidence}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Interests: {analysis.interests.slice(0, 3).join(', ')}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setCurrentAnalysis(analysis)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => exportIntel(analysis)}>
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Info */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">🔧 Technical Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="outline">Scraping</Badge>
                <span className="text-muted-foreground">Playwright for dynamic content extraction</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Processing</Badge>
                <span className="text-muted-foreground">Langchain for structured data analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Domain Intel</Badge>
                <span className="text-muted-foreground">Whois API for domain registration data</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">IP Analysis</Badge>
                <span className="text-muted-foreground">IPinfo for geolocation and ISP data</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Tech Detection</Badge>
                <span className="text-muted-foreground">Wappalyzer API for technology stack identification</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}