export default function SobreNosotrosHeaderComponent() {
  return (
    <div class="relative isolate overflow-hidden bg-white px-6 py-12 lg:overflow-visible lg:px-0">
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
      <div class="mx-auto max-w-7xl px-5">
        <div class="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div class="my-auto">
            <div class="h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
              <img src="https://i.imgur.com/VccJ76t.jpg" loading="lazy" alt="Photo by Martin Sanchez" class="h-full w-full object-cover object-center" />
            </div>
          </div>
          <div class="md:pt-8">
            <p class="text-center font-bold text-indigo-500 md:text-left">Libelulis</p>

            <h1 class="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6 md:text-left">Sobre nosotros</h1>

            <p class="mb-6 text-gray-500 sm:text-lg md:mb-8">
            En Libelulis, nos apasiona la moda y nos enorgullece ofrecer a nuestros clientes una experiencia de compra excepcional. Creemos en la importancia de vestirse con confianza y estilo, y nos esforzamos por brindar prendas de alta calidad y asequibles que reflejen las últimas tendencias.<br /><br />
            </p>

            <h2 class="mb-2 text-center text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4 md:text-left">Nosotros</h2>

            <p class="mb-6 text-gray-500 sm:text-lg md:mb-8">Nuestro equipo está compuesto por un grupo de diseñadores apasionados y expertos en moda, dedicados a seleccionar cuidadosamente cada artículo en nuestra colección. Desde ropa casual hasta prendas formales, nos aseguramos de que cada pieza que ofrecemos cumpla con nuestros estándares de calidad y estilo. Trabajamos con proveedores confiables y éticos, priorizando la sostenibilidad y la responsabilidad social en todo nuestro proceso de producción.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
