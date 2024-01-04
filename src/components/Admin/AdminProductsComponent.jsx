import { useState } from "react";
import { formatedPrice } from "../../utilities/utils";
import { CarouselComponent } from "../Carousel/CarouselComponent";
import AdminEditProductComponent from "./AdminEditProductComponent";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";

export default function AdminProductsComponent({ products }) {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const db = getFirestore(); 
  const {isAdmin} = useUser()

  const handleEditClick = (product) => {
    if (isAdmin) {
      setSelectedProduct(product)
      setOpen(true)
    } else {
      toast.error('No es administrador')
    }
  }

  const handleDeleteClick = (product) => {
    if (isAdmin) {
      const productDocRef = doc(collection(db, 'products'), product.id);
      deleteDoc(productDocRef)
      .then(() => {
        toast.success('Producto eliminado')
      })
      .catch(error => toast.error(error))
    } else {
      toast.error('No es administrador')
    }
  }

  return (
    <div className="bg-white">
      {selectedProduct && (
        <AdminEditProductComponent open={open} setOpen={setOpen} product={selectedProduct} />
      )} 
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
                <button
                  onClick={() => handleEditClick(product)}
                  className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Editar Producto
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="mt-2 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Eliminar Producto
                </button>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
  