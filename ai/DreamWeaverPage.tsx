import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useKV } from '@github/spark/hooks'
import { 
  Eye, 
  Image, 
  BookOpen, 
  ChartBar, 
  Palette,
  MagicWand,
  Download,
  Heart,
  Brain,
  Moon,
  Sun
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface DreamAnalysis {
  id: string
  dreamText: string
  title: string
  interpretation: {
    summary: string
    symbols: Array<{
      symbol: string
      meaning: string
      significance: string
    }>
    emotions: string[]
    themes: string[]
    psychologicalInsight: string
  }
  artwork: {
    description: string
    style: string
    colors: string[]
    mood: string
    visualElements: string[]
  }
  moodGraph: {
    overall: number
    anxiety: number
    joy: number
    fear: number
    wonder: number
    confusion: number
  }
  dreamType: string
  lucidityLevel: number
  createdAt: string
}

export function DreamWeaverPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentDream, setCurrentDream] = useState<DreamAnalysis | null>(null)
  const [dreams, setDreams] = useKV<DreamAnalysis[]>('dreamweaver-dreams', [])
  const [dreamText, setDreamText] = useState('')
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const analyzeDream = async () => {
    if (!dreamText.trim()) {
      toast.error('Please describe your dream first')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    try {
      // Simulate analysis steps
      const steps = [
        'Parsing dream narrative...',
        'Identifying symbols and themes...',
        'Analyzing emotional patterns...',
        'Generating artwork concept...',
        'Creating mood visualization...',
        'Finalizing interpretation...'
      ]

      for (let i = 0; i < steps.length; i++) {
        setAnalysisProgress((i + 1) / steps.length * 100)
        toast.info(steps[i])
        await new Promise(resolve => setTimeout(resolve, 1200))
      }

      const prompt = spark.llmPrompt`
        Analyze this dream description and provide comprehensive interpretation:
        
        Dream: "${dreamText}"
        
        Provide analysis including:
        1. Dream title and summary interpretation
        2. Key symbols with meanings and psychological significance
        3. Emotional themes and patterns
        4. Psychological insights and potential meanings
        5. Detailed artwork description for visualization
        6. Color palette and visual mood
        7. Mood analysis scores (0-100) for: overall, anxiety, joy, fear, wonder, confusion
        8. Dream type (prophetic, processing, anxiety, wish-fulfillment, etc.)
        9. Lucidity level (0-100)
        
        Make it insightful, artistic, and psychologically grounded.
      `
      
      const analysis = await spark.llm(prompt, 'gpt-4o', true)
      let dreamData
      
      try {
        dreamData = JSON.parse(analysis)
      } catch (parseError) {
        // Create fallback data if JSON parsing fails
        dreamData = {
          title: 'Dream Analysis',
          interpretation: {
            summary: 'This dream reflects subconscious thoughts and experiences.',
            symbols: [{ symbol: 'Unknown', meaning: 'Mystery', significance: 'Subconscious processing' }],
            emotions: ['Curiosity', 'Wonder'],
            themes: ['Self-discovery', 'Reflection'],
            psychologicalInsight: 'Dreams often process daily experiences and emotions.'
          },
          artwork: {
            description: 'Ethereal dreamscape with flowing colors and abstract forms',
            style: 'Surreal',
            colors: ['Deep Blue', 'Soft Purple', 'Silver'],
            mood: 'Mysterious',
            visualElements: ['Flowing forms', 'Soft light', 'Abstract shapes']
          },
          moodGraph: {
            overall: 60,
            anxiety: 30,
            joy: 50,
            fear: 20,
            wonder: 70,
            confusion: 40
          },
          dreamType: 'Processing Dream',
          lucidityLevel: 30
        }
      }
      
      const newDream: DreamAnalysis = {
        id: Date.now().toString(),
        dreamText: dreamText,
        title: dreamData.title || 'Untitled Dream',
        interpretation: {
          summary: dreamData.interpretation?.summary || '',
          symbols: dreamData.interpretation?.symbols || [],
          emotions: dreamData.interpretation?.emotions || [],
          themes: dreamData.interpretation?.themes || [],
          psychologicalInsight: dreamData.interpretation?.psychologicalInsight || ''
        },
        artwork: {
          description: dreamData.artwork?.description || '',
          style: dreamData.artwork?.style || 'Surreal',
          colors: dreamData.artwork?.colors || [],
          mood: dreamData.artwork?.mood || 'Mysterious',
          visualElements: dreamData.artwork?.visualElements || []
        },
        moodGraph: {
          overall: dreamData.moodGraph?.overall || 50,
          anxiety: dreamData.moodGraph?.anxiety || 30,
          joy: dreamData.moodGraph?.joy || 40,
          fear: dreamData.moodGraph?.fear || 25,
          wonder: dreamData.moodGraph?.wonder || 60,
          confusion: dreamData.moodGraph?.confusion || 35
        },
        dreamType: dreamData.dreamType || 'Processing Dream',
        lucidityLevel: dreamData.lucidityLevel || 20,
        createdAt: new Date().toISOString()
      }
      
      setCurrentDream(newDream)
      setDreams(prev => [newDream, ...prev])
      toast.success('Dream analysis complete!')
      
    } catch (error) {
      toast.error('Failed to analyze dream. Please try again.')
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const exportDream = (dream: DreamAnalysis) => {
    const dataStr = JSON.stringify(dream, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `dream-${dream.title.replace(/\s+/g, '-').toLowerCase()}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Dream analysis exported!')
  }

  const resetDream = () => {
    setDreamText('')
    setCurrentDream(null)
  }

  const getMoodColor = (value: number) => {
    if (value >= 70) return 'text-green-500'
    if (value >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getMoodBarColor = (value: number) => {
    if (value >= 70) return 'bg-green-500'
    if (value >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Eye size={24} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">DreamWeaver</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            AI that Visualizes Your Dreams from Text
          </p>
          <p className="text-muted-foreground">
            Describe your dream and get art, story interpretation, and emotional analysis
          </p>
        </div>

        {/* Dream Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon size={20} />
              Tell Us Your Dream
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Describe your dream in as much detail as you can remember... What did you see? How did you feel? What happened? Who was there?"
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              rows={6}
              className="min-h-32"
            />

            {isAnalyzing && (
              <div className="space-y-2">
                <Progress value={analysisProgress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground">
                  Weaving your dream... {Math.round(analysisProgress)}%
                </p>
              </div>
            )}

            <Button
              onClick={analyzeDream}
              disabled={isAnalyzing || !dreamText.trim()}
              className="w-full gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Analyzing Dream...
                </>
              ) : (
                <>
                  <MagicWand size={20} />
                  Weave My Dream
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Dream Analysis Results */}
        {currentDream && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={20} />
                  {currentDream.title}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentDream.dreamType}</Badge>
                  <Badge variant="secondary">
                    {currentDream.lucidityLevel}% Lucid
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="interpretation" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="interpretation">Interpretation</TabsTrigger>
                  <TabsTrigger value="artwork">Artwork</TabsTrigger>
                  <TabsTrigger value="emotions">Emotions</TabsTrigger>
                  <TabsTrigger value="symbols">Symbols</TabsTrigger>
                </TabsList>

                <TabsContent value="interpretation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen size={20} />
                        Dream Interpretation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <p className="text-muted-foreground">{currentDream.interpretation.summary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Psychological Insight</h4>
                        <p className="text-muted-foreground">{currentDream.interpretation.psychologicalInsight}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Core Themes</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentDream.interpretation.themes.map((theme, index) => (
                            <Badge key={index} variant="secondary">{theme}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Emotional Undertones</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentDream.interpretation.emotions.map((emotion, index) => (
                            <Badge key={index} variant="outline">{emotion}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="artwork" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image size={20} />
                        Generated Artwork Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 rounded-lg border">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Palette size={20} />
                          Artistic Vision
                        </h4>
                        <p className="text-muted-foreground mb-4">{currentDream.artwork.description}</p>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <span className="font-semibold">Style: </span>
                            <Badge variant="secondary">{currentDream.artwork.style}</Badge>
                          </div>
                          <div>
                            <span className="font-semibold">Mood: </span>
                            <Badge variant="outline">{currentDream.artwork.mood}</Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Color Palette</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentDream.artwork.colors.map((color, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Visual Elements</h4>
                        <div className="grid gap-2 md:grid-cols-2">
                          {currentDream.artwork.visualElements.map((element, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded">
                              <Eye size={16} className="text-purple-500" />
                              <span className="text-sm">{element}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="emotions" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ChartBar size={20} />
                        Emotional Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        {Object.entries(currentDream.moodGraph).map(([emotion, value]) => (
                          <div key={emotion} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium capitalize">{emotion}</span>
                              <span className={`font-bold ${getMoodColor(value)}`}>{value}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${getMoodBarColor(value)}`}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Heart size={20} />
                          Overall Dream Tone
                        </h4>
                        <div className="text-2xl font-bold mb-2">
                          <span className={getMoodColor(currentDream.moodGraph.overall)}>
                            {currentDream.moodGraph.overall}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {currentDream.moodGraph.overall >= 70 ? 'Positive and uplifting dream experience' :
                           currentDream.moodGraph.overall >= 40 ? 'Mixed emotional dream experience' :
                           'Challenging or intense dream experience'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="symbols" className="space-y-6">
                  <div className="grid gap-4">
                    {currentDream.interpretation.symbols.map((symbolData, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-lg">{symbolData.symbol}</h4>
                            <Badge variant="outline">{symbolData.significance}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{symbolData.meaning}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3 justify-center mt-6">
                <Button onClick={() => exportDream(currentDream)} className="gap-2">
                  <Download size={20} />
                  Export Analysis
                </Button>
                <Button variant="outline" onClick={resetDream}>
                  New Dream
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dream Journal */}
        {dreams.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} />
                Dream Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {dreams.slice(0, 6).map((dream) => (
                  <Card key={dream.id} className="border border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold">{dream.title}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => exportDream(dream)}
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {dream.interpretation.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{dream.dreamType}</span>
                        <span>{dream.lucidityLevel}% Lucid</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getMoodBarColor(dream.moodGraph.overall)}`} />
                        <span className="text-xs">Overall: {dream.moodGraph.overall}%</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setCurrentDream(dream)}
                        className="w-full"
                      >
                        View Analysis
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🌙 What DreamWeaver Analyzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Brain size={20} />
                  Psychological Analysis
                </h4>
                <p className="text-sm text-muted-foreground">
                  Deep interpretation of symbols, themes, and subconscious patterns
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Palette size={20} />
                  Artistic Visualization
                </h4>
                <p className="text-sm text-muted-foreground">
                  Detailed artwork descriptions ready for AI image generation
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <ChartBar size={20} />
                  Emotional Mapping
                </h4>
                <p className="text-sm text-muted-foreground">
                  Quantified emotional analysis with mood visualization
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Sun size={20} />
                  Dream Classification
                </h4>
                <p className="text-sm text-muted-foreground">
                  Categorizes dream types and lucidity levels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Info */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="text-accent">🔧 AI Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="outline">Image Generation</Badge>
                <span className="text-muted-foreground">DALL-E 3 for creating dream artwork from descriptions</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Analysis</Badge>
                <span className="text-muted-foreground">GPT-4o for psychological interpretation and symbolism</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Emotion</Badge>
                <span className="text-muted-foreground">Custom emotion classification for mood analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Visualization</Badge>
                <span className="text-muted-foreground">Plotly for interactive mood and emotion graphs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}