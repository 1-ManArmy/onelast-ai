import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy } from '@phosphor-icons/react'
import { toast } from 'sonner'

const codeExamples = {
  javascript: `// Initialize OneLast.ai SDK
import { OneLast } from '@onelast/sdk'

const client = new OneLast({
  apiKey: 'your-api-key',
  endpoint: 'https://api.onelast.ai'
})

// Chat with AI module
const response = await client.chat.send({
  message: "Hello, how can you help me?",
  module: "chat",
  context: { userId: "user123" }
})

console.log(response.message)`,

  python: `# OneLast.ai Python SDK
from onelast import OneLast

# Initialize client
client = OneLast(
    api_key="your-api-key",
    endpoint="https://api.onelast.ai"
)

# Voice processing example
result = client.voice.process({
    "audio_data": audio_bytes,
    "format": "wav",
    "language": "en-US"
})

print(f"Transcription: {result.text}")`,

  curl: `# REST API Example
curl -X POST https://api.onelast.ai/v1/chat \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Analyze this code for bugs",
    "module": "code",
    "context": {
      "language": "javascript",
      "framework": "react"
    }
  }'`
}

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/v1/chat',
    description: 'Send messages to AI chat modules',
    subdomain: 'chat.onelast.ai'
  },
  {
    method: 'POST',
    endpoint: '/v1/voice/transcribe',
    description: 'Convert speech to text',
    subdomain: 'voice.onelast.ai'
  },
  {
    method: 'POST',
    endpoint: '/v1/voice/synthesize',
    description: 'Convert text to speech',
    subdomain: 'voice.onelast.ai'
  },
  {
    method: 'POST',
    endpoint: '/v1/code/analyze',
    description: 'Analyze and optimize code',
    subdomain: 'code.onelast.ai'
  },
  {
    method: 'GET',
    endpoint: '/v1/modules',
    description: 'List available AI modules',
    subdomain: 'api.onelast.ai'
  }
]

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  toast.success('Code copied to clipboard!')
}

export function DeveloperSection() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Developer Integration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate OneLast.ai modules into your applications with our comprehensive APIs,
            SDKs, and documentation. Get started in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Code Examples */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([key, code]) => (
                    <TabsContent key={key} value={key}>
                      <div className="relative">
                        <pre className="code-block rounded-lg p-4 text-sm overflow-x-auto">
                          <code className="text-foreground">{code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                          onClick={() => copyToClipboard(code)}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* API Endpoints */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/20 border border-border/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge 
                          className={`${
                            endpoint.method === 'GET' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}
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
                      <div className="text-xs text-accent font-mono">
                        {endpoint.subdomain}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Quick Start</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold">
                      1
                    </div>
                    <span className="text-sm">Get your API key from the dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold">
                      2
                    </div>
                    <span className="text-sm">Install the SDK or use REST API directly</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold">
                      3
                    </div>
                    <span className="text-sm">Start building with AI modules</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                  Get API Key
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}