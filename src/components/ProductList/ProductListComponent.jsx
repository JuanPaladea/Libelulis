import { formatedPrice } from "../../utilities/utils";
import { useCart } from "../../context/CartContext";
import { CarouselComponent } from "../Carousel/CarouselComponent";
import LoaderComponent from "../Loader/LoaderComponent";

export default function ProductListComponent({ products }) {
  const {addToCart, loading} = useCart()

  return (
    <div>
      {
        loading 
        &&
        (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-80 z-50">
            <LoaderComponent/>
          </div>
        )
      }
      <div className='bg-white'>
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <div key={product.id}>
                  <div className="h-96 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <CarouselComponent img1={product.img} img2="https://i.imgur.com/NJoXaOT.jpg" img3="https://i.imgur.com/VMBVKFF.jpg" product={product} />
                  </div>
                      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">{formatedPrice(product)}</p>
                  <div>
                    {product.stock > 0 
                    ? 
                    (
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Añadir al carrito
                      </button>
                    ) 
                    : 
                    (
                      <button
                        className="mt-2 flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-300 px-8 py-3 text-base font-medium text-gray-500 cursor-not-allowed"
                        disabled
                      >
                        Sin stock
                      </button>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
  