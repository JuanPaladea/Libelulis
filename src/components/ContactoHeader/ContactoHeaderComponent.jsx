import React from 'react'

const ContactoHeaderComponent = () => {
  return (
    <div class="relative max-w-screen-xl p-4 px-4 mx-auto bg-white dark:bg-gray-800 sm:px-6 lg:px-8 py-26 lg:mt-20">
        <div class="relative">
            <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div class="ml-auto lg:col-start-2 lg:max-w-2xl">
                    <h4 class="mt-2 text-2xl font-extrabold leading-8 text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                        Contacto
                    </h4>
                    <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                    ¡Nos encantaría escucharte! Si tienes alguna pregunta, comentario o simplemente quieres ponerte en contacto con nosotros, no dudes en hacerlo. Puedes comunicarte con nosotros a través del formulario de contacto o también puedes encontrarnos en nuestras redes sociales. ¡Esperamos saber de ti pronto!
                    </p>
                </div>
                <div class="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
                    <div class="relative space-y-4">
                        <div class="flex items-end justify-center space-x-4 lg:justify-start">
                            <img class="w-32 rounded-lg shadow-lg md:w-56" width="200" src="/images/object/8.jpg" alt="1"/>
                            <img class="w-40 rounded-lg shadow-lg md:w-64" width="260" src="/images/landscape/4.jpg" alt="2"/>
                        </div>
                        <div class="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                            <img class="w-24 rounded-lg shadow-lg md:w-40" width="170" src="/images/landscape/3.jpg" alt="3"/>
                            <img class="w-32 rounded-lg shadow-lg md:w-56" width="200" src="/images/object/9.jpg" alt="4"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    </div>
  )
}

export default ContactoHeaderComponent