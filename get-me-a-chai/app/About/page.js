"use client"
import React, { useEffect, useState, useRef } from 'react'
import { Sparkles, Coffee, Heart, Zap, Flame, Star, MapPin } from 'lucide-react'

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0)
  const [visible, setVisible] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll)
    setTimeout(() => setVisible(v => ({ ...v, hero: true })), 100)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.section]: true }))
      })
    }, { threshold: 0.15 })

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  const steps = [
    { icon: 'sparkles', title: 'Create your page', desc: 'Set up your creator profile in under 2 minutes. Add your story, link your Razorpay account, and go live.' },
    { icon: 'coffee', title: 'Share your link', desc: 'Drop your GetMeAChai link anywhere — Instagram bio, YouTube description, Twitter, newsletters.' },
    { icon: 'heart', title: 'Fans support you', desc: 'Your supporters send you chai — one cup at a time. Direct, personal, no algorithms in the way.' },
  ]

  const stats = [
    { value: '12k+', label: 'Creators', sub: 'and growing daily' },
    { value: '₹2Cr+', label: 'Raised', sub: 'paid out to creators' },
    { value: '85k+', label: 'Supporters', sub: 'backing creators' },
    { value: '0%', label: 'Platform cut', sub: 'on supporter payments' },
  ]

  const values = [
    { title: 'Direct connection', desc: 'No middlemen. Money flows from fan to creator, instantly.', icon: 'zap' },
    { title: 'Creator-first', desc: 'Every decision we make starts with one question: is this good for creators?', icon: 'flame' },
    { title: 'Radical simplicity', desc: 'One link. One page. No dashboards to drown in.', icon: 'star' },
    { title: 'Built in India', desc: 'For Indian creators, with INR, UPI, and Razorpay built right in.', icon: 'mapPin' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .about-root {
          font-family: 'DM Sans', sans-serif;
          background: #080501;
          color: #f5ede0;
          overflow-x: hidden;
          min-height: 100vh;
        }

        /* ─── HERO ─── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180,90,0,0.18) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(120,40,0,0.12) 0%, transparent 60%);
        }

        /* Animated SVG steam */
        .steam-svg {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          opacity: 0.06;
          pointer-events: none;
        }

        .hero-content {
          position: relative; z-index: 2;
          text-align: center;
          padding: 0 24px;
          opacity: 0; transform: translateY(32px);
          transition: all 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-content.in { opacity: 1; transform: translateY(0); }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(217,119,6,0.1);
          border: 1px solid rgba(217,119,6,0.25);
          color: #f59e0b;
          font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 6px 16px; border-radius: 999px;
          margin-bottom: 28px;
          animation: badgePulse 3s ease-in-out infinite;
        }
        @keyframes badgePulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(217,119,6,0); }
          50% { box-shadow: 0 0 0 6px rgba(217,119,6,0.08); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 1.0;
          margin-bottom: 28px;
        }
        .hero-title .accent {
          background: linear-gradient(135deg, #d97706, #f59e0b, #fde68a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200%;
          animation: gradShift 4s ease-in-out infinite alternate;
        }
        @keyframes gradShift {
          0% { background-position: 0%; }
          100% { background-position: 100%; }
        }

        .hero-sub {
          font-size: 1.15rem; color: #9c8060;
          max-width: 540px; margin: 0 auto 48px;
          line-height: 1.7; font-weight: 300;
        }

        .hero-cta {
          display: inline-flex; align-items: center; gap: 12px;
          background: linear-gradient(135deg, #92400e, #d97706);
          color: #fff8f0;
          font-size: 0.9rem; font-weight: 600; letter-spacing: 0.06em;
          padding: 14px 32px; border-radius: 12px; text-decoration: none;
          transition: all 0.3s; position: relative; overflow: hidden;
          box-shadow: 0 4px 24px rgba(217,119,6,0.3);
        }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(217,119,6,0.45); }
        .hero-cta::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%); transition: transform 0.6s;
        }
        .hero-cta:hover::after { transform: translateX(100%); }

        /* Floating chai cup SVG */
        .cup-float {
          animation: floatCup 6s ease-in-out infinite;
          display: block; margin: 0 auto 32px;
          filter: drop-shadow(0 8px 24px rgba(217,119,6,0.3));
        }
        @keyframes floatCup {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-16px) rotate(2deg); }
        }

        /* ─── SCROLL REVEAL ─── */
        .reveal {
          opacity: 0; transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-40px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal-left.in { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(40px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal-right.in { opacity: 1; transform: translateX(0); }

        /* ─── SECTION BASE ─── */
        .section { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #d97706; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;
        }
        .section-label::before { content: ''; width: 32px; height: 1px; background: #d97706; }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 900; line-height: 1.1;
          margin-bottom: 20px;
        }

        /* ─── STATS ─── */
        .stats-band {
          background: linear-gradient(135deg, rgba(120,53,6,0.12), rgba(217,119,6,0.06));
          border-top: 1px solid rgba(217,119,6,0.12);
          border-bottom: 1px solid rgba(217,119,6,0.12);
          padding: 60px 24px;
        }
        .stats-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; max-width: 900px; margin: 0 auto;
        }
        @media(max-width:640px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
        .stat-item {
          text-align: center; padding: 24px;
          border-right: 1px solid rgba(255,255,255,0.05);
          transition: background 0.3s;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: rgba(217,119,6,0.05); }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem; font-weight: 900;
          background: linear-gradient(135deg, #d97706, #fde68a);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-label { font-size: 0.9rem; color: #f5ede0; font-weight: 500; margin: 4px 0; }
        .stat-sub { font-size: 0.72rem; color: #6b5a3e; }

        /* ─── HOW IT WORKS ─── */
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 60px; }
        @media(max-width:700px) { .steps-grid { grid-template-columns: 1fr; } }
        .step-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 36px 28px;
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .step-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #d97706, transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .step-card:hover { border-color: rgba(217,119,6,0.3); transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(217,119,6,0.1); }
        .step-card:hover::before { opacity: 1; }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 4rem; font-weight: 900;
          color: rgba(217,119,6,0.1);
          position: absolute; top: 12px; right: 20px;
          line-height: 1;
        }
        .step-icon { font-size: 1.8rem; margin-bottom: 16px; display: block; }
        .step-title { font-size: 1.05rem; font-weight: 600; color: #f5ede0; margin-bottom: 10px; }
        .step-desc { font-size: 0.875rem; color: #7a6040; line-height: 1.7; }

        /* ─── ANIMATED SVG DIVIDER ─── */
        .svg-divider { width: 100%; overflow: hidden; line-height: 0; }

        /* ─── VALUES ─── */
        .values-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; margin-top: 60px; }
        @media(max-width:600px) { .values-grid { grid-template-columns: 1fr; } }
        .value-card {
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px; padding: 32px;
          display: flex; gap: 20px; align-items: flex-start;
          transition: all 0.4s;
        }
        .value-card:hover { border-color: rgba(217,119,6,0.25); background: rgba(217,119,6,0.04); }
        .value-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(217,119,6,0.1); border: 1px solid rgba(217,119,6,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; flex-shrink: 0;
          transition: transform 0.3s, background 0.3s;
        }
        .value-card:hover .value-icon { transform: scale(1.1) rotate(-4deg); background: rgba(217,119,6,0.18); }
        .value-title { font-size: 1rem; font-weight: 600; color: #f5ede0; margin-bottom: 8px; }
        .value-desc { font-size: 0.85rem; color: #7a6040; line-height: 1.65; }

        /* ─── MANIFESTO ─── */
        .manifesto {
          padding: 100px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .manifesto-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(180,80,0,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .manifesto-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 3rem);
          font-style: italic;
          font-weight: 700;
          max-width: 800px; margin: 0 auto;
          line-height: 1.4; color: #e8d5b0;
          position: relative; z-index: 1;
        }
        .manifesto-quote .hl { color: #f59e0b; font-style: normal; }
        .manifesto-author {
          margin-top: 32px; color: #6b5a3e;
          font-size: 0.85rem; letter-spacing: 0.1em;
          text-transform: uppercase; position: relative; z-index: 1;
        }

        /* ─── CTA BAND ─── */
        .cta-band {
          padding: 80px 24px; text-align: center;
          background: linear-gradient(135deg, rgba(92,40,0,0.2), rgba(217,119,6,0.08));
          border-top: 1px solid rgba(217,119,6,0.12);
        }
        .cta-band h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900; margin-bottom: 16px;
        }
        .cta-band p { color: #7a6040; margin-bottom: 36px; font-size: 1rem; }

        /* ─── ANIMATED ORBIT ─── */
        .orbit-container {
          position: absolute; right: -80px; top: 50%;
          transform: translateY(-50%);
          width: 400px; height: 400px;
          opacity: 0.07; pointer-events: none;
        }
        @media(max-width:900px) { .orbit-container { display: none; } }
      `}</style>

      <div className="about-root">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg" />

          {/* Animated orbit rings */}
          <div className="orbit-container">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="150" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="8 12">
                <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="200" r="100" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="4 8">
                <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="14s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="200" r="60" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="2 6">
                <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="50" r="6" fill="#f59e0b">
                <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="100" r="4" fill="#d97706">
                <animateTransform attributeName="transform" type="rotate" from="90 200 200" to="450 200 200" dur="14s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>

          {/* Animated steam */}
          <svg className="steam-svg" width="600" height="300" viewBox="0 0 600 300">
            <path d="M100,300 Q110,200 100,100 Q90,0 100,-50" fill="none" stroke="#f59e0b" strokeWidth="2">
              <animate attributeName="opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite"/>
              <animateTransform attributeName="transform" type="translate" values="0,0;5,-10;0,0" dur="4s" repeatCount="indefinite"/>
            </path>
            <path d="M200,300 Q215,180 200,80 Q185,-20 200,-60" fill="none" stroke="#d97706" strokeWidth="1.5">
              <animate attributeName="opacity" values="0;0.4;0" dur="5s" begin="1s" repeatCount="indefinite"/>
              <animateTransform attributeName="transform" type="translate" values="0,0;-8,-15;0,0" dur="5s" begin="1s" repeatCount="indefinite"/>
            </path>
            <path d="M300,300 Q290,190 310,100 Q320,10 300,-40" fill="none" stroke="#f59e0b" strokeWidth="1">
              <animate attributeName="opacity" values="0;0.3;0" dur="6s" begin="2s" repeatCount="indefinite"/>
              <animateTransform attributeName="transform" type="translate" values="0,0;6,-20;0,0" dur="6s" begin="2s" repeatCount="indefinite"/>
            </path>
          </svg>

          <div className={`hero-content ${visible.hero ? 'in' : ''}`}>
            {/* Animated chai cup SVG */}
            <svg className="cup-float" width="80" height="90" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Steam wisps */}
              <path d="M28,18 Q24,10 28,2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0;2,-4;0,0" dur="2s" repeatCount="indefinite"/>
              </path>
              <path d="M40,14 Q36,6 40,-2" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0;-2,-5;0,0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
              </path>
              <path d="M52,18 Q56,10 52,2" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" begin="0.3s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0;-1,-4;0,0" dur="1.8s" begin="0.3s" repeatCount="indefinite"/>
              </path>
              {/* Cup body */}
              <path d="M14,28 L20,82 Q20,86 24,86 L56,86 Q60,86 60,82 L66,28 Z" fill="url(#cupGrad)" stroke="rgba(217,119,6,0.4)" strokeWidth="1"/>
              {/* Cup top rim */}
              <ellipse cx="40" cy="28" rx="26" ry="5" fill="url(#rimGrad)" stroke="rgba(217,119,6,0.5)" strokeWidth="1"/>
              {/* Liquid surface */}
              <ellipse cx="40" cy="33" rx="22" ry="4" fill="rgba(180,80,0,0.6)">
                <animate attributeName="ry" values="4;3.5;4" dur="3s" repeatCount="indefinite"/>
              </ellipse>
              {/* Handle */}
              <path d="M60,42 Q75,42 75,58 Q75,74 60,74" fill="none" stroke="url(#cupGrad)" strokeWidth="5" strokeLinecap="round"/>
              {/* Saucer */}
              <ellipse cx="40" cy="87" rx="32" ry="5" fill="rgba(120,53,6,0.5)" stroke="rgba(217,119,6,0.3)" strokeWidth="1"/>
              <defs>
                <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c2d12"/>
                  <stop offset="50%" stopColor="#d97706"/>
                  <stop offset="100%" stopColor="#92400e"/>
                </linearGradient>
                <linearGradient id="rimGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde68a"/>
                  <stop offset="100%" stopColor="#d97706"/>
                </linearGradient>
              </defs>
            </svg>

            <div className="hero-badge">
              <span style={{width:6,height:6,background:'#f59e0b',borderRadius:'50%',display:'inline-block'}}/>
              India's creator support platform
            </div>
            <h1 className="hero-title">
              We believe in <br />
              <span className="accent">fuelling creators.</span>
            </h1>
            <p className="hero-sub">
              GetMeAChai started with one simple idea: what if your biggest fans could send you a warm cup of chai — directly, meaningfully, without the noise?
            </p>
            <a href="/dashboard" className="hero-cta">
              Start your page <Coffee className="inline w-4 h-4 ml-1" />
            </a>
          </div>
        </section>

        {/* ── STATS ── */}
        <div
          className={`stats-band reveal ${visible.stats ? 'in' : ''}`}
          ref={el => sectionRefs.current.stats = el}
          data-section="stats"
        >
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-item" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section
          className={`section reveal ${visible.how ? 'in' : ''}`}
          ref={el => sectionRefs.current.how = el}
          data-section="how"
        >
          <div className="section-label">How it works</div>
          <h2 className="section-title">Simple as brewing<br />a cup of chai.</h2>
          <p style={{ color: '#7a6040', maxWidth: 480, lineHeight: 1.7, fontSize: '0.9rem' }}>
            No complex setup, no lengthy onboarding. You're live in minutes.
          </p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div
                className="step-card reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.15}s`, ...(visible.how ? { opacity:1, transform:'translateY(0)' } : {}) }}
              >
                <div className="step-num">0{i + 1}</div>
                <span className="step-icon">
                  {s.icon === 'sparkles' && <Sparkles size={28} />}
                  {s.icon === 'coffee' && <Coffee size={28} />}
                  {s.icon === 'heart' && <Heart size={28} />}
                </span>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ANIMATED SVG WAVE DIVIDER ── */}
        <div className="svg-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{display:'block',height:80}}>
            <path fill="rgba(217,119,6,0.04)" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z">
              <animate attributeName="d"
                values="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z;
                        M0,20 C240,0 480,80 720,20 C960,0 1200,80 1440,20 L1440,80 L0,80 Z;
                        M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
                dur="8s" repeatCount="indefinite"/>
            </path>
            <path fill="rgba(217,119,6,0.06)" d="M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,50 L1440,80 L0,80 Z">
              <animate attributeName="d"
                values="M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,50 L1440,80 L0,80 Z;
                        M0,40 C360,80 720,20 1080,60 C1260,80 1380,20 1440,60 L1440,80 L0,80 Z;
                        M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,50 L1440,80 L0,80 Z"
                dur="6s" begin="-3s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        {/* ── MANIFESTO ── */}
        <div className="manifesto">
          <div className="manifesto-bg" />
          <blockquote
            className={`manifesto-quote reveal ${visible.manifesto ? 'in' : ''}`}
            ref={el => sectionRefs.current.manifesto = el}
            data-section="manifesto"
          >
            "The best creators aren't the most famous — they're the most <span className="hl">real</span>. And real people deserve real support."
          </blockquote>
          <p className="manifesto-author">— The GetMeAChai team</p>
        </div>

        {/* ── VALUES ── */}
        <section
          className={`section reveal ${visible.values ? 'in' : ''}`}
          ref={el => sectionRefs.current.values = el}
          data-section="values"
        >
          <div className="section-label">Our values</div>
          <h2 className="section-title">Why we built this.</h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div
                className="value-card"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s`, ...(visible.values ? { opacity:1 } : {}) }}
              >
                <div className="value-icon">
                  {v.icon === 'zap' && <Zap size={24} />}
                  {v.icon === 'flame' && <Flame size={24} />}
                  {v.icon === 'star' && <Star size={24} />}
                  {v.icon === 'mapPin' && <MapPin size={24} />}
                </div>
                <div>
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BAND ── */}
        <div
          className={`cta-band reveal ${visible.cta ? 'in' : ''}`}
          ref={el => sectionRefs.current.cta = el}
          data-section="cta"
        >
          {/* Animated chai drops */}
          <svg width="100%" height="60" viewBox="0 0 800 60" style={{marginBottom:32,opacity:0.15}}>
            {[80,200,320,440,560,680].map((x, i) => (
              <ellipse key={i} cx={x} cy="30" rx="6" ry="8" fill="#d97706">
                <animate attributeName="cy" values="30;42;30" dur={`${1.5 + i * 0.3}s`} begin={`${i * 0.25}s`} repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.15;0.6;0.15" dur={`${1.5 + i * 0.3}s`} begin={`${i * 0.25}s`} repeatCount="indefinite"/>
              </ellipse>
            ))}
          </svg>
          <h2>Ready to receive your first chai? <Coffee className="inline w-5 h-5 ml-1" /></h2>
          <p>Join thousands of creators already getting supported by their fans.</p>
          <a href="/dashboard" className="hero-cta">Create your page — it's free</a>
        </div>

      </div>
    </>
  )
}

export default AboutPage