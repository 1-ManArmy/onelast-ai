import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Advanced astronomical calculations
export interface PlanetaryPosition {
  name: string
  longitude: number
  latitude: number
  distance: number
  retrograde: boolean
  house: number
  sign: string
  degree: number
}

export interface MoonPhaseData {
  phase: string
  illumination: number
  age: number
  distance: number
  nextNewMoon: Date
  nextFullMoon: Date
}

export interface AstronomicalData {
  moonPhase: MoonPhaseData
  planets: PlanetaryPosition[]
  houses: number[]
  ascendant: number
  midheaven: number
  sunSign: string
  moonSign: string
  risingSign: string
}

// Get accurate moon phase using astronomical calculations
export function getCurrentMoonPhase(): MoonPhaseData {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  
  // Calculate Julian day number
  const a = Math.floor((14 - month) / 12)
  const y = year - a
  const m = month + 12 * a - 3
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119
  
  // Calculate lunar cycle
  const newMoonJD = 2451549.5 // Known new moon JD (Jan 6, 2000)
  const lunarCycle = 29.53058867 // Average lunar cycle in days
  const daysSinceNewMoon = (jd - newMoonJD) % lunarCycle
  
  // Calculate illumination percentage
  const illumination = (1 - Math.cos(2 * Math.PI * daysSinceNewMoon / lunarCycle)) / 2
  
  // Determine phase name
  let phase: string
  if (daysSinceNewMoon < 1) phase = 'New Moon'
  else if (daysSinceNewMoon < 6.4) phase = 'Waxing Crescent'
  else if (daysSinceNewMoon < 8.4) phase = 'First Quarter'
  else if (daysSinceNewMoon < 13.8) phase = 'Waxing Gibbous'
  else if (daysSinceNewMoon < 15.8) phase = 'Full Moon'
  else if (daysSinceNewMoon < 21.1) phase = 'Waning Gibbous'
  else if (daysSinceNewMoon < 23.1) phase = 'Last Quarter'
  else phase = 'Waning Crescent'
  
  // Calculate next phases
  const daysToNextNew = daysSinceNewMoon > 0 ? lunarCycle - daysSinceNewMoon : 0
  const daysToNextFull = daysSinceNewMoon < 14.75 ? 14.75 - daysSinceNewMoon : lunarCycle - daysSinceNewMoon + 14.75
  
  const nextNewMoon = new Date(now.getTime() + daysToNextNew * 24 * 60 * 60 * 1000)
  const nextFullMoon = new Date(now.getTime() + daysToNextFull * 24 * 60 * 60 * 1000)
  
  // Calculate lunar distance (approximation)
  const distance = 384400 + 21400 * Math.cos(2 * Math.PI * daysSinceNewMoon / 27.322) // km
  
  return {
    phase,
    illumination: Math.round(illumination * 100),
    age: Math.round(daysSinceNewMoon * 10) / 10,
    distance: Math.round(distance),
    nextNewMoon,
    nextFullMoon
  }
}

// Calculate planetary positions (simplified)
export function getPlanetaryPositions(date: Date): PlanetaryPosition[] {
  const jd = dateToJulianDay(date)
  const planets = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
  
  return planets.map((planet, index) => {
    // Simplified orbital calculations (for demo - would use real ephemeris data in production)
    const meanLongitude = (jd - 2451545.0) * (360 / getPlanetOrbitalPeriod(planet)) % 360
    const longitude = meanLongitude + getPlanetEccentricity(planet) * Math.sin(meanLongitude * Math.PI / 180)
    
    return {
      name: planet,
      longitude: longitude % 360,
      latitude: Math.random() * 10 - 5, // Simplified
      distance: getPlanetDistance(planet),
      retrograde: Math.random() > 0.8, // Simplified probability
      house: Math.floor(longitude / 30) + 1,
      sign: getZodiacSignFromDegree(longitude),
      degree: longitude % 30
    }
  })
}

function dateToJulianDay(date: Date): number {
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12)
  const y = date.getFullYear() - a
  const m = (date.getMonth() + 1) + 12 * a - 3
  
  return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
         Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119
}

function getPlanetOrbitalPeriod(planet: string): number {
  const periods: Record<string, number> = {
    'Mercury': 87.97, 'Venus': 224.7, 'Mars': 686.98, 'Jupiter': 4332.59,
    'Saturn': 10759.22, 'Uranus': 30688.5, 'Neptune': 60182, 'Pluto': 90560
  }
  return periods[planet] || 365.25
}

function getPlanetEccentricity(planet: string): number {
  const eccentricities: Record<string, number> = {
    'Mercury': 0.2056, 'Venus': 0.0068, 'Mars': 0.0934, 'Jupiter': 0.0489,
    'Saturn': 0.0565, 'Uranus': 0.0461, 'Neptune': 0.0097, 'Pluto': 0.2488
  }
  return eccentricities[planet] || 0.02
}

function getPlanetDistance(planet: string): number {
  const distances: Record<string, number> = {
    'Mercury': 57.9, 'Venus': 108.2, 'Mars': 227.9, 'Jupiter': 778.5,
    'Saturn': 1432, 'Uranus': 2867, 'Neptune': 4515, 'Pluto': 5906
  }
  return distances[planet] || 150
}

function getZodiacSignFromDegree(degree: number): string {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  return signs[Math.floor(degree / 30)]
}

// Calculate houses using Placidus system (simplified)
export function calculateHouses(date: Date, latitude: number, longitude: number): number[] {
  const lst = calculateLocalSiderealTime(date, longitude)
  const houses = []
  
  for (let i = 0; i < 12; i++) {
    houses.push((lst + i * 30) % 360)
  }
  
  return houses
}

function calculateLocalSiderealTime(date: Date, longitude: number): number {
  const jd = dateToJulianDay(date)
  const t = (jd - 2451545.0) / 36525
  const gst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t - t * t * t / 38710000
  return (gst + longitude) % 360
}

// Generate personalized AI horoscope
export async function generateAdvancedHoroscope(
  birthData: { date: string; time?: string; place?: string },
  currentAstroData: AstronomicalData
): Promise<any> {
  const prompt = `
    Generate an advanced, scientifically-informed horoscope reading that surpasses human astrologer accuracy.
    
    Birth Data: ${JSON.stringify(birthData)}
    Current Astronomical Data: ${JSON.stringify(currentAstroData)}
    Moon Phase: ${currentAstroData.moonPhase.phase} (${currentAstroData.moonPhase.illumination}% illuminated)
    
    Planetary Positions:
    ${currentAstroData.planets.map(p => `${p.name}: ${p.degree.toFixed(1)}° ${p.sign} ${p.retrograde ? '(Retrograde)' : ''}`).join('\n')}
    
    Create a comprehensive reading that includes:
    1. Today's energy forecast with specific timing
    2. Tomorrow's opportunities and challenges
    3. Weekly cosmic influences and themes
    4. Monthly transformation patterns
    5. Love and relationship dynamics
    6. Career and financial guidance
    7. Health and wellness insights
    8. Spiritual growth opportunities
    9. Lucky elements (numbers, colors, stones, times)
    10. Specific actionable advice with timing
    
    Base the reading on actual astronomical phenomena, planetary aspects, and lunar cycles.
    Provide specific times for optimal activities and decisions.
    Include warnings about challenging planetary aspects.
    Make predictions that are specific enough to be verifiable.
    
    Format as JSON with detailed explanations for each section.
  `
  
  // This would connect to your AI service
  return {
    today: "The current planetary alignment creates powerful manifestation energy between 2:30-4:15 PM. Mercury's position enhances communication, making this ideal for important conversations or negotiations.",
    tomorrow: "Mars enters a supportive trine with Jupiter at 11:42 AM, opening new opportunities in your career sector. The afternoon hours (3-6 PM) are particularly favorable for taking action on long-delayed projects.",
    week: "This week's cosmic theme revolves around transformation as the Moon waxes in your achievement sector. Wednesday's New Moon at 6:17 PM marks a powerful new beginning, especially for creative ventures.",
    month: "The monthly cycle emphasizes relationship harmony and financial growth. Three major planetary aspects on the 15th, 22nd, and 28th will bring significant developments in your personal life.",
    love: "Venus forms a beautiful conjunction with your natal Moon on Thursday evening. Single? Romantic connections are most likely during evening hours (7-10 PM). Partnered? Plan something special for this magical timing.",
    career: "Saturn's supportive aspect to your career sector continues through month-end. The ideal time for job interviews or important presentations is between 10 AM-2 PM on weekdays.",
    health: "Your vitality peaks during the waxing moon phases. Focus on detoxification and renewal during the waning phases. Tuesday and Friday offer the strongest healing energy.",
    spiritual: "The current lunar cycle awakens your intuitive abilities. Meditation and spiritual practices are most powerful during pre-dawn hours (5-7 AM) and evening twilight (6-8 PM).",
    lucky: {
      numbers: [7, 23, 41],
      colors: ["Deep Purple", "Silver", "Emerald Green"],
      stones: ["Amethyst", "Moonstone", "Clear Quartz"],
      times: ["2:30-4:15 PM Today", "11:42 AM Tomorrow", "6:17 PM Wednesday"],
      days: ["Thursday", "Saturday"]
    },
    warnings: "Avoid important decisions during Mercury's challenging aspect on Monday between 9-11 AM. Communication may be unclear during this window.",
    opportunities: "Major opportunity window opens Friday 3 PM through Sunday midnight. This rare planetary alignment won't repeat until next spring.",
    timing: {
      bestDays: ["Thursday", "Saturday", "Sunday"],
      challengingDays: ["Monday morning", "Wednesday evening"],
      neutralDays: ["Tuesday", "Friday"]
    }
  }
}
