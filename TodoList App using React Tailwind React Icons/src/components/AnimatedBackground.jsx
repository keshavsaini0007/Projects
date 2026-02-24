// AnimatedBackground.jsx
// Usage: wrap your entire app or place it as first child in your root div
// <AnimatedBackground />  ← just drop this inside your JSX

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">

      {/* ── CSS animations via <style> tag ── */}
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translate(0px,  0px)  scale(1);   }
          33%      { transform: translate(40px,-30px) scale(1.08); }
          66%      { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes floatB {
          0%,100% { transform: translate(0px,  0px)  scale(1);   }
          33%      { transform: translate(-35px,25px) scale(1.1); }
          66%      { transform: translate(25px,-15px) scale(0.92); }
        }
        @keyframes floatC {
          0%,100% { transform: translate(0px, 0px)  scale(1);   }
          50%      { transform: translate(20px,30px) scale(1.06); }
        }
        @keyframes gridFade {
          0%,100% { opacity: 0.03; }
          50%      { opacity: 0.07; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh);  }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0; transform: scale(0.5); }
          50%      { opacity: 1; transform: scale(1);   }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0;   }
        }
        .orb-a { animation: floatA 18s ease-in-out infinite; }
        .orb-b { animation: floatB 22s ease-in-out infinite; }
        .orb-c { animation: floatC 16s ease-in-out infinite; }
        .grid-pulse { animation: gridFade 8s ease-in-out infinite; }
        .scanline  { animation: scanline 10s linear infinite; }
        .ring-1 { animation: pulseRing 5s ease-out infinite; }
        .ring-2 { animation: pulseRing 5s ease-out infinite 1.67s; }
        .ring-3 { animation: pulseRing 5s ease-out infinite 3.33s; }
      `}</style>

      {/* ══════════════════════════════
          1. MAIN GRADIENT ORBS
      ══════════════════════════════ */}

      {/* Top-left violet orb */}
      <div className="orb-a absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full
        bg-[radial-gradient(ellipse,rgba(120,80,255,0.22)_0%,transparent_70%)]
        blur-[80px]" />

      {/* Top-right teal orb */}
      <div className="orb-b absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full
        bg-[radial-gradient(ellipse,rgba(0,229,204,0.14)_0%,transparent_70%)]
        blur-[70px]" />

      {/* Bottom-center violet orb */}
      <div className="orb-c absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
        rounded-full
        bg-[radial-gradient(ellipse,rgba(120,80,255,0.15)_0%,transparent_70%)]
        blur-[90px]" />

      {/* Mid-left accent */}
      <div className="orb-b absolute top-1/2 -left-24 w-[300px] h-[300px] rounded-full
        bg-[radial-gradient(ellipse,rgba(167,139,255,0.1)_0%,transparent_70%)]
        blur-[60px] [animation-delay:4s]" />

      {/* Mid-right teal accent */}
      <div className="orb-a absolute top-1/3 -right-16 w-[280px] h-[280px] rounded-full
        bg-[radial-gradient(ellipse,rgba(0,229,204,0.1)_0%,transparent_70%)]
        blur-[60px] [animation-delay:8s]" />


      {/* ══════════════════════════════
          2. DOT GRID
      ══════════════════════════════ */}
      <div className="grid-pulse absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(120,80,255,0.55) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />


      {/* ══════════════════════════════
          3. DIAGONAL GRID LINES
      ══════════════════════════════ */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(45deg,  rgba(120,80,255,0.8) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(120,80,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />


      {/* ══════════════════════════════
          4. HORIZONTAL SCAN LINE
      ══════════════════════════════ */}
      <div className="scanline absolute left-0 right-0 h-[2px] pointer-events-none
        bg-gradient-to-r from-transparent via-violet-500/20 to-transparent
        blur-[1px]" />


      {/* ══════════════════════════════
          5. ROTATING RING (center-bottom)
      ══════════════════════════════ */}
      <div className="absolute bottom-[-160px] left-1/2 -translate-x-1/2
        w-[480px] h-[480px] rounded-full
        border border-violet-500/[0.08]"
        style={{ animation: 'rotateSlow 40s linear infinite' }}
      >
        {/* inner ring */}
        <div className="absolute inset-12 rounded-full
          border border-teal-400/[0.07]"
          style={{ animation: 'rotateSlow 25s linear infinite reverse' }}
        />
      </div>


      {/* ══════════════════════════════
          6. PULSE RINGS (top-left corner)
      ══════════════════════════════ */}
      <div className="absolute top-16 left-16">
        {[0,1,2].map(i => (
          <div key={i}
            className={`absolute -translate-x-1/2 -translate-x-1/2
              w-24 h-24 rounded-full
              border border-violet-400/30 ring-${i+1}`}
            style={{ top: '-48px', left: '-48px' }}
          />
        ))}
        {/* tiny bright center */}
        <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60
          shadow-[0_0_8px_rgba(120,80,255,0.9)]" />
      </div>


      {/* ══════════════════════════════
          7. STAR PARTICLES
      ══════════════════════════════ */}
      {[
        { top:'12%', left:'18%',  delay:'0s',    size:'w-1 h-1'   },
        { top:'28%', left:'75%',  delay:'1.2s',  size:'w-0.5 h-0.5' },
        { top:'55%', left:'8%',   delay:'2.5s',  size:'w-1 h-1'   },
        { top:'70%', left:'88%',  delay:'0.8s',  size:'w-0.5 h-0.5' },
        { top:'40%', left:'50%',  delay:'3s',    size:'w-1 h-1'   },
        { top:'85%', left:'35%',  delay:'1.8s',  size:'w-0.5 h-0.5' },
        { top:'15%', left:'60%',  delay:'4s',    size:'w-1 h-1'   },
        { top:'60%', left:'42%',  delay:'2s',    size:'w-0.5 h-0.5' },
        { top:'90%', left:'65%',  delay:'0.5s',  size:'w-1 h-1'   },
        { top:'5%',  left:'90%',  delay:'3.5s',  size:'w-0.5 h-0.5' },
        { top:'48%', left:'22%',  delay:'1s',    size:'w-1 h-1'   },
        { top:'78%', left:'55%',  delay:'2.8s',  size:'w-0.5 h-0.5' },
      ].map((star, i) => (
        <div key={i}
          className={`absolute ${star.size} rounded-full bg-white`}
          style={{
            top: star.top,
            left: star.left,
            animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: star.delay,
            boxShadow: '0 0 4px rgba(255,255,255,0.8)',
          }}
        />
      ))}


      {/* ══════════════════════════════
          8. CORNER ACCENTS
      ══════════════════════════════ */}
      {/* top-right corner bracket */}
      <div className="absolute top-6 right-6 w-8 h-8 opacity-20
        border-t-2 border-r-2 border-violet-400 rounded-tr-lg" />
      {/* bottom-left corner bracket */}
      <div className="absolute bottom-6 left-6 w-8 h-8 opacity-20
        border-b-2 border-l-2 border-teal-400 rounded-bl-lg" />


      {/* ══════════════════════════════
          9. BOTTOM GRADIENT FADE
             (so content doesn't feel cut off)
      ══════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 h-32
        bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />

    </div>
  )
}

export default AnimatedBackground
