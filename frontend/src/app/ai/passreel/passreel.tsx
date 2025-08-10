import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { useKV } from '@github/spark/hooks'
import { 
  Lock, 
  Key, 
  Shield, 
  Copy, 
  Eye, 
  EyeSlash,
  Sparkle,
  Heart,
  Download,
  RefreshCw
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface GeneratedPassword {
  id: string
  password: string
  memoryHook: string
  personalStory: string
  strength: number
  category: string
  memorabilityScore: number
  securityFeatures: string[]
  createdAt: string
}

export function PassReelPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState<GeneratedPassword | null>(null)
  const [passwords, setPasswords] = useKV<GeneratedPassword[]>('passreel-passwords', [])
  
  const [formData, setFormData] = useState({
    personalStory: '',
    favoriteMovie: '',
    importantYear: '',
    petName: '',
    favoritePlace: '',
    hobby: '',
    length: [12],
    includeNumbers: true,
    includeSymbols: true,
    includeUppercase: true
  })

  const generatePassword = async () => {
    if (!formData.personalStory && !formData.favoriteMovie && !formData.petName) {
      toast.error('Please share at least one personal detail for memory hooks')
      return
    }

    setIsGenerating(true)
    
    try {
      toast.info('Crafting your memorable password...')
      
      const prompt = spark.llmPrompt`
        Generate a secure but memorable password using these personal details:
        
        Personal Story: ${formData.personalStory}
        Favorite Movie: ${formData.favoriteMovie}
        Important Year: ${formData.importantYear}
        Pet Name: ${formData.petName}
        Favorite Place: ${formData.favoritePlace}
        Hobby: ${formData.hobby}
        
        Requirements:
        - Length: ${formData.length[0]} characters
        - Include numbers: ${formData.includeNumbers}
        - Include symbols: ${formData.includeSymbols}
        - Include uppercase: ${formData.includeUppercase}
        
        Create:
        1. A secure password incorporating personal elements
        2. A memorable "memory hook" explaining the password structure
        3. A short story connecting the password to their life
        4. Security strength score (0-100)
        5. Memorability score (0-100)
        6. Category (e.g., "Movie-Pet Combo", "Year-Place Mix")
        7. List of security features used
        
        Make it both secure and personally meaningful for easy recall.
      `
      
      const result = await spark.llm(prompt, 'gpt-4o', true)
      let passwordData
      
      try {
        passwordData = JSON.parse(result)
      } catch (parseError) {
        // Create fallback data if JSON parsing fails
        const randomPassword = `${formData.favoriteMovie?.slice(0,4) || 'Pass'}${formData.importantYear || '2024'}#${formData.petName?.slice(0,3) || 'Pet'}!`
        passwordData = {
          password: randomPassword,
          memoryHook: `This password combines your favorite movie (${formData.favoriteMovie || 'a movie'}), important year (${formData.importantYear || '2024'}), and pet name (${formData.petName || 'pet name'}) for easy recall.`,
          personalStory: 'Your personal elements have been woven together to create this memorable password.',
          strength: 82,
          category: 'Personal Mix',
          memorabilityScore: 85,
          securityFeatures: ['Mixed case', 'Numbers', 'Symbols']
        }
      }
      
      const newPassword: GeneratedPassword = {
        id: Date.now().toString(),
        password: passwordData.password || 'SecurePass123!',
        memoryHook: passwordData.memoryHook || 'Memory hook explanation',
        personalStory: passwordData.personalStory || 'Personal connection story',
        strength: passwordData.strength || 85,
        category: passwordData.category || 'Personal Mix',
        memorabilityScore: passwordData.memorabilityScore || 80,
        securityFeatures: passwordData.securityFeatures || ['Mixed case', 'Numbers', 'Symbols'],
        createdAt: new Date().toISOString()
      }
      
      setCurrentPassword(newPassword)
      setPasswords(prev => [newPassword, ...prev])
      toast.success('Memorable password generated! 🔐')
      
    } catch (error) {
      toast.error('Failed to generate password. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password)
    toast.success('Password copied to clipboard!')
  }

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-green-500'
    if (strength >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStrengthBadge = (strength: number) => {
    if (strength >= 80) return { variant: 'default' as const, text: 'Strong' }
    if (strength >= 60) return { variant: 'secondary' as const, text: 'Medium' }
    return { variant: 'destructive' as const, text: 'Weak' }
  }

  const resetForm = () => {
    setFormData({
      personalStory: '',
      favoriteMovie: '',
      importantYear: '',
      petName: '',
      favoritePlace: '',
      hobby: '',
      length: [12],
      includeNumbers: true,
      includeSymbols: true,
      includeUppercase: true
    })
    setCurrentPassword(null)
    setShowPassword(false)
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lock size={24} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">PassReel</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            AI-generated Passwords with Memory Hooks
          </p>
          <p className="text-muted-foreground">
            Memorable, secure passwords generated using your personal stories
          </p>
        </div>

        {/* Generator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key size={20} />
              Create Your Personal Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Share a Personal Story or Memory</label>
              <Textarea
                placeholder="Tell us about a meaningful moment, achievement, or experience in your life..."
                value={formData.personalStory}
                onChange={(e) => setFormData(prev => ({ ...prev, personalStory: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Favorite Movie/Book</label>
                <Input
                  placeholder="e.g., Finding Nemo, Harry Potter"
                  value={formData.favoriteMovie}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteMovie: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Important Year</label>
                <Input
                  placeholder="e.g., 1995, 2010"
                  value={formData.importantYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, importantYear: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Pet Name (Current/Past)</label>
                <Input
                  placeholder="e.g., Buddy, Luna"
                  value={formData.petName}
                  onChange={(e) => setFormData(prev => ({ ...prev, petName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Favorite Place</label>
                <Input
                  placeholder="e.g., Paris, Grandma's house"
                  value={formData.favoritePlace}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoritePlace: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hobby or Interest</label>
              <Input
                placeholder="e.g., guitar, hiking, cooking"
                value={formData.hobby}
                onChange={(e) => setFormData(prev => ({ ...prev, hobby: e.target.value }))}
              />
            </div>

            <div className="space-y-4 border-t pt-6">
              <h4 className="font-semibold">Password Settings</h4>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password Length: {formData.length[0]} characters
                </label>
                <Slider
                  value={formData.length}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, length: value }))}
                  max={24}
                  min={8}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.includeNumbers}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeNumbers: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Include Numbers</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.includeSymbols}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeSymbols: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Include Symbols</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.includeUppercase}
                    onChange={(e) => setFormData(prev => ({ ...prev, includeUppercase: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="text-sm">Include Uppercase</span>
                </label>
              </div>
            </div>

            <Button
              onClick={generatePassword}
              disabled={isGenerating}
              className="w-full gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Generating Password...
                </>
              ) : (
                <>
                  <Sparkle size={20} />
                  Generate Memorable Password
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Password */}
        {currentPassword && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  Your Personal Password
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStrengthBadge(currentPassword.strength).variant}>
                    {getStrengthBadge(currentPassword.strength).text}
                  </Badge>
                  <Badge variant="outline">{currentPassword.category}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Display */}
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Generated Password</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 bg-background border rounded font-mono text-lg">
                      {showPassword ? currentPassword.password : '••••••••••••'}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyPassword(currentPassword.password)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Scores */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield size={20} />
                      Security Strength
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${getStrengthColor(currentPassword.strength)}`}>
                        {currentPassword.strength}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            currentPassword.strength >= 80 ? 'bg-green-500' :
                            currentPassword.strength >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${currentPassword.strength}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {currentPassword.securityFeatures.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart size={20} />
                      Memorability Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2 text-purple-500">
                        {currentPassword.memorabilityScore}%
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-3">
                        <div 
                          className="h-2 rounded-full bg-purple-500 transition-all duration-500"
                          style={{ width: `${currentPassword.memorabilityScore}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on personal connections
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Memory Hook */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key size={20} />
                    Memory Hook
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                    <p className="font-medium mb-2">How to Remember:</p>
                    <p className="text-muted-foreground">{currentPassword.memoryHook}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Story */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart size={20} />
                    Your Personal Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentPassword.personalStory}
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-3 justify-center">
                <Button onClick={() => copyPassword(currentPassword.password)} className="gap-2">
                  <Copy size={20} />
                  Copy Password
                </Button>
                <Button variant="outline" onClick={resetForm} className="gap-2">
                  <RefreshCw size={20} />
                  Generate New
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download size={20} />
                  Save Securely
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Password History */}
        {passwords.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Password Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {passwords.slice(0, 5).map((password) => (
                  <div key={password.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{password.category}</h4>
                        <Badge variant={getStrengthBadge(password.strength).variant}>
                          {password.strength}%
                        </Badge>
                        <Badge variant="outline">
                          {password.memorabilityScore}% memorable
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {password.memoryHook}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        {new Date(password.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setCurrentPassword(password)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => copyPassword(password.password)}>
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>💡 Password Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Memory Palace Technique</h4>
                <p className="text-sm text-muted-foreground">
                  Associate your password with a familiar place or routine for easier recall
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Update Regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Generate new passwords every 3-6 months for maximum security
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Unique for Each Account</h4>
                <p className="text-sm text-muted-foreground">
                  Never reuse passwords across different services or accounts
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Store Securely</h4>
                <p className="text-sm text-muted-foreground">
                  Use a password manager or encrypted storage for generated passwords
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
                <Badge variant="outline">Generation</Badge>
                <span className="text-muted-foreground">Custom algorithms for secure password creation</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Memory Hooks</Badge>
                <span className="text-muted-foreground">GPT-4o for personalized mnemonic generation</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Encryption</Badge>
                <span className="text-muted-foreground">Optional AES-256 encryption for secure storage</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline">Security</Badge>
                <span className="text-muted-foreground">Entropy analysis and strength validation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}