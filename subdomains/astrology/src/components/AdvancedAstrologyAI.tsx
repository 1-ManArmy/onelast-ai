'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ZodiacSign {
  name: string
  symbol: string
  element: string
  dates: string
  traits: string[]
  color: string
  planet: string
}

const zodiacSigns: ZodiacSign[] = [
  { name: 'Aries', symbol: '♈', element: 'Fire', dates: 'Mar 21 - Apr 19', traits: ['Bold', 'Energetic', 'Leader'], color: '#ff6b6b', planet: 'Mars' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', dates: 'Apr 20 - May 20', traits: ['Reliable', 'Patient', 'Practical'], color: '#4ecdc4', planet: 'Venus' },
  { name: 'Gemini', symbol: '♊', element: 'Air', dates: 'May 21 - Jun 20', traits: ['Curious', 'Adaptable', 'Witty'], color: '#45b7d1', planet: 'Mercury' },
  { name: 'Cancer', symbol: '♋', element: 'Water', dates: 'Jun 21 - Jul 22', traits: ['Nurturing', 'Intuitive', 'Protective'], color: '#f9ca24', planet: 'Moon' },
  { name: 'Leo', symbol: '♌', element: 'Fire', dates: 'Jul 23 - Aug 22', traits: ['Confident', 'Generous', 'Creative'], color: '#f0932b', planet: 'Sun' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', dates: 'Aug 23 - Sep 22', traits: ['Analytical', 'Helpful', 'Precise'], color: '#eb4d4b', planet: 'Mercury' },
  { name: 'Libra', symbol: '♎', element: 'Air', dates: 'Sep 23 - Oct 22', traits: ['Balanced', 'Diplomatic', 'Artistic'], color: '#6c5ce7', planet: 'Venus' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', dates: 'Oct 23 - Nov 21', traits: ['Intense', 'Mysterious', 'Passionate'], color: '#a29bfe', planet: 'Pluto' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', dates: 'Nov 22 - Dec 21', traits: ['Adventurous', 'Optimistic', 'Philosophical'], color: '#fd79a8', planet: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', dates: 'Dec 22 - Jan 19', traits: ['Ambitious', 'Disciplined', 'Responsible'], color: '#fdcb6e', planet: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', dates: 'Jan 20 - Feb 18', traits: ['Independent', 'Innovative', 'Humanitarian'], color: '#e17055', planet: 'Uranus' },
  { name: 'Pisces', symbol: '♓', element: 'Water', dates: 'Feb 19 - Mar 20', traits: ['Compassionate', 'Artistic', 'Intuitive'], color: '#00b894', planet: 'Neptune' }
]

export function AdvancedAstrologyAI() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null)
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isGenerating, setIsGenerating] = useState(false)

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Auto-detect zodiac sign from birth date
  useEffect(() => {
    if (birthDate) {
      const date = new Date(birthDate)
      const month = date.getMonth() + 1
      const day = date.getDate()
      
      const sign = getZodiacSign(month, day)
      setSelectedSign(sign)
    }
  }, [birthDate])

  const getZodiacSign = useCallback((month: number, day: number): ZodiacSign => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0]
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1]
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2]
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3]
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4]
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5]
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6]
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7]
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8]
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9]
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10]
    return zodiacSigns[11]
  }, [])

  const generateReading = async () => {
    if (!selectedSign || !birthDate) {
      alert('Please enter your birth date first')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      alert('Advanced AI reading generated successfully!')
      
    } catch (error) {
      console.error('Error generating reading:', error)
      alert('Failed to generate reading. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/30 to-black/50" />
        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 text-yellow-400"
            >
              ⭐
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AstrologyAI Pro
              </h1>
              <p className="text-sm text-purple-300">
                Advanced AI-Powered Cosmic Intelligence
              </p>
            </div>
          </div>
          
          <div className="text-right text-sm">
            <div className="flex items-center gap-2 text-purple-300">
              🕐 {currentTime.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-2 text-cyan-300">
              🌙 Full Moon (87%)
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/30 backdrop-blur-sm border border-purple-500/30">
            <TabsTrigger value="profile">Your Chart</TabsTrigger>
            <TabsTrigger value="reading">AI Reading</TabsTrigger>
            <TabsTrigger value="zodiac">Zodiac Signs</TabsTrigger>
            <TabsTrigger value="live">Live Data</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-300">
                    ⭐ Birth Chart Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Birth Date *
                    </label>
                    <Input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="bg-black/30 border-purple-500/50 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Birth Time (Higher Accuracy)
                    </label>
                    <Input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="bg-black/30 border-purple-500/50 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-purple-200 mb-2 block">
                      Birth Location
                    </label>
                    <Input
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="bg-black/30 border-purple-500/50 text-white"
                      placeholder="City, Country"
                    />
                  </div>
                </CardContent>
              </Card>

              {selectedSign && (
                <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-300">Your Cosmic Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <motion.div
                        className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl font-bold text-white shadow-2xl relative"
                        style={{ backgroundColor: selectedSign.color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {selectedSign.symbol}
                        <div className="absolute inset-0 rounded-full animate-ping bg-white/20"></div>
                      </motion.div>
                      
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedSign.name}</h3>
                        <p className="text-purple-300">{selectedSign.dates}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Badge variant="secondary" className="bg-purple-600/50">
                          {selectedSign.element}
                        </Badge>
                        <Badge variant="outline" className="border-cyan-400 text-cyan-300">
                          {selectedSign.planet}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-center">
                        {selectedSign.traits.map((trait) => (
                          <Badge key={trait} variant="secondary" className="text-xs bg-gradient-to-r from-purple-600/50 to-cyan-600/50">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={generateReading}
                disabled={!selectedSign || !birthDate || isGenerating}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 shadow-2xl"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-2"
                  >
                    🧠 Consulting Cosmic AI...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2">
                    👁️ Generate Ultra-Precise Reading
                  </div>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Other tabs placeholder */}
          <TabsContent value="reading">
            <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">AI Reading Results</h3>
                <p className="text-purple-300">Generate your reading first to see advanced cosmic insights</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zodiac">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {zodiacSigns.map((sign, index) => (
                <motion.div
                  key={sign.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-black/40 backdrop-blur-sm border-purple-500/30 ${
                      selectedSign?.name === sign.name ? 'ring-2 ring-purple-400' : ''
                    }`}
                    onClick={() => setSelectedSign(sign)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3 shadow-lg"
                        style={{ backgroundColor: sign.color }}
                      >
                        {sign.symbol}
                      </div>
                      <h4 className="font-semibold text-white">{sign.name}</h4>
                      <p className="text-xs text-purple-300 mt-1">{sign.dates}</p>
                      <Badge variant="secondary" className="mt-2 text-xs bg-purple-600/30">
                        {sign.element}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live">
            <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Real-Time Cosmic Data</h3>
                <p className="text-purple-300 mb-6">
                  Live astronomical data and planetary positions for maximum accuracy
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-300">Current Moon Phase</h4>
                    <p className="text-white">Full Moon (87%)</p>
                  </div>
                  <div className="p-4 bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-300">Active Planet</h4>
                    <p className="text-white">Mars in Aries</p>
                  </div>
                  <div className="p-4 bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-300">Energy Level</h4>
                    <p className="text-white">High Intensity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
