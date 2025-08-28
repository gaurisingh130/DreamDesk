import React from 'react'
import { assets } from '../imgs/assets'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div 
      className='flex items-center justify-between gap-4 py-3 mt-20 footer'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <motion.img 
            src={assets.dreamdesk} 
            alt="" 
            width={120}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='pl-4'
        />

        <p className='flex-1 border-l pl-4 text-sm text-gray-500 max-sm:hidden'>
            Copyright @xyz.dev | All rights reserved.
        </p>

        <div className='flex gap-2.5'>
            <motion.img src={assets.facebook_icon} alt="" width={35} whileHover={{ scale: 1.1 }} />
            <motion.img src={assets.twitter_icon} alt="" width={35} whileHover={{ scale: 1.1 }} />
            <motion.img src={assets.instagram_icon} alt="" width={35} whileHover={{ scale: 1.1 }} />
        </div>
    </motion.div>
  )
}

export default Footer
