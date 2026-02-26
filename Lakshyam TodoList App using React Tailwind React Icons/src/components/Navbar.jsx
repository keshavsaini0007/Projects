// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className='flex space-x-3 justify-between text-[15px] text-white bg-teal-500 h-10 items-center'>
//       <div className="logo font-bold m-2">iTask</div>
//       <ul className='flex space-x-3'>
//         <li className="px-4 hover:font-bold transition-all">Home</li>
//         <li className="px-4 hover:font-bold transition-all">Your task</li>
//       </ul>
//     </nav>
//   )
// }

// export default Navbar

import LakshyamLogo from './LakshyamLogo'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      sticky top-0 z-50
      flex items-center justify-between
      px-6 h-[58px]
      border-b border-white/[0.06]
      transition-all duration-300
      ${scrolled
        ? 'bg-[#0a0a0f]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        : 'bg-[#0a0a0f]/70 backdrop-blur-md'
      }
    `}>

      {/* ── Logo ── */}
      <div className='w-14'>
        <LakshyamLogo />
      </div>

      {/* ── Nav links ── */}
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {['Home', 'Your Tasks'].map((item) => (
          <li key={item}>
            <button
              onClick={() => setActive(item)}
              className={`
                relative px-4 py-1.5 rounded-lg
                text-[13px] font-medium tracking-wide
                cursor-pointer border-none outline-none
                transition-all duration-200
                ${active === item
                  ? 'text-violet-300 bg-violet-700 border border-violet-500/25'
                  : 'text-white/40 hover:text-white/80 bg-transparent border border-transparent'
                }
              `}
            >
              {/* animated underline on active */}
              {active === item && (
                <span className="
                  absolute bottom-[3px] left-3 right-3 h-[2px] rounded-full
                  bg-gradient-to-r from-violet-500 to-teal-400
                  opacity-70
                " />
              )}
              <span className="relative">{item}</span>
            </button>
          </li>
        ))}
      </ul>

    </nav>
  )
}

export default Navbar