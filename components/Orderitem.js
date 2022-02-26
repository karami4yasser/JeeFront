import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { forwardRef } from "react";
import { useStateValues } from "./StateProvider";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
function Orderitem({ id, image, title, price, rating }) {
 
 

  return (
    <div className="flex mt-4 mb-4">
      <img
        className=" object-contain"
        width={"180px"}
        height={"180px"}
        src={image}
      />

      <div className="pd-4">
        <p className="text-xl ">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        
      </div>
    </div>
  );
}

export default Orderitem;
