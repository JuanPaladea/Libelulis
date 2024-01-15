import React from 'react'
import { tailspin } from 'ldrs'
tailspin.register()

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