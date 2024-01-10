import { Fragment, useState } from 'react'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { useCart } from '../../context/CartContext'
import LoaderComponent from '../Loader/LoaderComponent'

const navigation = {
  pages: [
    { name: 'Tienda', href: 'Tienda' },
    { name: 'Sobre Nosotros', href: 'Sobre-Nosotros' },
    { name: 'Contáctanos', href: 'Contacto' },
  ],
}

export default function NavBarComponent({cartOpen, setCartOpen}) {
  const [open, setOpen] = useState(false)
  const {user, signOutUser, isAdmin, loading: userLoading} = useUser();
  const {cart, totalItems, loading: cartLoading} = useCart()

  return (
    <div className="bg-white sticky top-0 w-full z-40">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="ml-7 flex">
                  <Link className='flex items-center' to="/" onClick={() => setOpen(false)}>
                    <span className="sr-only">Libelulis</span>
                    <img
                      className="h-7 w-auto"
                      src="https://i.imgur.com/0twzt2t.png"
                      alt="libelulis logo"
                    />
                    <span className='mx-2'>Libelulis</span>
                  </Link>
              </div>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link to={page.href} onClick={() => setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>
                  {userLoading 
                  ? 
                  (<LoaderComponent size='20'/>) 
                  : 
                  (user 
                    ? 
                    (
                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        <Link to="/Usuario" onClick={()=> setOpen(false)} className="flex flex-1 items-center justify-start space-x-3" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                          <div class="flex -space-x-2">
                            {user.photoURL ? (
                              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={user.photoURL} />
                            )
                            :
                            (
                              ""
                            )}
                          </div>
                          <div className="font-medium text-gray-700 hover:text-gray-800">
                            {user.displayName}
                          </div>
                        </Link>
                        { isAdmin 
                        ? 
                        (
                        <Link to="/admin" onClick={()=> setOpen(false)} className="flex flex-1 items-center justify-start space-x-3" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                          <div className="font-medium text-gray-700 hover:text-gray-800">
                            Admin
                          </div>
                        </Link>
                        ) 
                        : 
                        (
                        <Link to="/checkout" onClick={()=> setOpen(false)} className="flex flex-1 items-center justify-start space-x-3" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                          <div className="font-medium text-gray-700 hover:text-gray-800">
                            Carrito
                          </div>
                        </Link>
                        )
                        }
                        <Link onClick={() => {
                          setOpen(false);
                          signOutUser()
                        }} className="-m-2 block p-2 font-medium text-red-900"
                          to="/">
                          Cerrar Sesión
                        </Link>
                    </div>
                    ) 
                    :
                    (
                      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div className="flow-root">
                          <Link to="/Iniciar-Sesion" onClick={() => setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900">
                            Iniciar Sesión
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link to="/Registrarse" onClick={() => setOpen(false)} className="-m-2 block p-2 font-medium text-gray-900">
                            Registrarse
                          </Link>
                        </div>
                      </div>
                  ))} 
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link className='flex items-center' to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://i.imgur.com/0twzt2t.png"
                    alt=""
                  />
                  <span className='mx-2'>Libelulis</span>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>
              {/* User Menu */}
              <div className="ml-auto flex items-center">
                {userLoading 
                ? 
                (
                <LoaderComponent size='20'/>
                ) 
                : 
                (
                  user 
                  ?
                  (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <div class="flex -space-x-2 overflow-hidden">
                          {user.photoURL ? (
                            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={user.photoURL} />
                          )
                          :
                          (
                            ""
                          )}
                        </div>
                        <div className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          {user.displayName}
                        </div>
                        
                      </Menu.Button>
                    </div>
                    <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/Usuario"
                                  className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                >
                                  Tu cuenta
                                </Link>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                isAdmin 
                                ? 
                                (
                                <Link
                                  to="/Admin"
                                  className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                >
                                  Admin
                                </Link>
                                ) 
                                : 
                                (
                                <Link
                                  to="/checkout"
                                  className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                >
                                  Carrito
                                </Link>
                                )
                              )}
                            </Menu.Item>
                            
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  onClick={() => signOutUser()}
                                  className={`block px-4 py-2 text-sm text-red-700 ${active ? 'bg-gray-100' : ''}`}
                                  to="/"
                                >
                                  Cerrar sesión
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                  </Menu>
                  )
                  :
                  (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link to="/Iniciar-Sesion" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Iniciar Sesión
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link to="/Registrarse" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Registrarse
                    </Link>
                  </div>
                  )
                )}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a onClick={() => setCartOpen(!cartOpen)} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"> {totalItems} </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
