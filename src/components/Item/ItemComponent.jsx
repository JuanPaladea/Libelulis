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
            <img src="https://i.imgur.com/NJoXaOT.jpg" alt="model" class="h-full w-full object-cover object-center"/>
          </div>
          <div class="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img src={product.img} alt={product.name} class="h-full w-full object-cover object-center"/>
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
                  <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Calidad Premium</span>: Destaca la calidad excepcional de tus productos de ropa. Puedes mencionar la elección de materiales de alta gama, la artesanía cuidadosa o cualquier característica única que garantice durabilidad y comodidad.</span></li>
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Diseño Exclusivo</span>: Resalta la originalidad y exclusividad de tus diseños. Si hay detalles únicos, patrones distintivos o colaboraciones especiales, asegúrate de incluirlos en los highlights para atraer a aquellos que buscan prendas únicas y a la moda.</span></li>
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Sostenibilidad y Responsabilidad Ambiental</span>: Si tus productos están fabricados de manera sostenible o si tu empresa sigue prácticas respetuosas con el medio ambiente, es fundamental incluirlo en tus highlights. La conciencia ambiental es una característica cada vez más valorada por los consumidores.</span></li>
                    <li class="text-gray-400"><span class="text-gray-600"><span class="font-bold">Confort y Funcionalidad</span>:Si tus prendas ofrecen un nivel excepcional de comodidad o incluyen características funcionales específicas (como bolsillos ocultos, tejidos transpirables, etc.), asegúrate de destacarlo. Los clientes aprecian la combinación de estilo y practicidad en la ropa que compran.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
