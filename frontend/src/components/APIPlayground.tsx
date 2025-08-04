import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Code, 
  Play, 
  Copy, 
  CheckCircle, 
  XCircle, 
  Clock,
  Lightning,
  Globe,
  Key,
  Download
} from '@phosphor-icons/react'
import { toast } from 'sonner'

const apiEndpoints = [
  {
    id: 'mood-analyze',
    name: 'Mood Analysis',
    method: 'POST',
    endpoint: '/api/v1/mood/analyze',
    description: 'Analyze mood patterns from text input with detailed emotional insights',
    parameters: [
      { name: 'text', type: 'string', required: true, description: 'Text content to analyze' },
      { name: 'includeInsights', type: 'boolean', required: false, description: 'Include detailed insights' },
      { name: 'language', type: 'string', required: false, description: 'Language code (default: en)' }
    ],
    exampleRequest: {
      text: "I'm feeling overwhelmed with work but excited about the weekend plans",
      includeInsights: true,
      language: "en"
    },
    exampleResponse: {
      mood: "mixed",
      emotions: {
        stress: 0.75,
        excitement: 0.68,
        optimism: 0.45
      },
      insights: {
        primary_emotion: "stress",
        recommendations: ["Take short breaks", "Practice mindfulness"],
        patterns: ["work-related stress", "anticipation of leisure"]
      }
    }
  },
  {
    id: 'agent-create',
    name: 'Create Agent',
    method: 'POST',
    endpoint: '/api/v1/agent/create',
    description: 'Create a new AI agent with specific capabilities and objectives',
    parameters: [
      { name: 'name', type: 'string', required: true, description: 'Agent name' },
      { name: 'type', type: 'string', required: true, description: 'Agent type (general, specialist, etc.)' },
      { name: 'objectives', type: 'array', required: true, description: 'Agent objectives and goals' },
      { name: 'capabilities', type: 'array', required: false, description: 'Agent capabilities' }
    ],
    exampleRequest: {
      name: "DataAnalyzer",
      type: "specialist",
      objectives: ["Analyze data patterns", "Generate insights", "Create reports"],
      capabilities: ["data_processing", "visualization", "reporting"]
    },
    exampleResponse: {
      agent_id: "agent_123",
      status: "created",
      configuration: {
        name: "DataAnalyzer",
        type: "specialist",
        endpoints: ["/analyze", "/report", "/visualize"]
      }
    }
  },
  {
    id: 'vision-analyze',
    name: 'Vision Analysis',
    method: 'POST',
    endpoint: '/api/v1/vision/analyze',
    description: 'Analyze images for emotional content and visual patterns',
    parameters: [
      { name: 'image', type: 'file', required: true, description: 'Image file to analyze' },
      { name: 'analysis_type', type: 'string', required: false, description: 'Type of analysis (emotion, objects, text)' }
    ],
    exampleRequest: {
      image: "base64_encoded_image_data",
      analysis_type: "emotion"
    },
    exampleResponse: {
      detected_emotions: ["happiness", "surprise"],
      confidence: 0.89,
      objects: ["person", "smile"],
      text_content: null
    }
  }
]

interface APITestingProps {
  onBack?: () => void
}

export function APIPlayground({ onBack }: APITestingProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiEndpoints[0])
  const [apiKey, setApiKey] = useState('')
  const [requestBody, setRequestBody] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [responseTime, setResponseTime] = useState(0)

  useEffect(() => {
    setRequestBody(JSON.stringify(selectedEndpoint.exampleRequest, null, 2))
    setResponse(JSON.stringify(selectedEndpoint.exampleResponse, null, 2))
  }, [selectedEndpoint])

  const handleSendRequest = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your API key')
      return
    }

    setIsLoading(true)
    const startTime = Date.now()

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const endTime = Date.now()
      setResponseTime(endTime - startTime)
      
      // Simulate successful response
      setResponse(JSON.stringify({
        success: true,
        data: selectedEndpoint.exampleResponse,
        timestamp: new Date().toISOString(),
        request_id: `req_${Math.random().toString(36).substr(2, 9)}`
      }, null, 2))
      
      toast.success('Request completed successfully!')
    } catch (error) {
      toast.error('Request failed. Please try again.')
      setResponse(JSON.stringify({
        error: 'Request failed',
        message: 'Please check your API key and try again',
        timestamp: new Date().toISOString()
      }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const methodColors = {
    GET: 'bg-green-500/20 text-green-400 border-green-500/30',
    POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    PUT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {onBack && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              ← Back to Overview
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            API Playground
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test our AI API endpoints directly in your browser with real-time examples
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoints List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={20} className="text-accent" />
                  API Endpoints
                </CardTitle>
                <CardDescription>
                  Select an endpoint to test
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {apiEndpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedEndpoint.id === endpoint.id
                        ? 'border-accent/50 bg-accent/10'
                        : 'border-border/50 hover:border-accent/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={methodColors[endpoint.method as keyof typeof methodColors]}>
                        {endpoint.method}
                      </Badge>
                      <span className="font-medium text-sm">{endpoint.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {endpoint.endpoint}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* API Testing Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Code size={20} className="text-accent" />
                      {selectedEndpoint.name}
                    </CardTitle>
                    <CardDescription>
                      {selectedEndpoint.description}
                    </CardDescription>
                  </div>
                  <Badge className={methodColors[selectedEndpoint.method as keyof typeof methodColors]}>
                    {selectedEndpoint.method}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="test" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="test">Test API</TabsTrigger>
                    <TabsTrigger value="parameters">Parameters</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>

                  <TabsContent value="test" className="space-y-4">
                    {/* API Key Input */}
                    <div className="space-y-2">
                      <Label htmlFor="apiKey" className="flex items-center gap-2">
                        <Key size={16} />
                        API Key
                      </Label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="Enter your API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="font-mono"
                      />
                    </div>

                    {/* Request Body */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Request Body</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(requestBody)}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                      <Textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="font-mono text-sm min-h-32"
                        placeholder="Enter request body..."
                      />
                    </div>

                    {/* Test Button */}
                    <Button
                      onClick={handleSendRequest}
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Clock size={16} className="mr-2 animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Play size={16} className="mr-2" />
                          Send Request
                        </>
                      )}
                    </Button>

                    {/* Response */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Response</Label>
                        <div className="flex items-center gap-2">
                          {responseTime > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Lightning size={12} className="mr-1" />
                              {responseTime}ms
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(response)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={response}
                        readOnly
                        className="font-mono text-sm min-h-32 bg-muted/20"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="parameters" className="space-y-4">
                    <div className="space-y-3">
                      {selectedEndpoint.parameters.map((param, index) => (
                        <div key={index} className="p-3 rounded-lg border border-border/50">
                          <div className="flex items-center gap-2 mb-2">
                            <code className="text-accent font-mono text-sm">{param.name}</code>
                            <Badge variant={param.required ? 'default' : 'secondary'} className="text-xs">
                              {param.required ? 'Required' : 'Optional'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {param.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Example Request</h4>
                        <div className="relative">
                          <pre className="bg-muted/20 p-3 rounded-lg text-sm overflow-x-auto">
                            <code>{JSON.stringify(selectedEndpoint.exampleRequest, null, 2)}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(JSON.stringify(selectedEndpoint.exampleRequest, null, 2))}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Example Response</h4>
                        <div className="relative">
                          <pre className="bg-muted/20 p-3 rounded-lg text-sm overflow-x-auto">
                            <code>{JSON.stringify(selectedEndpoint.exampleResponse, null, 2)}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(JSON.stringify(selectedEndpoint.exampleResponse, null, 2))}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
