// "use client"
// import React, { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useSession, signIn, signOut } from "next-auth/react"

// const AnimatedLogo = () => (
//   <svg viewBox="0 0 64 64" className="w-8 h-8">
//     <defs>
//       <linearGradient id="navTeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stopColor="#f59e0b" />
//         <stop offset="100%" stopColor="#ea580c" />
//       </linearGradient>
//     </defs>
//     <path d="M44 20 L44 44 C44 48 40 52 36 52 L28 52 C24 52 20 48 20 44 L20 20" fill="none" stroke="url(#navTeaGrad)" strokeWidth="2" strokeLinecap="round" className="stroke-draw"/>
//     <path d="M36 24 L28 24 L28 40 L36 40" fill="#f59e0b" opacity="0.8"/>
//     <path d="M46 28 Q52 24 52 28 Q52 32 46 28" fill="none" stroke="url(#navTeaGrad)" strokeWidth="2" strokeLinecap="round" className="stroke-draw-delay"/>
//     <path d="M28 16 Q32 10 36 16" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" className="steam-wiggle"/>
//   </svg>
// )

// const Navbar = () => {
//   const { data: session } = useSession()
//   const [showDropdown, setShowDropdown] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const closeDropdown = () => setShowDropdown(false)

//   return (
//     <>
//       <style jsx global>{`
//         @keyframes stroke-draw {
//           0% { stroke-dasharray: 60; stroke-dashoffset: 60; }
//           100% { stroke-dasharray: 60; stroke-dashoffset: 0; }
//         }
//         @keyframes stroke-draw-delay {
//           0% { stroke-dasharray: 20; stroke-dashoffset: 20; }
//           100% { stroke-dasharray: 20; stroke-dashoffset: 0; }
//         }
//         @keyframes steam-wiggle {
//           0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.5; }
//           50% { transform: translateY(-3px) scaleX(1.2); opacity: 0.3; }
//         }
//         .stroke-draw { animation: stroke-draw 1s ease-out forwards; }
//         .stroke-draw-delay { animation: stroke-draw-delay 1s ease-out 0.5s forwards; }
//         .steam-wiggle { animation: steam-wiggle 3s ease-in-out infinite; }
//       `}</style>
      
//       <nav 
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
//           ? 'bg-[#07070d]/80 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_4px_30px_rgba(245,158,11,0.1)]'
//           : 'bg-[#07070d]/50 backdrop-blur-lg border-b border-white/5'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2 group cursor-pointer relative">
//               <div className="relative">
//                 <AnimatedLogo />
//                 <div className="absolute inset-0 bg-amber-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
//               </div>
//               <span 
//                 className="font-extrabold text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-500 group-hover:from-amber-100 group-hover:via-white group-hover:to-amber-300 transition-all duration-300"
//                 style={{
//                   opacity: mounted ? 1 : 0,
//                   transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
//                   transition: 'all 0.5s ease 0.1s'
//                 }}
//               >
//                 GetMeaChai!
//               </span>
//               <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 rounded-full" />
//             </Link>

//             {/* Auth Section */}
//             <div className="flex items-center gap-3 md:gap-4">
//               {!session ? (
//                 <button
//                   onClick={() => signIn()}
//                   className="relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden group"
//                   style={{
//                     opacity: mounted ? 1 : 0,
//                     transform: mounted ? 'scale(1)' : 'scale(0.9)',
//                     transition: 'all 0.5s ease 0.2s'
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-300 group-hover:from-amber-500 group-hover:to-yellow-500" />
//                   <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300" />
//                   <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
//                   <span className='relative z-10 flex items-center gap-2 text-white'>
//                     Login
//                     <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </span>
//                 </button>
//               ) : (
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 px-3 md:px-4 py-2 rounded-xl transition-all duration-300 group"
//                     style={{
//                       opacity: mounted ? 1 : 0,
//                       transform: mounted ? 'scale(1)' : 'scale(0.9)',
//                       transition: 'all 0.5s ease 0.2s'
//                     }}
//                   >
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-amber-500/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       <img
//                         src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=d4a017&color=fff`}
//                         className='w-7 h-7 rounded-full border border-amber-500/50 group-hover:border-amber-400 transition-all duration-300 relative z-10'
//                         alt="user"
//                       />
//                     </div>
//                     <span className='text-sm font-medium hidden md:inline text-zinc-200 group-hover:text-white transition-colors'>Account</span>
//                     <svg
//                       className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition-all duration-300 ${showDropdown ? 'rotate-180' : ''}`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {/* Dropdown */}
//                   {showDropdown && (
//                     <div
//                       className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl bg-[#0f0f12]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.1)] overflow-hidden"
//                       style={{
//                         animation: 'dropdown-in 0.3s ease-out'
//                       }}
//                       onClick={closeDropdown}
//                     >
//                       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
//                       <div className="p-2 space-y-1">
//                         <Link
//                           href="/dashboard"
//                           className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent hover:text-amber-200 group/item cursor-pointer"
//                         >
//                           <span className='text-lg group-hover/item:scale-110 transition-transform duration-300'>📊</span>
//                           <span className="text-zinc-300 group-hover/item:text-amber-200">Dashboard</span>
//                         </Link>
//                         <Link
//                           href={`/${session.user.username || session.user.name}`}
//                           className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent hover:text-amber-200 group/item cursor-pointer"
//                         >
//                           <span className='text-lg group-hover/item:scale-110 transition-transform duration-300'>👤</span>
//                           <span className="text-zinc-300 group-hover/item:text-amber-200">Your Page</span>
//                         </Link>
//                         <Link
//                           href="/Profile"
//                           className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-transparent hover:text-amber-200 group/item cursor-pointer"
//                         >
//                           <span className='text-lg group-hover/item:scale-110 transition-transform duration-300'>⚙️</span>
//                           <span className="text-zinc-300 group-hover/item:text-amber-200">Profile</span>
//                         </Link>
//                         <div className='h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2 mx-2' />
//                         <button
//                           onClick={() => {
//                             signOut()
//                             closeDropdown()
//                           }}
//                           className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-transparent hover:text-red-300 group/item cursor-pointer"
//                         >
//                           <span className='text-lg group-hover/item:scale-110 transition-transform duration-300'>🚪</span>
//                           <span className="text-zinc-300 group-hover/item:text-red-300">Logout</span>
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {showDropdown && (
//                     <div className="fixed inset-0 z-40" onClick={closeDropdown} />
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       <style jsx>{`
//         @keyframes dropdown-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//       `}</style>
//     </>
//   )
// }

// export default Navbar


"use client"
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { LayoutDashboard, User, Settings, LogOut } from 'lucide-react'

const AnimatedLogo = () => (
  <svg viewBox="0 0 64 64" className="w-8 h-8">
    <defs>
      <linearGradient id="navTeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6f4e37" />
        <stop offset="100%" stopColor="#4a3728" />
      </linearGradient>
    </defs>
    <path d="M44 18 L44 42 C44 47 40 51 36 51 L24 51 C20 51 16 47 16 42 L16 18" fill="none" stroke="url(#navTeaGrad)" strokeWidth="2.5" strokeLinecap="round" className="stroke-draw"/>
    <path d="M34 24 L26 24 L26 38 L34 38" fill="#6f4e37" opacity="0.85"/>
    <path d="M46 26 Q54 22 54 26 Q54 30 46 26" fill="none" stroke="url(#navTeaGrad)" strokeWidth="2.5" strokeLinecap="round" className="stroke-draw-delay"/>
    <path d="M24 14 Q28 8 32 14 Q36 8 40 14" fill="none" stroke="#8b7355" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" className="steam-wiggle"/>
    <ellipse cx="30" cy="26" rx="3" ry="1.5" fill="#8b7355" opacity="0.5"/>
  </svg>
)

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeDropdown = () => setShowDropdown(false)

  return (
    <>
      <style jsx global>{`
        @keyframes stroke-draw {
          0%   { stroke-dasharray: 60; stroke-dashoffset: 60; }
          100% { stroke-dasharray: 60; stroke-dashoffset: 0; }
        }
        @keyframes stroke-draw-delay {
          0%   { stroke-dasharray: 20; stroke-dashoffset: 20; }
          100% { stroke-dasharray: 20; stroke-dashoffset: 0; }
        }
        @keyframes steam-wiggle {
          0%,100% { transform: translateY(0) scaleX(1); opacity: 0.5; }
          50%     { transform: translateY(-3px) scaleX(1.2); opacity: 0.3; }
        }
        @keyframes dropdown-in {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }

        .stroke-draw       { animation: stroke-draw 1s ease-out forwards; }
        .stroke-draw-delay { animation: stroke-draw-delay 1s ease-out 0.5s forwards; }
        .steam-wiggle      { animation: steam-wiggle 3s ease-in-out infinite; }

        /* ── CRITICAL FIX ──────────────────────────────────────────
           The navbar is position:fixed but the PaymentPage hero
           creates a stacking context that was trapping the dropdown.

           Setting isolation:isolate on the nav itself + a very high
           z-index on the dropdown ensures it always paints on top
           of every page element regardless of their stacking context.
        ──────────────────────────────────────────────────────────── */
        .navbar-root {
          isolation: isolate;   /* own stacking context, unaffected by page */
        }

        .navbar-dropdown {
          /* High enough to beat any page stacking context            */
          z-index: 9999 !important;
          position: absolute;
          right: 0;
          /* mt-3 = 12px below the button */
          top: calc(100% + 12px);
          width: 224px;
          border-radius: 16px;
          background: rgba(10, 10, 14, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow:
            0 24px 60px rgba(0,0,0,0.65),
            0  0   28px rgba(245,158,11,0.08),
            inset 0 1px 0 rgba(255,255,255,0.05);
          overflow: hidden;
          animation: dropdown-in 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        /* top shimmer line */
        .navbar-dropdown::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,158,11,0.55), transparent);
        }

        .navbar-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          font-size: 0.875rem;
          border-radius: 10px;
          margin: 2px 6px;
          color: #d1cdc5;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, padding-left 0.2s;
          cursor: pointer;
          background: transparent;
          border: none;
          width: calc(100% - 12px);
          text-align: left;
        }
        .navbar-dropdown-item:hover {
          background: linear-gradient(90deg, rgba(245,158,11,0.14), rgba(245,158,11,0.04));
          color: #fcd97a;
          padding-left: 20px;
        }
        .navbar-dropdown-item.danger:hover {
          background: linear-gradient(90deg, rgba(239,68,68,0.14), rgba(239,68,68,0.04));
          color: #fca5a5;
        }
        .navbar-dropdown-item .item-icon {
          font-size: 1rem;
          width: 22px;
          text-align: center;
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .navbar-dropdown-item:hover .item-icon {
          transform: scale(1.15);
        }

        .navbar-divider {
          height: 1px;
          margin: 4px 12px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
        }

        .navbar-dropdown-inner {
          padding: 8px 0;
        }
      `}</style>

      <nav className={`navbar-root fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
        scrolled
          ? 'bg-[#07070d]/85 backdrop-blur-xl border-b border-amber-500/20 shadow-[0_4px_30px_rgba(245,158,11,0.08)]'
          : 'bg-[#07070d]/55 backdrop-blur-lg border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 group relative">
              <div className="relative">
                <AnimatedLogo />
                <div className="absolute inset-0 bg-amber-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              </div>
              <span
                className="font-extrabold text-lg md:text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-500 group-hover:from-amber-100 group-hover:via-white group-hover:to-amber-300 transition-all duration-300"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'all 0.5s ease 0.1s'
                }}
              >
                GetMeaChai!
              </span>
              <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300 rounded-full" />
            </Link>

            {/* ── Auth ── */}
            <div className="flex items-center gap-3 md:gap-4">
              {!session ? (
                <button
                  onClick={() => signIn()}
                  className="relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden group"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.5s ease 0.2s'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-300 group-hover:from-amber-500 group-hover:to-yellow-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  <span className="relative z-10 flex items-center gap-2 text-white">
                    Login
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              ) : (
                /* ── Account dropdown trigger ── */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(v => !v)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/30 px-3 md:px-4 py-2 rounded-xl transition-all duration-300 group"
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'scale(1)' : 'scale(0.9)',
                      transition: 'all 0.5s ease 0.2s'
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=d4a017&color=fff`}
                        className="w-7 h-7 rounded-full border border-amber-500/50 group-hover:border-amber-400 transition-all duration-300 relative z-10"
                        alt="user"
                      />
                    </div>
                    <span className="text-sm font-medium hidden md:inline text-zinc-200 group-hover:text-white transition-colors">
                      Account
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-amber-400 transition-all duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ── Dropdown ── */}
                  {showDropdown && (
                    <>
                      {/* Backdrop — closes dropdown on outside click */}
                      <div
                        className="fixed inset-0"
                        style={{ zIndex: 9998 }}
                        onClick={closeDropdown}
                      />

                      {/* The dropdown panel itself */}
                      <div className="navbar-dropdown">
                        <div className="navbar-dropdown-inner">

                          <Link
                            href="/dashboard"
                            className="navbar-dropdown-item"
                            onClick={closeDropdown}
                          >
                            <span className="item-icon"><LayoutDashboard size={18} /></span>
                            Dashboard
                          </Link>

                          <Link
                            href={`/${session.user.username || session.user.name}`}
                            className="navbar-dropdown-item"
                            onClick={closeDropdown}
                          >
                            <span className="item-icon"><User size={18} /></span>
                            Your Page
                          </Link>

                          <Link
                            href="/Profile"
                            className="navbar-dropdown-item"
                            onClick={closeDropdown}
                          >
                            <span className="item-icon"><Settings size={18} /></span>
                            Profile
                          </Link>

                          <div className="navbar-divider" />

                          <button
                            className="navbar-dropdown-item danger"
                            onClick={() => { signOut(); closeDropdown() }}
                          >
                            <span className="item-icon"><LogOut size={18} /></span>
                            Logout
                          </button>

                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar