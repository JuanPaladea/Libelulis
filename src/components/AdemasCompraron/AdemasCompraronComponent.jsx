import { Link } from "react-router-dom"
import { formatedPrice } from "../../utilities/utils"
import { useCollection } from "../../hooks/useCollection"
import { useCart } from "../../context/CartContext"

export default function AdemasCompraronComponent() {

  const {productos} = useCollection('ademas-compraron')
  const {addToCart} = useCart()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Otros además compraron</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {productos.map((product) => (
            <div key={product.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <div>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{formatedPrice(product)}</p>
              <div>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
        ))}
        </div>
      </div>
    </div>
  )
}
