import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'

const ImagenComponent = ({open, setOpen, imagen}) => {
  useEffect(() => {
    // Set inline styles for the body based on the 'open' state
    document.body.style.overflow = open ? 'hidden' : 'visible';

    // Cleanup function to reset the style when the component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [open]);
  
  return (
    <AnimatePresence>
        {open && (
            <motion.div 
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='h-screen w-screen bg-black bg-opacity-90 fixed top-0 left-0 justify-center align-center flex z-50' onClick={() => setOpen(false)}>
                <motion.img 
                key="modal"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                src={`${imagen}`} className='object-scale-down object-center h-4/6 block my-auto '/>
            </motion.div>
        )
        }
    </AnimatePresence>
  )
}

export default ImagenComponent