import React from 'react'

const TiendaHeaderComponent = () => {
  return (
    <div class="relative max-w-screen-xl p-4 px-4 mx-auto bg-white sm:px-6 lg:px-8 py-26 lg:mt-20">
        <div class="relative">
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
                    <div class="relative space-y-4">
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