"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Coffee } from 'lucide-react'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeField, setActiveField] = useState(null)

  useEffect(() => {
    setMounted(true)
    if (session) router.push('/dashboard')
  })

  const providers = [
    { label: 'GitHub', img: 'https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/', invert: true, action: () => signIn("github") },
    { label: 'Google', img: 'https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/', invert: false, action: null },
    { label: 'Twitter', img: 'https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/', invert: false, action: null },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #060402;
          display: flex;
          align-items: stretch;
          overflow: hidden;
        }

        /* ── LEFT PANEL ── */
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px;
          position: relative;
          overflow: hidden;
        }
        @media(max-width:900px) { .login-left { display: none; } }

        .left-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 70% at 40% 50%, rgba(180,80,0,0.22) 0%, transparent 70%),
                      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(120,50,0,0.1) 0%, transparent 60%);
        }

        .left-content { position: relative; z-index: 1; text-align: center; }

        /* Large animated chai SVG */
        .hero-cup {
          animation: heroFloat 7s ease-in-out infinite;
          margin-bottom: 48px;
          filter: drop-shadow(0 20px 60px rgba(217,119,6,0.35));
        }
        @keyframes heroFloat {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }

        .left-title {
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900;
          color: #f5ede0; line-height: 1.1;
          margin-bottom: 16px;
        }
        .left-title .g {
          background: linear-gradient(135deg, #d97706, #fde68a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200%;
          animation: gs 4s ease-in-out infinite alternate;
        }
        @keyframes gs { 0%{background-position:0%} 100%{background-position:100%} }

        .left-sub { color: #6b5a3e; font-size: 0.95rem; line-height: 1.65; max-width: 340px; }

        /* Orbiting dots */
        .orbit-wrap {
          position: absolute; inset: 0;
          pointer-events: none; opacity: 0.12;
        }

        /* Floating particles */
        .lp-particle {
          position: absolute;
          border-radius: 50%;
          background: #d97706;
          animation: lpFloat var(--d) var(--delay) infinite ease-in-out;
        }
        @keyframes lpFloat {
          0%,100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.4; }
        }

        .left-divider {
          width: 60px; height: 2px;
          background: linear-gradient(90deg, transparent, #d97706, transparent);
          margin: 28px auto;
        }

        /* ── RIGHT PANEL ── */
        .login-right {
          width: 480px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 48px;
          background: rgba(255,255,255,0.012);
          border-left: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }
        @media(max-width:900px) {
          .login-right { width: 100%; border-left: none; padding: 40px 24px; align-items: center; }
          .login-form-wrap { width: 100%; max-width: 400px; }
        }

        .right-top-glow {
          position: absolute; top: 0; right: 0;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(217,119,6,0.08), transparent 70%);
          pointer-events: none;
        }

        .login-form-wrap { position: relative; z-index: 1; width: 100%; }

        .login-brand {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 48px;
        }
        .brand-cup { font-size: 1.4rem; }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700;
          color: #f5ede0;
        }

        .form-heading {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 900;
          color: #f5ede0; margin-bottom: 6px;
        }
        .form-sub { color: #5a4a2e; font-size: 0.875rem; margin-bottom: 36px; }

        /* Provider buttons */
        .providers { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 28px; }
        .provider-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: #9c8060; font-size: 0.8rem; font-weight: 500;
          padding: 11px 8px; border-radius: 10px; cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          font-family: 'DM Sans', sans-serif;
        }
        .provider-btn:hover {
          background: rgba(217,119,6,0.08);
          border-color: rgba(217,119,6,0.3);
          color: #f59e0b;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .provider-btn img { width: 15px; height: 15px; }

        .or-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 24px;
        }
        .or-line { flex: 1; height: 1px; background: rgba(255,255,255,0.05); }
        .or-text { color: #3d2f1a; font-size: 0.72rem; letter-spacing: 0.08em; white-space: nowrap; }

        /* Inputs */
        .field-group { margin-bottom: 16px; }
        .field-label {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #5a4a2e; margin-bottom: 8px;
        }
        .field-label a { color: rgba(217,119,6,0.7); text-decoration: none; font-size: 0.7rem; letter-spacing: 0; text-transform: none; transition: color 0.2s; }
        .field-label a:hover { color: #f59e0b; }

        .field-input {
          width: 100%; padding: 13px 16px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; outline: none;
          color: #f5ede0; font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: #2e2010; }
        .field-input:focus {
          border-color: rgba(217,119,6,0.5);
          background: rgba(217,119,6,0.04);
          box-shadow: 0 0 0 3px rgba(217,119,6,0.1);
        }
        .field-input:hover:not(:focus) { border-color: rgba(255,255,255,0.1); }

        /* Submit */
        .submit-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #92400e, #d97706, #f59e0b);
          background-size: 200%;
          border: none; border-radius: 10px;
          color: #fff8f0; font-size: 0.9rem; font-weight: 600;
          letter-spacing: 0.06em; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s; margin-top: 8px;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 20px rgba(217,119,6,0.3);
        }
        .submit-btn:hover {
          background-position: right;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(217,119,6,0.45);
        }
        .submit-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%); transition: transform 0.5s;
        }
        .submit-btn:hover::after { transform: translateX(100%); }

        .signup-row {
          text-align: center; margin-top: 20px;
          font-size: 0.8rem; color: #3d2f1a;
        }
        .signup-row a { color: rgba(217,119,6,0.8); text-decoration: none; font-weight: 500; transition: color 0.2s; }
        .signup-row a:hover { color: #f59e0b; }

        /* Entrance animation */
        .slide-in {
          opacity: 0; transform: translateX(24px);
          transition: all 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .slide-in.in { opacity: 1; transform: translateX(0); }
      `}</style>

      <div className="login-root">

        {/* ── LEFT PANEL ── */}
        <div className="login-left">
          <div className="left-bg" />
          <div className="orbit-wrap">
            <svg width="100%" height="100%" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="200" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="6 10">
                <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="30s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="300" r="140" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 7">
                <animateTransform attributeName="transform" type="rotate" from="360 300 300" to="0 300 300" dur="20s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="100" r="5" fill="#f59e0b">
                <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="30s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="160" r="3" fill="#d97706">
                <animateTransform attributeName="transform" type="rotate" from="120 300 300" to="480 300 300" dur="20s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          {/* Floating particles */}
          {[
            {x:'15%',y:'20%',s:4,d:'5s',delay:'0s'},
            {x:'75%',y:'15%',s:3,d:'7s',delay:'1s'},
            {x:'60%',y:'70%',s:5,d:'6s',delay:'2s'},
            {x:'25%',y:'65%',s:3,d:'8s',delay:'0.5s'},
            {x:'85%',y:'50%',s:4,d:'5.5s',delay:'1.5s'},
          ].map((p,i) => (
            <div key={i} className="lp-particle" style={{
              left:p.x, top:p.y,
              width:p.s, height:p.s,
              '--d':p.d, '--delay':p.delay,
            }}/>
          ))}

          <div className="left-content">
            {/* Animated large cup */}
            <svg className="hero-cup" width="140" height="160" viewBox="0 0 140 160" fill="none">
              {/* Steam */}
              {[40,70,100].map((x,i) => (
                <path key={i} d={`M${x},36 Q${x-6+i*4},20 ${x},4`} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none">
                  <animate attributeName="opacity" values="0.6;0.05;0.6" dur={`${2+i*0.5}s`} begin={`${i*0.4}s`} repeatCount="indefinite"/>
                  <animateTransform attributeName="transform" type="translate" values="0,0;3,-8;0,0" dur={`${2+i*0.5}s`} begin={`${i*0.4}s`} repeatCount="indefinite"/>
                </path>
              ))}
              {/* Body */}
              <path d="M20,48 L30,148 Q30,154 36,154 L104,154 Q110,154 110,148 L120,48 Z" fill="url(#hcg)" stroke="rgba(217,119,6,0.3)" strokeWidth="1.5"/>
              <ellipse cx="70" cy="48" rx="50" ry="9" fill="url(#hrg)"/>
              <ellipse cx="70" cy="57" rx="42" ry="7" fill="rgba(180,80,0,0.5)">
                <animate attributeName="ry" values="7;6;7" dur="4s" repeatCount="indefinite"/>
              </ellipse>
              {/* Handle */}
              <path d="M110,76 Q132,76 132,104 Q132,132 110,132" fill="none" stroke="url(#hcg)" strokeWidth="8" strokeLinecap="round"/>
              {/* Saucer */}
              <ellipse cx="70" cy="155" rx="56" ry="8" fill="rgba(92,40,0,0.5)" stroke="rgba(217,119,6,0.2)" strokeWidth="1"/>
              <defs>
                <linearGradient id="hcg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c2d12"/>
                  <stop offset="50%" stopColor="#d97706"/>
                  <stop offset="100%" stopColor="#92400e"/>
                </linearGradient>
                <linearGradient id="hrg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde68a"/>
                  <stop offset="100%" stopColor="#d97706"/>
                </linearGradient>
              </defs>
            </svg>

            <h2 className="left-title">Fuel your<br/><span className="g">creator journey.</span></h2>
            <div className="left-divider"/>
            <p className="left-sub">Connect with fans who love your work. They buy you a chai, you keep creating. Simple as that.</p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="login-right">
          <div className="right-top-glow"/>
          <div className={`login-form-wrap slide-in ${mounted ? 'in' : ''}`}>

            <div className="login-brand">
              <span className="brand-cup"><Coffee size={24} /></span>
              <span className="brand-name">GetMeAChai</span>
            </div>

            <h1 className="form-heading">Welcome back</h1>
            <p className="form-sub">Sign in to start receiving support</p>

            {/* Providers */}
            <div className="providers">
              {providers.map(({ label, img, invert, action }) => (
                <button key={label} className="provider-btn" onClick={action}>
                  <img src={img} alt={label} style={invert ? {filter:'invert(1)',opacity:0.7} : {opacity:0.8}}/>
                  {label}
                </button>
              ))}
            </div>

            <div className="or-row">
              <div className="or-line"/>
              <span className="or-text">or continue with email</span>
              <div className="or-line"/>
            </div>

            <form onSubmit={e => e.preventDefault()}>
              <div className="field-group">
                <div className="field-label">Email</div>
                <input className="field-input" type="email" placeholder="you@example.com" onFocus={() => setActiveField('email')} onBlur={() => setActiveField(null)}/>
              </div>
              <div className="field-group">
                <div className="field-label">
                  Password
                  <a href="#">Forgot?</a>
                </div>
                <input className="field-input" type="password" placeholder="••••••••" onFocus={() => setActiveField('pass')} onBlur={() => setActiveField(null)}/>
              </div>
              <button className="submit-btn" type="submit">Sign in →</button>
            </form>

            <div className="signup-row">
              New here? <a href="#">Create your page</a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Login











// "use client"
// import React from 'react'
// import { useEffect, useState } from 'react'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation'

// const Login = () => {
//     const { data: session } = useSession()
//     const router = useRouter();
//     const [mounted, setMounted] = useState(false)

//     useEffect(() => {
//         setMounted(true)
//         if (session) router.push('/dashboard');
//     })

//     return (
//         <div className="min-h-screen bg-[#07070d] flex items-center justify-center px-4 py-16 relative overflow-hidden">

//             {/* Animated grid background */}
//             <div
//                 className="absolute inset-0 opacity-[0.03]"
//                 style={{
//                     backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
//                     backgroundSize: '60px 60px'
//                 }}
//             />

//             {/* Pulsing ambient orbs */}
//             <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
//             <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-orange-600/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-900/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />

//             {/* Floating dots */}
//             {[...Array(7)].map((_, i) => (
//                 <div
//                     key={i}
//                     className="absolute w-1 h-1 bg-amber-400/25 rounded-full animate-bounce"
//                     style={{
//                         left: `${10 + i * 13}%`,
//                         top: `${15 + (i % 4) * 22}%`,
//                         animationDuration: `${2.5 + i * 0.4}s`,
//                         animationDelay: `${i * 0.35}s`
//                     }}
//                 />
//             ))}

//             {/* Main content — slides up on mount */}
//             <div
//                 className="w-full max-w-md relative z-10 transition-all duration-700"
//                 style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)' }}
//             >
//                 {/* Badge + heading */}
//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase animate-pulse" style={{ animationDuration: '3s' }}>
//                         <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
//                         Creator Platform
//                     </div>
//                     <h1 className="text-white text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
//                     <p className="text-zinc-500 text-sm">Sign in to start receiving support from your fans</p>
//                 </div>

//                 {/* Card */}
//                 <div className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-black/60 overflow-hidden group hover:border-white/[0.12] transition-all duration-500">

//                     {/* Hover inner glow */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

//                     {/* Top shimmer line */}
//                     <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

//                     {/* Social buttons */}
//                     <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
//                         {[
//                             { label: 'GitHub', img: 'https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/', invert: true, action: () => signIn("github") },
//                             { label: 'Google', img: 'https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/', invert: false, action: null },
//                             { label: 'Twitter', img: 'https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/', invert: false, action: null },
//                         ].map(({ label, img, invert, action }, i) => (
//                             <button
//                                 key={label}
//                                 onClick={action}
//                                 className="flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-amber-500/10 border border-white/[0.07] hover:border-amber-500/30 text-zinc-400 hover:text-amber-300 text-xs font-medium py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
//                                 style={{ transitionDelay: `${i * 40}ms` }}
//                             >
//                                 <img className={`w-4 h-4 ${invert ? 'filter invert opacity-60' : 'opacity-70'}`} src={img} alt={label} />
//                                 {label}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Divider */}
//                     <div className="flex items-center gap-3 mb-6 relative z-10">
//                         <div className="flex-1 h-px bg-white/[0.06]" />
//                         <span className="text-zinc-600 text-xs">or continue with email</span>
//                         <div className="flex-1 h-px bg-white/[0.06]" />
//                     </div>

//                     {/* Form */}
//                     <form action="#" method="post" className="space-y-4 relative z-10">
//                         {[
//                             { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
//                             { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
//                         ].map(({ id, label, type, placeholder }, i) => (
//                             <div key={id} className="space-y-1.5"
//                                 style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)', transition: `all 0.5s ease ${0.2 + i * 0.1}s` }}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <label htmlFor={id} className="text-zinc-500 text-xs font-medium tracking-wide uppercase">{label}</label>
//                                     {id === 'password' && (
//                                         <a href="#" className="text-amber-500/70 hover:text-amber-400 text-xs transition-colors duration-200">Forgot?</a>
//                                     )}
//                                 </div>
//                                 <input
//                                     id={id}
//                                     type={type}
//                                     placeholder={placeholder}
//                                     required
//                                     className="w-full bg-white/3 border border-white/[0.07] focus:border-amber-500/50 focus:bg-amber-500/4 text-white text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder-zinc-700 hover:border-white/[0.12]"
//                                 />
//                             </div>
//                         ))}

//                         {/* Shimmer CTA button */}
//                         <button
//                             type="submit"
//                             className="relative w-full mt-2 overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.97] group/btn"
//                             style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease 0.4s, transform 0.3s ease' }}
//                         >
//                             <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
//                             Sign in
//                         </button>
//                     </form>

//                     <p className="text-center text-zinc-700 text-xs mt-5 relative z-10">
//                         Don't have an account?{' '}
//                         <a href="#" className="text-amber-500/80 hover:text-amber-400 font-medium transition-colors duration-200">Create one</a>
//                     </p>
//                 </div>

//                 <p className="text-center text-zinc-700 text-xs mt-5">
//                     By signing in you agree to our{' '}
//                     <a href="#" className="text-zinc-600 hover:text-zinc-400 underline underline-offset-2 transition-colors">Terms</a>
//                     {' '}and{' '}
//                     <a href="#" className="text-zinc-600 hover:text-zinc-400 underline underline-offset-2 transition-colors">Privacy Policy</a>
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default Login



// // "use client"
// // import React from 'react'
// // import { useEffect, useState } from 'react'
// // import { useSession, signIn, signOut } from "next-auth/react"
// // import { useRouter } from 'next/navigation'

// // const Login = () => {
// //     const { data: session } = useSession()
// //     const router = useRouter();
// //     useEffect(() => {
// //         console.log(session);
// //         if (session) {
// //             router.push('/dashboard');
// //         }
// //     })
// //     return (
// //         <div className='text-white py-8 container mx-auto'>
// //             <div className='flex flex-col font-poppins items-center justify-center'>
// //                 <h1 className='text-center font-bold text-2xl'>Login/Signup to Get your fans to support you</h1>
// //                 <div className="h-80vh w-80vw flex justify-center items-center ">
// //                     <div className="grid gap-8 -rotate-2 transition-transform duration-600 ease-in-out hover:rotate-0 hover:scale-102">
// //                         <div
// //                             id="back-div"
// //                             className="bg-linear-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
// //                         >
// //                             <div
// //                                 className="border border-blue-400 rounded-[20px]  shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2"
// //                             >
// //                                 <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
// //                                     Log in
// //                                 </h1>
// //                                 <form action="#" method="post" className="space-y-4">
// //                                     <div>
// //                                         <label htmlFor="email" className="mb-2  dark:text-gray-300 text-lg">Email</label>
// //                                         <input
// //                                             id="email"
// //                                             className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
// //                                             type="email"
// //                                             placeholder="Email"
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <div>
// //                                         <label htmlFor="password" className="mb-2 dark:text-gray-300 text-lg">Password</label>
// //                                         <input
// //                                             id="password"
// //                                             className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
// //                                             type="password"
// //                                             placeholder="Password"
// //                                             required
// //                                         />
// //                                     </div>
// //                                     <a
// //                                         className="group text-pink-200 transition-all duration-100 ease-in-out"
// //                                         href="#"
// //                                     >
// //                                         <span
// //                                             className="bg-bottom-left bg-linear-to-r py-0.5 text-sm from-blue-200 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
// //                                         >
// //                                             Forget your password?
// //                                         </span>
// //                                     </a>
// //                                     <button
// //                                         className="bg-linear-to-r dark:text-gray-300  from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
// //                                         type="submit"
// //                                     >
// //                                         LOG IN
// //                                     </button>
// //                                 </form>
// //                                 <div className="flex flex-col mt-4 items-center justify-center text-sm">
// //                                     <h3 className="dark:text-gray-300">
// //                                         Don't have an account?
// //                                         <a
// //                                             className="group text-blue-400 transition-all duration-100 ease-in-out"
// //                                             href="#"
// //                                         >
// //                                             <span
// //                                                 className="bg-bottom-left bg-linear-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
// //                                             >
// //                                                 Sign Up
// //                                             </span>
// //                                         </a>
// //                                     </h3>
// //                                 </div>

// //                                 <div
// //                                     id="third-party-auth"
// //                                     className="flex items-center justify-center mt-5 flex-wrap"
// //                                 >
// //                                     <button
// //                                         href="#"
// //                                         className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
// //                                     >
// //                                         <img
// //                                             className="max-w-6.25"
// //                                             src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
// //                                             alt="Google"
// //                                         />
// //                                     </button>
// //                                     <button
// //                                         href="#"
// //                                         className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
// //                                     >
// //                                         <img
// //                                             className="max-w-6.25"
// //                                             src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
// //                                             alt="Linkedin"
// //                                         />
// //                                     </button>
// //                                     <button onClick={() => { signIn("github") }}
// //                                         href="#"
// //                                         className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
// //                                     >
// //                                         <img
// //                                             className="max-w-6.25 filter dark:invert"
// //                                             src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
// //                                             alt="Github"
// //                                         />
// //                                     </button>
// //                                     <button
// //                                         href="#"
// //                                         className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
// //                                     >
// //                                         <img
// //                                             className="max-w-6.25"
// //                                             src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
// //                                             alt="Facebook"
// //                                         />
// //                                     </button>
// //                                     <button
// //                                         href="#"
// //                                         className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
// //                                     >
// //                                         <img
// //                                             className="max-w-[25px] dark:gray-100"
// //                                             src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
// //                                             alt="twitter"
// //                                         />
// //                                     </button>

// //                                     <button
// //                                         href="#"
// //                                         className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
// //                                     >
// //                                         <img
// //                                             className="max-w-[25px]"
// //                                             src="https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/"
// //                                             alt="apple"
// //                                         />
// //                                     </button>
// //                                 </div>

// //                                 <div
// //                                     className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm"
// //                                 >
// //                                     <p className="cursor-default">
// //                                         By signing in, you agree to our
// //                                         <a
// //                                             className="group text-blue-400 transition-all duration-100 ease-in-out"
// //                                             href="#"
// //                                         >
// //                                             <span
// //                                                 className="cursor-pointer bg-bottom-left bg-linear-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
// //                                             >
// //                                                 Terms
// //                                             </span>
// //                                         </a>
// //                                         and
// //                                         <a
// //                                             className="group text-blue-400 transition-all duration-100 ease-in-out"
// //                                             href="#"
// //                                         >
// //                                             <span
// //                                                 className="cursor-pointer bg-bottom-left bg-linear-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
// //                                             >
// //                                                 Privacy Policy
// //                                             </span>
// //                                         </a>
// //                                     </p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Login
