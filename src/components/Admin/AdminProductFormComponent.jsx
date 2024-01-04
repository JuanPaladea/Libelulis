import { collection, getFirestore } from 'firebase/firestore'
import React, { useState } from 'react'

const AdminProductFormComponent = () => {
    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [price, setPrice] = useState('')
    const db = getFirestore();
    const productsCollection = collection(db, 'products')

    const handleSubmit = (e) => {
      e.preventDefault();
      addDoc(productsCollection, {
        name,
        img,
        price: parseFloat(price)
      })
      .then((newProductDoc) => {
        toast.success('Producto agregado con ID: ' + newProductDoc.id)
        setName('')
        setImg('')
        setPrice('')
      })
      .catch((error) => {
        toast.error(error)
      })
    }

    return (
        <div className="isolate bg-gray-100 px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Agregar productos</h2>
          </div>
          <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6">
              <div>
                <label htmlFor="Name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2.5">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Precio
                </label>
                <div className="mt-2.5">
                  <input
                   required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}         
                    type="text"
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Img url
                </label>
                <div className="mt-2.5">
                  <input  
                    required       
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    type="text"
                    name="img"
                    id="img"
                    autoComplete="img"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={handleSubmit}
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Agregar producto
              </button>
            </div>
          </form>
        </div>
    )
}

export default AdminProductFormComponent