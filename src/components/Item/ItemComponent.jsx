import { useState } from "react";
import { useCart } from "../../context/CartContext"

export default function ItemComponent({product}) {
  const {addToCart} = useCart();
  const [count, setCount] = useState(1)

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img src={product.img} alt={product.name} class="h-full w-full object-cover object-center"/>
          </div>
          <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img src={product.img2 || "https://i.imgur.com/NJoXaOT.jpg"} alt="model" class="h-full w-full object-cover object-center"/>
          </div>
          <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img src={product.img3 || product.img} alt={product.name} class="h-full w-full object-cover object-center"/>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price ? (product.price .toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            ) 
            : 
            ''}
            </p>

            {product.stock > 0 
            ? 
            (
              <div>
                <div>
                  <p className="mt-4 text-gray-500 text-lg">Cantidad:
                    <select id="quantity" value={count} onChange={(e) => setCount(+e.target.value)}>
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                  </p>
                </div>
                <button
                  onClick={() => addToCart(product, count)}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Añadir al carrito
                </button>
              </div>
            ) 
            : 
            (
              <button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-8 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
                disabled
              >
                Sin stock
              </button>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>

              <div class="mt-10">
                <h3 class="text-sm font-medium text-gray-900">Detalles</h3>

                <div class="mt-4">
                  {product.descripcion ? 
                  <p className="font-bold text-gray-600">{product.descripcion}</p> 
                  : 
                    <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                      <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Calidad Premium</span>: Destaca la calidad excepcional de tus productos de ropa. Puedes mencionar la elección de materiales de alta gama, la artesanía cuidadosa o cualquier característica única que garantice durabilidad y comodidad.</span></li>
                      <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Diseño Exclusivo</span>: Resalta la originalidad y exclusividad de tus diseños. Si hay detalles únicos, patrones distintivos o colaboraciones especiales, asegúrate de incluirlos en los highlights para atraer a aquellos que buscan prendas únicas y a la moda.</span></li>
                      <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Sostenibilidad y Responsabilidad Ambiental</span>: Si tus productos están fabricados de manera sostenible o si tu empresa sigue prácticas respetuosas con el medio ambiente, es fundamental incluirlo en tus highlights. La conciencia ambiental es una característica cada vez más valorada por los consumidores.</span></li>
                      <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Confort y Funcionalidad</span>:Si tus prendas ofrecen un nivel excepcional de comodidad o incluyen características funcionales específicas (como bolsillos ocultos, tejidos transpirables, etc.), asegúrate de destacarlo. Los clientes aprecian la combinación de estilo y practicidad en la ropa que compran.</span></li>
                    </ul>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ItemComponent2 = () => {
  return (     
    <section class="py-10 lg:py-24 relative ">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div class="pro-detail max-lg:max-w-[608px] max-lg:mx-auto lg:w-1/2 flex flex-col justify-center">
                <h2 class="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">{product.name}
                </h2>
                <div class="flex flex-col sm:flex-row sm:items-center mb-6">
                    <h6
                        class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                      {product.price .toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      })}
                    </h6>
                </div>
                <p class="text-gray-500 text-base font-normal mb-8 ">
                    {product.description}
                </p>
                <div class="block w-full">
                    <div class="text">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            <div class="flex items-center justify-center w-full">
                                <button
                                    onClick={() => setCount(count - 1)}
                                    class="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                                    <svg class="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                                        width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5 11H5.5" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                            stroke-linecap="round" />
                                    </svg>
                                </button>
                                <input 
                                    value={count}
                                    type="text"
                                    class="font-semibold text-gray-900 text-lg py-[13px] px-6 w-full lg:max-w-[118px] border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0"
                                    placeholder="1"/>
                                <button
                                    onClick={() => setCount(count + 1)}
                                    class="group py-4 px-6 border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                                    <svg class="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                                        width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-width="1.6"
                                            stroke-linecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                            stroke-width="1.6" stroke-linecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" stroke-opacity="0.2"
                                            stroke-width="1.6" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={() => addToCart(product, count)}
                                class="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200">
                                <svg class="stroke-indigo-600 transition-all duration-500" width="22" height="22"
                                    viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                                        stroke="" stroke-width="1.6" stroke-linecap="round" />
                                </svg>
                                Añadir al carrito</button>
                        </div>
                        <div class="flex items-center gap-3">
                            <button
                                onClick={() => addToCart(product)}
                                class="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                Comprar ahora
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            <div class="slider-box lg:w-1/2 max-lg:max-w-[680px] max-lg:mx-auto">

                <div class="col-span-4">
                    <img src={product.img} alt={product.name}
                        class="w-full h-auto xl:min-w-[608px] aspect-square"/>
                </div>
                <div class="grid grid-cols-4 gap-4 lg:gap-6 mt-4 lg:mt-6">
                    <img src="https://pagedone.io/asset/uploads/1700471871.png" alt="Travel Bag image"
                        class="w-full h-auto cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600"/>
                    <img src="https://pagedone.io/asset/uploads/1700471890.png" alt="Travel Bag image"
                        class="w-full aspect-square cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600"/>
                    <img src="https://pagedone.io/asset/uploads/1700471908.png" alt="Travel Bag image"
                        class="w-full h-auto cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600"/>
                    <img src="https://pagedone.io/asset/uploads/1700471925.png" alt="Travel Bag image"
                        class="w-full h-auto cursor-pointer border-2 border-gray-50 transition-all duration-500 hover:border-indigo-600"/>
                </div>
            </div>
        </div>
    </div>
</section>
                                                               
  )                                  
}