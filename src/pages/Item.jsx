import React, { useEffect } from 'react'
import ItemComponent from '../components/Item/ItemComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ReviewComponent from '../components/Review/ReviewComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'
import { useParams } from 'react-router-dom'
import { useUnico } from '../hooks/useCollection'
import LoaderComponent from '../components/Loader/LoaderComponent'

const Item = () => {
  const {id} = useParams()
  const {producto} = useUnico('products', id)
  
  return (
    <div>
        {producto ? (
          <ItemComponent product={producto} />
        )
        :
        (
          <LoaderComponent/>
        )}
        <AdemasCompraronComponent/>
        <ReviewComponent/>
        <NewsletterComponent/>
    </div>
  )
}

export default Item