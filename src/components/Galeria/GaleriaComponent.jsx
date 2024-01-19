import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import ImagenComponent from "../Imagen/ImagenComponent"

export default function GaleriaComponent() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  
  return (
    <section class="text-gray-600 body-font max-w-7xl mx-auto">
      {selected && <ImagenComponent open={open} setOpen={setOpen} imagen={selected}/>}
      <div class="container px-4 py-24 mx-auto flex flex-wrap">
        <div class="flex flex-wrap md:-m-2 -m-1">
          <div class="flex flex-wrap md:w-1/2">
            <motion.div 
            whileTap={{ scale: 0.9 }}
            class="md:p-2 p-1 w-1/2">
              <Link>
                <img 
                alt="gallery" 
                class="w-full object-cover h-full object-center block hover:scale-105 transition-all shadow rounded-lg" 
                src="https://i.imgur.com/aqoaU04.jpg"
                onClick={() => {
                  setOpen(true)
                  setSelected('https://i.imgur.com/aqoaU04.jpg')}}
                />
              </Link>
            </motion.div>
            <motion.div 
            whileTap={{ scale: 0.9 }}
            class="md:p-2 p-1 w-1/2">
              <Link>
                <img alt="gallery" class="w-full object-cover h-full object-center block hover:scale-105 transition-all shadow rounded-lg" src="https://i.imgur.com/VyfwdKv.jpg"/>
              </Link>
            </motion.div>
            <motion.div 
            whileTap={{ scale: 0.9 }}
            class="md:p-2 p-1 w-full">
              <Link>
                <img alt="gallery" class="w-full h-full object-cover object-center block hover:scale-105 transition-all shadow rounded-lg" src="https://i.imgur.com/xCFaL8h.jpg"/>
              </Link>
            </motion.div>
          </div>
          <div class="flex flex-wrap md:w-1/2">
            <motion.div 
            whileTap={{ scale: 0.9 }}
            class="md:p-2 p-1 w-full">
              <Link>
                <img alt="gallery" class="w-full h-full object-cover object-center block hover:scale-105 transition-all shadow rounded-lg" src="https://i.imgur.com/VtSYwB7.jpg"/>
              </Link>
            </motion.div>
            <motion.div 
            whileTap={{ scale: 0.9 }}
            class="md:p-2 p-1 w-1/2">
              <Link>
                <img alt="gallery" class="w-full object-cover h-full object-center block hover:scale-105 transition-all shadow rounded-lg" src="https://i.imgur.com/SjjYW6S.jpg"/>
              </Link>
            </motion.div>
            <motion.div 
            whileTap={{ scale: 0.9 }}
            class="md:p-2 p-1 w-1/2">
              <Link>
                <img alt="gallery" class="w-full object-cover h-full object-center block hover:scale-105 transition-all shadow rounded-lg" src="https://i.imgur.com/2OLDBiE.jpg"/>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
