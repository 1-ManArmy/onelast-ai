import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code, Copy, Terminal, Globe, Lightning } from '@phosphor-icons/react'
import { toast } from 'sonner'

const codeExamples = [
  {
    language: 'JavaScript',
    title: 'AI Agent Creation',
    code: `// Initialize OneLastAI SDK
const oneLastAI = new OneLastAI({
  apiKey: 'your-api-key',
  endpoint: 'https://api.onelast.ai'
});

// Create a specialized AI agent
const createAgent = async (agentConfig) => {
  try {
    const response = await oneLastAI.agents.create({
      name: agentConfig.name,
      type: agentConfig.type,
      objectives: agentConfig.objectives,
      capabilities: agentConfig.capabilities,
      settings: {
        autonomy_level: 'supervised',
        learning_enabled: true,
        memory_retention: '30d'
      }
    });
    
    console.log('Agent Created:', response);
    return response;
  } catch (error) {
    console.error('Agent creation failed:', error);
  }
};

// Usage example
const agentConfig = {
  name: "DataAnalyzer",
  type: "specialist",
  objectives: ["Analyze data patterns", "Generate insights"],
  capabilities: ["data_processing", "visualization", "reporting"]
};

const newAgent = await createAgent(agentConfig);`
  },
  {
    language: 'Python',
    title: 'Mood Analysis with Agent',
    code: `import requests
from datetime import datetime

class OneLastAIClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.onelast.ai"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def analyze_mood(self, text, user_id=None):
        payload = {
            "text": text,
            "user_id": user_id,
            "options": {
                "include_emotions": True,
                "include_sentiment": True,
                "include_recommendations": True,
                "include_patterns": True
            }
        }
        
        response = requests.post(
            f"{self.base_url}/mood/analyze",
            json=payload,
            headers=self.headers
        )
        
        return response.json()
    
    def create_agent(self, config):
        response = requests.post(
            f"{self.base_url}/agents/create",
            json=config,
            headers=self.headers
        )
        
        return response.json()

# Initialize client
client = OneLastAIClient('your-api-key')

# Analyze mood
mood_result = client.analyze_mood(
    "I'm excited about the new AI project we're starting!",
    user_id="user123"
)

# Create an agent
agent_config = {
    "name": "MoodTracker",
    "type": "monitoring",
    "objectives": ["Track user mood patterns", "Provide wellness insights"],
    "capabilities": ["mood_analysis", "pattern_recognition", "recommendations"]
}

agent = client.create_agent(agent_config)`
  },
  {
    language: 'cURL',
    title: 'Real-time Vision Analysis',
    code: `# Vision analysis endpoint
curl -X POST "https://api.onelast.ai/vision/analyze" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "analysis_type": "emotion",
    "options": {
      "detect_faces": true,
      "analyze_expressions": true,
      "confidence_threshold": 0.8
    },
    "user_id": "user123",
    "timestamp": "2024-01-15T10:30:00Z"
  }'

# Response format
{
  "analysis_id": "vision_123",
  "detected_emotions": [
    {
      "emotion": "happiness",
      "confidence": 0.92,
      "bounding_box": [100, 50, 200, 150]
    },
    {
      "emotion": "surprise",
      "confidence": 0.76,
      "bounding_box": [120, 60, 180, 140]
    }
  ],
  "overall_mood": "positive",
  "face_count": 1,
  "analysis_time": "0.234s",
  "timestamp": "2024-01-15T10:30:00Z"
}`
  }
]

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/mood/analyze',
    description: 'Analyze mood from text input with emotional intelligence',
    parameters: ['text', 'user_id', 'options']
  },
  {
    method: 'POST',
    endpoint: '/api/agents/create',
    description: 'Create a new AI agent with specific capabilities',
    parameters: ['name', 'type', 'objectives', 'capabilities']
  },
  {
    method: 'POST',
    endpoint: '/api/vision/analyze',
    description: 'Analyze images for emotional content and visual patterns',
    parameters: ['image', 'analysis_type', 'options']
  },
  {
    method: 'GET',
    endpoint: '/api/mood/insights/{user_id}',
    description: 'Get personalized mood insights and patterns',
    parameters: ['period', 'include_patterns', 'include_recommendations']
  },
  {
    method: 'GET',
    endpoint: '/api/agents/{agent_id}/status',
    description: 'Get current status and performance of an AI agent',
    parameters: ['include_metrics', 'include_logs']
  },
  {
    method: 'POST',
    endpoint: '/api/mood/track',
    description: 'Track mood entries over time for pattern analysis',
    parameters: ['entries[]', 'user_id', 'context']
  }
]

export function DeveloperSection() {
  const [selectedExample, setSelectedExample] = useState(0)
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({})

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates(prev => ({ ...prev, [key]: true }))
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }))
    }, 2000)
    toast.success('Code copied to clipboard!')
  }

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Developer Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Integrate OneLastAI into your applications with our powerful APIs and SDKs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Live Code Examples */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-fit">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Code size={20} className="text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Live Code Examples</CardTitle>
                    <CardDescription>Ready-to-use code snippets for quick integration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedExample.toString()} onValueChange={(value) => setSelectedExample(parseInt(value))}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="0">JavaScript</TabsTrigger>
                    <TabsTrigger value="1">Python</TabsTrigger>
                    <TabsTrigger value="2">cURL</TabsTrigger>
                  </TabsList>

                  {codeExamples.map((example, index) => (
                    <TabsContent key={index} value={index.toString()}>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{example.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(example.code, `example-${index}`)}
                            className="h-8 px-2"
                          >
                            {copiedStates[`example-${index}`] ? (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy size={16} className="mr-1" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="relative">
                          <pre className="bg-muted/30 p-4 rounded-lg text-xs overflow-x-auto border border-border/30">
                            <code className="text-foreground">{example.code}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* API Reference */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-fit">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Globe size={20} className="text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">API Reference</CardTitle>
                    <CardDescription>RESTful API endpoints for OneLastAI</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Lightning size={16} className="text-accent" />
                    Base URL: <code className="bg-muted/30 px-2 py-1 rounded text-accent">https://api.onelast.ai</code>
                  </div>

                  <div className="space-y-3">
                    {apiEndpoints.map((endpoint, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Badge 
                            variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                            className="text-xs"
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-accent font-mono text-sm">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {endpoint.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {endpoint.parameters.map((param, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button className="w-full" variant="outline">
                      <Globe size={16} className="mr-2" />
                      View Full API Docs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Integration Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-card/30 backdrop-blur-sm border-border/50 text-center p-6">
            <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto mb-4">
              <Lightning size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Process mood and vision data in real-time with sub-second response times
            </p>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50 text-center p-6">
            <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto mb-4">
              <Code size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multiple SDKs</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript, Python, and REST APIs for seamless integration
            </p>
          </Card>

          <Card className="bg-card/30 backdrop-blur-sm border-border/50 text-center p-6">
            <div className="p-3 rounded-full bg-accent/20 w-fit mx-auto mb-4">
              <Globe size={24} className="text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Global Scale</h3>
            <p className="text-sm text-muted-foreground">
              99.9% uptime with global CDN and enterprise-grade infrastructure
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
