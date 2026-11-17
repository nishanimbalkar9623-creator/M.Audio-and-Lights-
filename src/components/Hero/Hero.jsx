import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const TOTAL_FRAMES = 30
const SCROLL_HEIGHT = '300vh'

const Hero = () => {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Preload frames from public/frames
  useEffect(() => {
    let loadedCount = 0
    const images = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const num = String(i).padStart(3, '0')
      img.src = `${import.meta.env.BASE_URL}frames/frame_${num}.png`
      img.onload = () => {
        loadedCount++
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount === TOTAL_FRAMES) setLoaded(true)
      }
      images.push(img)
    }
    imagesRef.current = images
  }, [])

  // Draw frame on canvas (black & white via grayscale filter)
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    // Clear (black)
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, w, h)

    // Draw image with contain scaling (no distortion)
    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = w / h
    let drawW, drawH, drawX, drawY

    if (imgRatio > canvasRatio) {
      drawW = w
      drawH = w / imgRatio
      drawX = 0
      drawY = (h - drawH) / 2
    } else {
      drawH = h
      drawW = h * imgRatio
      drawX = (w - drawW) / 2
      drawY = 0
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH)
  }, [])

  // Scroll handler — frame advances with scroll
  useEffect(() => {
    if (!loaded) return

    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.clientHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight))

      setScrollProgress(progress)

      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex
        requestAnimationFrame(() => drawFrame(frameIndex))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    drawFrame(0)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [loaded, drawFrame])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame])

  const textOpacity = Math.max(0, 1 - scrollProgress * 2.5)

  return (
    <section id="home" ref={sectionRef} className="hero" style={{ height: SCROLL_HEIGHT }}>
      <div className="hero__sticky">
        {!loaded && (
          <div className="hero__loader">
            <div className="hero__loader-spinner" />
            <span>Loading experience...</span>
          </div>
        )}

        <canvas ref={canvasRef} className="hero__canvas" />

        <div className="hero__overlay" />

        {/* Main content */}
        <motion.div
          className="hero__content"
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="hero__label">Audio &amp; Lights Presents</span>
          <h1 className="hero__title">
            WE CREATE EXPERIENCES THAT MOVE PEOPLE.
          </h1>
          <p className="hero__subtitle">
            Professional Sound, Lighting, LED Displays &amp; Complete Event Production Solutions.
          </p>
          <div className="hero__ctas">
            <a href="#services" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Explore Our Services
            </a>
            <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Discuss Your Event
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        {scrollProgress < 0.05 && loaded && (
          <motion.div
            className="hero__scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span>Scroll down</span>
            <div className="hero__scroll-line">
              <div className="hero__scroll-dot" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Hero
