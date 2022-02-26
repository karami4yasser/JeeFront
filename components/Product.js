import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { forwardRef } from "react";
import { useStateValues } from "./StateProvider";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import png from "../images/AGRI.png";
const Product = forwardRef(({ result }, ref) => {
  const [{ basket }, dispatch] = useStateValues();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: result.id,

        title: result.title,
        image: result.image,
        price: result.price,
        rating:result.rating,

        description: result.description,
        category: result.category,
      },
    });
  };

  return (
    <div
      ref={ref}
      id={result.id}
      className="group  border-2 forsmall:border-2 
       cursor-pointer p-4 m-2 
        
          
          hover:z-50 "
    >
      <Image
        src={result.image}
        height={1080}
        width={1920}
        layout="responsive"
        className="max-w-sm max-h-sm mb-3 object-contain "
      />
      <div className="p-2">
        <p className="truncate max-w-md">{result.description}</p>
        <h2 className="mt-1 text-2xl whitespace-nowrap truncate
          text-white  group-hover:font-bold">
          {result.title}
        </h2>
        <p
          className="flex items-center opacity-100 forsmall:opacity-100
        
        group-hover:font-bold"
        >
          {result.category}
          <div className="flex">
            {Array(result.rating)
              .fill()
              .map((_, i) => (
                <StarIconSolid key={i} className="h-5 text-yellow-500" />
              ))}
            {result.rating < 5 &&
              Array(5 - 5)
                .fill()
                .map((_, i) => <StarIconOutline key={i} className="h-5" />)}
          </div>
        </p>
      </div>
      <div
        className=" text-xl flex  justify-between px-10 
        space-x-16 items-center	  p-2 "
      >
        <p className="text-2xl">
          <small>$</small>
          <strong>{result.price.toFixed(2)}</strong>
        </p>
        <button
          className="bg-[#000000]
           active:text-red-500  left-0  border-0  whitespace-nowrap
         "
          onClick={addToBasket}
        >
          {" "}
          Add to Basket
        </button>
      </div>
    </div>
  );
});

export default Product;
