import React from 'react'
import { Link } from 'react-router-dom'

const ColeccionesComponent = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-4 py-24 mx-auto max-w-7xl">
        <div class="flex flex-col">
          <div class="h-1 bg-gray-200 rounded overflow-hidden">
            <div class="w-24 h-full bg-indigo-500"></div>
          </div>
          <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 class="sm:w-2/5 text-gray-900 text-3xl tracking-tight font-extrabold mb-2 sm:mb-0">Colecciones</h1>
          </div>
        </div>

        <div class="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          <div>
            <Link to="/Tienda" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1548712370-806c729f72ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>

            <div class="flex flex-col">
              <div class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Camperas</div>
            </div>
          </div>
          <div>
            <Link to="/Tienda" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="Photo by engin akyurt" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>

            <div class="flex flex-col">
              <div class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Remeras</div>
            </div>
          </div>
          <div>
            <Link to="/Tienda" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1558547484-ecee6e67c86b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>

            <div class="flex flex-col">
              <div class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Hoodies</div>
            </div>
          </div>
          <div>
            <Link to="/Tienda" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1512167306115-7e16ebf38e59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </Link>

            <div class="flex flex-col">
              <div class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Mochilas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ColeccionesComponent