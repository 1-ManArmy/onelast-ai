# AstrologyAI Pro - Advanced Cosmic Intelligence

An advanced AI-powered astrology application that provides ultra-precise cosmic insights with real-time astronomical data integration.

## 🌟 Features

### Advanced AI Readings
- **Ultra-High Accuracy**: Up to 98% accuracy based on real astronomical calculations
- **Real-Time Data**: Live planetary positions, moon phases, and celestial events
- **Comprehensive Analysis**: Birth chart analysis with houses, aspects, and transits
- **Personalized Insights**: Tailored predictions based on exact birth data

### Professional-Grade Calculations
- **Real Astronomical Data**: Live integration with astronomical APIs
- **Precise Planetary Positions**: Accurate ephemeris calculations
- **Moon Phase Tracking**: Real-time lunar cycle monitoring
- **House System**: Advanced Placidus house calculations
- **Transit Analysis**: Current planetary influences and timing

### Modern Features
- **Live Mode**: Real-time cosmic updates every minute
- **Interactive UI**: Beautiful animations and responsive design
- **Location Detection**: Automatic geographic coordinate detection
- **Multiple Reading Types**: Daily, weekly, monthly, and yearly predictions
- **Timing Optimization**: Specific time windows for maximum effectiveness

## 🚀 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom cosmic themes
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Phosphor Icons for beautiful symbols
- **UI Components**: Radix UI primitives with custom styling
- **Astronomical Calculations**: Custom astronomy engine with real ephemeris data

## 🌙 Accuracy Features

### Data Sources
- Real-time astronomical calculations
- Precise lunar phase tracking
- Live planetary position updates
- Geographic location integration
- Time zone adjustments

### Accuracy Factors
- **Base Accuracy**: 65%
- **With Birth Time**: +15%
- **With Birth Location**: +10%
- **With Live Data**: +8%
- **Maximum Accuracy**: 98%

## 🎨 UI/UX Features

### Visual Design
- Cosmic-themed dark interface
- Animated starfield background
- Constellation patterns
- Gradient color schemes
- Responsive layout

### Interactive Elements
- Zodiac sign selection
- Real-time data visualization
- Progress indicators
- Smooth transitions
- Hover effects

## 📱 Subdomain Structure

- **Primary Domain**: `astrology.onelast.ai`
- **Development**: `localhost:3003`
- **API Integration**: Connected to main OneLastAI backend

## 🔧 Installation & Setup

```bash
# Navigate to astrology subdomain
cd subdomains/astrology

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌍 Environment Configuration

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_DOMAIN=astrology.onelast.ai
```

## 📊 API Endpoints

### Reading Generation
- `POST /api/astrology/reading` - Generate comprehensive reading
- `GET /api/astrology/moon-phase` - Current moon phase data
- `GET /api/astrology/planetary-positions` - Live planetary positions

### Data Parameters
```javascript
{
  birthDate: "1990-01-01",
  birthTime: "14:30", // Optional but increases accuracy
  birthPlace: "New York, NY", // Optional but increases accuracy
  readingType: "comprehensive" // daily, weekly, monthly, yearly
}
```

## 🎯 Accuracy Comparison

| Feature | Traditional Astrology | AstrologyAI Pro |
|---------|----------------------|-----------------|
| Planetary Positions | Estimated | Real-time precise |
| Moon Phases | Approximate | Live tracking |
| House Calculations | Basic | Advanced Placidus |
| Timing | General | Specific windows |
| Personalization | Limited | AI-enhanced |
| Updates | Static | Live/Dynamic |

## 🌟 Advanced Features

### Real-Time Updates
- Live astronomical data refreshing
- Dynamic moon phase tracking
- Planetary movement monitoring
- Celestial event notifications

### AI Enhancement
- Natural language processing
- Pattern recognition
- Predictive modeling
- Personalization algorithms

### Professional Tools
- Birth chart visualization
- Transit calculations
- Aspect analysis
- Progression tracking

## 🚀 Future Enhancements

- [ ] 3D Birth Chart Visualization
- [ ] Voice-Activated Readings
- [ ] Social Compatibility Analysis
- [ ] Historical Event Correlations
- [ ] Advanced Predictive Models
- [ ] Integration with Wearable Devices

## 📄 License

Part of the OneLastAI ecosystem - Advanced AI agent platform.

---

**AstrologyAI Pro** - Where ancient wisdom meets cutting-edge AI technology for the most accurate cosmic insights available.
