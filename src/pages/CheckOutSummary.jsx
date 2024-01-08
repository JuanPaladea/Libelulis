import React from 'react'
import SummaryComponent from '../components/Summary/SummaryComponent'
import { useCart } from '../context/CartContext'
import Error from '../pages/Error'

const CheckOutSummary = () => {
  const {summary} = useCart()
  return (
    // <div>
    //     {summary ?
    //     (
    //       <SummaryComponent/>
    //     )
    //     :
    //     (
    //       <Error/>
    //     )
    //     }
    // </div>
    <SummaryComponent/>
  )
}

export default CheckOutSummary