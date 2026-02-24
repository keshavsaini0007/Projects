const LakshyamLogo = () => {
  return (
    <div className="
      group relative inline-flex items-center justify-center
      cursor-pointer select-none
      transition-all duration-500 ease-out
      hover:scale-105
      hover:drop-shadow-[0_0_24px_rgba(120,80,255,0.6)]
    ">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 100"
        width="100"
        height="40"
        className="overflow-visible transition-all duration-500"
      >
        <defs>

          {/* ── Gradients ── */}
          <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#a78bff" />
            <stop offset="50%"  stopColor="#7850ff" />
            <stop offset="100%" stopColor="#00e5cc" />
          </linearGradient>

          <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7850ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7850ff" stopOpacity="0"   />
          </radialGradient>

          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#a78bff" />
            <stop offset="100%" stopColor="#00e5cc" />
          </linearGradient>

          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%"
            gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#7850ff" stopOpacity="0.7" />
            <stop offset="50%"  stopColor="#00e5cc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7850ff" stopOpacity="0.7" />
            <animateTransform attributeName="gradientTransform" type="rotate"
              values="0 160 60;360 160 60" dur="5s" repeatCount="indefinite" />
          </linearGradient>

          {/* Shimmer sweep */}
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white" stopOpacity="0"    />
            <stop offset="48%"  stopColor="white" stopOpacity="0"    />
            <stop offset="50%"  stopColor="white" stopOpacity="0.07" />
            <stop offset="52%"  stopColor="white" stopOpacity="0"    />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
            <animateTransform attributeName="gradientTransform" type="translate"
              values="-320 0;320 0" dur="3.2s" repeatCount="indefinite" />
          </linearGradient>

          {/* ── Filters ── */}
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textGlow" x="-10%" y="-20%" width="120%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

        </defs>

        {/* ══ BACKGROUND ══ */}
        {/* Animated border ring */}
        <rect x="0.5" y="0.5" width="319" height="119" rx="21" ry="21"
          fill="none" stroke="url(#borderGrad)" strokeWidth="1.5" opacity="0.6" />

        {/* Card body */}
        <rect x="2" y="2" width="316" height="116" rx="20" ry="20"
          fill="#0e0e16" />

        {/* Shimmer sweep */}
        <rect x="2" y="2" width="316" height="116" rx="20" ry="20"
          fill="url(#shimmer)" />

        {/* ══ ICON GLOW — breathes ══ */}
        <circle cx="52" cy="60" r="44" fill="url(#ringGlow)">
          <animate attributeName="r"            values="38;48;38" dur="3s" repeatCount="indefinite" />
          <animate attributeName="fillOpacity"  values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* ══ RINGS ══ */}
        {/* Outer — clockwise dashed */}
        <g>
          <animateTransform attributeName="transform" type="rotate"
            values="0 52 60;360 52 60" dur="16s" repeatCount="indefinite" />
          <circle cx="52" cy="60" r="36"
            fill="none" stroke="#7850ff" strokeWidth="1.4"
            strokeDasharray="6 7" strokeOpacity="1" filter="url(#glow)" />
        </g>

        {/* Middle — counter-clockwise dashed */}
        <g>
          <animateTransform attributeName="transform" type="rotate"
            values="0 52 60;-360 52 60" dur="10s" repeatCount="indefinite" />
          <circle cx="52" cy="60" r="24"
            fill="none" stroke="#7850ff" strokeWidth="1.5"
            strokeDasharray="4 3" strokeOpacity="0.6" filter="url(#glow)" />
        </g>

        {/* Inner — pulse opacity */}
        <circle cx="52" cy="60" r="15"
          fill="none" stroke="#a78bff" strokeWidth="1.8" filter="url(#glow)">
          <animate attributeName="strokeOpacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* ══ ARROW — flies in once on load ══ */}
        <g filter="url(#glow)">
          <animateTransform attributeName="transform" type="translate"
            values="28 -28;0 0" dur="1s" fill="freeze"
            calcMode="spline" keySplines="0.22 1 0.36 1" />
          <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" />

          <line x1="82" y1="30" x2="57" y2="55"
            stroke="url(#arrowGrad)" strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="52,60 61,48 65,58" fill="url(#arrowGrad)" />
          <line x1="82" y1="30" x2="76" y2="23"
            stroke="#a78bff" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.75" />
          <line x1="82" y1="30" x2="89" y2="36"
            stroke="#a78bff" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.75" />
        </g>

        {/* ══ IMPACT RIPPLE ══ */}
        <circle cx="52" cy="60" r="4" fill="none" stroke="#00e5cc" strokeWidth="1.8">
          <animate attributeName="r"       values="4;24;4"     dur="2.5s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9"  dur="2.5s" begin="1s" repeatCount="indefinite" />
        </circle>

        {/* ══ CENTER DOT ══ */}
        <circle cx="52" cy="60" r="4.5" fill="#00e5cc" filter="url(#dotGlow)">
          <animate attributeName="r" values="3.5;5.5;3.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="60" r="2" fill="#fff" />

        {/* ══ SEPARATOR ══ */}
        <line x1="106" y1="22" x2="106" y2="98"
          stroke="white" strokeWidth="1" strokeOpacity="0.08" />

        {/* ══ TEXT — fades in ══ */}
        <g opacity="0">
          <animate attributeName="opacity" values="0;1" dur="0.8s" begin="0.4s" fill="freeze" />
          <text
            x="194" y="72"
            textAnchor="middle"
            fontFamily="'Noto Sans Devanagari','Mangal','Arial Unicode MS',serif"
            fontSize="65"
            fontWeight="700"
            letterSpacing="2"
            fill="url(#textGrad)"
            filter="url(#textGlow)">
            लक्ष्यम्
            {/* subtle text y-float */}
            <animateTransform attributeName="transform" type="translate"
              values="0 0;0 -2;0 0" dur="4s" repeatCount="indefinite" />
          </text>
        </g>

      </svg>
    </div>
  )
}

export default LakshyamLogo
