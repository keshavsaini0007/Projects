// "use client"
// import { useEffect, useRef, useCallback } from "react"

// export default function CinematicCursor() {
//   const dotRef  = useRef(null)
//   const ringRef = useRef(null)
//   const mouse   = useRef({ x: -100, y: -100 })
//   const ring    = useRef({ x: -100, y: -100 })
//   const rafId   = useRef(null)

//   const animate = useCallback(() => {
//     // Ring lazily follows the dot
//     ring.current.x += (mouse.current.x - ring.current.x) * 0.12
//     ring.current.y += (mouse.current.y - ring.current.y) * 0.12

//     if (dotRef.current) {
//       dotRef.current.style.transform =
//         `translate(${mouse.current.x}px, ${mouse.current.y}px)`
//     }
//     if (ringRef.current) {
//       ringRef.current.style.transform =
//         `translate(${ring.current.x}px, ${ring.current.y}px)`
//     }

//     rafId.current = requestAnimationFrame(animate)
//   }, [])

//   useEffect(() => {
//     /* ── track mouse ── */
//     const onMove = (e) => {
//       mouse.current.x = e.clientX
//       mouse.current.y = e.clientY
//     }
//     window.addEventListener("mousemove", onMove)

//     /* ── expand ring on interactive elements ── */
//     const onOver = (e) => {
//       if (e.target.closest("button, a, input, textarea, select, [role='button'], label")) {
//         ringRef.current?.classList.add("cr-hover")
//         dotRef.current?.classList.add("cd-hover")
//       }
//     }
//     const onOut = (e) => {
//       if (e.target.closest("button, a, input, textarea, select, [role='button'], label")) {
//         ringRef.current?.classList.remove("cr-hover")
//         dotRef.current?.classList.remove("cd-hover")
//       }
//     }
//     document.addEventListener("mouseover", onOver)
//     document.addEventListener("mouseout",  onOut)

//     /* ── click burst ── */
//     const onClick = () => {
//       ringRef.current?.classList.add("cr-click")
//       setTimeout(() => ringRef.current?.classList.remove("cr-click"), 350)
//     }
//     window.addEventListener("click", onClick)

//     /* ── hide cursor when it leaves window ── */
//     const onLeave = () => {
//       dotRef.current?.classList.add("cd-hidden")
//       ringRef.current?.classList.add("cd-hidden")
//     }
//     const onEnter = () => {
//       dotRef.current?.classList.remove("cd-hidden")
//       ringRef.current?.classList.remove("cd-hidden")
//     }
//     document.addEventListener("mouseleave", onLeave)
//     document.addEventListener("mouseenter", onEnter)

//     rafId.current = requestAnimationFrame(animate)

//     return () => {
//       window.removeEventListener("mousemove", onMove)
//       document.removeEventListener("mouseover", onOver)
//       document.removeEventListener("mouseout",  onOut)
//       window.removeEventListener("click", onClick)
//       document.removeEventListener("mouseleave", onLeave)
//       document.removeEventListener("mouseenter", onEnter)
//       cancelAnimationFrame(rafId.current)
//     }
//   }, [animate])

//   return (
//     <>
//       <style>{`
//         /* Hide the real cursor site-wide */
//         *, *::before, *::after { cursor: none !important; }

//         /* ── DOT ── */
//         .cursor-dot {
//           position: fixed;
//           top: 0; left: 0;
//           width: 8px; height: 8px;
//           border-radius: 50%;
//           background: #c9a84c;
//           pointer-events: none;
//           z-index: 99999;
//           will-change: transform;
//           /* offset so (0,0) = center of dot */
//           margin: -4px 0 0 -4px;
//           transition: width 0.25s, height 0.25s,
//                       background 0.25s, opacity 0.2s;
//           mix-blend-mode: difference;
//         }
//         .cursor-dot.cd-hover {
//           width: 12px; height: 12px;
//           margin: -6px 0 0 -6px;
//           background: #f5e4a8;
//         }
//         .cursor-dot.cd-hidden { opacity: 0; }

//         /* ── RING ── */
//         .cursor-ring {
//           position: fixed;
//           top: 0; left: 0;
//           width: 38px; height: 38px;
//           border-radius: 50%;
//           border: 1px solid rgba(201,168,76,0.55);
//           pointer-events: none;
//           z-index: 99998;
//           will-change: transform;
//           /* offset so (0,0) = center of ring */
//           margin: -19px 0 0 -19px;
//           transition: width  0.35s cubic-bezier(0.16,1,0.3,1),
//                       height 0.35s cubic-bezier(0.16,1,0.3,1),
//                       margin 0.35s cubic-bezier(0.16,1,0.3,1),
//                       border-color 0.3s,
//                       opacity 0.2s;
//         }
//         .cursor-ring.cr-hover {
//           width: 58px; height: 58px;
//           margin: -29px 0 0 -29px;
//           border-color: rgba(201,168,76,0.9);
//         }
//         /* Click burst — ring expands then shrinks */
//         .cursor-ring.cr-click {
//           width: 70px; height: 70px;
//           margin: -35px 0 0 -35px;
//           border-color: rgba(245,228,168,0.8);
//           transition: width  0.18s ease-out,
//                       height 0.18s ease-out,
//                       margin 0.18s ease-out,
//                       border-color 0.18s;
//         }
//         .cursor-ring.cd-hidden { opacity: 0; }

//         /* ── Mobile: restore normal cursor ── */
//         @media (hover: none) and (pointer: coarse) {
//           *, *::before, *::after { cursor: auto !important; }
//           .cursor-dot, .cursor-ring { display: none; }
//         }
//       `}</style>

//       <div className="cursor-dot"  ref={dotRef}  aria-hidden="true" />
//       <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
//     </>
//   )
// }


// "use client"
// import { useEffect, useRef, useCallback } from "react"

// const CHAIN_LENGTH = 18
// const LINK_DISTANCE = 11
// const LINK_SIZE = 7
// const SPARKLE_COUNT = 22

// function makeLink() {
//   return { x: -200, y: -200 }
// }

// function makeSparkle() {
//   return {
//     x: -200, y: -200,
//     vx: 0, vy: 0,
//     life: 0,
//     maxLife: 0,
//     size: 0,
//     angle: 0,
//     active: false,
//   }
// }

// export default function CinematicCursor() {
//   const canvasRef = useRef(null)
//   const mouse     = useRef({ x: -200, y: -200 })
//   const chain     = useRef(Array.from({ length: CHAIN_LENGTH }, makeLink))
//   const sparkles  = useRef(Array.from({ length: SPARKLE_COUNT }, makeSparkle))
//   const rafId     = useRef(null)
//   const lastSpawn = useRef(0)

//   const spawnSparkle = useCallback((x, y) => {
//     const now = performance.now()
//     if (now - lastSpawn.current < 38) return
//     lastSpawn.current = now

//     const s = sparkles.current.find(s => !s.active)
//     if (!s) return
//     const angle = Math.random() * Math.PI * 2
//     const speed = 0.6 + Math.random() * 1.6
//     s.x = x + (Math.random() - 0.5) * 10
//     s.y = y + (Math.random() - 0.5) * 10
//     s.vx = Math.cos(angle) * speed
//     s.vy = Math.sin(angle) * speed - 0.5
//     s.life = 0
//     s.maxLife = 32 + Math.random() * 28
//     s.size = 2 + Math.random() * 3
//     s.angle = Math.random() * Math.PI * 2
//     s.active = true
//   }, [])

//   const draw = useCallback(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext("2d")
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // --- Update chain (verlet-style pull) ---
//     chain.current[0].x += (mouse.current.x - chain.current[0].x) * 0.28
//     chain.current[0].y += (mouse.current.y - chain.current[0].y) * 0.28

//     for (let i = 1; i < CHAIN_LENGTH; i++) {
//       const prev = chain.current[i - 1]
//       const cur  = chain.current[i]
//       const dx = cur.x - prev.x
//       const dy = cur.y - prev.y
//       const dist = Math.sqrt(dx * dx + dy * dy) || 1
//       const factor = (dist - LINK_DISTANCE) / dist * 0.42
//       cur.x -= dx * factor
//       cur.y -= dy * factor
//     }

//     // --- Spawn sparkle near tail ---
//     const tail = chain.current[CHAIN_LENGTH - 1]
//     spawnSparkle(tail.x, tail.y)

//     // --- Draw chain links ---
//     for (let i = 0; i < CHAIN_LENGTH; i++) {
//       const link = chain.current[i]
//       const t = i / (CHAIN_LENGTH - 1)

//       // Compute link angle from direction of travel
//       let angle = 0
//       if (i < CHAIN_LENGTH - 1) {
//         const next = chain.current[i + 1]
//         angle = Math.atan2(next.y - link.y, next.x - link.x)
//       } else {
//         const prev = chain.current[i - 1]
//         angle = Math.atan2(link.y - prev.y, link.x - prev.x)
//       }

//       // Link alpha fades toward tail
//       const alpha = 0.92 - t * 0.55

//       // Alternate oval/round links
//       const isRound = i % 2 === 0
//       const w = isRound ? LINK_SIZE * 0.85 : LINK_SIZE * 1.1
//       const h = isRound ? LINK_SIZE * 0.85 : LINK_SIZE * 0.55

//       ctx.save()
//       ctx.translate(link.x, link.y)
//       ctx.rotate(angle + Math.PI / 2)

//       // Outer ring (dark gold border)
//       ctx.beginPath()
//       ctx.ellipse(0, 0, w + 1.2, h + 1.2, 0, 0, Math.PI * 2)
//       ctx.strokeStyle = `rgba(120, 80, 0, ${alpha * 0.7})`
//       ctx.lineWidth = 1.2
//       ctx.stroke()

//       // Main link fill
//       const grad = ctx.createRadialGradient(-w * 0.3, -h * 0.3, 0, 0, 0, w * 1.1)
//       grad.addColorStop(0, `rgba(255, 235, 140, ${alpha})`)
//       grad.addColorStop(0.4, `rgba(220, 175, 50, ${alpha})`)
//       grad.addColorStop(0.75, `rgba(180, 130, 20, ${alpha})`)
//       grad.addColorStop(1, `rgba(120, 80, 0, ${alpha * 0.8})`)
//       ctx.beginPath()
//       ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2)
//       ctx.fillStyle = grad
//       ctx.fill()

//       // Highlight glint
//       ctx.beginPath()
//       ctx.ellipse(-w * 0.2, -h * 0.28, w * 0.35, h * 0.22, -0.4, 0, Math.PI * 2)
//       ctx.fillStyle = `rgba(255, 252, 200, ${alpha * 0.55})`
//       ctx.fill()

//       ctx.restore()
//     }

//     // --- Draw connecting thread between links ---
//     ctx.beginPath()
//     ctx.moveTo(chain.current[0].x, chain.current[0].y)
//     for (let i = 1; i < CHAIN_LENGTH; i++) {
//       const prev = chain.current[i - 1]
//       const cur  = chain.current[i]
//       const mx = (prev.x + cur.x) / 2
//       const my = (prev.y + cur.y) / 2
//       ctx.quadraticCurveTo(prev.x, prev.y, mx, my)
//     }
//     ctx.strokeStyle = "rgba(200, 155, 40, 0.18)"
//     ctx.lineWidth = 1
//     ctx.stroke()

//     // --- Draw cursor head dot ---
//     const headGrad = ctx.createRadialGradient(
//       mouse.current.x - 2, mouse.current.y - 2, 0,
//       mouse.current.x, mouse.current.y, 7
//     )
//     headGrad.addColorStop(0, "rgba(255, 250, 200, 1)")
//     headGrad.addColorStop(0.45, "rgba(230, 185, 50, 1)")
//     headGrad.addColorStop(1, "rgba(160, 110, 10, 0.7)")
//     ctx.beginPath()
//     ctx.arc(mouse.current.x, mouse.current.y, 5, 0, Math.PI * 2)
//     ctx.fillStyle = headGrad
//     ctx.fill()

//     // --- Update & draw sparkles ---
//     for (const s of sparkles.current) {
//       if (!s.active) continue
//       s.life++
//       s.x += s.vx
//       s.y += s.vy
//       s.vy += 0.045  // gravity
//       s.vx *= 0.97
//       s.angle += 0.18
//       if (s.life >= s.maxLife) { s.active = false; continue }

//       const progress = s.life / s.maxLife
//       const alpha = progress < 0.3
//         ? progress / 0.3
//         : 1 - (progress - 0.3) / 0.7
//       const sz = s.size * (1 - progress * 0.5)

//       // 4-pointed star sparkle
//       ctx.save()
//       ctx.translate(s.x, s.y)
//       ctx.rotate(s.angle)
//       ctx.globalAlpha = alpha * 0.9

//       const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sz * 1.5)
//       starGrad.addColorStop(0, "rgba(255, 255, 220, 1)")
//       starGrad.addColorStop(0.5, "rgba(240, 200, 60, 1)")
//       starGrad.addColorStop(1, "rgba(200, 150, 20, 0)")

//       ctx.beginPath()
//       for (let p = 0; p < 4; p++) {
//         const a = (p / 4) * Math.PI * 2
//         const r = p % 2 === 0 ? sz : sz * 0.22
//         const x = Math.cos(a) * (p === 0 ? sz * 1.4 : r)
//         const y = Math.sin(a) * (p === 0 ? sz * 1.4 : r)
//         p === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)

//         // interleave with short arms
//         const a2 = a + Math.PI / 4
//         ctx.lineTo(Math.cos(a2) * sz * 0.22, Math.sin(a2) * sz * 0.22)
//       }
//       ctx.closePath()
//       ctx.fillStyle = starGrad
//       ctx.fill()
//       ctx.globalAlpha = 1
//       ctx.restore()
//     }

//     rafId.current = requestAnimationFrame(draw)
//   }, [spawnSparkle])

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const resize = () => {
//       canvas.width  = window.innerWidth
//       canvas.height = window.innerHeight
//     }
//     resize()
//     window.addEventListener("resize", resize)

//     const onMove = e => {
//       mouse.current.x = e.clientX
//       mouse.current.y = e.clientY
//     }
//     window.addEventListener("mousemove", onMove)

//     const onLeave = () => { mouse.current.x = -200; mouse.current.y = -200 }
//     document.addEventListener("mouseleave", onLeave)

//     // Init chain to off-screen
//     chain.current.forEach(l => { l.x = -200; l.y = -200 })

//     rafId.current = requestAnimationFrame(draw)

//     return () => {
//       window.removeEventListener("resize", resize)
//       window.removeEventListener("mousemove", onMove)
//       document.removeEventListener("mouseleave", onLeave)
//       cancelAnimationFrame(rafId.current)
//     }
//   }, [draw])

//   return (
//     <>
//       <style>{`
//         *, *::before, *::after { cursor: none !important; }
//         .chain-canvas {
//           position: fixed;
//           inset: 0;
//           pointer-events: none;
//           z-index: 99999;
//         }
//         @media (hover: none) and (pointer: coarse) {
//           *, *::before, *::after { cursor: auto !important; }
//           .chain-canvas { display: none; }
//         }
//       `}</style>
//       <canvas ref={canvasRef} className="chain-canvas" aria-hidden="true" />
//     </>
//   )
// }


"use client"
import { useEffect, useRef, useCallback } from "react"

const TRAIL_LENGTH       = 55
const PARTICLE_POOL      = 120
const HEAD_WIDTH         = 5
const SPREAD_BASE        = 5
const GLOW_WIDTHS        = [3, 2, 1]
const MAX_TRAIL_DISTANCE = 800

function makePoint() {
  return { x: -500, y: -500 }
}

function makeParticle() {
  return {
    x: 0, y: 0, vx: 0, vy: 0,
    life: 0, maxLife: 0,
    size: 0, type: 0, active: false,
    orbitAngle: 0, orbitR: 0,
  }
}

export default function CinematicCursor() {
  const canvasRef  = useRef(null)
  const mouse      = useRef({ x: -500, y: -500 })
  const trail      = useRef(Array.from({ length: TRAIL_LENGTH }, makePoint))
  const particles  = useRef(Array.from({ length: PARTICLE_POOL }, makeParticle))
  const rafId      = useRef(null)
  const frameCount = useRef(0)

  const spawnParticle = useCallback((x, y, trailIdx) => {
    const p = particles.current.find(p => !p.active)
    if (!p) return
    // Spread is proportional to how wide the stream is at this point
    const widthAtIdx = Math.max(1, SPREAD_BASE * Math.pow(1 - trailIdx / TRAIL_LENGTH, 1.4))
    const spread = widthAtIdx * 10.1
    const angle  = Math.random() * Math.PI * 2
    const speed  = 0.15 + Math.random() * 0.9
    p.x        = x + (Math.random() - 0.5) * spread * 2
    p.y        = y + (Math.random() - 0.5) * spread * 0.7
    p.vx       = Math.cos(angle) * speed * 0.5
    p.vy       = Math.sin(angle) * speed * 0.4 - 0.2
    p.life     = 0
    p.maxLife  = 25 + Math.random() * 40
    p.type     = Math.random() < 0.15 ? 1 : 0
    const baseSize = p.type === 1
      ? (2.5 + Math.random() * 4) * (1 - trailIdx / TRAIL_LENGTH * 0.7)
      : (0.8 + Math.random() * 2.5) * (1 - trailIdx / TRAIL_LENGTH * 0.6)
    p.size     = baseSize * 0.65  // slimmer sparkles to match thinner trail
    p.active   = true
  }, [])

  const drawStar4 = useCallback((ctx, x, y, r, angle) => {
    ctx.beginPath()
    for (let i = 0; i < 8; i++) {
      const a  = angle + (i / 8) * Math.PI * 2
      const d  = i % 2 === 0 ? r : r * 0.2
      i === 0
        ? ctx.moveTo(x + Math.cos(a) * d, y + Math.sin(a) * d)
        : ctx.lineTo(x + Math.cos(a) * d, y + Math.sin(a) * d)
    }
    ctx.closePath()
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    frameCount.current++

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update trail — head snaps to mouse, each point lags behind
    trail.current[0].x += (mouse.current.x - trail.current[0].x) * 0.38
    trail.current[0].y += (mouse.current.y - trail.current[0].y) * 0.38
    for (let i = 1; i < TRAIL_LENGTH; i++) {
      const prev = trail.current[i - 1]
      const cur  = trail.current[i]
      const lag  = Math.max(0.035, 0.3 - i * 0.004)
      cur.x += (prev.x - cur.x) * lag
      cur.y += (prev.y - cur.y) * lag
    }

    const pts = trail.current

    // Accumulate distance along the trail to clamp visual length
    const cumDist = [0]
    for (let i = 1; i < TRAIL_LENGTH; i++) {
      const dx = pts[i].x - pts[i - 1].x
      const dy = pts[i].y - pts[i - 1].y
      cumDist[i] = cumDist[i - 1] + Math.hypot(dx, dy)
    }

    // Spawn glitter every 2 frames
    if (frameCount.current % 2 === 0) {
      for (let i = 0; i < TRAIL_LENGTH; i += 2) {
        const distT = Math.min(1, cumDist[i] / MAX_TRAIL_DISTANCE)
        if (distT >= 1) continue
        const density = Math.max(0, 0.8 - i / TRAIL_LENGTH * 0.7) * (1 - distT)
        if (Math.random() < density)
          spawnParticle(pts[i].x, pts[i].y, i)
      }
    }

    // ── Draw the tapered stream as filled polygon ──────────────────────
    // Build a thick ribbon by offsetting each trail point perpendicular
    // to the trail direction, with width tapering from head → tail

    // Compute per-point tangent directions
    const normals = []
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      let dx, dy
      if (i === 0) {
        dx = pts[0].x - pts[1].x
        dy = pts[0].y - pts[1].y
      } else if (i === TRAIL_LENGTH - 1) {
        dx = pts[i].x - pts[i - 1].x
        dy = pts[i].y - pts[i - 1].y
      } else {
        dx = pts[i - 1].x - pts[i + 1].x
        dy = pts[i - 1].y - pts[i + 1].y
      }
      const len = Math.sqrt(dx * dx + dy * dy) || 1
      normals.push({ nx: -dy / len, ny: dx / len })
    }

    // Width profile: fat at head, tapers with power curve to 0 at tail
    const getWidth = (i) => {
      const t = i / (TRAIL_LENGTH - 1)
      const distT = Math.min(1, cumDist[i] / MAX_TRAIL_DISTANCE)
      return HEAD_WIDTH * Math.pow(1 - t, 1.1) * Math.pow(1 - distT, 1.2)
    }

    // Build left & right edge arrays
    const left  = []
    const right = []
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const w = getWidth(i)
      const { nx, ny } = normals[i]
      left.push({ x: pts[i].x + nx * w, y: pts[i].y + ny * w })
      right.push({ x: pts[i].x - nx * w, y: pts[i].y - ny * w })
    }

    // ── Pass 1: wide outer glow ──
    ctx.globalCompositeOperation = "lighter"
    for (let pass = 0; pass < 3; pass++) {
      const extraW = GLOW_WIDTHS[pass]
      const alphas = [0.07, 0.13, 0.22][pass]

      ctx.beginPath()
      // left edge forward
      ctx.moveTo(left[0].x + normals[0].nx * extraW, left[0].y + normals[0].ny * extraW)
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const px = left[i].x + normals[i].nx * extraW
        const py = left[i].y + normals[i].ny * extraW
        const prev = left[i - 1]
        ctx.quadraticCurveTo(
          prev.x + normals[i-1].nx * extraW,
          prev.y + normals[i-1].ny * extraW,
          (prev.x + normals[i-1].nx * extraW + px) / 2,
          (prev.y + normals[i-1].ny * extraW + py) / 2
        )
      }
      // right edge backward
      for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
        const px = right[i].x - normals[i].nx * extraW
        const py = right[i].y - normals[i].ny * extraW
        if (i === TRAIL_LENGTH - 1) ctx.lineTo(px, py)
        else {
          const next = right[i + 1]
          ctx.quadraticCurveTo(
            next.x - normals[i+1].nx * extraW,
            next.y - normals[i+1].ny * extraW,
            (next.x - normals[i+1].nx * extraW + px) / 2,
            (next.y - normals[i+1].ny * extraW + py) / 2
          )
        }
      }
      ctx.closePath()

      const glowGrad = ctx.createLinearGradient(pts[0].x, pts[0].y, pts[TRAIL_LENGTH-1].x, pts[TRAIL_LENGTH-1].y)
      glowGrad.addColorStop(0,   `rgba(255, 240, 130, ${alphas})`)
      glowGrad.addColorStop(0.4, `rgba(240, 185, 40,  ${alphas * 0.6})`)
      glowGrad.addColorStop(1,   `rgba(200, 130, 0,   0)`)
      ctx.fillStyle = glowGrad
      ctx.fill()
    }

    // ── Pass 2: solid ribbon fill ──
    ctx.beginPath()
    ctx.moveTo(left[0].x, left[0].y)
    for (let i = 1; i < TRAIL_LENGTH; i++) {
      const mx = (left[i - 1].x + left[i].x) / 2
      const my = (left[i - 1].y + left[i].y) / 2
      ctx.quadraticCurveTo(left[i - 1].x, left[i - 1].y, mx, my)
    }
    ctx.lineTo(right[TRAIL_LENGTH - 1].x, right[TRAIL_LENGTH - 1].y)
    for (let i = TRAIL_LENGTH - 2; i >= 0; i--) {
      const mx = (right[i + 1].x + right[i].x) / 2
      const my = (right[i + 1].y + right[i].y) / 2
      ctx.quadraticCurveTo(right[i + 1].x, right[i + 1].y, mx, my)
    }
    ctx.closePath()

    // Gradient along the trail length
    const ribbonGrad = ctx.createLinearGradient(
      pts[0].x, pts[0].y,
      pts[TRAIL_LENGTH - 1].x, pts[TRAIL_LENGTH - 1].y
    )
    ribbonGrad.addColorStop(0,    "rgba(255, 255, 200, 0.98)")
    ribbonGrad.addColorStop(0.06, "rgba(255, 225, 90,  0.95)")
    ribbonGrad.addColorStop(0.2,  "rgba(240, 180, 35,  0.85)")
    ribbonGrad.addColorStop(0.45, "rgba(210, 150, 15,  0.55)")
    ribbonGrad.addColorStop(0.7,  "rgba(180, 115, 5,   0.25)")
    ribbonGrad.addColorStop(1,    "rgba(150, 85,  0,   0)")
    ctx.fillStyle = ribbonGrad
    ctx.fill()

    // ── Pass 3: bright spine highlight down the center ──
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < TRAIL_LENGTH; i++) {
      const mx = (pts[i - 1].x + pts[i].x) / 2
      const my = (pts[i - 1].y + pts[i].y) / 2
      ctx.quadraticCurveTo(pts[i - 1].x, pts[i - 1].y, mx, my)
    }
    const spineGrad = ctx.createLinearGradient(
      pts[0].x, pts[0].y,
      pts[TRAIL_LENGTH - 1].x, pts[TRAIL_LENGTH - 1].y
    )
    spineGrad.addColorStop(0,    "rgba(255, 255, 230, 1)")
    spineGrad.addColorStop(0.1,  "rgba(255, 240, 140, 0.9)")
    spineGrad.addColorStop(0.4,  "rgba(240, 190, 50,  0.4)")
    spineGrad.addColorStop(1,    "rgba(200, 140, 10,  0)")
    ctx.strokeStyle = spineGrad
    ctx.lineWidth   = 2
    ctx.lineCap     = "round"
    ctx.stroke()
    ctx.globalCompositeOperation = "source-over"

    // ── Glitter particles ──
    for (const p of particles.current) {
      if (!p.active) continue
      p.life++
      p.x  += p.vx
      p.y  += p.vy
      p.vy += 0.04
      p.vx *= 0.976
      if (p.life >= p.maxLife) { p.active = false; continue }

      const progress = p.life / p.maxLife
      const alpha    = progress < 0.25 ? progress / 0.25 : 1 - (progress - 0.25) / 0.75
      const sz       = p.size * (1 - progress * 0.45)

      ctx.globalAlpha = alpha * 0.9
      ctx.globalCompositeOperation = "lighter"

      if (p.type === 1) {
        const angle = p.life * 0.07
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 1.8)
        g.addColorStop(0,   "rgba(255, 255, 220, 1)")
        g.addColorStop(0.4, "rgba(255, 215, 55,  1)")
        g.addColorStop(1,   "rgba(220, 155, 10,  0)")
        ctx.fillStyle = g
        drawStar4(ctx, p.x, p.y, sz * 1.5, angle)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, sz * 0.25, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 245, 1)"
        ctx.fill()
      } else {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 1.3)
        g.addColorStop(0,   "rgba(255, 248, 175, 1)")
        g.addColorStop(0.5, "rgba(240, 185, 38,  0.8)")
        g.addColorStop(1,   "rgba(200, 130, 0,   0)")
        ctx.beginPath()
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"
    }

    // ── Cursor head ──
    ctx.globalCompositeOperation = "lighter"
    const hx = mouse.current.x
    const hy = mouse.current.y
    const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, 22)
    halo.addColorStop(0,   "rgba(255, 255, 230, 0.7)")
    halo.addColorStop(0.4, "rgba(255, 210, 60,  0.35)")
    halo.addColorStop(1,   "rgba(220, 150, 0,   0)")
    ctx.beginPath()
    ctx.arc(hx, hy, 22, 0, Math.PI * 2)
    ctx.fillStyle = halo
    ctx.fill()
    const core = ctx.createRadialGradient(hx - 1, hy - 1, 0, hx, hy, 5)
    core.addColorStop(0,   "rgba(255, 255, 245, 1)")
    core.addColorStop(0.6, "rgba(255, 218, 78,  1)")
    core.addColorStop(1,   "rgba(200, 145, 15,  0.6)")
    ctx.beginPath()
    ctx.arc(hx, hy, 5, 0, Math.PI * 2)
    ctx.fillStyle = core
    ctx.fill()
    ctx.globalCompositeOperation = "source-over"

    rafId.current = requestAnimationFrame(draw)
  }, [spawnParticle, drawStar4])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
    const onMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener("mousemove", onMove)
    const onLeave = () => { mouse.current.x = -500; mouse.current.y = -500 }
    document.addEventListener("mouseleave", onLeave)
    trail.current.forEach(p => { p.x = -500; p.y = -500 })
    rafId.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [draw])

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        .chain-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99999;
        }
        @media (hover: none) and (pointer: coarse) {
          *, *::before, *::after { cursor: auto !important; }
          .chain-canvas { display: none; }
        }
      `}</style>
      <canvas ref={canvasRef} className="chain-canvas" aria-hidden="true" />
    </>
  )
}