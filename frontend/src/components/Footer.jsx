import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start sm:gap-4 py-3 mt-20 text-center sm:text-left'>
      
      {/* Logo and Copyright */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-4">
        <img src={assets.logo} alt="" width={150} className='filter invert' />
        <a
          href='https://atharva-shewale.netlify.app/'
          className='text-xs text-purple-500 border-t border-gray-400 pt-2 sm:border-t-0 sm:border-l sm:pl-4 sm:text-sm sm:pt-0'
        >
          © Atharva Shewale | All rights reserved.
        </a>
      </div>

      {/* Social Icons */}
      <div className='flex gap-2.5 mb-7 sm:mb-0 sm:ml-auto'>
        <img src={assets.facebook_icon} alt="" className="filter invert" />
        <img src={assets.instagram_icon} alt="" className="filter invert" />
        <img src={assets.twitter_icon} alt="" className="filter invert" />
      </div>
    </div>
  )
}

export default Footer
