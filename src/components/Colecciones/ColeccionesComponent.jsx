import React from 'react'

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
            <a href="#" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>

            <div class="flex flex-col">
              <span class="text-gray-500">Men</span>
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Business Causual</a>
            </div>
          </div>
          <div>
            <a href="#" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by engin akyurt" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>

            <div class="flex flex-col">
              <span class="text-gray-500">Women</span>
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Summer Season</a>
            </div>
          </div>
          <div>
            <a href="#" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>

            <div class="flex flex-col">
              <span class="text-gray-500">Men</span>
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Streetwear</a>
            </div>
          </div>
          <div>
            <a href="#" class="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
              <img src="https://images.unsplash.com/photo-1560269999-cef6ebd23ad3?auto=format&q=75&fit=crop&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
            </a>

            <div class="flex flex-col">
              <span class="text-gray-500">Women</span>
              <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">Sale</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ColeccionesComponent