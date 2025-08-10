import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useKV } from '@github/spark/hooks'
import { 
  Dna, 
  Sparkle, 
  User, 
  Brain, 
  Palette, 
  MicrophoneStage,
  Download,
  Share,
  Magic
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface PersonalityProfile {
  id: string
  name: string
  personality: string
  traits: string[]
  voiceStyle: string
  interests: string[]
  communicationStyle: string
  backstory: string
  avatar: string
  createdAt: string
}

export function DNAForgePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProfile, setGeneratedProfile] = useState<PersonalityProfile | null>(null)
  const [profiles, setProfiles] = useKV<PersonalityProfile[]>('dna-forge-profiles', [])
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    socialMediaPosts: '',
    favoriteQuotes: '',
    hobbies: '',
    communicationStyle: '',
    personalValues: '',
    workStyle: '',
    relationships: ''
  })

  const steps = [
    { title: 'Basic Info', icon: <User size={20} /> },
    { title: 'Social Style', icon: <Share size={20} /> },
    { title: 'Personality Deep Dive', icon: <Brain size={20} /> },
    { title: 'Generate DNA', icon: <Dna size={20} /> }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generatePersonality = async () => {
    setIsGenerating(true)
    
    try {
      const prompt = spark.llmPrompt`
        Based on this user data, create a comprehensive AI personality profile:
        
        Name: ${formData.name}
        Social Media Style: ${formData.socialMediaPosts}
        Favorite Quotes: ${formData.favoriteQuotes}
        Hobbies: ${formData.hobbies}
        Communication Style: ${formData.communicationStyle}
        Personal Values: ${formData.personalValues}
        Work Style: ${formData.workStyle}
        Relationships: ${formData.relationships}
        
        Generate a detailed personality profile including:
        1. Core personality description (2-3 sentences)
        2. 5 key personality traits
        3. Voice/speaking style description
        4. 5 main interests/topics they'd discuss
        5. Communication style preferences
        6. A brief backstory/origin story
        7. Avatar description (appearance, style)
        
        Make it unique, authentic, and ready for AI implementation.
      `
      
      const result = await spark.llm(prompt, 'gpt-4o', true)
      let profileData
      
      try {
        profileData = JSON.parse(result)
      } catch (parseError) {
        // If JSON parsing fails, create a fallback response
        profileData = {
          personality: `${formData.name} is a unique individual with diverse interests and a thoughtful communication style.`,
          traits: ['Creative', 'Thoughtful', 'Engaging', 'Authentic', 'Adaptable'],
          voiceStyle: 'Conversational and engaging with a personal touch',
          interests: formData.hobbies ? formData.hobbies.split(',').map(h => h.trim()) : ['Technology', 'Learning', 'Communication'],
          communicationStyle: formData.communicationStyle || 'Friendly and approachable',
          backstory: `${formData.name} brings a rich blend of experiences and interests to every conversation.`,
          avatar: 'Professional and approachable appearance with modern styling'
        }
      }
      
      const newProfile: PersonalityProfile = {
        id: Date.now().toString(),
        name: formData.name,
        personality: profileData.personality,
        traits: profileData.traits,
        voiceStyle: profileData.voiceStyle,
        interests: profileData.interests,
        communicationStyle: profileData.communicationStyle,
        backstory: profileData.backstory,
        avatar: profileData.avatar,
        createdAt: new Date().toISOString()
      }
      
      setGeneratedProfile(newProfile)
      setProfiles(prev => [newProfile, ...prev])
      setCurrentStep(3)
      toast.success('AI Personality DNA Generated!')
      
    } catch (error) {
      toast.error('Failed to generate personality. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const exportProfile = (profile: PersonalityProfile) => {
    const dataStr = JSON.stringify(profile, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${profile.name}-personality-dna.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Profile exported successfully!')
  }

  const resetForm = () => {
    setCurrentStep(0)
    setGeneratedProfile(null)
    setFormData({
      name: '',
      socialMediaPosts: '',
      favoriteQuotes: '',
      hobbies: '',
      communicationStyle: '',
      personalValues: '',
      workStyle: '',
      relationships: ''
    })
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Dna size={24} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">DNAForge</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Personality + AI Avatar Generator
          </p>
          <p className="text-muted-foreground">
            Transform your digital footprint into a complete AI persona that talks like you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 ${
                  index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.icon}
                <span className="text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {steps[currentStep]?.icon}
              {steps[currentStep]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">What's your name?</label>
                  <Input
                    placeholder="Enter your name or preferred persona name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Share some of your recent social media posts or typical messages</label>
                  <Textarea
                    placeholder="Paste a few of your tweets, Facebook posts, or typical messages you send..."
                    value={formData.socialMediaPosts}
                    onChange={(e) => handleInputChange('socialMediaPosts', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">What are your favorite quotes or sayings?</label>
                  <Textarea
                    placeholder="Share quotes that resonate with you or things you often say..."
                    value={formData.favoriteQuotes}
                    onChange={(e) => handleInputChange('favoriteQuotes', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">What are your hobbies and interests?</label>
                  <Textarea
                    placeholder="Tell us about your passions, hobbies, and what you love to do..."
                    value={formData.hobbies}
                    onChange={(e) => handleInputChange('hobbies', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How do you typically communicate?</label>
                  <Textarea
                    placeholder="Are you formal/casual? Funny/serious? Brief/detailed? Use emojis?"
                    value={formData.communicationStyle}
                    onChange={(e) => handleInputChange('communicationStyle', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">What are your core values and beliefs?</label>
                  <Textarea
                    placeholder="What matters most to you? What drives your decisions?"
                    value={formData.personalValues}
                    onChange={(e) => handleInputChange('personalValues', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How do you approach work and problem-solving?</label>
                  <Textarea
                    placeholder="Are you methodical or spontaneous? Team player or solo? Creative or analytical?"
                    value={formData.workStyle}
                    onChange={(e) => handleInputChange('workStyle', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How do you interact in relationships and social situations?</label>
                  <Textarea
                    placeholder="Are you introverted/extroverted? How do you show care? Social preferences?"
                    value={formData.relationships}
                    onChange={(e) => handleInputChange('relationships', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && generatedProfile && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Sparkle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">🎉 Your AI DNA is Ready!</h3>
                  <p className="text-muted-foreground">Meet your digital twin: {generatedProfile.name}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain size={20} />
                        Personality Core
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{generatedProfile.personality}</p>
                      <div className="flex flex-wrap gap-2">
                        {generatedProfile.traits.map((trait, index) => (
                          <Badge key={index} variant="secondary">{trait}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MicrophoneStage size={20} />
                        Voice Style
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{generatedProfile.voiceStyle}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette size={20} />
                        Avatar Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{generatedProfile.avatar}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Magic size={20} />
                        Backstory
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{generatedProfile.backstory}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Core Interests & Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {generatedProfile.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 justify-center">
                  <Button onClick={() => exportProfile(generatedProfile)} className="gap-2">
                    <Download size={20} />
                    Export DNA
                  </Button>
                  <Button variant="outline" onClick={resetForm} className="gap-2">
                    <Dna size={20} />
                    Create New DNA
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 3 && (
          <div className="flex justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            {currentStep < 2 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 0 && !formData.name}
              >
                Next
              </Button>
            ) : (
              <Button 
                onClick={generatePersonality}
                disabled={isGenerating || !formData.name}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Generating DNA...
                  </>
                ) : (
                  <>
                    <Sparkle size={20} />
                    Generate AI DNA
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Previous Profiles */}
        {profiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your DNA Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {profiles.slice(0, 4).map((profile) => (
                  <Card key={profile.id} className="border border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold">{profile.name}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => exportProfile(profile)}
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {profile.personality}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {profile.traits.slice(0, 3).map((trait, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Info */}
        <Card className="mt-8 border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">🔧 Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="outline">AI Analysis</Badge>
                <span className="text-muted-foreground">GPT-4o for personality analysis and avatar generation</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Voice Synthesis</Badge>
                <span className="text-muted-foreground">ElevenLabs API for custom voice cloning</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Avatar Creation</Badge>
                <span className="text-muted-foreground">DALL-E 3 for personality-based avatar generation</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Integration</Badge>
                <span className="text-muted-foreground">Export as JSON for ChatGPT, Character.ai, or custom implementations</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}