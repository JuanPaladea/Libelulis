import { addDoc, collection, getFirestore, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import LoaderComponent from '../Loader/LoaderComponent'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const AdminProductFormComponent = () => {
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [colors, setColors] = useState([])
  const [stockCounts, setStockCounts] = useState({
    S: '',
    M: '',
    L: '',
    XL: '',
  });

  const {isAdmin} = useUser();
  const [loading, setLoading] = useState(false)
  const db = getFirestore();
  const productsCollection = collection(db, 'products')

  const handleColorToggle = (selectedColor) => {
    if (colors.includes(selectedColor)) {
      setColors(colors.filter((color) => color !== selectedColor));
    } else {
      setColors([...colors, selectedColor]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAdmin) {
      setLoading(true);
      if (
        !name.trim() ||
        !img.trim() ||
        !price.trim() ||
        !category.trim() ||
        !size.trim()
      ) {
        toast.error('Por favor, complete todos los campos.');
        setLoading(false);
        return;
      }

      try {
        const productRef = await addDoc(productsCollection, {
          name,
          img,
          img2,
          img3,
          price: parseFloat(price),
          category,
          descripcion,
          colors,
        });

        // Get the ID of the newly created product
        const productId = productRef.id;

        // Add stock counts for each size to the sizes subcollection
        const sizesCollection = collection(db, 'products', productId, 'sizes');
        const sizesData = {
          S: parseInt(stockCounts.S),
          M: parseInt(stockCounts.M),
          L: parseInt(stockCounts.L),
          XL: parseInt(stockCounts.XL),
        };
        await addDoc(sizesCollection, sizesData);

        toast.success('Producto agregado con ID: ' + productRef.id);
        setName('');
        setImg('');
        setImg2('');
        setImg3('');
        setPrice('');
        setCategory('');
        setDescripcion('');
        setSize('');
        setColors('');
        setStockCounts({
          S: '',
          M: '',
          L: '',
          XL: '',
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('No es administrador')
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
        <div className="bg-gray-100 px-6 lg:px-8 py-16">
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
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">
                  Categoría
                </label>
                <div className="mt-2.5 flex justify-between align-center">
                  <div>
                    <input
                      type="radio"
                      name="category"
                      value="buzo"
                      checked={category === 'buzo'}
                      onChange={() => setCategory('buzo')}
                      />
                    <label className='mx-2 my-auto'>
                    Buzo
                    </label>
                  </div>
                  <div>
                      <input
                        type="radio"
                        name="category"
                        value="remera"
                        checked={category === 'remera'}
                        onChange={() => setCategory('remera')}
                        />
                    <label className='mx-2 my-auto'>
                      Remera
                    </label>
                  </div>
                  <div>
                      <input
                        type="radio"
                        name="category"
                        value="campera"
                        checked={category === 'campera'}
                        onChange={() => setCategory('campera')}
                      />
                    <label className='mx-2 my-auto'>
                      Campera
                    </label>
                  </div>
                  <div>
                      <input
                        type="radio"
                        name="category"
                        value="otro"
                        checked={category === 'otro'}
                        onChange={() => setCategory('otro')}
                      />
                    <label className='mx-2 my-auto'>
                      Otro
                    </label>
                  </div>
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
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="size" className="block text-sm font-semibold leading-6 text-gray-900">
                  Tamaño
                </label>
                <div className="mt-2.5">
                  <select
                    required
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
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
              <div>
                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Img2 url
                </label>
                <div className="mt-2.5">
                  <input
                    value={img2}
                    onChange={(e) => setImg2(e.target.value)}
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
                  Img3 url
                </label>
                <div className="mt-2.5">
                  <input
                    value={img3}
                    onChange={(e) => setImg3(e.target.value)}
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
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
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
              <motion.button
                whileTap={{ scale: 0.9}}
                onClick={handleSubmit}
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Agregar producto
              </motion.button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default AdminProductFormComponent