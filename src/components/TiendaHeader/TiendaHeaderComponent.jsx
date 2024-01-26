import React from 'react'

const TiendaHeaderComponent = () => {
  return (
    <div class="relative isolate overflow-hidden bg-white lg:overflow-visible flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 my-24">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div class="ml-auto lg:col-start-2 lg:max-w-2xl">
                  <h4 class="mt-2 text-4xl font-extrabold tracking-tight leading-8 text-gray-900 sm:leading-9">
                      Tienda oficial de Libelulis
                  </h4>
                  <p class="mt-4 text-lg leading-6 text-gray-500 00">
                      En está sección encontrarán todos los productos ofrecidos por Libelulis
                  </p>
              </div>
              <div class="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
                  <div class="relative space-y-4 px-4">
                      <div class="flex items-end justify-center space-x-4 lg:justify-start">
                          <img class="w-32 rounded-lg shadow-lg md:w-56" width="200" src="https://i.imgur.com/VMBVKFF.jpg" alt="1"/>
                          <img class="w-40 rounded-lg shadow-lg md:w-64" width="260" src="https://i.imgur.com/znk6v9O.jpg" alt="2"/>
                      </div>
                      <div class="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                          <img class="w-24 rounded-lg shadow-lg md:w-40" width="170" src="https://i.imgur.com/1uG5oOB.jpg" alt="3"/>
                          <img class="w-32 rounded-lg shadow-lg md:w-56" width="200" src="https://i.imgur.com/KNIG51C.jpg" alt="4"/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default TiendaHeaderComponent