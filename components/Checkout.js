import React from "react";
import Subtotal from "./Subtotal";
import { useStateValues } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Header from "./Header";
function Checkout() {
  const [{ user, basket,username }, dispatch] = useStateValues();

  return (
    <div
      className="flex flex-col md:flex-row md:items-start   p-4 b h-max
     items-center"
    >
      <div className="checkout_left">
        <div>
          <h3>hello ,{user ? username : "Anonymo"}</h3>
          <h2 className="mr-">Your Shoping Basket</h2>

          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}
const cp = React.Component(<Header />);
export default Checkout;
