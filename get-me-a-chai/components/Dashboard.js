"use client"
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { updateProfile, fetchuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { User, Mail, Image, Sunrise, Key, Lock, Coffee, Sparkles } from 'lucide-react'

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setform] = useState({})
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeField, setActiveField] = useState(null)


  const emberCanvasRef = useRef(null)

  useEffect(() => {
    const canvas = emberCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const EMBER_COUNT = 55
    const randomEmber = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 2.2 + 0.4,
      speedY: -(Math.random() * 0.6 + 0.25),
      speedX: (Math.random() - 0.5) * 0.35,
      life: Math.random(), decay: Math.random() * 0.003 + 0.0012,
      hue: Math.random() * 30 + 20,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.018 + 0.006,
    })

    const embers = Array.from({ length: EMBER_COUNT }, randomEmber)
    let raf

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const e of embers) {
        e.wobble += e.wobbleSpeed
        e.x += e.speedX + Math.sin(e.wobble) * 0.3
        e.y += e.speedY
        e.life -= e.decay
        if (e.life <= 0 || e.y < -10) { Object.assign(e, randomEmber()); continue }
        const alpha = Math.min(e.life * 1.5, 1) * 0.75
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4)
        g.addColorStop(0, `hsla(${e.hue},95%,65%,${alpha})`)
        g.addColorStop(0.4, `hsla(${e.hue},80%,45%,${alpha * 0.6})`)
        g.addColorStop(1, `hsla(${e.hue},60%,20%,0)`)
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(e.x, e.y, e.size * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${e.hue + 20},100%,85%,${alpha * 0.9})`; ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [mounted])

  useEffect(() => {
    setMounted(true)
    if (!session) router.push('/login')
    else getData()
  }, [])

  const handleChange = (e) => setform({ ...form, [e.target.name]: e.target.value })

  const getData = async () => {
    const username = session?.user?.username
    if (!username) return
    let data = await fetchuser(username)
    setform(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await updateProfile(form, session.user.username)
    await update({ ...session.user, ...form })
    setSaving(false)
    toast('Profile updated!', { position: "bottom-right", theme: "dark", autoClose: 3000 })
  }

  const fields = [
    { name: 'name', label: 'Display Name', type: 'text', placeholder: 'Your public name', icon: 'user' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', icon: 'mail' },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'handle', icon: '@' },
    { name: 'profilepic', label: 'Profile Picture URL', type: 'text', placeholder: 'https://...', icon: 'image' },
    { name: 'coverpic', label: 'Cover Picture URL', type: 'text', placeholder: 'https://...', icon: 'sunrise' },
    { name: 'razorpayid', label: 'Razorpay Key ID', type: 'text', placeholder: 'rzp_live_...', icon: 'key' },
    { name: 'razorpaysecret', label: 'Razorpay Secret', type: 'password', placeholder: '••••••••••••', icon: 'lock' },
  ]

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  .bg-root {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
  }

  .bg-haze {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 10%, rgba(120,53,15,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 90%, rgba(180,83,9,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(217,119,6,0.06) 0%, transparent 70%);
    animation: hazeShift 20s ease-in-out infinite alternate;
  }
  @keyframes hazeShift {
    0% { opacity: 1; transform: scale(1) translate(0, 0); }
    50% { opacity: 0.7; transform: scale(1.05) translate(-10px, 5px); }
    100% { opacity: 1; transform: scale(1.02) translate(8px, -8px); }
  }

.bg-noise {
  position: absolute; inset: -50%; width: 200%; height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.04;
  animation: grainDrift 0.12s steps(1) infinite;
}
@keyframes grainDrift {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 1px); }
  50% { transform: translate(2px, -1px); }
  75% { transform: translate(-1px, 2px); }
}

.bg-scanline {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px);
}

.bg-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.7) 100%);
}
.dash-root {
  font-family: 'DM Sans', sans-serif;
        min-height: 100vh;
        background: #070401;
        color: #f5ede0;
        padding: 0 0 80px;
        }

        /* ── TOP HEADER BAR ── */
        .dash-header {
          position: 'relative'
          zIndex: 1
          height: 64px;
        border-bottom: 1px solid rgba(255,255,255,0.04);
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 40px;
        position: sticky; top: 0; z-index: 20;
        background: rgba(7,4,1,0.85);
        backdrop-filter: blur(12px);
        }
        .dash-brand {display: flex; align-items: center; gap: 10px; }
        .dash-brand-name {font - family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #f5ede0; }
        .dash-user-chip {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 6px 14px; border-radius: 999px;
          font-size: 0.8rem; color: #9c8060;
        }
        .dash-user-dot {width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 6px #22c55e; }

        /* ── HERO AREA ── */
        .dash-hero {
          position: 'relative' 
          zIndex: 1
          padding: 60px 40px 0;
          max-width: 860px; margin: 0 auto;
          opacity: 0; transform: translateY(20px);
          transition: all 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .dash-hero.in {opacity: 1; transform: translateY(0); }

        .dash-welcome-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #d97706; margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .dash-welcome-label::before {content: ''; width: 24px; height: 1px; background: #d97706; }

        .dash-welcome-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900; margin-bottom: 8px; line-height: 1.1;
        }
        .dash-welcome-sub {color: #5a4a2e; font-size: 0.875rem; margin-bottom: 48px; }

        /* Preview link */
        .preview-link {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(217,119,6,0.08);
          border: 1px solid rgba(217,119,6,0.2);
          color: #f59e0b; font-size: 0.8rem;
          padding: 8px 16px; border-radius: 8px; text-decoration: none;
          transition: all 0.3s; margin-bottom: 48px;
        }
        .preview-link:hover {background: rgba(217,119,6,0.15); transform: translateX(3px); }

        /* ── FORM CARD ── */
        .form-card {
          position: 'relative'
          zIndex: 1
          background: rgba(255,255,255,0.018);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          max-width: 860px; margin: 0 auto;
          opacity: 0; transform: translateY(24px);
          transition: all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s;
        }
        .form-card.in {opacity: 1; transform: translateY(0); }

        .form-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #d97706 30%, #f59e0b 70%, transparent);
        }

        .form-card-inner {padding: 40px; }

        /* Section headers inside form */
        .form-section-head {
          font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: #6b5a3e; margin: 32px 0 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .form-section-head::after {content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.04); }
        .form-section-head:first-of-type {margin-top: 0; }

        /* 2-col grid */
        .fields-grid {display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width:600px) { .fields-grid {grid-template-columns: 1fr; } .form-card-inner {padding: 24px; } .dash-hero {padding: 40px 20px 0; } .dash-header {padding: 0 20px; } }

        .field-wrap {display: flex; flex-direction: column; gap: 7px; }
        .field-label-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;
          color: #5a4a2e;
        }
        .field-icon {font-size: 0.85rem; }

        .dash-input {
          padding: 12px 16px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px; outline: none;
          color: #f5ede0; font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s;
          width: 100%; box-sizing: border-box;
        }
        .dash-input::placeholder {color: #2e2010; }
        .dash-input:focus {
          border-color: rgba(217,119,6,0.5);
          background: rgba(217,119,6,0.04);
          box-shadow: 0 0 0 3px rgba(217,119,6,0.1);
        }
        .dash-input:hover:not(:focus) {border-color: rgba(255,255,255,0.1); }

        /* Full-width field */
        .field-full {grid-column: 1 / -1; }

        /* Save button */
        .save-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #92400e, #d97706, #f59e0b);
          background-size: 200%;
          border: none; border-radius: 12px;
          color: #fff8f0; font-size: 0.9rem; font-weight: 600;
          letter-spacing: 0.06em; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s;
          box-shadow: 0 4px 20px rgba(217,119,6,0.25);
          margin-top: 32px; position: relative; overflow: hidden;
        }
        .save-btn:hover {
          background-position: right;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(217,119,6,0.4);
        }
        .save-btn:disabled {opacity: 0.6; cursor: not-allowed; transform: none; }
        .save-btn::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%); transition: transform 0.5s;
        }
        .save-btn:hover::after {transform: translateX(100%); }

        .spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {to {transform: rotate(360deg); } }

        /* Preview cards at top */
        .preview-strip {
          display: flex; gap: 16px; margin-bottom: 40px; flex-wrap: wrap;
        }
        .preview-card {
          flex: 1; min-width: 160px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px; padding: 20px;
          transition: all 0.3s;
        }
        .preview-card:hover {border-color: rgba(217,119,6,0.2); background: rgba(217,119,6,0.04); }
        .preview-card-label {font-size: 0.7rem; color: #5a4a2e; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
        .preview-card-val {font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: #f59e0b; }
        .preview-card-sub {font-size: 0.75rem; color: #3d2f1a; margin-top: 3px; }
      `}</style>

      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />

      <div className="dash-root">
        {/* Animated Background */}
        <div className="bg-root">
          <div className="bg-haze" />
          <canvas ref={emberCanvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          <div className="bg-noise" />
          <div className="bg-scanline" />
          <div className="bg-vignette" />
        </div>
        {/* Header */}
        <div className="dash-header">
          <div className="dash-brand">
            <span><Coffee size={20} /></span>
            <span className="dash-brand-name">GetMeAChai</span>
          </div>
          {session?.user && (
            <div className="dash-user-chip">
              <div className="dash-user-dot" />
              {session.user.name || session.user.email}
            </div>
          )}
        </div>

        {/* Hero */}
        <div className={`dash-hero ${mounted ? 'in' : ''}`}>
          <div className="dash-welcome-label">Creator Dashboard</div>
          <h1 className="dash-welcome-title">Your profile, your rules. <Coffee className="inline-block w-5 h-5 ml-1" /></h1>
          <p className="dash-welcome-sub">Manage how your supporters find and support you.</p>

          {form.username && (
            <a href={`/${form.username}`} className="preview-link">
              ↗ Preview your page — getmeachai.com/{form.username}
            </a>
          )}

          {/* Quick stats */}
          <div className="preview-strip">
            {[
              { label: 'Your page', val: form.username ? `@${form.username}` : '—', sub: 'Public URL' },
              { label: 'Payment', val: form.razorpayid ? '✓ Connected' : '✗ Not set', sub: 'Razorpay status' },
              { label: 'Profile pic', val: form.profilepic ? '✓ Set' : '✗ Missing', sub: 'Shown to supporters' },
            ].map((c, i) => (
              <div className="preview-card" key={i}>
                <div className="preview-card-label">{c.label}</div>
                <div className="preview-card-val" style={{ fontSize: '1rem' }}>{c.val}</div>
                <div className="preview-card-sub">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className={`form-card ${mounted ? 'in' : ''}`} style={{ margin: '0 100' }}>
          <div className="form-card-inner">
            <form onSubmit={handleSubmit}>

              <div className="form-section-head">Basic info</div>
              <div className="fields-grid">
                {fields.slice(0, 3).map(f => (
                  <div className="field-wrap" key={f.name}>
                    <div className="field-label-row">
                      <span className="field-icon">
                        {f.icon === 'user' && <User size={16} />}
                        {f.icon === 'mail' && <Mail size={16} />}
                        {f.icon === '@' && <span>@</span>}
                      </span>
                      {f.label}
                    </div>
                    <input
                      className="dash-input"
                      type={f.type}
                      name={f.name}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      onFocus={() => setActiveField(f.name)}
                      onBlur={() => setActiveField(null)}
                    />
                  </div>
                ))}
              </div>

              <div className="form-section-head">Appearance</div>
              <div className="fields-grid">
                {fields.slice(3, 5).map(f => (
                  <div className="field-wrap" key={f.name}>
                    <div className="field-label-row">
                      <span className="field-icon">
                        {f.icon === 'image' && <Image size={16} />}
                        {f.icon === 'sunrise' && <Sunrise size={16} />}
                      </span>
                      {f.label}
                    </div>
                    <input
                      className="dash-input"
                      type={f.type}
                      name={f.name}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="form-section-head">Payment credentials</div>
              <div className="fields-grid">
                {fields.slice(5).map(f => (
                  <div className="field-wrap" key={f.name}>
                    <div className="field-label-row">
                      <span className="field-icon">
                        {f.icon === 'key' && <Key size={16} />}
                        {f.icon === 'lock' && <Lock size={16} />}
                      </span>
                      {f.label}
                    </div>
                    <input
                      className="dash-input"
                      type={f.type}
                      name={f.name}
                      value={form[f.name] || ''}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
              </div>

              <button className="save-btn" type="submit" disabled={saving}>
                {saving ? <><div className="spinner" /> Saving…</> : <><Sparkles size={16} className="inline mr-1" /> Save changes</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard












// "use client"
// import React, { useEffect, useState } from 'react'
// import { useSession, signIn, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation'
// import { updateProfile, fetchuser } from '@/actions/useractions'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Dashboard = () => {

//   const { data: session, update } = useSession()
//   const router = useRouter()
//   const [form, setform] = useState({})

//   useEffect(() => {
//     console.log(session)
//     // if (!session?.user?.username) return
//     if (!session) {
//       router.push('/login')
//     }
//     else { getData() }
//   }, [])

//   const handleChange = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value })
//   }

//   const getData = async () => {
//     // it is for fetching user data and setting it to form state if it is not already set, this is because when we update the profile we want to keep the old data in form state and only update the changed fields
//     const username = session.user.username
//     if (!username) return
//     let data = await fetchuser(username)
//     setform(data)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await updateProfile(form, session.user.username)
//     await update({ ...session.user, ...form })
//     toast('Your profile has been updated!', {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   }



//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <div>
//         <div className="min-h-screen flex items-center justify-center p-6">
//           <div className="w-full max-w-xl rounded-2xl p-8">
//             <h1 className="text-white text-2xl font-bold text-center mb-8">
//               Welcome to your Dashboard
//             </h1>
//             {/*  here we used action instead of onSubmit because we want to call the function directly without submitting the form and refreshing the page
//      also we want to use the form data in the in server action function which is not possible with onSubmit because it will refresh the page and we will lose the form data */}

//             <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>

//               <div className='my-2'>
//                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                 <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>
//               {/* input for email */}
//               <div className="my-2">
//                 <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                 <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>
//               {/* input forusername */}
//               <div className='my-2'>
//                 <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
//                 <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>
//               {/* input for profile picture of input type text */}
//               <div className="my-2">
//                 <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
//                 <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>

//               {/* input for cover pic  */}
//               <div className="my-2">
//                 <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
//                 <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>
//               {/* input razorpay id */}
//               <div className="my-2">
//                 <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
//                 <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>
//               {/* input razorpay secret */}
//               <div className="my-2">
//                 <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
//                 <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//               </div>

//               {/* Submit Button  */}
//               <div className="my-6">
//                 <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm">Save</button>
//               </div>
//             </form>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default Dashboard
