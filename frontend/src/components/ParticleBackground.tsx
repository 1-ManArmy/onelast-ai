import { useEffect } from 'react'

export function ParticleBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      // Add some random colors for particles
      const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      particle.style.backgroundColor = randomColor
      particle.style.borderRadius = '50%'
      particle.style.position = 'absolute'
      particle.style.opacity = '0.6'
      particle.style.animation = `float ${5 + Math.random() * 3}s ease-in-out infinite`
      
      document.querySelector('.particle-container')?.appendChild(particle)
      
      setTimeout(() => {
        particle.remove()
      }, 8000)
    }

    const interval = setInterval(createParticle, 300)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="particle-container fixed inset-0 pointer-events-none z-0 overflow-hidden" />
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.7;
          }
        }
        
        .particle {
          filter: blur(0.5px);
          transition: all 0.3s ease;
        }
        
        .particle:hover {
          transform: scale(1.5);
          opacity: 1 !important;
        }
      `}</style>
    </>
  )
}
