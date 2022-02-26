import { ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { forwardRef } from "react";
import { useStateValues } from "./StateProvider";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
function Order({ id, price,status }) {
  const [{ basket }, dispatch] = useStateValues();



//<orderitem/> + this order detais


 

  return (
    <div className="flex mt-4 mb-4 bg-slate-900 border-2">
      

      <div className="pd-4">
        <p className="text-xl ">Order Id: {id}</p>
        <p className="text-xl ">Order Status: {status}</p>
        <p className="text-xl">
          Order total :
          <small>$</small>
          <strong> {price}</strong>
        </p>
      </div>
    </div>
  );
}

export default Order;
