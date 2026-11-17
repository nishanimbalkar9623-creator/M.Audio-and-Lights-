import { useEffect, useRef, useState } from 'react'
import './LogoIntro.css'

const LogoIntro = ({ onComplete }) => {
  const canvasRef = useRef(null)
  const [showBrand, setShowBrand] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const logo = new Image()
    logo.src = `${import.meta.env.BASE_URL}logo.png`

    logo.onload = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const vw = window.innerWidth
      const vh = window.innerHeight
      const size = Math.min(vw * 0.28, vh * 0.42, 260)

      canvas.width = vw * dpr
      canvas.height = vh * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = vw + 'px'
      canvas.style.height = vh + 'px'

      const centerX = vw / 2
      const centerY = vh / 2
      const logoX = centerX - size / 2
      const logoY = centerY - size / 2

      // ── Draw logo to offscreen canvas to read pixel data ──
      const offscreen = document.createElement('canvas')
      offscreen.width = size
      offscreen.height = size
      const offCtx = offscreen.getContext('2d')
      offCtx.drawImage(logo, 0, 0, size, size)
      const imageData = offCtx.getImageData(0, 0, size, size)
      const data = imageData.data

      // ── Identify the white "M" pixels only ──
      // The logo is a white outer background, a black circle, and a white "M".
      // We flood-fill the outer white background from the borders so we can
      // tell it apart from the "M". Only the "M" stays white; all else is black.
      const isWhite = (i) => data[i] > 170 && data[i + 1] > 170 && data[i + 2] > 170
      const outer = new Uint8Array(size * size)
      const stack = []
      const pushIfWhite = (x, y) => {
        if (x < 0 || y < 0 || x >= size || y >= size) return
        const idx = y * size + x
        if (outer[idx]) return
        const i = idx * 4
        if (!isWhite(i)) return
        outer[idx] = 1
        stack.push([x, y])
      }
      for (let x = 0; x < size; x++) { pushIfWhite(x, 0); pushIfWhite(x, size - 1) }
      for (let y = 0; y < size; y++) { pushIfWhite(0, y); pushIfWhite(size - 1, y) }
      while (stack.length) {
        const [x, y] = stack.pop()
        pushIfWhite(x + 1, y); pushIfWhite(x - 1, y)
        pushIfWhite(x, y + 1); pushIfWhite(x, y - 1)
      }

      // Build reveal pixels — only the "M" (white and NOT part of outer fill)
      const pixelSize = 4
      const pixels = []
      for (let y = 0; y < size; y += pixelSize) {
        for (let x = 0; x < size; x += pixelSize) {
          const idx = y * size + x
          const i = idx * 4
          if (isWhite(i) && !outer[idx]) {
            pixels.push({
              x: logoX + x,
              y: logoY + y,
              startX: centerX + (Math.random() - 0.5) * vw,
              startY: centerY + (Math.random() - 0.5) * vh,
              delay: Math.random() * 0.5,
            })
          }
        }
      }

      // ── Timeline in ms (total ~2.8s) ──
      const ASSEMBLE_END = 1800   // pixels assemble
      const HOLD_END = 2400       // completed M holds
      const TOTAL = 4000          // clean fade to homepage

      const startTime = performance.now()

      const drawLogoWhite = (alpha) => {
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#ffffff'
        pixels.forEach((p) => {
          ctx.fillRect(p.x, p.y, pixelSize, pixelSize)
        })
        ctx.globalAlpha = 1
      }

      const animate = (now) => {
        const elapsed = now - startTime
        ctx.clearRect(0, 0, vw, vh)

        if (elapsed >= 900) setShowBrand(true)

        if (elapsed < ASSEMBLE_END) {
          // Phase 1 — pixels fly in and assemble into the M
          const prog = elapsed / ASSEMBLE_END
          pixels.forEach((p) => {
            const pProg = Math.max(0, Math.min(1, (prog - p.delay) / 0.6))
            const ease = 1 - Math.pow(1 - pProg, 3)
            const cx = p.startX + (p.x - p.startX) * ease
            const cy = p.startY + (p.y - p.startY) * ease
            ctx.globalAlpha = pProg
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(cx, cy, pixelSize, pixelSize)
            // subtle trailing particle
            if (pProg > 0 && pProg < 0.85) {
              ctx.globalAlpha = (1 - pProg) * 0.35
              ctx.fillRect(cx + 2, cy + 2, 2, 2)
            }
          })
          ctx.globalAlpha = 1
        } else if (elapsed < HOLD_END) {
          // Phase 2 — full logo mark with soft white glow
          const glow = Math.min(1, (elapsed - ASSEMBLE_END) / 400)
          const g = ctx.createRadialGradient(centerX, centerY, size * 0.15, centerX, centerY, size * 0.85)
          g.addColorStop(0, `rgba(255,255,255,${0.10 * glow})`)
          g.addColorStop(0.5, `rgba(255,255,255,${0.03 * glow})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.globalAlpha = 1
          ctx.fillStyle = g
          ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2)
          drawLogoWhite(1)
        } else {
          // Phase 3 — white light sweep, then fade to homepage
          if (!fadeOut) setFadeOut(true)
          const prog = (elapsed - HOLD_END) / (TOTAL - HOLD_END)
          const fade = 1 - prog

          const sweepX = -vw * 0.4 + vw * 1.4 * prog
          const sweepGrad = ctx.createLinearGradient(sweepX - 180, 0, sweepX + 180, 0)
          sweepGrad.addColorStop(0, 'rgba(255,255,255,0)')
          sweepGrad.addColorStop(0.5, `rgba(255,255,255,${0.10 * fade})`)
          sweepGrad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.globalAlpha = 1
          ctx.fillStyle = sweepGrad
          ctx.fillRect(0, 0, vw, vh)

          drawLogoWhite(fade)
        }

        if (elapsed < TOTAL) {
          animFrameRef.current = requestAnimationFrame(animate)
        } else {
          onComplete()
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    logo.onerror = () => onComplete()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`logo-intro ${fadeOut ? 'logo-intro--out' : ''}`}>
      <canvas ref={canvasRef} className="logo-intro__canvas" />
      <div className={`logo-intro__brand ${showBrand ? 'visible' : ''} ${fadeOut ? 'fade-out' : ''}`}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="logo-intro__logo" />
        <span className="logo-intro__company">AUDIO &amp; LIGHTS</span>
      </div>
    </div>
  )
}

export default LogoIntro
