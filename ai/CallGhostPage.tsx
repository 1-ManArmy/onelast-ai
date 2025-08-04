import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useKV } from '@github/spark/hooks'
import { 
  Phone, 
  Play, 
  Square, 
  MicrophoneStage, 
  User, 
  Clock,
  Download,
  PhoneCall,
  Volume,
  Record
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface CallScenario {
  id: string
  title: string
  description: string
  targetPhone: string
  voiceType: string
  script: string
  duration: number
  purpose: string
  createdAt: string
  audioUrl?: string
  callStatus: 'pending' | 'generated' | 'called' | 'completed'
}

export function CallGhostPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentCall, setCurrentCall] = useState<CallScenario | null>(null)
  const [calls, setCalls] = useKV<CallScenario[]>('callghost-scenarios', [])
  
  const [formData, setFormData] = useState({
    title: '',
    targetPhone: '',
    purpose: '',
    scenario: '',
    voiceType: 'professional',
    tone: 'friendly',
    duration: '2',
    customInstructions: ''
  })

  const voiceTypes = [
    { value: 'professional', label: 'Professional Male' },
    { value: 'professional-female', label: 'Professional Female' },
    { value: 'casual-male', label: 'Casual Male' },
    { value: 'casual-female', label: 'Casual Female' },
    { value: 'elderly-male', label: 'Elderly Male' },
    { value: 'elderly-female', label: 'Elderly Female' },
    { value: 'young-adult', label: 'Young Adult' }
  ]

  const callPurposes = [
    { value: 'sales-demo', label: 'Sales Demo Call' },
    { value: 'customer-service', label: 'Customer Service Training' },
    { value: 'appointment', label: 'Appointment Booking' },
    { value: 'survey', label: 'Survey/Research' },
    { value: 'reminder', label: 'Appointment Reminder' },
    { value: 'follow-up', label: 'Follow-up Call' },
    { value: 'support', label: 'Technical Support' },
    { value: 'custom', label: 'Custom Scenario' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateCallScript = async () => {
    if (!formData.title || !formData.purpose || !formData.scenario) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    
    try {
      const prompt = spark.llmPrompt`
        Generate a realistic phone call script for this scenario:
        
        Title: ${formData.title}
        Purpose: ${formData.purpose}
        Scenario: ${formData.scenario}
        Voice Type: ${formData.voiceType}
        Tone: ${formData.tone}
        Target Duration: ${formData.duration} minutes
        Custom Instructions: ${formData.customInstructions}
        
        Create a natural, conversational phone script that includes:
        1. Opening greeting and introduction
        2. Main conversation flow with likely responses
        3. Handling common objections or questions
        4. Professional closing
        5. Fallback responses for unexpected situations
        
        Make it sound natural and human-like, appropriate for ${formData.purpose}.
        Include [PAUSE] markers for natural conversation flow.
        Add [LISTEN] markers where the AI should wait for responses.
      `
      
      const script = await spark.llm(prompt)
      
      const newCall: CallScenario = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.scenario,
        targetPhone: formData.targetPhone,
        voiceType: formData.voiceType,
        script: script,
        duration: parseInt(formData.duration),
        purpose: formData.purpose,
        createdAt: new Date().toISOString(),
        callStatus: 'generated'
      }
      
      setCurrentCall(newCall)
      setCalls(prev => [newCall, ...prev])
      toast.success('Call script generated successfully!')
      
    } catch (error) {
      toast.error('Failed to generate call script. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const simulateCall = async (call: CallScenario) => {
    toast.info('Initiating AI call simulation...')
    
    // Simulate call generation process
    setTimeout(() => {
      const updatedCall = { ...call, callStatus: 'called' as const }
      setCalls(prev => prev.map(c => c.id === call.id ? updatedCall : c))
      setCurrentCall(updatedCall)
      toast.success('AI call completed successfully!')
    }, 3000)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      targetPhone: '',
      purpose: '',
      scenario: '',
      voiceType: 'professional',
      tone: 'friendly',
      duration: '2',
      customInstructions: ''
    })
    setCurrentCall(null)
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Phone size={24} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">CallGhost</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Real-Time AI Call Generator
          </p>
          <p className="text-muted-foreground">
            Send an AI voice to make realistic demo calls for training and testing
          </p>
        </div>

        {/* Main Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall size={20} />
              Create AI Call Scenario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Call Title *</label>
                <Input
                  placeholder="e.g., Sales Demo for CRM Software"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Phone (Demo)</label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={formData.targetPhone}
                  onChange={(e) => handleInputChange('targetPhone', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Call Purpose *</label>
                <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select call purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    {callPurposes.map((purpose) => (
                      <SelectItem key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Voice Type</label>
                <Select value={formData.voiceType} onValueChange={(value) => handleInputChange('voiceType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceTypes.map((voice) => (
                      <SelectItem key={voice.value} value={voice.value}>
                        {voice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="2">2 minutes</SelectItem>
                    <SelectItem value="3">3 minutes</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Call Scenario *</label>
              <Textarea
                placeholder="Describe the call scenario, context, and what the AI should accomplish..."
                value={formData.scenario}
                onChange={(e) => handleInputChange('scenario', e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Custom Instructions (Optional)</label>
              <Textarea
                placeholder="Any specific instructions, phrases to use, or responses to expect..."
                value={formData.customInstructions}
                onChange={(e) => handleInputChange('customInstructions', e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={generateCallScript}
              disabled={isGenerating || !formData.title || !formData.purpose || !formData.scenario}
              className="w-full gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating Call Script...
                </>
              ) : (
                <>
                  <MicrophoneStage size={20} />
                  Generate AI Call
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Call Display */}
        {currentCall && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume size={20} />
                  Generated Call: {currentCall.title}
                </div>
                <Badge variant={
                  currentCall.callStatus === 'generated' ? 'default' :
                  currentCall.callStatus === 'called' ? 'secondary' :
                  'outline'
                }>
                  {currentCall.callStatus}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-sm">
                    {voiceTypes.find(v => v.value === currentCall.voiceType)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-sm">{currentCall.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span className="text-sm">{currentCall.targetPhone || 'Demo Mode'}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Call Script Preview</h4>
                <div className="bg-muted/30 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {currentCall.script}
                  </pre>
                </div>
              </div>

              <div className="flex gap-3">
                {currentCall.callStatus === 'generated' && (
                  <Button onClick={() => simulateCall(currentCall)} className="gap-2">
                    <Play size={20} />
                    Execute Call
                  </Button>
                )}
                <Button variant="outline" className="gap-2">
                  <Download size={20} />
                  Download Script
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Create New
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Previous Calls */}
        {calls.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Call History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calls.slice(0, 5).map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{call.title}</h4>
                        <Badge variant={
                          call.callStatus === 'generated' ? 'default' :
                          call.callStatus === 'called' ? 'secondary' :
                          'outline'
                        }>
                          {call.callStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{call.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{call.duration} min</span>
                        <span>{voiceTypes.find(v => v.value === call.voiceType)?.label}</span>
                        <span>{new Date(call.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {call.callStatus === 'generated' && (
                        <Button size="sm" onClick={() => simulateCall(call)}>
                          <Play size={16} />
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => setCurrentCall(call)}>
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Use Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>💡 Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Sales Training</h4>
                <p className="text-sm text-muted-foreground">
                  Practice handling objections, closing techniques, and demo calls
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Customer Service</h4>
                <p className="text-sm text-muted-foreground">
                  Train support teams with realistic customer scenarios
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Testing & QA</h4>
                <p className="text-sm text-muted-foreground">
                  Test phone systems, IVR flows, and call routing
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Demo Sandbox</h4>
                <p className="text-sm text-muted-foreground">
                  Safe environment for testing call strategies
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Info */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">🔧 Technical Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="outline">Voice</Badge>
                <span className="text-muted-foreground">Twilio Programmable Voice for call infrastructure</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">TTS</Badge>
                <span className="text-muted-foreground">Play.ht or ElevenLabs for realistic voice synthesis</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">STT</Badge>
                <span className="text-muted-foreground">OpenAI Whisper for speech recognition</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">AI</Badge>
                <span className="text-muted-foreground">GPT-4o for conversation flow and responses</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Recording</Badge>
                <span className="text-muted-foreground">Twilio Recording API for call playback</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}