// import React from 'react'

// const Footer = () => {
//     return (
//         <footer className='bg-blue-950 justify-center px-4 h-10 text-white flex items-center'>
//             <p className='text-center'>Copyright &copy; Get me A Chai All rights reserved!</p>
//         </footer>
//     )
// }

// export default Footer
import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='bg-black border-t border-white/5 py-8 text-gray-400'>
            <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4'>
                <div className='flex items-center gap-2'>
                    <span className='text-amber-500 font-bold'>GetMeaChai!</span>
                    <span className='text-sm'>© {currentYear}</span>
                </div>
                
                <p className='text-xs tracking-widest uppercase opacity-60'>
                    Empowering creators, one cup at a time.
                </p>

                <div className='flex gap-6 text-sm'>
                    <a href="#" className='hover:text-amber-400 transition-colors'>Privacy</a>
                    <a href="#" className='hover:text-amber-400 transition-colors'>Terms</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer