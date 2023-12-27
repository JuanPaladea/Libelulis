import React from 'react'
import ItemComponent from '../components/Item/ItemComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ReviewComponent from '../components/Review/ReviewComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'

const Item = () => {
  return (
    <div>
        <ItemComponent/>
        <AdemasCompraronComponent/>
        <ReviewComponent/>
        <NewsletterComponent/>
    </div>
  )
}

export default Item