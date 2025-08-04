import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Lock, Mail, Github, Shield, Crown } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  isOwner: boolean
  createdAt: number
  githubId?: string
}

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAuthenticated: (user: User) => void
}

export function AuthDialog({ open, onOpenChange, onAuthenticated }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })
  
  const [users, setUsers] = useKV<User[]>('registered-users', [])
  const [currentUser, setCurrentUser] = useKV<User | null>('current-user', null)

  useEffect(() => {
    const checkGitHubAuth = async () => {
      try {
        const githubUser = await spark.user()
        if (githubUser && githubUser.login) {
          // Check if user exists in our system
          const existingUser = users.find(u => u.githubId === githubUser.id || u.email === githubUser.email)
          
          if (existingUser) {
            // Update existing user with GitHub data
            const updatedUser = {
              ...existingUser,
              githubId: githubUser.id,
              avatarUrl: githubUser.avatarUrl,
              isOwner: githubUser.isOwner
            }
            
            setUsers(prevUsers => 
              prevUsers.map(u => u.id === existingUser.id ? updatedUser : u)
            )
            setCurrentUser(updatedUser)
            onAuthenticated(updatedUser)
            onOpenChange(false)
            toast.success(`Welcome back, ${updatedUser.username}!`)
          } else {
            // Create new user from GitHub
            const newUser: User = {
              id: `github_${githubUser.id}`,
              email: githubUser.email || `${githubUser.login}@github.local`,
              username: githubUser.login,
              avatarUrl: githubUser.avatarUrl,
              isOwner: githubUser.isOwner,
              createdAt: Date.now(),
              githubId: githubUser.id
            }
            
            setUsers(prevUsers => [...prevUsers, newUser])
            setCurrentUser(newUser)
            onAuthenticated(newUser)
            onOpenChange(false)
            toast.success(`Welcome to OneLast.ai, ${newUser.username}!`)
          }
        }
      } catch (error) {
        console.log('GitHub auth not available or user not signed in')
      }
    }

    if (open) {
      checkGitHubAuth()
    }
  }, [open, users, setUsers, setCurrentUser, onAuthenticated, onOpenChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (authMode === 'signup') {
        // Check if user already exists
        const existingUser = users.find(u => u.email === formData.email || u.username === formData.username)
        if (existingUser) {
          toast.error('User already exists with this email or username')
          return
        }

        // Create new user
        const newUser: User = {
          id: `local_${Date.now()}`,
          email: formData.email,
          username: formData.username,
          isOwner: users.length === 0, // First user becomes owner
          createdAt: Date.now()
        }

        setUsers(prevUsers => [...prevUsers, newUser])
        setCurrentUser(newUser)
        onAuthenticated(newUser)
        onOpenChange(false)
        toast.success(`Welcome to OneLast.ai, ${newUser.username}!`)
      } else {
        // Sign in
        const user = users.find(u => 
          (u.email === formData.email || u.username === formData.email) && 
          u.password === formData.password
        )
        
        if (user) {
          setCurrentUser(user)
          onAuthenticated(user)
          onOpenChange(false)
          toast.success(`Welcome back, ${user.username}!`)
        } else {
          toast.error('Invalid credentials')
        }
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader className="text-center">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <Shield className="text-accent" size={24} />
            Welcome to OneLast.ai
          </DialogTitle>
          <DialogDescription>
            Sign in to access chat history and personalized features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* GitHub Auth Status */}
          <Card className="bg-secondary/20 border-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Github size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">GitHub Integration</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Auto-detect
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We'll automatically sign you in if you're logged into GitHub
              </p>
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="signin" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email or Username</Label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="text"
                      placeholder="Enter your email or username"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleInputChange('username')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <motion.div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      {authMode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    authMode === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </motion.div>
            </form>
          </Tabs>

          {users.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-center text-muted-foreground">
                {users.length} user{users.length !== 1 ? 's' : ''} registered
                {users.some(u => u.isOwner) && (
                  <span className="ml-2 inline-flex items-center gap-1">
                    <Crown size={12} className="text-accent" />
                    <span>Owner present</span>
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}