import React from "react";
import Subtotal from "./Subtotal";
import { useStateValues } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Order from "./Order";
import { useRouter } from "next/router";

import Header from "./Header";
function Orders() {


//<order/>


const [{ user,user1 }, dispatch] = useStateValues();
const basket =user1?.order;
console.log('tesssst');

console.log(basket);
console.log(basket?.length);
const router = useRouter();

  


  return (
    <div
      className="flex  w-[80vh]  flex-col
         md:flex-row md:items-start    p-4 b h-max
     items-center"
    >
      <div className=" w-full ">
        <div>
          <h3>hello ,{user ? user1.fullname : "Anonymo"}</h3>
          <div className="">
          <h2 className="mr-">Your Orders</h2>

          { basket?.map((item) => (
           <Order
              id={item.id}
              
              price={item.total}
              status={item.status}
             
            />
          ))
        }
        </div>
        </div>
      </div>
      <div className="checkout_right">
       
      </div>
    </div>
  );
}
export default Orders;
