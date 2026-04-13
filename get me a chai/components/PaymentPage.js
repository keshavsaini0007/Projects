
"use client"
import Script from "next/script"
import { useState, useEffect, useRef } from "react"
import { initiate, fetchuser, fetchpayments } from "@/actions/useractions"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Coffee, CupSoda, Flame } from 'lucide-react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

:root {
  --ink:    #05030a;
  --surf:   rgba(255,255,255,0.026);
  --bord:   rgba(255,255,255,0.07);
  --gold:   #c9a84c;
  --gold2:  #e8c96a;
  --gold3:  #f5e4a8;
  --dim:    #4a3d28;
  --muted:  #2a2018;
  --text:   #f0e8d8;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.pp-root {
  font-family: 'Outfit', sans-serif;
  background: var(--ink);
  min-height: 100vh;
  color: var(--text);
  overflow-x: hidden;
}

/* ─────────────────────────────────────────────────
   HERO  —  FIX 1:
   Remove overflow:hidden from .pp-hero entirely.
   Instead, clip ONLY the cover image using a wrapper
   so the avatar (which hangs below) is never cut off
   and the navbar dropdown is never clipped either.
───────────────────────────────────────────────── */
.pp-hero {
  position: relative;
  height: 380px;
  /* ✅  NO overflow:hidden here — that was clipping
        both the avatar and the navbar dropdown      */
}

/* The cover image gets its own clip wrapper */
.pp-cover-clip {
  position: absolute;
  inset: 0;
  overflow: hidden;       /* clips only the image, not siblings */
  z-index: 0;
}

.pp-cover {
  width: 100%; height: 100%;
  object-fit: cover;
  transform: scale(1.12) translateY(0px);
  will-change: transform;
  filter: brightness(0.42) saturate(0.65);
}

.pp-vignette {
  position: absolute; inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(5,3,10,0.25) 0%,
    transparent       35%,
    transparent       55%,
    rgba(5,3,10,1)    100%
  );
  /* pointer-events off so it doesn't eat clicks */
  pointer-events: none;
}

/* corner brackets */
.pp-bracket {
  position: absolute;
  width: 36px; height: 36px;
  opacity: 0.4;
  pointer-events: none;
  z-index: 2;
}
.pp-bracket.tl { top:18px; left:18px;  border-top:1px solid var(--gold); border-left:1px solid var(--gold); }
.pp-bracket.tr { top:18px; right:18px; border-top:1px solid var(--gold); border-right:1px solid var(--gold); }
/* bottom brackets sit above hero bottom edge so they're not hidden */
.pp-bracket.bl { bottom:72px; left:18px;  border-bottom:1px solid var(--gold); border-left:1px solid var(--gold); }
.pp-bracket.br { bottom:72px; right:18px; border-bottom:1px solid var(--gold); border-right:1px solid var(--gold); }

/* ─────────────────────────────────────────────────
   AVATAR  —  FIX 2:
   Avatar hangs below the hero. Because we removed
   overflow:hidden from .pp-hero it now shows fully.
   We also raise z-index above the vignette overlay.
───────────────────────────────────────────────── */
.pp-avatar-wrap {
  position: absolute;
  bottom: -54px;          /* hangs 54px below hero bottom */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;            /* above vignette (z:1) and brackets (z:2) */
}

.pp-halo {
  position: absolute; inset: -18px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.16) 0%, transparent 70%);
  animation: haloPulse 4s ease-in-out infinite;
  will-change: transform, opacity;
}
@keyframes haloPulse {
  0%,100% { transform: scale(1);    opacity: 0.55; }
  50%     { transform: scale(1.14); opacity: 1;    }
}

.pp-ring-svg {
  position: absolute;
  top: -9px; left: -9px;
  width: 132px; height: 132px;
  animation: ringSpin 14s linear infinite;
  will-change: transform;
}
@keyframes ringSpin { to { transform: rotate(360deg); } }

.pp-avatar-img {
  width: 114px; height: 114px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(201,168,76,0.28);
  display: block;
  position: relative; z-index: 1;
  transition: border-color 0.4s, filter 0.4s;
  filter: brightness(0.92) contrast(1.05);
}
.pp-avatar-wrap:hover .pp-avatar-img {
  border-color: rgba(201,168,76,0.65);
  filter: brightness(1.05) contrast(1.08);
}

/* ── INFO ── */
.pp-info {
  display: flex; flex-direction: column; align-items: center;
  /* Extra top padding to clear the hanging avatar (54px overhang + 24px gap) */
  padding: 82px 16px 40px;
  gap: 10px;
  opacity: 0; transform: translateY(22px);
  transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s,
              transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s;
}
.pp-info.in { opacity: 1; transform: translateY(0); }

.pp-name-row { display: flex; align-items: center; gap: 18px; }

.pp-rule {
  width: 50px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold));
  opacity: 0;
  transition: opacity 0.6s 0.7s;
}
.pp-rule.r { background: linear-gradient(270deg, transparent, var(--gold)); }
.pp-rule.in { opacity: 0.55; }

.pp-username {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  letter-spacing: 0.06em;
  background: linear-gradient(120deg, var(--gold) 0%, var(--gold3) 50%, var(--gold) 100%);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: goldShimmer 5s ease-in-out infinite;
  will-change: background-position;
}
@keyframes goldShimmer {
  0%,100% { background-position: 0%;   }
  50%     { background-position: 100%; }
}

.pp-tagline { font-size: 0.875rem; color: var(--dim); font-weight: 300; letter-spacing: 0.03em; }

.pp-stats {
  display: flex;
  background: var(--surf);
  border: 1px solid var(--bord);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 6px;
}
.pp-stat {
  padding: 12px 24px; text-align: center;
  border-right: 1px solid var(--bord);
  transition: background 0.3s;
}
.pp-stat:last-child { border-right: none; }
.pp-stat:hover { background: rgba(201,168,76,0.05); }
.pp-stat-val {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem; font-weight: 700; color: var(--gold2);
}
.pp-stat-lbl {
  font-size: 0.62rem; color: var(--muted);
  letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px;
}

/* ── GRID ── */
.pp-grid {
  display: flex; gap: 22px;
  max-width: 980px; margin: 0 auto 80px;
  padding: 0 22px;
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.42s,
              transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.42s;
}
.pp-grid.in { opacity: 1; transform: translateY(0); }
@media (max-width: 680px) { .pp-grid { flex-direction: column; } }

/* ── CARD ── */
.pp-card {
  flex: 1;
  background: var(--surf);
  border: 1px solid var(--bord);
  border-radius: 18px;
  /* ✅  NO overflow:hidden on cards either —
        keeping overflow visible so nothing
        inside ever gets clipped unexpectedly  */
  position: relative;
  transition: border-color 0.45s, box-shadow 0.45s;
}
.pp-card:hover {
  border-color: rgba(201,168,76,0.2);
  box-shadow: 0 20px 70px rgba(0,0,0,0.55),
              inset 0 1px 0 rgba(201,168,76,0.05);
}

/* top border draws in from center */
.pp-card::before {
  content: '';
  position: absolute; top: 0;
  left: 50%; right: 50%; height: 1px;
  background: var(--gold); opacity: 0;
  transition: left 0.55s cubic-bezier(0.16,1,0.3,1),
              right 0.55s cubic-bezier(0.16,1,0.3,1),
              opacity 0.3s;
  border-radius: 18px 18px 0 0;
}
.pp-card:hover::before { left: 0; right: 0; opacity: 0.65; }

.pp-card-inner { padding: 30px; }

.pp-card-head {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 26px;
}
.pp-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem; font-weight: 600;
  letter-spacing: 0.06em; color: var(--gold2);
}
.pp-card-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(201,168,76,0.22), transparent);
}

/* ── SUPPORTER ROWS ── */
.pp-sup {
  display: flex; align-items: center; gap: 13px;
  padding: 11px 10px; margin: 2px -10px;
  border-radius: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  opacity: 0; transform: translateX(-16px);
  transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
              transform 0.55s cubic-bezier(0.16,1,0.3,1),
              background 0.25s;
}
.pp-sup.in { opacity: 1; transform: translateX(0); }
.pp-sup:last-child { border-bottom: none; }
.pp-sup:hover { background: rgba(201,168,76,0.04); }

.pp-sup-av {
  width: 40px; height: 40px; flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1208, #3a2a10);
  border: 1px solid rgba(201,168,76,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem; font-weight: 700; color: var(--gold);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
}
.pp-sup:hover .pp-sup-av {
  border-color: rgba(201,168,76,0.45);
  box-shadow: 0 0 14px rgba(201,168,76,0.18);
  transform: scale(1.06);
}

.pp-sup-body { flex: 1; min-width: 0; }
.pp-sup-name { font-size: 0.86rem; font-weight: 500; color: var(--text); }
.pp-sup-msg  {
  font-size: 0.74rem; color: #7c7773; margin-top: 2px;
  font-style: italic; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}
.pp-sup-amt {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem; font-weight: 700; color: var(--gold);
  white-space: nowrap;
}

.pp-empty {
  text-align: center; padding: 44px 0;
  color: var(--muted); font-size: 0.875rem; font-style: italic;
}
.pp-empty-icon { font-size: 2.2rem; display: block; margin-bottom: 10px; opacity: 0.35; }

/* ── INPUTS ── */
.pp-field { margin-bottom: 14px; position: relative; }
.pp-label {
  display: block; font-size: 0.6rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--dim); margin-bottom: 6px;
}
.pp-input {
  width: 100%; padding: 13px 16px;
  background: rgba(255,255,255,0.016);
  border: 1px solid rgba(255,255,255,0.055);
  border-radius: 10px; outline: none;
  color: var(--text); font-size: 0.875rem;
  font-family: 'Outfit', sans-serif;
  transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}
.pp-input::placeholder { color: rgba(74,61,40,0.5); }
.pp-input:focus {
  border-color: rgba(201,168,76,0.42);
  background: rgba(201,168,76,0.028);
  box-shadow: 0 0 0 3px rgba(201,168,76,0.07);
}

.pp-underline {
  position: absolute; bottom: 0;
  left: 50%; right: 50%; height: 1px;
  background: var(--gold);
  border-radius: 0 0 10px 10px;
  pointer-events: none;
  transition: left 0.38s cubic-bezier(0.16,1,0.3,1),
              right 0.38s cubic-bezier(0.16,1,0.3,1);
}
.pp-input:focus ~ .pp-underline { left: 0; right: 0; }

/* ── PAY BUTTON ── */
.pp-pay {
  width: 100%; padding: 15px;
  background: linear-gradient(135deg,
    #2a1a04 0%, #8a6520 25%, #c9a84c 50%,
    #e8c96a 65%, #c9a84c 80%, #8a6520 100%);
  background-size: 250%;
  background-position: 100%;
  border: none; border-radius: 11px;
  color: #0c0810;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  position: relative; overflow: hidden;
  transition: background-position 0.55s ease,
              transform 0.25s ease,
              box-shadow 0.35s ease;
  box-shadow: 0 4px 22px rgba(201,168,76,0.18),
              inset 0 1px 0 rgba(255,255,255,0.12);
  margin-bottom: 14px;
  will-change: background-position, transform;
}
.pp-pay:hover:not(:disabled) {
  background-position: 0%;
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(201,168,76,0.32),
              inset 0 1px 0 rgba(255,255,255,0.18);
}
.pp-pay:active:not(:disabled) { transform: translateY(0); }
.pp-pay:disabled { opacity: 0.5; }

.pp-pay-shine {
  position: absolute; inset: 0;
  background: linear-gradient(
    105deg, transparent 38%, rgba(255,255,255,0.22) 50%, transparent 62%
  );
  transform: translateX(-100%);
  will-change: transform;
}
.pp-pay:hover .pp-pay-shine {
  transform: translateX(100%);
  transition: transform 0.48s ease;
}

/* ── DIVIDER ── */
.pp-or {
  display: flex; align-items: center; gap: 12px;
  margin: 12px 0 10px;
  font-size: 0.62rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--muted);
}
.pp-or::before, .pp-or::after {
  content: ''; flex: 1; height: 1px;
  background: rgba(255,255,255,0.04);
}

/* ── QUICK AMOUNTS ── */
.pp-quick { display: flex; gap: 8px; }
.pp-qbtn {
  flex: 1; padding: 11px 6px;
  background: rgba(255,255,255,0.018);
  border: 1px solid rgba(255,255,255,0.055);
  border-radius: 10px;
  color: var(--gold);
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.95rem; font-weight: 600;
  letter-spacing: 0.04em;
  position: relative; overflow: hidden;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s, color 0.3s;
  will-change: transform;
}
.pp-qbtn::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(201,168,76,0.09), transparent);
  opacity: 0; transition: opacity 0.28s;
}
.pp-qbtn:hover {
  border-color: rgba(201,168,76,0.32);
  transform: translateY(-3px);
  box-shadow: 0 7px 22px rgba(201,168,76,0.14);
  color: var(--gold3);
}
.pp-qbtn:hover::before { opacity: 1; }
.pp-qbtn:active { transform: translateY(-1px); }
`

export default function PaymentPage({ username }) {
  username = username?.replace("%20", " ")

  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
  const [currentuser, setcurrentuser] = useState({})
  const [payments, setpayments] = useState([])
  const [visible, setVisible] = useState(false)
  const [paying, setPaying] = useState(false)

  const coverRef = useRef(null)
  const ticking = useRef(false)

  useEffect(() => {
    ; (async () => {
      const [u, p] = await Promise.all([fetchuser(username), fetchpayments(username)])
      setcurrentuser(u)
      setpayments(p)
    })()

    const t = setTimeout(() => setVisible(true), 180)

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        if (coverRef.current) {
          const y = window.scrollY * 0.28
          coverRef.current.style.transform = `scale(1.12) translateY(${y}px)`
        }
        ticking.current = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      clearTimeout(t)
      window.removeEventListener("scroll", onScroll)
    }
  }, [username])

  const handleChange = (e) =>
    setPaymentform(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const pay = async (amount) => {
    if (paying) return
    setPaying(true)
    try {
      const a = await initiate(amount, username, paymentform)
      const rzp = new Razorpay({
        key: currentuser.razorpayid,
        amount,
        currency: "INR",
        name: "GetMeAChai",
        description: `Support for ${username}`,
        order_id: a.id,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: { name: paymentform.name },
        theme: { color: "#c9a84c" },
      })
      rzp.open()
    } finally {
      setPaying(false)
    }
  }

  const total = payments.reduce((t, p) => t + Number.parseInt(p.amount || 0), 0)

  return (
    <>
      <style>{CSS}</style>
      <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="pp-root">

        {/* ── HERO ── */}
        <section className="pp-hero">

          {/*
            ✅ FIX 1 — cover image is now inside its OWN clip wrapper.
            overflow:hidden only clips the image, not the avatar below
            or the navbar dropdown above.
          */}
          <div className="pp-cover-clip">
            <img
              ref={coverRef}
              src={currentuser?.coverpic || "/background.jpg"}
              className="pp-cover"
              alt="cover"
            />
          </div>

          <div className="pp-vignette" />

          <div className="pp-bracket tl" />
          <div className="pp-bracket tr" />
          <div className="pp-bracket bl" />
          <div className="pp-bracket br" />

          {/*
            ✅ FIX 2 — avatar sits outside any overflow:hidden context,
            so the full circle (including bottom half) is always visible.
          */}
          <div className="pp-avatar-wrap">
            <div className="pp-halo" />
            <svg
              className="pp-ring-svg"
              viewBox="0 0 132 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="66" cy="66" r="60" stroke="url(#rg)" strokeWidth="1" strokeDasharray="6 5" strokeLinecap="round" />
              <circle cx="66" cy="66" r="60" stroke="rgba(201,168,76,0.13)" strokeWidth="8" fill="none" />
              {[0, 90, 180, 270].map((deg, i) => {
                const rad = (deg - 90) * Math.PI / 180
                const cx = 66 + 60 * Math.cos(rad)
                const cy = 66 + 60 * Math.sin(rad)
                return <polygon key={i} points={`${cx},${cy - 4} ${cx + 4},${cy} ${cx},${cy + 4} ${cx - 4},${cy}`} fill="#c9a84c" opacity="0.65" />
              })}
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5e4a8" />
                  <stop offset="50%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#8a6520" />
                </linearGradient>
              </defs>
            </svg>
            <img
              src={currentuser?.profilepic || "/profile-pic.webp"}
              className="pp-avatar-img"
              alt="profile"
            />
          </div>
        </section>

        {/* ── INFO ── */}
        <section className={`pp-info ${visible ? "in" : ""}`}>
          <div className="pp-name-row">
            <div className={`pp-rule ${visible ? "in" : ""}`} />
            <span className="pp-username">{username}</span>
            <div className={`pp-rule r ${visible ? "in" : ""}`} />
          </div>
          <p className="pp-tagline">Let's help {username} get a chai <Coffee className="inline-block w-4 h-4 ml-1" /></p>
          <div className="pp-stats">
            {[
              { val: payments.length, lbl: "Patrons" },
              { val: `₹${total.toLocaleString()}`, lbl: "Raised" },
              { val: payments.length > 0 ? `₹${Math.round(total / payments.length)}` : "—", lbl: "Avg. chai" },
            ].map((s, i) => (
              <div className="pp-stat" key={i}>
                <div className="pp-stat-val">{s.val}</div>
                <div className="pp-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN GRID ── */}
        <div className={`pp-grid ${visible ? "in" : ""}`}>

          {/* Supporters */}
          <div className="pp-card">
            <div className="pp-card-inner">
              <div className="pp-card-head">
                <h2 className="pp-card-title">Patrons</h2>
                <div className="pp-card-line" />
              </div>
              {payments.length === 0 ? (
                <div className="pp-empty">
                  <span className="pp-empty-icon"><Coffee size={40} /></span>
                  No supporters yet.<br />Be the first to buy a chai.
                </div>
              ) : (
                payments.map((p, i) => (
                  <div
                    key={i}
                    className={`pp-sup ${visible ? "in" : ""}`}
                    style={{ transitionDelay: `${0.6 + i * 0.09}s` }}
                  >
                    <div className="pp-sup-av">{(p.name || "?")[0].toUpperCase()}</div>
                    <div className="pp-sup-body">
                      <div className="pp-sup-name">{p.name || "Anonymous"}</div>
                      {p.message && <div className="pp-sup-msg">"{p.message}"</div>}
                    </div>
                    <div className="pp-sup-amt">₹{p.amount}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment form */}
          <div className="pp-card">
            <div className="pp-card-inner">
              <div className="pp-card-head">
                <h2 className="pp-card-title">Buy a Chai</h2>
                <div className="pp-card-line" />
              </div>
              {[
                { name: "name", label: "Your Name", type: "text", ph: "How should we address you?" },
                { name: "message", label: "Message", type: "text", ph: "Leave a note for the creator…" },
                { name: "amount", label: "Amount (₹)", type: "number", ph: "Enter any amount" },
              ].map(f => (
                <div className="pp-field" key={f.name}>
                  <label className="pp-label">{f.label}</label>
                  <input
                    className="pp-input"
                    name={f.name}
                    type={f.type}
                    value={paymentform[f.name]}
                    onChange={handleChange}
                    placeholder={f.ph}
                  />
                  <div className="pp-underline" />
                </div>
              ))}
              <button
                className="pp-pay"
                onClick={() => pay((paymentform.amount || 10) * 100)}
                disabled={paying}
              >
                <div className="pp-pay-shine" />
                {paying ? "Processing…" : "Proceed to Pay"}
              </button>
              <div className="pp-or">or pick an amount</div>
              <div className="pp-quick">
                {[
                  { label: "₹10", amt: 1000, icon: <Coffee size={16} /> },
                  { label: "₹25", amt: 2500, icon: <CupSoda size={16} /> },
                  { label: "₹50", amt: 5000, icon: <Flame size={16} /> },
                ].map(b => (
                  <button key={b.amt} className="pp-qbtn" onClick={() => pay(b.amt)}>
                    {b.icon} {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}





















// "use client"
// import Script from "next/script"
// import { useState, useEffect, useRef } from "react"
// import { initiate, fetchuser, fetchpayments } from "@/actions/useractions"
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const PaymentPage = ({ username }) => {
//   username = username?.replace("%20", ' ')
//   const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
//   const [currentuser, setcurrentuser] = useState({})
//   const [payments, setpayments] = useState([])
//   const [visible, setVisible] = useState(false)
//   const [paying, setPaying] = useState(false)
//   const [particles, setParticles] = useState([])
//   const [coverLoaded, setCoverLoaded] = useState(false)

//   const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value })

//   useEffect(() => {
//     getData()
//     setTimeout(() => setVisible(true), 120)
//     setParticles(Array.from({ length: 20 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       size: Math.random() * 4 + 2,
//       dur: Math.random() * 8 + 5,
//       delay: Math.random() * 5,
//     })))
//   }, [])

//   const getData = async () => {
//     let u = await fetchuser(username)
//     let p = await fetchpayments(username)
//     setcurrentuser(u)
//     setpayments(p)
//   }

//   const pay = async (amount) => {
//     if (paying) return
//     setPaying(true)
//     try {
//       const a = await initiate(amount, username, paymentform)
//       var options = {
//         key: currentuser.razorpayid,
//         amount,
//         currency: "INR",
//         name: "GetMeAChai",
//         description: `Support for ${username}`,
//         order_id: a.id,
//         callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
//         prefill: { name: paymentform.name, email: "", contact: "" },
//         theme: { color: "#d97706" }
//       }
//       var rzp1 = new Razorpay(options)
//       rzp1.open()
//     } finally {
//       setPaying(false)
//     }
//   }

//   const totalRaised = payments.reduce((t, p) => t + Number.parseInt(p.amount || 0), 0)

//   return (
//     <>
//       <ToastContainer position="top-right" theme="dark" autoClose={3000}/>
//       <Script src="https://checkout.razorpay.com/v1/checkout.js"/>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

//         .pp-root {
//           font-family: 'DM Sans', sans-serif;
//           background: #070401;
//           min-height: 100vh;
//           color: #f5ede0;
//           overflow-x: hidden;
//         }

//         /* ── HERO ── */
//         .pp-hero {
//           position: relative;
//           height: 320px;
//           overflow: hidden;
//         }
//         .pp-cover {
//           width: 100%; height: 100%;
//           object-fit: cover;
//           opacity: 0.4;
//           transition: transform 8s ease, opacity 1s ease;
//         }
//         .pp-cover.loaded { opacity: 0.4; }
//         .pp-hero:hover .pp-cover { transform: scale(1.04); }

//         .pp-hero-overlay {
//           position: absolute; inset: 0;
//           background:
//             linear-gradient(to bottom, transparent 30%, #070401 100%),
//             radial-gradient(ellipse 70% 60% at 50% 100%, rgba(180,80,0,0.18) 0%, transparent 70%);
//         }

//         /* Floating steam particles */
//         .pp-particle {
//           position: absolute; bottom: 0;
//           border-radius: 50%;
//           background: #f59e0b;
//           opacity: 0;
//           animation: ppFloat var(--d) var(--delay) infinite ease-in-out;
//         }
//         @keyframes ppFloat {
//           0%   { opacity:0; transform: translateY(0) scale(1); }
//           15%  { opacity: 0.35; }
//           85%  { opacity: 0.1; }
//           100% { opacity:0; transform: translateY(-120px) scale(0.3); }
//         }

//         /* ── AVATAR ── */
//         .pp-avatar-wrap {
//           position: absolute;
//           bottom: -52px; left: 50%;
//           transform: translateX(-50%);
//           z-index: 10;
//         }
//         .pp-avatar-ring {
//           width: 112px; height: 112px;
//           border-radius: 50%;
//           padding: 3px;
//           background: conic-gradient(#fde68a, #d97706, #92400e, #d97706, #fde68a);
//           animation: ringRotate 6s linear infinite;
//           box-shadow: 0 0 32px rgba(217,119,6,0.45), 0 0 80px rgba(217,119,6,0.15);
//         }
//         @keyframes ringRotate { to { transform: rotate(360deg); } }
//         .pp-avatar-img {
//           width: 106px; height: 106px;
//           border-radius: 50%; object-fit: cover;
//           border: 3px solid #070401;
//           display: block; position: absolute; top:3px; left:3px;
//         }

//         /* ── INFO SECTION ── */
//         .pp-info {
//           display: flex; flex-direction: column; align-items: center;
//           padding: 72px 16px 40px; gap: 10px;
//           opacity: 0; transform: translateY(20px);
//           transition: all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s;
//         }
//         .pp-info.in { opacity:1; transform: translateY(0); }

//         .pp-username {
//           font-family: 'Playfair Display', serif;
//           font-size: 2.2rem; font-weight: 900;
//           background: linear-gradient(90deg, #f59e0b, #fde68a 50%, #f59e0b);
//           background-size: 200%;
//           -webkit-background-clip: text; -webkit-text-fill-color: transparent;
//           animation: shimmer 3s infinite linear;
//         }
//         @keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }

//         .pp-tagline { color: #6b5a3e; font-size: 0.9rem; text-align: center; }

//         .pp-stats-row { display: flex; gap: 0; margin-top: 6px; }
//         .pp-stat {
//           padding: 8px 20px;
//           border-right: 1px solid rgba(255,255,255,0.05);
//           text-align: center;
//         }
//         .pp-stat:last-child { border-right: none; }
//         .pp-stat-val { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #f59e0b; }
//         .pp-stat-label { font-size: 0.68rem; color: #5a4a2e; text-transform: uppercase; letter-spacing: 0.08em; }

//         /* ── GRID ── */
//         .pp-grid {
//           display: flex; gap: 20px;
//           max-width: 960px; margin: 0 auto 80px;
//           padding: 0 20px;
//           opacity: 0; transform: translateY(28px);
//           transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s;
//         }
//         .pp-grid.in { opacity:1; transform: translateY(0); }
//         @media(max-width:680px) { .pp-grid { flex-direction: column; } }

//         /* ── CARD ── */
//         .pp-card {
//           flex: 1;
//           background: rgba(255,255,255,0.018);
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 20px; padding: 28px;
//           position: relative; overflow: hidden;
//           transition: border-color 0.4s, box-shadow 0.4s;
//         }
//         .pp-card:hover { border-color: rgba(217,119,6,0.25); box-shadow: 0 0 50px rgba(217,119,6,0.06); }
//         .pp-card::before {
//           content: ''; position: absolute;
//           top: 0; left: 0; right: 0; height: 1px;
//           background: linear-gradient(90deg, transparent, #d97706, transparent);
//           opacity: 0; transition: opacity 0.4s;
//         }
//         .pp-card:hover::before { opacity: 1; }

//         .pp-card-title {
//           font-family: 'Playfair Display', serif;
//           font-size: 1.15rem; font-weight: 700; color: #f59e0b;
//           margin-bottom: 24px;
//           display: flex; align-items: center; gap: 10px;
//         }
//         .pp-card-title::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(217,119,6,0.2), transparent); }

//         /* ── SUPPORTER ITEMS ── */
//         .pp-supporter {
//           display: flex; align-items: flex-start; gap: 12px;
//           padding: 14px 0;
//           border-bottom: 1px solid rgba(255,255,255,0.03);
//           opacity: 0; transform: translateX(-12px);
//           transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
//         }
//         .pp-supporter.in { opacity:1; transform: translateX(0); }
//         .pp-supporter:last-child { border-bottom: none; }

//         .pp-s-avatar {
//           width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
//           background: linear-gradient(135deg, #7c2d12, #d97706);
//           display: flex; align-items: center; justify-content: center;
//           font-weight: 700; font-size: 0.9rem; color: white;
//           box-shadow: 0 0 12px rgba(217,119,6,0.25);
//           transition: transform 0.3s, box-shadow 0.3s;
//         }
//         .pp-supporter:hover .pp-s-avatar { transform: scale(1.1); box-shadow: 0 0 20px rgba(217,119,6,0.4); }
//         .pp-s-body { flex: 1; min-width: 0; }
//         .pp-s-name { font-size: 0.85rem; font-weight: 500; }
//         .pp-s-msg { font-size: 0.78rem; color: #5a4a2e; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .pp-s-amount { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #f59e0b; white-space: nowrap; }

//         .pp-empty { color: #3d2f1a; font-size: 0.875rem; text-align: center; padding: 40px 0; }
//         .pp-empty span { display: block; font-size: 2rem; margin-bottom: 8px; }

//         /* ── FORM INPUTS ── */
//         .pp-input {
//           width: 100%; padding: 13px 16px;
//           background: rgba(255,255,255,0.025);
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 12px; outline: none;
//           color: #f5ede0; font-size: 0.875rem;
//           font-family: 'DM Sans', sans-serif;
//           transition: all 0.3s; margin-bottom: 12px;
//           box-sizing: border-box;
//         }
//         .pp-input::placeholder { color: #2e2010; }
//         .pp-input:focus {
//           border-color: rgba(217,119,6,0.5);
//           background: rgba(217,119,6,0.04);
//           box-shadow: 0 0 0 3px rgba(217,119,6,0.1);
//           transform: translateY(-1px);
//         }

//         /* ── PAY BUTTON ── */
//         .pp-pay-btn {
//           width: 100%; padding: 15px;
//           background: linear-gradient(135deg, #92400e, #d97706, #f59e0b);
//           background-size: 200%;
//           border: none; border-radius: 12px;
//           color: #fff8f0; font-family: 'Playfair Display', serif;
//           font-size: 1rem; font-weight: 700; letter-spacing: 0.1em;
//           cursor: pointer; position: relative; overflow: hidden;
//           transition: all 0.4s;
//           box-shadow: 0 4px 24px rgba(217,119,6,0.3);
//           margin-bottom: 12px;
//         }
//         .pp-pay-btn:hover {
//           background-position: right;
//           transform: translateY(-2px);
//           box-shadow: 0 8px 36px rgba(217,119,6,0.5);
//         }
//         .pp-pay-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
//         .pp-pay-btn::after {
//           content: ''; position: absolute; inset: 0;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
//           transform: translateX(-100%); transition: transform 0.5s;
//         }
//         .pp-pay-btn:hover::after { transform: translateX(100%); }

//         /* ── DIVIDER ── */
//         .pp-divider {
//           display: flex; align-items: center; gap: 10px;
//           color: #3d2f1a; font-size: 0.72rem; letter-spacing: 0.1em;
//           text-transform: uppercase; margin: 12px 0 10px;
//         }
//         .pp-divider::before, .pp-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.05); }

//         /* ── QUICK AMOUNTS ── */
//         .pp-quick { display: flex; gap: 8px; }
//         .pp-qbtn {
//           flex: 1; padding: 11px 8px;
//           border-radius: 10px;
//           background: rgba(255,255,255,0.025);
//           border: 1px solid rgba(255,255,255,0.06);
//           color: #f59e0b; font-size: 0.82rem; font-weight: 500;
//           cursor: pointer; font-family: 'DM Sans', sans-serif;
//           transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
//           position: relative; overflow: hidden;
//         }
//         .pp-qbtn:hover {
//           border-color: rgba(217,119,6,0.4);
//           background: rgba(217,119,6,0.08);
//           transform: translateY(-3px);
//           box-shadow: 0 6px 20px rgba(217,119,6,0.2);
//         }
//       `}</style>

//       <div className="pp-root">

//         {/* Hero */}
//         <div className="pp-hero">
//           <img
//             src={currentuser?.coverpic || "/background.jpg"}
//             className={`pp-cover ${coverLoaded ? 'loaded' : ''}`}
//             alt="cover"
//             onLoad={() => setCoverLoaded(true)}
//           />
//           <div className="pp-hero-overlay"/>

//           {/* Steam particles */}
//           {particles.map(p => (
//             <div key={p.id} className="pp-particle" style={{
//               left: `${p.x}%`, width: p.size, height: p.size,
//               '--d': `${p.dur}s`, '--delay': `${p.delay}s`,
//             }}/>
//           ))}

//           {/* Avatar */}
//           <div className="pp-avatar-wrap">
//             <div className="pp-avatar-ring"/>
//             <img
//               src={currentuser?.profilepic || "/profile-pic.webp"}
//               className="pp-avatar-img"
//               alt="profile"
//             />
//           </div>
//         </div>

//         {/* Info */}
//         <div className={`pp-info ${visible ? 'in' : ''}`}>
//           <div className="pp-username">{username}</div>
//           <div className="pp-tagline">Let's help {username} get a chai ☕</div>
//           <div className="pp-stats-row">
//             <div className="pp-stat">
//               <div className="pp-stat-val">{payments.length}</div>
//               <div className="pp-stat-label">Supporters</div>
//             </div>
//             <div className="pp-stat">
//               <div className="pp-stat-val">₹{totalRaised.toLocaleString()}</div>
//               <div className="pp-stat-label">Total raised</div>
//             </div>
//           </div>
//         </div>

//         {/* Grid */}
//         <div className={`pp-grid ${visible ? 'in' : ''}`}>

//           {/* Supporters */}
//           <div className="pp-card">
//             <div className="pp-card-title">☕ Supporters</div>
//             {payments.length === 0
//               ? <div className="pp-empty"><span>🫖</span>No supporters yet.<br/>Be the first one!</div>
//               : payments.map((p, i) => (
//                 <div
//                   key={i}
//                   className={`pp-supporter ${visible ? 'in' : ''}`}
//                   style={{ transitionDelay: `${0.6 + i * 0.1}s` }}
//                 >
//                   <div className="pp-s-avatar">{(p.name || '?')[0].toUpperCase()}</div>
//                   <div className="pp-s-body">
//                     <div className="pp-s-name">{p.name || 'Anonymous'}</div>
//                     {p.message && <div className="pp-s-msg">"{p.message}"</div>}
//                   </div>
//                   <div className="pp-s-amount">₹{p.amount}</div>
//                 </div>
//               ))
//             }
//           </div>

//           {/* Payment Form */}
//           <div className="pp-card">
//             <div className="pp-card-title">🫖 Buy a Chai</div>
//             <input onChange={handleChange} name="name" value={paymentform.name} className="pp-input" type="text" placeholder="Your name"/>
//             <input onChange={handleChange} name="message" value={paymentform.message} className="pp-input" type="text" placeholder="Leave a kind message ✨"/>
//             <input onChange={handleChange} name="amount" value={paymentform.amount} className="pp-input" type="number" placeholder="Enter amount (₹)"/>

//             <button
//               className="pp-pay-btn"
//               disabled={paying}
//               onClick={() => pay((paymentform.amount || 10) * 100)}
//             >
//               {paying ? 'Processing…' : 'PAY NOW ✦'}
//             </button>

//             <div className="pp-divider">or pick an amount</div>

//             <div className="pp-quick">
//               {[{label:'☕ ₹10', amt:1000}, {label:'🍵 ₹20', amt:2000}, {label:'🫖 ₹50', amt:5000}].map(b => (
//                 <button key={b.amt} className="pp-qbtn" onClick={() => pay(b.amt)}>{b.label}</button>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default PaymentPage





// "use client"
// import CinematicCursor from "@/components/CinematicCursor"
// import Script from "next/script"
// import { useState, useEffect, useRef } from "react"
// import { initiate, fetchuser, fetchpayments } from "@/actions/useractions"
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Outfit:wght@300;400;500&display=swap');

// /* ── TOKENS ── */
// :root {
//   --ink:     #05030a;
//   --ink2:    #0c0810;
//   --surface: rgba(255,255,255,0.028);
//   --border:  rgba(255,255,255,0.07);
//   --gold:    #c9a84c;
//   --gold2:   #e8c96a;
//   --gold3:   #f5e4a8;
//   --dim:     #4a3d28;
//   --muted:   #2a2018;
//   --text:    #f0e8d8;
// }

// *,*::before,*::after { box-sizing: border-box; margin:0; padding:0; }

// .cine-root {
//   font-family: 'Outfit', sans-serif;
//   background: var(--ink);
//   min-height: 100vh;
//   color: var(--text);
//   overflow-x: hidden;
// }

// /* ── FILM GRAIN overlay ── */
// .grain {
//   position: fixed; inset: 0; z-index: 100;
//   pointer-events: none;
//   background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.045'/%3E%3C/svg%3E");
//   opacity: 0.55;
//   animation: grainShift 0.12s steps(1) infinite;
// }
// @keyframes grainShift {
//   0%   { transform: translate(0,0); }
//   20%  { transform: translate(-2px,1px); }
//   40%  { transform: translate(2px,-1px); }
//   60%  { transform: translate(-1px,2px); }
//   80%  { transform: translate(1px,-2px); }
//   100% { transform: translate(0,0); }
// }

// /* ── CINEMATIC LETTERBOX bars ── */
// .letterbox-top,
// .letterbox-bot {
//   position: fixed; left:0; right:0; z-index: 50;
//   background: #000;
//   height: 0;
//   transition: height 0s;
// }
// .letterbox-top { top: 0; }
// .letterbox-bot { bottom: 0; }
// .letterbox-top.show, .letterbox-bot.show { height: 28px; }


// .hero {
//   position: relative;
//   height: 420px;
//   overflow: hidden;
// }

// .hero-cover {
//   position: absolute; inset: 0;
//   width: 100%; height: 100%;
//   object-fit: cover;
//   transform-origin: center;
//   will-change: transform;
//   transition: transform 0.05s linear;
//   filter: brightness(0.45) saturate(0.7);
// }

// .hero-vignette {
//   position: absolute; inset: 0;
//   background:
//     radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,3,10,0.85) 100%),
//     linear-gradient(to bottom, rgba(5,3,10,0.3) 0%, transparent 30%, transparent 60%, rgba(5,3,10,1) 100%);
// }


// .hero-scanline {
//   position: absolute; left: 0; right: 0; height: 1px;
//   background: linear-gradient(90deg, transparent, var(--gold), transparent);
//   opacity: 0;
//   animation: scanDown 4s ease-in-out infinite;
//   animation-delay: 1s;
// }
// @keyframes scanDown {
//   0%   { top: 0%;  opacity: 0; }
//   5%   { opacity: 0.6; }
//   95%  { opacity: 0.2; }
//   100% { top: 100%; opacity: 0; }
// }

// .hero-bracket {
//   position: absolute;
//   width: 40px; height: 40px;
//   opacity: 0.5;
// }
// .hero-bracket.tl { top: 20px; left: 20px; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
// .hero-bracket.tr { top: 20px; right: 20px; border-top: 1px solid var(--gold); border-right: 1px solid var(--gold); }
// .hero-bracket.bl { bottom: 20px; left: 20px; border-bottom: 1px solid var(--gold); border-left: 1px solid var(--gold); }
// .hero-bracket.br { bottom: 20px; right: 20px; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }


// .frame-counter {
//   position: absolute; bottom: 18px; right: 24px;
//   font-family: 'Outfit', monospace;
//   font-size: 0.62rem; letter-spacing: 0.2em;
//   color: rgba(201,168,76,0.4);
//   animation: frameFlicker 0.1s steps(1) infinite;
// }
// @keyframes frameFlicker {
//   0%,90%  { opacity: 1; }
//   95%     { opacity: 0.3; }
//   100%    { opacity: 1; }
// }

// /* ── AVATAR ── */
// .avatar-wrap {
//   position: absolute;
//   bottom: -56px; left: 50%;
//   transform: translateX(-50%);
//   z-index: 10;
// }

// /* Rotating dashed ring */
// .avatar-outer {
//   width: 120px; height: 120px;
//   border-radius: 50%;
//   position: relative;
// }
// .avatar-ring-svg {
//   position: absolute; inset: -6px;
//   animation: avatarSpin 12s linear infinite;
// }
// @keyframes avatarSpin { to { transform: rotate(360deg); } }

// .avatar-img {
//   width: 114px; height: 114px;
//   border-radius: 50%;
//   object-fit: cover;
//   border: 2px solid rgba(201,168,76,0.3);
//   display: block;
//   position: relative; z-index: 1;
//   transition: filter 0.4s, border-color 0.4s;
//   filter: brightness(0.9) contrast(1.05);
// }
// .avatar-wrap:hover .avatar-img {
//   filter: brightness(1.05) contrast(1.1);
//   border-color: rgba(201,168,76,0.7);
// }

// /* Gold halo bloom */
// .avatar-halo {
//   position: absolute; inset: -20px;
//   border-radius: 50%;
//   background: radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%);
//   animation: haloPulse 3s ease-in-out infinite;
// }
// @keyframes haloPulse {
//   0%,100% { transform: scale(1); opacity: 0.6; }
//   50%     { transform: scale(1.15); opacity: 1; }
// }

// /* ── INFO SECTION ── */
// .info-section {
//   display: flex; flex-direction: column; align-items: center;
//   padding: 80px 16px 48px;
//   gap: 12px;
// }

// .info-reveal {
//   opacity: 0; transform: translateY(24px);
//   transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
//               transform 0.8s cubic-bezier(0.16,1,0.3,1);
// }
// .info-reveal.in { opacity: 1; transform: translateY(0); }

// /* Gold rule lines flanking username */
// .username-row {
//   display: flex; align-items: center; gap: 20px;
// }
// .username-rule {
//   width: 60px; height: 1px;
//   background: linear-gradient(90deg, transparent, var(--gold));
//   opacity: 0;
//   transition: width 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.6s;
// }
// .username-rule.right { background: linear-gradient(270deg, transparent, var(--gold)); }
// .username-rule.in { opacity: 0.6; }

// .username-text {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: clamp(2.2rem, 5vw, 3.8rem);
//   font-weight: 600;
//   letter-spacing: 0.06em;
//   background: linear-gradient(135deg, var(--gold) 0%, var(--gold3) 50%, var(--gold) 100%);
//   background-size: 200%;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   animation: goldShimmer 4s ease-in-out infinite;
// }
// @keyframes goldShimmer {
//   0%,100% { background-position: 0%; }
//   50%     { background-position: 100%; }
// }

// .tagline {
//   font-size: 0.875rem;
//   color: var(--dim);
//   letter-spacing: 0.04em;
//   font-weight: 300;
// }

// .stats-band {
//   display: flex; gap: 0;
//   background: var(--surface);
//   border: 1px solid var(--border);
//   border-radius: 12px;
//   overflow: hidden;
//   margin-top: 8px;
// }
// .stat-item {
//   padding: 14px 28px; text-align: center;
//   border-right: 1px solid var(--border);
//   transition: background 0.3s;
//   cursor: default;
// }
// .stat-item:last-child { border-right: none; }
// .stat-item:hover { background: rgba(201,168,76,0.05); }
// .stat-val {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 1.5rem; font-weight: 700;
//   color: var(--gold2);
// }
// .stat-lbl { font-size: 0.65rem; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }

// /* ── MAIN GRID ── */
// .main-grid {
//   display: flex; gap: 24px;
//   max-width: 1000px; margin: 0 auto 80px;
//   padding: 0 24px;
//   opacity: 0; transform: translateY(36px);
//   transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s,
//               transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s;
// }
// .main-grid.in { opacity: 1; transform: translateY(0); }
// @media(max-width:680px) { .main-grid { flex-direction: column; } }

// /* ── CARD ── */
// .card {
//   flex: 1;
//   background: var(--surface);
//   border: 1px solid var(--border);
//   border-radius: 20px;
//   overflow: hidden;
//   position: relative;
//   transition: border-color 0.5s, box-shadow 0.5s;
// }
// .card:hover {
//   border-color: rgba(201,168,76,0.22);
//   box-shadow:
//     0 0 0 1px rgba(201,168,76,0.06),
//     0 24px 80px rgba(0,0,0,0.6),
//     inset 0 1px 0 rgba(201,168,76,0.06);
// }

// /* Top gold line that draws in on hover */
// .card::before {
//   content: '';
//   position: absolute; top: 0; left: 50%; right: 50%;
//   height: 1px;
//   background: var(--gold);
//   opacity: 0;
//   transition: left 0.6s cubic-bezier(0.16,1,0.3,1),
//               right 0.6s cubic-bezier(0.16,1,0.3,1),
//               opacity 0.3s;
// }
// .card:hover::before { left: 0; right: 0; opacity: 0.7; }

// /* Ambient corner glow */
// .card::after {
//   content: '';
//   position: absolute; top: -40px; right: -40px;
//   width: 120px; height: 120px;
//   border-radius: 50%;
//   background: radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%);
//   opacity: 0; transition: opacity 0.5s;
//   pointer-events: none;
// }
// .card:hover::after { opacity: 1; }

// .card-inner { padding: 32px; }

// .card-head {
//   display: flex; align-items: center; gap: 12px;
//   margin-bottom: 28px;
// }
// .card-title {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 1.3rem; font-weight: 600;
//   letter-spacing: 0.06em; color: var(--gold2);
// }
// .card-title-line {
//   flex: 1; height: 1px;
//   background: linear-gradient(90deg, rgba(201,168,76,0.25), transparent);
// }

// /* ── SUPPORTER ROWS ── */
// .supporter {
//   display: flex; align-items: center; gap: 14px;
//   padding: 14px 0;
//   border-bottom: 1px solid rgba(255,255,255,0.03);
//   opacity: 0; transform: translateX(-20px);
//   transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1),
//               transform 0.6s cubic-bezier(0.16,1,0.3,1),
//               background 0.3s;
//   cursor: default;
//   border-radius: 8px;
//   padding: 12px 10px;
//   margin: 2px -10px;
// }
// .supporter.in   { opacity: 1; transform: translateX(0); }
// .supporter:last-child { border-bottom: none; }
// .supporter:hover { background: rgba(201,168,76,0.04); }

// /* Supporter avatar — gold monogram */
// .s-avatar {
//   width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
//   background: linear-gradient(135deg, #1a1208, #3a2a10);
//   border: 1px solid rgba(201,168,76,0.2);
//   display: flex; align-items: center; justify-content: center;
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 1.1rem; font-weight: 700; color: var(--gold);
//   transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
// }
// .supporter:hover .s-avatar {
//   border-color: rgba(201,168,76,0.5);
//   box-shadow: 0 0 16px rgba(201,168,76,0.2);
//   transform: scale(1.06);
// }

// .s-body { flex: 1; min-width: 0; }
// .s-name { font-size: 0.88rem; font-weight: 500; color: var(--text); }
// .s-msg  { font-size: 0.75rem; color: var(--muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-style: italic; }

// .s-amount {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 1.15rem; font-weight: 700; color: var(--gold);
//   white-space: nowrap;
// }

// .empty-state {
//   text-align: center; padding: 48px 0; color: var(--muted);
//   font-size: 0.875rem; font-style: italic;
// }
// .empty-icon { font-size: 2.5rem; display: block; margin-bottom: 10px; opacity: 0.4; }

// /* ── FORM INPUTS ── */
// .input-group { margin-bottom: 14px; position: relative; }
// .input-label {
//   display: block; font-size: 0.62rem; letter-spacing: 0.18em;
//   text-transform: uppercase; color: var(--dim);
//   margin-bottom: 6px;
// }

// .cine-input {
//   width: 100%; padding: 13px 16px;
//   background: rgba(255,255,255,0.018);
//   border: 1px solid rgba(255,255,255,0.05);
//   border-radius: 10px; outline: none;
//   color: var(--text); font-size: 0.875rem;
//   font-family: 'Outfit', sans-serif;
//   transition: border-color 0.35s, background 0.35s, box-shadow 0.35s;
//   box-sizing: border-box;
// }
// .cine-input::placeholder { color: rgba(74,61,40,0.6); }
// .cine-input:focus {
//   border-color: rgba(201,168,76,0.45);
//   background: rgba(201,168,76,0.03);
//   box-shadow: 0 0 0 3px rgba(201,168,76,0.08),
//               0 0 24px rgba(201,168,76,0.06);
// }

// /* Underline sweep on focus */
// .input-line {
//   position: absolute; bottom: 0; left: 50%; right: 50%;
//   height: 1px; background: var(--gold);
//   transition: left 0.4s cubic-bezier(0.16,1,0.3,1),
//               right 0.4s cubic-bezier(0.16,1,0.3,1);
//   border-radius: 0 0 10px 10px;
//   pointer-events: none;
// }
// .cine-input:focus ~ .input-line { left: 0; right: 0; }

// /* ── PAY BUTTON ── */
// .pay-btn {
//   width: 100%; padding: 16px;
//   background: linear-gradient(135deg, #2a1a04, #8a6520, #c9a84c, #e8c96a, #c9a84c, #8a6520, #2a1a04);
//   background-size: 300%;
//   border: none; border-radius: 12px;
//   color: #0c0810; font-family: 'Cormorant Garamond', serif;
//   font-size: 1.05rem; font-weight: 700; letter-spacing: 0.2em;
//   text-transform: uppercase;
//   cursor: none;
//   position: relative; overflow: hidden;
//   transition: background-position 0.6s, transform 0.3s, box-shadow 0.4s;
//   background-position: 100%;
//   box-shadow: 0 4px 24px rgba(201,168,76,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
//   margin-bottom: 14px;
// }
// .pay-btn:hover {
//   background-position: 0%;
//   transform: translateY(-2px);
//   box-shadow: 0 12px 40px rgba(201,168,76,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
// }
// .pay-btn:active { transform: translateY(0); }
// .pay-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

// /* Liquid shine sweep */
// .pay-btn-shine {
//   position: absolute; inset: 0;
//   background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
//   transform: translateX(-100%);
//   transition: transform 0s;
// }
// .pay-btn:hover .pay-btn-shine {
//   transform: translateX(100%);
//   transition: transform 0.5s ease;
// }

// /* ── OR DIVIDER ── */
// .or-divider {
//   display: flex; align-items: center; gap: 12px;
//   margin: 12px 0 10px; color: var(--muted);
//   font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
// }
// .or-divider::before, .or-divider::after {
//   content: ''; flex: 1; height: 1px;
//   background: rgba(255,255,255,0.04);
// }

// /* ── QUICK AMOUNT BUTTONS ── */
// .quick-row { display: flex; gap: 8px; }
// .q-btn {
//   flex: 1; padding: 12px 6px;
//   background: rgba(255,255,255,0.02);
//   border: 1px solid rgba(255,255,255,0.05);
//   border-radius: 10px;
//   color: var(--gold); font-family: 'Cormorant Garamond', serif;
//   font-size: 1rem; font-weight: 600; letter-spacing: 0.05em;
//   cursor: none;
//   transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
//   position: relative; overflow: hidden;
// }
// .q-btn::before {
//   content: '';
//   position: absolute; inset: 0;
//   background: linear-gradient(135deg, rgba(201,168,76,0.08), transparent);
//   opacity: 0; transition: opacity 0.3s;
// }
// .q-btn:hover {
//   border-color: rgba(201,168,76,0.35);
//   transform: translateY(-4px);
//   box-shadow: 0 8px 24px rgba(201,168,76,0.15);
//   color: var(--gold3);
// }
// .q-btn:hover::before { opacity: 1; }
// .q-btn:active { transform: translateY(-1px); }

// /* ── ENTRANCE ANIMATIONS ── */
// /* Curtain wipe — used on hero */
// @keyframes curtainReveal {
//   0%   { clip-path: inset(0 100% 0 0); }
//   100% { clip-path: inset(0 0% 0 0); }
// }
// .curtain-in {
//   animation: curtainReveal 1.2s cubic-bezier(0.77,0,0.175,1) forwards;
// }

// /* Fade up */
// @keyframes fadeUp {
//   from { opacity:0; transform: translateY(20px); }
//   to   { opacity:1; transform: translateY(0); }
// }
// .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
// `;

// export default function PaymentPage({ username }) {
//   username = username?.replace("%20", " ");

//   const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
//   const [currentuser, setcurrentuser] = useState({});
//   const [payments, setpayments] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [paying, setPaying] = useState(false);

//   // Parallax cover
//   const coverRef = useRef(null);

//   // Frame counter decoration
//   const [frame, setFrame] = useState("0001");
//   const frameRef = useRef(null);

//   useEffect(() => {
//     // data
//     (async () => {
//       const u = await fetchuser(username);
//       const p = await fetchpayments(username);
//       setcurrentuser(u);
//       setpayments(p);
//     })();

//     // reveal
//     setTimeout(() => setVisible(true), 200);

//     // parallax cover
//     const onScroll = () => {
//       if (coverRef.current) {
//         coverRef.current.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.15)`;
//       }
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });

//     // frame counter
//     let f = 1;
//     const fInt = setInterval(() => {
//       f = (f + 1) % 10000;
//       setFrame(String(f).padStart(4, "0"));
//     }, 42);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       clearInterval(fInt);
//     };
//   }, []);

//   const handleChange = (e) => setPaymentform({ ...paymentform, [e.target.name]: e.target.value });

//   const pay = async (amount) => {
//     if (paying) return;
//     setPaying(true);
//     try {
//       const a = await initiate(amount, username, paymentform);
//       const options = {
//         key: currentuser.razorpayid,
//         amount,
//         currency: "INR",
//         name: "GetMeAChai",
//         description: `Support for ${username}`,
//         order_id: a.id,
//         callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
//         prefill: { name: paymentform.name },
//         theme: { color: "#c9a84c" },
//       };
//       const rzp = new Razorpay(options);
//       rzp.open();
//     } finally {
//       setPaying(false);
//     }
//   };

//   const total = payments.reduce((t, p) => t + Number.parseInt(p.amount || 0), 0);

//   return (
//     <>
//       <style>{CSS}</style>
//       <ToastContainer position="top-right" theme="dark" autoClose={3000} />
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />

//       <CinematicCursor />

//       {/* Film grain */}
//       <div className="grain" aria-hidden="true" />

//       {/* Letterbox bars */}
//       <div className={`letterbox-top ${visible ? "show" : ""}`} />
//       <div className={`letterbox-bot ${visible ? "show" : ""}`} />

//       <div className="cine-root">

//         {/* ─── HERO ─── */}
//         <section className="hero">
//           <img
//             ref={coverRef}
//             src={currentuser?.coverpic || "/background.jpg"}
//             className="hero-cover"
//             alt="cover"
//             style={{ transform: "translateY(0) scale(1.15)" }}
//           />
//           <div className="hero-vignette" />
//           <div className="hero-scanline" />

//           {/* Cinematic corner brackets */}
//           <div className="hero-bracket tl" />
//           <div className="hero-bracket tr" />
//           <div className="hero-bracket bl" />
//           <div className="hero-bracket br" />

//           <div className="frame-counter">⬛ {frame} / 24fps</div>

//           {/* Avatar */}
//           <div className="avatar-wrap">
//             <div className="avatar-halo" />
//             <div className="avatar-outer">
//               {/* SVG dashed spin ring */}
//               <svg className="avatar-ring-svg" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:132,height:132,position:'absolute',top:-9,left:-9}}>
//                 <circle cx="66" cy="66" r="60"
//                   stroke="url(#ringGrad)"
//                   strokeWidth="1"
//                   strokeDasharray="6 5"
//                   strokeLinecap="round"
//                 />
//                 <circle cx="66" cy="66" r="60"
//                   stroke="rgba(201,168,76,0.15)"
//                   strokeWidth="8"
//                   fill="none"
//                 />
//                 {/* 4 gold diamonds at cardinal points */}
//                 {[0,90,180,270].map((deg, i) => {
//                   const r = 60;
//                   const rad = (deg - 90) * Math.PI / 180;
//                   const cx = 66 + r * Math.cos(rad);
//                   const cy = 66 + r * Math.sin(rad);
//                   return <polygon key={i} points={`${cx},${cy-4} ${cx+4},${cy} ${cx},${cy+4} ${cx-4},${cy}`} fill="#c9a84c" opacity="0.7"/>;
//                 })}
//                 <defs>
//                   <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
//                     <stop offset="0%"   stopColor="#f5e4a8"/>
//                     <stop offset="50%"  stopColor="#c9a84c"/>
//                     <stop offset="100%" stopColor="#8a6520"/>
//                   </linearGradient>
//                 </defs>
//               </svg>
//               <img
//                 src={currentuser?.profilepic || "/profile-pic.webp"}
//                 className="avatar-img"
//                 alt="profile"
//               />
//             </div>
//           </div>
//         </section>

//         {/* ─── INFO ─── */}
//         <section className="info-section">

//           <div className={`info-reveal ${visible ? "in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//             <div className="username-row">
//               <div className={`username-rule ${visible ? "in" : ""}`} style={{ transitionDelay: "0.6s" }} />
//               <span className="username-text">{username}</span>
//               <div className={`username-rule right ${visible ? "in" : ""}`} style={{ transitionDelay: "0.6s" }} />
//             </div>
//           </div>

//           <div className={`info-reveal ${visible ? "in" : ""}`} style={{ transitionDelay: "0.25s" }}>
//             <p className="tagline">Let's help {username} get a chai ☕</p>
//           </div>

//           <div className={`info-reveal ${visible ? "in" : ""}`} style={{ transitionDelay: "0.4s" }}>
//             <div className="stats-band">
//               <div className="stat-item">
//                 <div className="stat-val">{payments.length}</div>
//                 <div className="stat-lbl">Patrons</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-val">₹{total.toLocaleString()}</div>
//                 <div className="stat-lbl">Raised</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-val">{payments.length > 0 ? "₹" + Math.round(total / payments.length) : "—"}</div>
//                 <div className="stat-lbl">Avg. support</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ─── MAIN GRID ─── */}
//         <div className={`main-grid ${visible ? "in" : ""}`}>

//           {/* Supporters card */}
//           <div className="card">
//             <div className="card-inner">
//               <div className="card-head">
//                 <h2 className="card-title">Patrons</h2>
//                 <div className="card-title-line" />
//               </div>

//               {payments.length === 0 ? (
//                 <div className="empty-state">
//                   <span className="empty-icon">☕</span>
//                   No supporters yet.<br/>Be the first to buy a chai.
//                 </div>
//               ) : (
//                 payments.map((p, i) => (
//                   <div
//                     key={i}
//                     className={`supporter ${visible ? "in" : ""}`}
//                     style={{ transitionDelay: `${0.65 + i * 0.1}s` }}
//                   >
//                     <div className="s-avatar">{(p.name || "?")[0].toUpperCase()}</div>
//                     <div className="s-body">
//                       <div className="s-name">{p.name || "Anonymous"}</div>
//                       {p.message && <div className="s-msg">"{p.message}"</div>}
//                     </div>
//                     <div className="s-amount">₹{p.amount}</div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Payment form card */}
//           <div className="card">
//             <div className="card-inner">
//               <div className="card-head">
//                 <h2 className="card-title">Buy a Chai</h2>
//                 <div className="card-title-line" />
//               </div>

//               <div className="input-group">
//                 <label className="input-label">Your Name</label>
//                 <input
//                   className="cine-input"
//                   name="name"
//                   value={paymentform.name}
//                   onChange={handleChange}
//                   placeholder="How should we address you?"
//                   type="text"
//                 />
//                 <div className="input-line" />
//               </div>

//               <div className="input-group">
//                 <label className="input-label">Message</label>
//                 <input
//                   className="cine-input"
//                   name="message"
//                   value={paymentform.message}
//                   onChange={handleChange}
//                   placeholder="Leave a note for the creator…"
//                   type="text"
//                 />
//                 <div className="input-line" />
//               </div>

//               <div className="input-group">
//                 <label className="input-label">Amount (₹)</label>
//                 <input
//                   className="cine-input"
//                   name="amount"
//                   value={paymentform.amount}
//                   onChange={handleChange}
//                   placeholder="Enter any amount"
//                   type="number"
//                 />
//                 <div className="input-line" />
//               </div>

//               <button
//                 className="pay-btn"
//                 onClick={() => pay((paymentform.amount || 10) * 100)}
//                 disabled={paying}
//               >
//                 <div className="pay-btn-shine" />
//                 {paying ? "Processing…" : "Proceed to Pay"}
//               </button>

//               <div className="or-divider">or select below</div>

//               <div className="quick-row">
//                 {[
//                   { label: "☕  ₹10", amt: 1000 },
//                   { label: "🍵  ₹25", amt: 2500 },
//                   { label: "🫖  ₹50", amt: 5000 },
//                 ].map((b) => (
//                   <button key={b.amt} className="q-btn" onClick={() => pay(b.amt)}>
//                     {b.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }
