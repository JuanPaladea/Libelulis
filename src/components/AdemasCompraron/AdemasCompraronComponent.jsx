import { Link } from "react-router-dom"
import { formatedPrice } from "../../utilities/utils"
import { useCollection } from "../../hooks/useCollection"
import { useCart } from "../../context/CartContext"
import LoaderComponent from "../Loader/LoaderComponent"

export default function AdemasCompraronComponent() {

  const {productos, loading: loadingProductos} = useCollection('ademas-compraron')
  const {addToCart, loading} = useCart()

  return (
    <div>
      <div>
        {
        loading
        &&
        (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
            <LoaderComponent/>
          </div>
        )
        }
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl">
          <div class="flex flex-col">
            <div class="h-1 bg-gray-200 rounded overflow-hidden">
              <div class="w-24 h-full bg-indigo-500"></div>
            </div>
            <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 class="sm:w-2/5 text-gray-900 text-3xl tracking-tight font-extrabold mb-2 sm:mb-0">Otros además compraron</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {loadingProductos 
          ? 
          <div className='p-6 w-full h-full flex items-center justify-center'><LoaderComponent/></div>
          :
          (
          productos.map((product) => (
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
            </div>))
          )
          }
          </div>
        </div>
      </div>
    </div>
  )
}
