import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValues } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import Link from "next/link";
import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import React, { useState, useEffect } from "react";
//import axios from "./axios";
import axios from "axios";
import { useRouter } from "next/router";

const promise = loadStripe(
  "pk_test_51KJ4HQIzlOTnDTxIpD8fdaMlKNX1GJXaeZy7tEWlz8hSUfuOEgQlJd909LdTrPsPTrYzWULZuTk4zlq61D7ysSLh00Ti2F6mYr"
);

const Payment = () => {
  const [{ basket, user,user1 }, dispatch] = useStateValues();
  const history = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
   
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      if (getBasketTotal(basket) > 0) {
        const response = await axios({



          method: "post",
          // Stripe expects the total in a currencies subunits
          url: `https://stripeebackend.herokuapp.com/payments/create?total=${getBasketTotal(basket) * 100}`,
    headers:{"Access-Control-Allow-Origin":"*"},
        });
        setClientSecret(response.data.clientSecret);
      } else {
        history.push("/");
      }
    };

    getClientSecret();
  }, [basket]);
  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    const saveorder = async () => {
      const uid=Math.floor(Math.random()*100000)
      console.log(uid);
      const back=  await axios({
        method:'post',
        headers:{"Access-Control-Allow-Origin":"*"},
        url:'http://localhost:8080/api/order',
        data:{
              id:uid,
              status:"CLOSED",
              total:parseInt(getBasketTotal(basket)),
              secret:clientSecret,
            }
          }).then((res)=>{
            console.log(res);
            
             axios({
              method:'put',
              url:`http://localhost:8080/api/order/${uid}/custumer/${user.uid}`
            })
  
  
  for (let index = 0; index < basket.length; index++) {
    const item = basket[index];
    const uid2=Math.floor(Math.random()*100000)
  
    axios({
      method:'post',
      headers:{"Access-Control-Allow-Origin":"*"},
      url:'http://localhost:8080/api/orderitem',
      data:{
        id:uid2,
        line:uid2
      }
    }).then((res)=>{
      console.log(res);
  
      
  
        axios({
        method:'put',
        url:`http://localhost:8080/api/order/${uid}/orderitem/${uid2}/product/${item.id}/1`
      })
      
    })
    
  }
  
          
           
  
          })};


         
          /////////////////////////////////////////////////////
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        saveorder().then(()=>{
          setSucceeded(true);
        setError(null);
        setProcessing(false);


        dispatch({
          type: "EMPTY_BASKET",
        });

        history.push("/orders");})

       
        
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <Link href="/checkout ">
          <h1>Checkout ({basket?.length} items )</h1>
        </Link>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user1?.fullname}</p>
            <p>{user1?.adresse}</p>
            
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
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

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
