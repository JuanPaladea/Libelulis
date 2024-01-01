import React from 'react'
import { useCart } from '../../context/CartContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { formatedPrice, formatedTotalPrice } from '../../utilities/utils'

const CheckoutComponent = () => {
    const {cart, removeFromCart, totalItems} = useCart()

    return (
        <div>
            <div class="grid mx-auto max-w-xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
                <div class="px-4 pt-8">
                    <p class="text-xl font-medium">Tu orden</p>
                    <p class="text-gray-400">Verífica tu orden de compra</p>
                    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cart ? 
                        (totalItems === 0 ? 
                            'El carrito está vacío' 
                            : 
                            (cart.map((product) => 
                            <div key={product.id} class="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={product.img} alt="" />
                                <div class="flex w-full flex-col px-4 py-4">
                                    <span class="font-semibold"> {product.quantity > 1 ? `${product.quantity}x` : ''} {product.name}</span>
                                        <p class="text-lg font-bold">{formatedTotalPrice(product)}</p>
                                        <p class="text-md"> {product.quantity > 1 ? `${formatedPrice(product)}` : '' } </p>
                                </div>
                                <button
                                    type="button"
                                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    onClick={() => removeFromCart(product.id)}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>)
                        )) : 'ldng'}
                    </div>

                    <p class="mt-8 text-lg font-medium">Envío</p>
                    <form class="mt-5 grid gap-6">
                    <div class="relative">
                        <input class="peer hidden" id="radio_1" type="radio" name="radio" checked />
                        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                        <img class="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Envío por correo argentino</span>
                            <p class="text-slate-500 text-sm leading-6">Demora de 2-5 días</p>
                        </div>
                        </label>
                    </div>
                    <div class="relative">
                        <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
                        <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                        <img class="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                        <div class="ml-5">
                            <span class="mt-2 font-semibold">Retiro en persona</span>
                            <p class="text-slate-500 text-sm leading-6">A partir de las 24hs</p>
                        </div>
                        </label>
                    </div>
                    </form>
                </div>
                <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p class="text-xl font-medium">Detalles</p>
                    <p class="text-gray-400">Completa tu orden</p>
                    <div class="">
                    <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
                    <div class="relative">
                        <input type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ejemplo@gmail.com" />
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        </div>
                    </div>
                    <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Dirección de facturación</label>
                    <div class="flex flex-col sm:flex-row">
                        <div class="relative flex-shrink-0 sm:w-7/12">
                        <input type="text" id="billing-address" name="billing-address" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Dirección" />
                        </div>
                        <select type="text" name="billing-state" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="State">Provincia</option>
                        </select>
                        <input type="text" name="billing-zip" class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CP" />
                    </div>

                    <div class="mt-6 border-t border-b py-2">
                        <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Subtotal</p>
                        <p class="font-semibold text-gray-900">{cart.map((item) => item.price * item.quantity).reduce((total, price) => total + price, 0).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}</p>
                        </div>
                        <div class="flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Envío</p>
                        <p class="font-semibold text-gray-900">$8.00</p>
                        </div>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Total</p>
                        <p class="text-2xl font-semibold text-gray-900">{cart.map((item) => item.price * item.quantity).reduce((total, price) => total + price, 0).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}</p>
                    </div>
                    </div>
                    <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Comprar</button>
                </div>
            </div>
        </div>
  )
}

export default CheckoutComponent