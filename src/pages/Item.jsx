import React, { useEffect } from 'react'
import ItemComponent from '../components/Item/ItemComponent'
import ReviewComponent from '../components/Review/ReviewComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'
import { useParams } from 'react-router-dom'
import { useUnico } from '../hooks/useCollection'
import LoaderComponent from '../components/Loader/LoaderComponent'
import { motion } from 'framer-motion'

const Item = () => {
  const {id} = useParams()
  const {producto, loading} = useUnico('products', id)
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      {loading 
      ? 
      (
      <LoaderComponent/>
      )
      :
      (
      <ItemComponent product={producto} />
      )
      }
      <ReviewComponent/>
      <NewsletterComponent/>
    </motion.div>
  )
}

export default Item