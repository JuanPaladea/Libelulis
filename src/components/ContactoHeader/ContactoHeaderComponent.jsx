import React from 'react'

const ContactoHeaderComponent = () => {
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
    <section class="mx-auto max-w-7xl px-4 py-48">
      <div class="mb-8 flex flex-wrap justify-between md:mb-16">
        <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3">
          <h1 class="mb-4 text-4xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl">Contacto</h1>

          <p class="max-w-md leading-relaxed text-gray-500 xl:text-lg">Completa nuestro formulario para ponerte en contacto con nosotros</p>
        </div>
        <div class="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div class="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <img src="https://i.imgur.com/NlMPJlO.jpg" loading="lazy" alt="Photo by Kaung Htet" class="h-full w-full object-cover object-center" />
          </div>

          <div class="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <img src="https://i.imgur.com/d921rP1.jpg" loading="lazy" alt="Photo by Manny Moreno" class="h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default ContactoHeaderComponent