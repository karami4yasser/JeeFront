import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { forwardRef } from "react";
import { useStateValues } from "./StateProvider";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import png from "../images/AGRI.png";

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = useStateValues();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="flex mt-4 mb-4">
      <Image
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
        {
          <button className="mt-2" onClick={removeFromBasket}>
            Remove from Basket
          </button>
        }
      </div>
    </div>
  );
}

export default CheckoutProduct;
