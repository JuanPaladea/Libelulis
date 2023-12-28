import React, { useEffect } from 'react'
import ItemComponent from '../components/Item/ItemComponent'
import AdemasCompraronComponent from '../components/AdemasCompraron/AdemasCompraronComponent'
import ReviewComponent from '../components/Review/ReviewComponent'
import NewsletterComponent from '../components/Newsletter/NewsletterComponent'
import { useParams } from 'react-router-dom'
import { useProduct } from '../hooks/useProductos'

const Item = () => {
  const {id} = useParams()
  const {product, fetchProduct} = useProduct(id)

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
        <ItemComponent product={product}/>
        <AdemasCompraronComponent/>
        <ReviewComponent/>
        <NewsletterComponent/>
    </div>
  )
}

export default Item