import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { useUser } from '../../context/UserContext'
import LoaderComponent from '../Loader/LoaderComponent'
import toast from 'react-hot-toast'

export default function AdminEditProductComponent({open, setOpen, product}) {
  const {isAdmin} = useUser()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [price, setPrice] = useState('')
  const [colors, setColors] = useState([])
  const [category, setCategory] = useState('')
  const [stockCounts, setStockCounts] = useState({
    S: '',
    M: '',
    L: '',
    XL: '',
  });

  const db = getFirestore(); 
  const productsCollection = collection(db, 'products')
  const productDocRef = doc(productsCollection, product.id)

  useEffect(() => {
      setName(product.name || '');
      setImg(product.img || '');
      setImg2(product.img2 || '');
      setImg3(product.img3 || '');
      setDescripcion(product.descripcion || '');
      setPrice(product.price || '');
      setCategory(product.category || '');
      setColors(product.colors || '');
      const productSizes = product.sizes || {};
      setStockCounts({
        S: productSizes.S !== undefined ? productSizes.S.toString() : '',
        M: productSizes.M !== undefined ? productSizes.M.toString() : '',
        L: productSizes.L !== undefined ? productSizes.L.toString() : '',
        XL: productSizes.XL !== undefined ? productSizes.XL.toString() : '',
      });
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      if (!isAdmin) {
        toast.error('No es administrador');
        return;
      }
  
      const parsedPrice = parseFloat(price);
      if (isNaN(parsedPrice)) {
        toast.error('Precio debe ser un número');
        return;
      }
  
      const updateObject = {
        name: name.trim() !== '' ? name : product.name,
        price: !isNaN(parsedPrice) ? parsedPrice : product.price,
        img: img.trim() !== '' ? img : product.img,
        img2: img2.trim() !== '' ? img2 : product.img2,
        img3: img3.trim() !== '' ? img3 : product.img3,
        descripcion: descripcion.trim() !== '' ? descripcion : product.descripcion,
        category: category.trim() !== '' ? category : product.category,
      };
      await updateDoc(productDocRef, updateObject);
      
      const updateSizes = async () => {
        const sizesCollection = collection(db, 'products', product.id, 'sizes');
        const sizesData = {
          S: parseInt(stockCounts.S),
          M: parseInt(stockCounts.M),
          L: parseInt(stockCounts.L),
          XL: parseInt(stockCounts.XL),
        };
      
        await setDoc(sizesCollection, sizesData);
      };
      await updateSizes();
  
      setOpen(false);
  
      setName('');
      setStockCounts({
        S: '',
        M: '',
        L: '',
        XL: '',
      });
      setPrice('');
      setDescripcion('');
      setImg('');
      setImg2('');
      setImg3('');
      setCategory('');
      setColors([]);
      toast.success('Producto actualizado');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  const colorList = [
    'pink',
    'indigo',
    'black',
    'white',
    'orange',
    'yellow',
    'blue',
    'green',
    'red',
    'gray',
    'lime',
    'teal',
    'purple',
  ];

  const handleColorToggle = (selectedColor) => {
    if (colors.includes(selectedColor)) {
      setColors(colors.filter((color) => color !== selectedColor));
    } else {
      setColors([...colors, selectedColor]);
    }
  };

  return (
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
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="my-auto aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        {<img src={product.img} alt={product.name} className="object-cover object-center" />}
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        {<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>}
                        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                              <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Nombre
                                    </label>
                                    <div className="mt-2.5">
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder={product.name}
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
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                        placeholder={product.price}
                                        type="number"
                                        name="price"
                                        id="price"
                                        autoComplete="price"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                                <div>
                                  <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Categoría
                                  </label>
                                  <div className="mt-2.5">
                                    <div className="flex items-center space-x-4">
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="buzo"
                                          checked={category === "buzo"}
                                          onChange={() => setCategory("buzo")}
                                          className="form-radio"
                                        />
                                        <span className="ml-2">Buzo</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="remera"
                                          checked={category === "remera"}
                                          onChange={() => setCategory("remera")}
                                          className="form-radio"
                                        />
                                        <span className="ml-2">Remera</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="campera"
                                          checked={category === "campera"}
                                          onChange={() => setCategory("campera")}
                                          className="form-radio"
                                        />
                                        <span className="ml-2">Campera</span>
                                      </label>
                                      <label className="flex items-center">
                                        <input
                                          type="radio"
                                          value="otro"
                                          checked={category === "otro"}
                                          onChange={() => setCategory("otro")}
                                          className="form-radio"
                                        />
                                        <span className="ml-2">Otro</span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="size" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Tamaño
                                  </label>
                                  <div className="mt-2.5">
                                    <select
                                      required
                                      name="size"
                                      id="size"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                      <option value="" disabled>
                                        Selecciona un tamaño
                                      </option>
                                      <option value="S">S</option>
                                      <option value="M">M</option>
                                      <option value="L">L</option>
                                      <option value="XL">XL</option>
                                    </select>
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="stock" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Stock Count
                                  </label>
                                  <div className="mt-2.5">
                                    <input
                                      required
                                      value={stockCounts[size]}
                                      onChange={(e) => setStockCounts({ ...stockCounts, [size]: e.target.value })}
                                      type="number"
                                      name="stock"
                                      id="stock"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="color" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Color
                                  </label>
                                  <div className="mt-2.5 flex flex-wrap">
                                  {colorList.map((color) => (
                                    <button
                                      key={color}
                                      type="button"
                                      className={`p-1 mb-2 mr-4 w-7 h-7 ${colors.includes(color) ? 'border-2 border-red-500' : ''} ${color === 'red' && colors.includes('red') ? 'border-2 border-white' : 'border-0'}`}
                                      style={{ backgroundColor: color }}
                                      onClick={() => handleColorToggle(color)}
                                    >
                                    </button>
                                  ))}

                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                  Imagen 1 url
                                  </label>
                                  <div className="mt-2.5">
                                  <input
                                      onChange={(e) => setImg(e.target.value)}
                                      value={img}
                                      placeholder={product.img}
                                      type="text"
                                      name="img"
                                      id="img"
                                      autoComplete="img"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                  Imagen 2 url
                                  </label>
                                  <div className="mt-2.5">
                                  <input
                                      onChange={(e) => setImg2(e.target.value)}
                                      value={img2}
                                      placeholder={product.img2}
                                      type="text"
                                      name="img"
                                      id="img"
                                      autoComplete="img"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                  Imagen 3 url
                                  </label>
                                  <div className="mt-2.5">
                                  <input
                                      onChange={(e) => setImg3(e.target.value)}
                                      value={img3}
                                      placeholder={product.img3}
                                      type="text"
                                      name="img"
                                      id="img"
                                      autoComplete="img"
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                  Descripcion producto
                                  </label>
                                  <div className="mt-2.5">
                                  <textarea
                                      rows={6}
                                      onChange={(e) => setDescripcion(e.target.value)}
                                      value={descripcion}
                                      placeholder={product.descripcion}
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
                                      onClick={handleUpdate}
                                      type="submit"
                                      className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  >
                                      Confirmar edición
                                  </button>
                              </div>
                          </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
