class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId)
    this.ctx = this.canvas.getContext("2d")
    this.particles = []
    this.mousePosition = { x: 0, y: 0 }
    this.isMouseMoving = false
    this.mouseTimeout = null

    // Default options for starlight effect
    this.options = {
      particleDensity: 20000, // Higher number = fewer particles
      particleSize: { min: 0.1, max: 2 },
      particleSpeed: { min: -0.05, max: 0.05 },
      particleOpacity: { min: 0.2, max: 0.8 },
      connectionDistance: 150,
      mouseInfluenceDistance: 200,
      mouseForce: 0.01,
      twinkleSpeed: 0.05,
      ...options,
    }

    this.init()
  }

  init() {
    this.resizeCanvas()
    this.initParticles()
    this.setupEventListeners()
    this.animate()
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  initParticles() {
    this.particles = []
    const area = this.canvas.width * this.canvas.height
    const particleCount = Math.min(Math.floor(area / this.options.particleDensity), 150)

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size:
          Math.random() * (this.options.particleSize.max - this.options.particleSize.min) +
          this.options.particleSize.min,
        speedX: (Math.random() - 0.5) * (this.options.particleSpeed.max - this.options.particleSpeed.min),
        speedY: (Math.random() - 0.5) * (this.options.particleSpeed.max - this.options.particleSpeed.min),
        opacity:
          Math.random() * (this.options.particleOpacity.max - this.options.particleOpacity.min) +
          this.options.particleOpacity.min,
        twinklePhase: Math.random() * Math.PI * 2,
      })
    }
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.resizeCanvas()
      this.initParticles()
    })

    this.canvas.addEventListener("mousemove", (e) => {
      this.mousePosition.x = e.clientX
      this.mousePosition.y = e.clientY
      this.isMouseMoving = true

      clearTimeout(this.mouseTimeout)
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false
      }, 100)
    })
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = this.canvas.height
      if (particle.y > this.canvas.height) particle.y = 0

      // Update twinkle effect
      particle.twinklePhase += this.options.twinkleSpeed
      const twinkle = Math.sin(particle.twinklePhase) * 0.5 + 0.5
      const currentOpacity = particle.opacity * twinkle
      
      // Draw particle with glow effect
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      )
      gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      this.ctx.fillStyle = gradient
      this.ctx.fill()

      // Connect particles within distance
      this.connectParticles(particle, i)

      // Mouse interaction
      if (this.isMouseMoving) {
        const dx = this.mousePosition.x - particle.x
        const dy = this.mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.options.mouseInfluenceDistance) {
          const force = (this.options.mouseInfluenceDistance - distance) / this.options.mouseInfluenceDistance
          const directionX = dx / distance || 0
          const directionY = dy / distance || 0

          particle.speedX -= directionX * force * this.options.mouseForce
          particle.speedY -= directionY * force * this.options.mouseForce
        }
      }
    })
  }

  connectParticles(particle, index) {
    for (let j = index + 1; j < this.particles.length; j++) {
      const otherParticle = this.particles[j]
      const dx = particle.x - otherParticle.x
      const dy = particle.y - otherParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.options.connectionDistance) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / this.options.connectionDistance)})`
        this.ctx.lineWidth = 0.5
        this.ctx.moveTo(particle.x, particle.y)
        this.ctx.lineTo(otherParticle.x, otherParticle.y)
        this.ctx.stroke()
      }
    }
  }

  animate() {
    this.drawParticles()
    requestAnimationFrame(() => this.animate())
  }

  updateDensity(density) {
    // density is 0-100
    this.options.particleDensity = 30000 - density * 250 // Inverse relationship
    this.initParticles()
  }
}
