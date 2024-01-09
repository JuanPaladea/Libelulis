import React from 'react'
import 'ldrs/tailspin'

const LoaderComponent = ({size = '40'}) => {
  return (
    <l-tailspin
        size={size}
        stroke="5"
        speed="0.9"
        color="black" 
    ></l-tailspin>
  )
}

export default LoaderComponent