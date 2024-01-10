import { Carousel } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function CarouselComponent({img1, img2, img3, product}) {
  return (
    <Carousel transition={{ duration: 0.5 }} className="rounded-xl z-20">
        <Link to={`/item/${product.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={img1}
            alt="image 1"
            className="h-full w-full object-cover hover:opacity-75"
            />
        </Link>
        <Link to={`/item/${product.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={img2}
            alt="image 2"
            className="h-full w-full object-cover hover:opacity-75"
          />
        </Link>
        <Link to={`/item/${product.id}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={img3}
            alt="image 3"
            className="h-full w-full object-cover hover:opacity-75"
          />
        </Link>

    </Carousel>
  );
}