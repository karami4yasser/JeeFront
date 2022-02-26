import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValues } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useRouter } from "next/router";

function Subtotal() {
  const [{ basket,user }, dispatch] = useStateValues();

  const router = useRouter();

  return (
    <div
      className="flexforsmall: mt-10 xl:ml-30
    flex-col content-between md:ml-14
     w-96 h-24 p-5 border-2 rounded border-solid border-black 
     bg-[#19191b] forsmall:mx-10 forsmall:px-10 "
    >
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        className="w-full h-7 bg-[#574d5b]"
        onClick={(e) => user && getBasketTotal(basket) > 0  ? router.push("/payment"):router.push("/login")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
