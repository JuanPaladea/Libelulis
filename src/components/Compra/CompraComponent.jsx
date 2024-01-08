import React from 'react'

const CompraComponent = ({compra}) => {
  return (
    <div>
        <div class="grid mx-auto max-w-xl px-4 py-6 lg:max-w-7xl lg:grid-cols-2">
            <div class="px-4 pt-8">
                <p class="text-xl font-medium">Orden "{compra.id}"</p>
                <p class="text-gray-400">Productos comprados</p>
                <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                {compra.items.map((item) =>
                    <div key={item.id} class="flex rounded-lg bg-white sm:flex-row">
                        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.img} alt="" />
                        <div class="flex w-full flex-col px-4 py-4">
                            <span class="font-semibold">{item.name}</span>
                                <p class="text-lg font-bold">{item.price.toLocaleString('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}</p>
                            <p class="text-md">Cantidad: {item.quantity}</p>
                        </div>
                    </div>
                )}
                </div>
                <p class="mt-8 text-lg font-medium">Método de envío</p>
                {compra.Direccion.Envío === 'correo' ? 
                (
                <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input disabled class="peer hidden" id="radio_1" type="radio" name="radio" checked />
                    <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                    <img class="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                    <div class="ml-5">
                        <span class="mt-2 font-semibold">Envío por correo argentino</span>
                        <p class="text-slate-500 text-sm leading-6">Demora de 2-5 días </p>
                    </div>
                    </label>
                </div>
                <div class="relative">
                    <input class="peer hidden" id="radio_2" type="radio" name="radio" disabled/>
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
                )
                :
                (
                <form class="mt-5 grid gap-6">
                <div class="relative">
                    <input disabled class="peer hidden" id="radio_1" type="radio" name="radio" />
                    <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                    <label class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                    <img class="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                    <div class="ml-5">
                        <span class="mt-2 font-semibold">Envío por correo argentino</span>
                        <p class="text-slate-500 text-sm leading-6">Demora de 2-5 días</p>
                    </div>
                    </label>
                </div>
                <div class="relative">
                    <input class="peer hidden" id="radio_2" type="radio" name="radio" checked disabled/>
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

                )}
            </div>
            <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p class="text-xl font-medium">Detalles</p>
                    <div class="">
                    <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
                    <div class="relative">
                        <input type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder={compra.user[1]} value={compra.user[1]} disabled/>
                        <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        </div>
                    </div>
                    <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Dirección de facturación</label>
                    <div class="flex flex-col sm:flex-row">
                        <div class="relative flex-shrink-0 sm:w-7/12">
                        <input type="text" id="billing-address" name="billing-address" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Dirección" value={compra.Direccion.Direccion} disabled/>
                        </div>
                        <select type="text" name="billing-state" class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" value={compra.Direccion.Provincia} disabled>
                        <option value="provincia">Provincia</option>
                        <option value="CABA">CABA</option>
                        <option value="NO CABA">NO CABA</option>
                        </select>
                        <input type="text" name="billing-zip" class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CP" value={compra.Direccion.CP}/>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Total</p>
                        <p class="text-2xl font-semibold text-gray-900">{compra.total.toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CompraComponent