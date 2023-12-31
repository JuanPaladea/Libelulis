import React from 'react'
import 'ldrs/tailspin'

const LoaderComponent = (size) => {
  return (
    <l-tailspin
        size={size ? size : 40}
        stroke="5"
        speed="0.9"
        color="black" 
    ></l-tailspin>
  )
}

export default LoaderComponent
