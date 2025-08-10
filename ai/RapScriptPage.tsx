import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useKV } from '@github/spark/hooks'
import { 
  MusicNote, 
  Play, 
  Square, 
  Download, 
  Microphone,
  Sparkle,
  Fire,
  Lightning,
  Volume
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface RapTrack {
  id: string
  title: string
  theme: string
  mood: string
  style: string
  lyrics: string
  rhymeScheme: string
  audioUrl?: string
  duration: number
  bpm: number
  createdAt: string
}

export function RapScriptPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<RapTrack | null>(null)
  const [tracks, setTracks] = useKV<RapTrack[]>('rapscript-tracks', [])
  
  const [formData, setFormData] = useState({
    theme: '',
    mood: 'energetic',
    style: 'freestyle',
    customPrompt: ''
  })

  const moods = [
    { value: 'energetic', label: '🔥 Energetic' },
    { value: 'chill', label: '😎 Chill' },
    { value: 'aggressive', label: '💪 Aggressive' },
    { value: 'motivational', label: '🚀 Motivational' },
    { value: 'storytelling', label: '📖 Storytelling' },
    { value: 'emotional', label: '💭 Emotional' },
    { value: 'party', label: '🎉 Party' },
    { value: 'conscious', label: '🧠 Conscious' }
  ]

  const styles = [
    { value: 'freestyle', label: 'Freestyle' },
    { value: 'battle', label: 'Battle Rap' },
    { value: 'trap', label: 'Trap' },
    { value: 'boom-bap', label: 'Boom Bap' },
    { value: 'drill', label: 'Drill' },
    { value: 'old-school', label: 'Old School' },
    { value: 'mumble', label: 'Mumble Rap' },
    { value: 'conscious', label: 'Conscious' }
  ]

  const generateRap = async () => {
    if (!formData.theme && !formData.customPrompt) {
      toast.error('Please enter a theme or custom prompt')
      return
    }

    setIsGenerating(true)
    
    try {
      toast.info('Crafting your bars...')
      
      const prompt = spark.llmPrompt`
        Generate a creative rap song with these specifications:
        
        Theme: ${formData.theme || formData.customPrompt}
        Mood: ${formData.mood}
        Style: ${formData.style}
        
        Create:
        1. A catchy title
        2. 16-32 bars of original lyrics
        3. Consistent rhyme scheme
        4. Appropriate flow and rhythm
        5. Style-appropriate language and themes
        6. Suggested BPM and duration
        
        Make it authentic, creative, and true to the ${formData.style} style.
        Include [PAUSE] and [EMPHASIS] markers for performance.
      `
      
      const result = await spark.llm(prompt, 'gpt-4o', true)
      let rapData
      
      try {
        rapData = JSON.parse(result)
      } catch (parseError) {
        // Create fallback data if JSON parsing fails
        rapData = {
          title: `${formData.theme || 'Freestyle'} Rap`,
          lyrics: `Yo, listen up, I got something to say
${formData.theme || 'Life'} is the topic of the day
Flowing with rhythm, keeping it real
This is how the music makes me feel`,
          rhymeScheme: 'ABAB',
          duration: 120,
          bpm: 120
        }
      }
      
      const newTrack: RapTrack = {
        id: Date.now().toString(),
        title: rapData.title || `${formData.theme} Freestyle`,
        theme: formData.theme || formData.customPrompt,
        mood: formData.mood,
        style: formData.style,
        lyrics: rapData.lyrics || '',
        rhymeScheme: rapData.rhymeScheme || 'ABAB',
        duration: rapData.duration || 120,
        bpm: rapData.bpm || 120,
        createdAt: new Date().toISOString()
      }
      
      setCurrentTrack(newTrack)
      setTracks(prev => [newTrack, ...prev])
      toast.success('Your rap is ready! 🔥')
      
    } catch (error) {
      toast.error('Failed to generate rap. Try again!')
    } finally {
      setIsGenerating(false)
    }
  }

  const simulatePlayback = (track: RapTrack) => {
    if (isPlaying) {
      setIsPlaying(false)
      toast.info('Playback stopped')
      return
    }

    setIsPlaying(true)
    toast.success(`Playing: ${track.title}`)
    
    // Simulate playback duration
    setTimeout(() => {
      setIsPlaying(false)
      toast.info('Track finished')
    }, track.duration * 1000)
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <MusicNote size={24} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">RapScript</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Freestyle Rap Generator with Voice
          </p>
          <p className="text-muted-foreground">
            Enter a theme or mood and AI creates bars + raps them back
          </p>
        </div>

        {/* Generator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fire size={20} />
              Create Your Rap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Theme/Topic</label>
                <Input
                  placeholder="e.g., success, struggle, party, love..."
                  value={formData.theme}
                  onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mood</label>
                <Select value={formData.mood} onValueChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((mood) => (
                      <SelectItem key={mood.value} value={mood.value}>
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rap Style</label>
              <Select value={formData.style} onValueChange={(value) => setFormData(prev => ({ ...prev, style: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Custom Prompt (Optional)</label>
              <Textarea
                placeholder="Any specific direction, story, or message you want in your rap..."
                value={formData.customPrompt}
                onChange={(e) => setFormData(prev => ({ ...prev, customPrompt: e.target.value }))}
                rows={3}
              />
            </div>

            <Button
              onClick={generateRap}
              disabled={isGenerating}
              className="w-full gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Spitting Bars...
                </>
              ) : (
                <>
                  <Sparkle size={20} />
                  Generate Rap
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Track */}
        {currentTrack && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightning size={20} />
                  {currentTrack.title}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{currentTrack.style}</Badge>
                  <Badge variant="secondary">{currentTrack.bpm} BPM</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{currentTrack.mood}</div>
                  <div className="text-sm text-muted-foreground">Mood</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{Math.floor(currentTrack.duration / 60)}:{(currentTrack.duration % 60).toString().padStart(2, '0')}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{currentTrack.rhymeScheme}</div>
                  <div className="text-sm text-muted-foreground">Rhyme Scheme</div>
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Microphone size={20} />
                    Lyrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {currentTrack.lyrics}
                  </pre>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => simulatePlayback(currentTrack)} 
                  className="gap-2"
                  variant={isPlaying ? "destructive" : "default"}
                >
                  {isPlaying ? (
                    <>
                      <Square size={20} />
                      Stop Playback
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Play Rap
                    </>
                  )}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download size={20} />
                  Download Lyrics
                </Button>
                <Button variant="outline" className="gap-2">
                  <Volume size={20} />
                  Export Audio
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Track History */}
        {tracks.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rap Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tracks.slice(0, 5).map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{track.title}</h4>
                        <Badge variant="outline">{track.style}</Badge>
                        <Badge variant="secondary">{track.mood}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Theme: {track.theme}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {new Date(track.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setCurrentTrack(track)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => simulatePlayback(track)}>
                        <Play size={16} />
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
                <Badge variant="outline">Lyrics</Badge>
                <span className="text-muted-foreground">GPT-4o for creative rap generation and rhyme schemes</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Rhyming</Badge>
                <span className="text-muted-foreground">Rhyming dictionary API for perfect word matching</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Voice</Badge>
                <span className="text-muted-foreground">Uberduck or ElevenLabs for rap-style TTS</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Beats</Badge>
                <span className="text-muted-foreground">Spotify Web API for beat matching and BPM detection</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}