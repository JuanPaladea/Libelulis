const posts = [
    {
      id: 1,
      title: '"El servicio al cliente aquí es de primera clase. El personal es amigable, eficiente y siempre está dispuesto a ir más allá para garantizar la satisfacción del cliente. Cada visita es una experiencia agradable, y aprecio la atención personalizada que brindan. ¡Altamente recomendado!"',
      date: 'Jul, 2023',
      datetime: '2020-03-16',
      author: {
        name: 'Carlos Maslatón',
        role: 'Cliente',
        imageUrl:
          'https://i.pravatar.cc/150?img=3',
      },
    },
    {
      id: 1,
      title: '"La atención que recibí en este negocio fue excepcional. Desde el momento en que entré, me trataron con cortesía y profesionalismo. Resolvieron todas mis dudas y se tomaron el tiempo necesario para asegurarse de que estuviera satisfecho con mi experiencia. ¡Volveré sin duda!"',
      date: 'Ene, 2024',
      datetime: '2020-03-16',
      author: {
        name: 'Javier Milei',
        role: 'Cliente',
        imageUrl:
          'https://i.pravatar.cc/150?img=4',
      },
    },
    {
      id: 1,
      title: '"¡Increíble atención al cliente! Siempre me siento valorado y escuchado cuando visito este negocio. El personal es amable y dispuesto a ayudar, lo cual hace que mi experiencia sea siempre positiva. Definitivamente recomendaría este lugar a mis amigos y familiares."',
      date: 'Sep, 2023',
      datetime: '2020-03-16',
      author: {
        name: 'Cristina Perez',
        role: 'Cliente',
        imageUrl:
          'https://i.pravatar.cc/150?img=5',
      },
    },
    // More posts...
  ]
  
  export default function SobreNosotrosBlogComponent() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros clientes</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Descubre lo que opinan de nosotros.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  