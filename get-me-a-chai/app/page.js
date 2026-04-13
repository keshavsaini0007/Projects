"use client"
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { Users, Coins, Handshake } from 'lucide-react'

const AnimatedSVG = ({ type }) => {
  const svgRefs = useRef([])

  useEffect(() => {
    svgRefs.current.forEach((el, i) => {
      if (el) {
        el.style.animationDelay = `${i * 0.5}s`
      }
    })
  }, [])

  const svgs = {
    coffee: (
      <svg viewBox="0 0 200 200" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
        <style>{`
    @keyframes float {
      0%,100%{transform:translateY(0)}
      50%{transform:translateY(-8px)}
    }
    @keyframes steam1 {
      0%{opacity:0;transform:translateY(0)}
      30%{opacity:0.7}
      100%{opacity:0;transform:translateY(-22px)}
    }
    @keyframes steam2 {
      0%{opacity:0;transform:translateY(0)}
      30%{opacity:0.5}
      100%{opacity:0;transform:translateY(-22px)}
    }
    @keyframes steam3 {
      0%{opacity:0;transform:translateY(0)}
      30%{opacity:0.6}
      100%{opacity:0;transform:translateY(-22px)}
    }
    @keyframes shimmer {
      0%,100%{opacity:0.5} 50%{opacity:0.9}
    }
    .cup-float{animation:float 3s ease-in-out infinite;transform-origin:100px 140px}
    .s1{animation:steam1 2s ease-out infinite;transform-origin:82px 72px}
    .s2{animation:steam2 2s ease-out infinite 0.6s;transform-origin:100px 68px}
    .s3{animation:steam3 2s ease-out infinite 1.2s;transform-origin:118px 72px}
    .liq{animation:shimmer 2.4s ease-in-out infinite}
  `}</style>
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5E3C" />
            <stop offset="100%" stopColor="#3E2008" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C8813A" />
            <stop offset="100%" stopColor="#7A3D10" />
          </linearGradient>
          <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A96A" />
            <stop offset="100%" stopColor="#A0722A" />
          </linearGradient>
        </defs>

        <g className="s1">
          <path d="M82 72 Q78 62 82 52 Q86 42 82 32" fill="none" stroke="#C8813A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className="s2">
          <path d="M100 68 Q96 56 100 46 Q104 36 100 26" fill="none" stroke="#C8813A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g className="s3">
          <path d="M118 72 Q114 62 118 52 Q122 42 118 32" fill="none" stroke="#C8813A" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <g className="cup-float">
          <ellipse cx="100" cy="162" rx="52" ry="9" fill="url(#plateGrad)" opacity="0.9" />
          <ellipse cx="100" cy="160" rx="46" ry="7" fill="url(#plateGrad)" opacity="0.7" />
          <path d="M68 100 Q64 155 76 158 Q100 164 124 158 Q136 155 132 100 Z" fill="url(#bodyGrad)" />
          <ellipse cx="100" cy="100" rx="32" ry="7" fill="#8B5E3C" />
          <ellipse cx="100" cy="99" rx="31" ry="6" fill="#A0722A" />
          <ellipse className="liq" cx="100" cy="100" rx="28" ry="5.5" fill="url(#liquidGrad)" />
          <path d="M90 99 Q100 96 110 99" fill="none" stroke="#D4A96A" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M94 101 Q100 98 106 101" fill="none" stroke="#D4A96A" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <path d="M132 112 Q152 112 152 128 Q152 144 132 144" fill="none" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" />
          <path d="M132 114 Q148 114 148 128 Q148 142 132 142" fill="none" stroke="#A0722A" strokeWidth="2" strokeLinecap="round" />
          <path d="M75 108 Q72 132 74 148" fill="none" stroke="#C89060" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        </g>
      </svg>
      // <svg ref={el => svgRefs.current[0] = el} viewBox="0 0 64 64" className="w-16 h-16 animate-float-slow">
      //   <defs>
      //     <linearGradient id="teaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      //       <stop offset="0%" stopColor="#6f4e37" />
      //       <stop offset="100%" stopColor="#4a3728" />
      //     </linearGradient>
      //     <linearGradient id="steamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      //       <stop offset="0%" stopColor="#6f4e37" stopOpacity="0" />
      //       <stop offset="50%" stopColor="#6f4e37" stopOpacity="0.3" />
      //       <stop offset="100%" stopColor="#6f4e37" stopOpacity="0" />
      //     </linearGradient>
      //   </defs>
      //   <path d="M44 18 L44 42 C44 47 40 51 36 51 L24 51 C20 51 16 47 16 42 L16 18" fill="none" stroke="url(#teaGrad)" strokeWidth="2.5" strokeLinecap="round" className="animate-draw-cup"/>
      //   <path d="M34 24 L26 24 L26 38 L34 38" fill="#6f4e37" opacity="0.85" className="animate-pour"/>
      //   <ellipse cx="30" cy="26" rx="3" ry="1.5" fill="#8b7355" opacity="0.6" className="animate-pulse-gentle"/>
      //   <path d="M46 26 Q54 22 54 26 Q54 30 46 26" fill="none" stroke="url(#teaGrad)" strokeWidth="2.5" strokeLinecap="round" className="animate-draw-handle"/>
      //   <path d="M22 12 Q28 4 34 12 Q40 4 46 12" fill="url(#steamGrad)" className="animate-steam-1"/>
      //   <path d="M26 8 Q32 0 38 8 Q44 0 50 8" fill="url(#steamGrad)" className="animate-steam-2"/>
      // </svg>

    ),
    coin: (
      <svg ref={el => svgRefs.current[1] = el} viewBox="0 0 64 64" className="w-16 h-16 animate-spin-slow">
        <defs>
          <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="coinGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="24" fill="url(#coinGrad)" className="animate-coin-shine" />
        <circle cx="32" cy="32" r="18" fill="none" stroke="url(#coinGrad2)" strokeWidth="2" className="animate-rotate-reverse" />
        <text x="32" y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f" className="animate-coin-pop">₹</text>
        <circle cx="32" cy="32" r="24" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.5" className="animate-ping-coin" />
      </svg>
    ),
    people: (
      <svg ref={el => svgRefs.current[2] = el} viewBox="0 0 64 64" className="w-16 h-16">
        <defs>
          <linearGradient id="peopleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="24" r="8" fill="url(#peopleGrad)" className="animate-bounce-person" style={{ animationDelay: '0s' }} />
        <circle cx="44" cy="24" r="8" fill="url(#peopleGrad)" className="animate-bounce-person" style={{ animationDelay: '0.2s' }} />
        <circle cx="32" cy="16" r="7" fill="url(#peopleGrad)" className="animate-bounce-person" style={{ animationDelay: '0.4s' }} />
        <path d="M12 48 Q20 36 20 32 Q20 36 28 48" fill="url(#peopleGrad)" className="animate-wave-person" style={{ animationDelay: '0.1s' }} />
        <path d="M36 48 Q44 36 44 32 Q44 36 52 48" fill="url(#peopleGrad)" className="animate-wave-person" style={{ animationDelay: '0.3s' }} />
        <path d="M25 52 Q32 40 39 52" fill="url(#peopleGrad)" className="animate-wave-person" style={{ animationDelay: '0.5s' }} />
        <circle cx="20" cy="24" r="8" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3" className="animate-pulse-ring" style={{ animationDelay: '0s' }} />
        <circle cx="44" cy="24" r="8" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3" className="animate-pulse-ring" style={{ animationDelay: '0.3s' }} />
      </svg>
    )
  }

  return svgs[type] || null
}

const FloatingShape = ({ delay, size, type }) => {
  const shapes = {
    circle: (s) => <div className={`rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-sm animate-float-${type}`} style={{ width: s, height: s, animationDelay: delay }} />,
    diamond: (s) => <div className={`rotate-45 bg-gradient-to-br from-amber-500/15 to-yellow-500/10 blur-sm animate-float-${type}`} style={{ width: s * 0.7, height: s * 0.7, animationDelay: delay }} />,
    hexagon: (s) => <div className={`clip-hexagon bg-gradient-to-br from-orange-500/15 to-amber-500/10 blur-sm animate-float-${type}`} style={{ width: s, height: s * 0.9, animationDelay: delay }} />,
  }
  return shapes[type](size)
}

const Particle = ({ i }) => {
  const size = i % 3 === 0 ? 4 : i % 2 === 0 ? 3 : 2
  const duration = 3 + (i % 5) * 0.5
  const delay = i * 0.2

  return (
    <div
      className="absolute rounded-full bg-amber-400/30 animate-particle-drift"
      style={{
        width: size,
        height: size,
        left: `${5 + (i * 8) % 90}%`,
        top: `${10 + (i * 12) % 80}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

const StarField = ({ count = 50 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      ))}
    </>
  )
}

const MorphingBlob = ({ className }) => {
  return (
    <svg className={`absolute ${className}`} viewBox="0 0 200 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M45,-70C58,-62 68,-48 75,-32C82,-16 86,2 80,18C74,34 58,48 42,58C26,68 10,74 -6,76C-22,78 -38,76 -52,68C-66,60 -78,46 -84,30C-90,14 -90,-4 -82,-20C-74,-36 -58,-50 -44,-60C-30,-70 -18,-76 -4,-76C10,-76 24,-70 32,-62"
        fill="url(#blobGrad)"
        className="animate-blob"
      />
    </svg>
  )
}

const ProgressBar = ({ delay, width = 0, label }) => {
  const safeWidth = typeof width === 'number' && !isNaN(width) ? width : 0
  return (
    <div className="w-full" style={{ animationDelay: delay }}>
      <div className="flex justify-between mb-2">
        <span className="text-zinc-400 text-sm">{label}</span>
        <span className="text-amber-400 text-sm font-medium">{safeWidth}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-progress-fill"
          style={{ width: `${safeWidth}%`, animationDelay: delay }}
        />
      </div>
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeCard, setActiveCard] = useState(null)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getGlowStyle = (index) => {
    if (activeCard !== index) return {}
    return {
      boxShadow: `0 0 60px rgba(245, 158, 11, 0.3), 0 0 100px rgba(245, 158, 11, 0.1)`,
    }
  }

  const features = [
    { icon: 'people', title: 'Fans want to collaborate', desc: 'Build deeper connections with the people who love your work the most.', delay: '0.3s' },
    { icon: 'coin', title: 'Fans want to contribute', desc: 'Convert appreciation into real financial support — no complex setup required.', delay: '0.15s' },
    { icon: 'coffee', title: 'It’s a win-win', desc: 'You get support to keep creating, and your fans get to be part of your journey.', delay: '0s' },  
  ]

  const stats = [
    { value: '12k+', label: 'Creators', icon: 'users' },
    { value: '₹2Cr+', label: 'Raised', icon: 'coins' },
    { value: '85k+', label: 'Supporters', icon: 'handshake' },
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes draw-cup {
          0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
          100% { stroke-dasharray: 100; stroke-dashoffset: 0; }
        }
        @keyframes pour {
          0% { opacity: 0; transform: translateY(-10px); }
          50% { opacity: 1; }
          100% { opacity: 0.8; transform: translateY(0); }
        }
        @keyframes draw-handle {
          0% { stroke-dasharray: 30; stroke-dashoffset: 30; }
          100% { stroke-dasharray: 30; stroke-dashoffset: 0; }
        }
        @keyframes steam-1 {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-8px); }
        }
        @keyframes steam-2 {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 0.4; transform: translateY(-6px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes coin-shine {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        @keyframes coin-pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes ping-coin {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes bounce-person {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes wave-person {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.8); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes float-circle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -15px) scale(1.05); }
          50% { transform: translate(-5px, -25px) scale(0.95); }
          75% { transform: translate(-15px, -10px) scale(1.02); }
        }
        @keyframes float-diamond {
          0%, 100% { transform: translate(0, 0) rotate(45deg) scale(1); }
          25% { transform: translate(-12px, 8px) rotate(50deg) scale(1.1); }
          50% { transform: translate(8px, 15px) rotate(40deg) scale(0.9); }
          75% { transform: translate(5px, -8px) rotate(48deg) scale(1.05); }
        }
        @keyframes float-hexagon {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-8px, -12px) rotate(5deg); }
          50% { transform: translate(12px, -8px) rotate(-3deg); }
          75% { transform: translate(-5px, 10px) rotate(2deg); }
        }
        @keyframes particle-drift {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate(30px, -60px); opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -10px) scale(1.1); }
          66% { transform: translate(-10px, 15px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes progress-fill {
          0% { width: 0; }
          100% { width: var(--target-width, 100%); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-draw-cup { animation: draw-cup 1.5s ease-out forwards; }
        .animate-pour { animation: pour 2s ease-in-out infinite; }
        .animate-draw-handle { animation: draw-handle 1s ease-out 0.5s forwards; }
        .animate-steam-1 { animation: steam-1 3s ease-in-out infinite; }
        .animate-steam-2 { animation: steam-2 3s ease-in-out 0.5s infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-rotate-reverse { animation: rotate-reverse 6s linear infinite; }
        .animate-coin-shine { animation: coin-shine 2s ease-in-out infinite; }
        .animate-coin-pop { animation: coin-pop 1.5s ease-in-out infinite; }
        .animate-ping-coin { animation: ping-coin 2s ease-out infinite; }
        .animate-bounce-person { animation: bounce-person 1.5s ease-in-out infinite; }
        .animate-wave-person { animation: wave-person 2s ease-in-out infinite; }
        .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .animate-float-1 { animation: float-circle 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-diamond 10s ease-in-out infinite; }
        .animate-float-3 { animation: float-hexagon 9s ease-in-out infinite; }
        .animate-particle-drift { animation: particle-drift 6s ease-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-blob { animation: blob 12s ease-in-out infinite; }
        .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 4s ease infinite; }
        .clip-hexagon { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }
        .perspective-1000 { perspective: 1000px; }
        .rotate-x-20 { transform: rotateX(20deg); }
        .translate-z-20 { transform: translateZ(20px); }
      `}</style>

      {/* ─── Hero ─── */}
      <div className="relative min-h-[95vh] bg-[#07070d] flex flex-col items-center justify-center text-center px-4 overflow-hidden perspective-1000">

        {/* Background layers */}
        <div className="absolute inset-0">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(60deg)',
              transformOrigin: 'center top'
            }}
          />
        </div>

        {/* Animated blobs */}
        <MorphingBlob className="top-[10%] left-[-10%] w-[600px] h-[600px] blur-[150px] opacity-50 animate-blob" style={{ animationDuration: '15s' }} />
        <MorphingBlob className="bottom-[10%] right-[-10%] w-[500px] h-[500px] blur-[120px] opacity-40 animate-blob" style={{ animationDuration: '18s', animationDelay: '2s' }} />

        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-amber-500/8 rounded-full blur-[180px] animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[200px] bg-orange-600/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[15%] right-[20%] w-32 h-32 bg-yellow-500/5 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[15%] w-40 h-40 bg-amber-600/5 rounded-full blur-[70px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />

        {/* Star field */}
        <StarField count={40} />

        {/* Floating shapes */}
        <FloatingShape delay="0s" size="80px" type="circle" />
        <FloatingShape delay="2s" size="60px" type="diamond" />
        <FloatingShape delay="4s" size="70px" type="hexagon" />
        <FloatingShape delay="1s" size="50px" type="circle" />
        <FloatingShape delay="3s" size="45px" type="diamond" />

        {/* Particles */}
        {[...Array(15)].map((_, i) => <Particle key={i} i={i} />)}

        {/* Mouse follower glow */}
        <div
          className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            left: mousePos.x - 200,
            top: mousePos.y - 200,
            opacity: mounted ? 1 : 0
          }}
        />

        {/* Main content container with 3D effect */}
        <div
          className="relative z-10 max-w-4xl mx-auto"
          style={{
            transform: mounted ? 'translateZ(0)' : 'translateZ(-50px)',
            opacity: mounted ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Badge with glow */}
          <div
            className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-5 py-2 rounded-full mb-8 tracking-wide uppercase relative overflow-hidden"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" style={{ animationDuration: '2s' }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            Crowdfunding for creators
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent animate-gradient-shift" style={{ animationDuration: '3s' }} />
          </div>

          {/* Heading with gradient animation */}
          <div className="relative mb-8">
            <h1
              className="text-white font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
              }}
            >
              Buy me a{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 blur-lg opacity-50 animate-pulse" style={{ animationDuration: '3s' }} />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 animate-gradient-shift bg-[length:200%_auto]">
                  Chai
                </span>
              </span>
            </h1>

            {/* Animated SVG tea cup */}
            <div
              className="flex justify-center mt-6"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <AnimatedSVG type="coffee" />
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}
          >
            A crowdfunding platform built for creators. Get funded by your fans and followers — start in minutes.
          </p>

          {/* CTA Buttons with enhanced animations */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}
          >
            <button className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-[0.97] group/hero">
              <span className="absolute inset-0 -translate-x-full group-hover/hero:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
              <span className="relative flex items-center gap-2">
                Start here
                <svg className="w-4 h-4 group-hover/hero:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <Link href="/About" className="relative overflow-hidden bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/30 text-zinc-300 font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-[0.97] group/read">
              <span className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover/read:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Read more
              </span>
            </Link>
          </div>

          {/* Enhanced Stats with animated icons */}
          <div
            className="flex items-center justify-center gap-12 flex-wrap"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
            }}
          >
            {stats.map(({ value, label, icon }, i) => (
              <div
                key={label}
                className="text-center group/stat cursor-default relative"
                style={{
                  transitionDelay: `${0.5 + i * 0.1}s`,
                  transform: mounted ? 'scale(1)' : 'scale(0.8)'
                }}
              >
                <div className="absolute -inset-4 bg-amber-500/0 group-hover/stat:bg-amber-500/10 rounded-xl transition-all duration-500 blur-xl" />
                <div className="relative">
                  <div className="mb-1 opacity-50">
                    {icon === 'users' && <Users size={28} className="mx-auto" />}
                    {icon === 'coins' && <Coins size={28} className="mx-auto" />}
                    {icon === 'handshake' && <Handshake size={28} className="mx-auto" />}
                  </div>
                  <div className="text-white font-bold text-2xl group-hover/stat:text-amber-400 transition-colors duration-300">{value}</div>
                  <div className="text-zinc-600 text-xs uppercase tracking-widest mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: mounted ? 0.4 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s ease 0.8s'
          }}
        >
          <span className="text-zinc-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 via-amber-500/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-amber-400 animate-scroll-line" style={{ animation: 'scroll-line 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* Divider with gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* ─── Features ─── */}
      <div className="bg-[#07070d] py-28 px-4 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/6 via-transparent to-transparent pointer-events-none" />
        <MorphingBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] blur-[200px] opacity-30" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section header */}
          <div
            className="text-center mb-16"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <p className="text-amber-500/60 text-xs font-medium uppercase tracking-widest mb-4">Why it works</p>
            <h2 className="text-white font-bold text-3xl md:text-5xl tracking-tight">
              Your fans are ready to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 animate-gradient-shift bg-[length:200%_auto]">
                support you
              </span>
            </h2>
          </div>

          {/* Feature cards with 3D hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc, delay }, index) => (
              <div
                key={title}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 flex flex-col items-center text-center gap-5 cursor-default group transition-all duration-500 hover:border-amber-500/20"
                style={{
                  transitionDelay: delay,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  ...getGlowStyle(index)
                }}
              >
                {/* Card shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Animated SVG container */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative transform group-hover:-translate-y-1 transition-transform duration-500">
                    <AnimatedSVG type={icon} />
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-amber-200 transition-colors duration-300">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-300">{desc}</p>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-amber-500/30">
                    <path d="M4 20L20 4M20 4V14M20 4H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars section */}
          <div
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 p-8 bg-white/[0.02] rounded-3xl border border-white/[0.05]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
            }}
          >
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg mb-4">Platform Growth</h3>
              <ProgressBar delay="0.7s" width={78} label="Monthly Active Users" />
              <ProgressBar delay="0.8s" width={92} label="Creator Satisfaction" />
              <ProgressBar delay="0.9s" width={65} label="Repeat Supporters" />
            </div>
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-lg mb-4">Funding Stats</h3>
              <ProgressBar delay="1s" width={85} label="Successful Campaigns" />
              <ProgressBar delay="1.1s" width={95} label="On-time Payouts" />
              <ProgressBar delay="1.2s" width={70} label="Monthly Growth" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}