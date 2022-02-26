import Orders from "../components/Orders";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "../components/firebase";
import { useStateValues } from "../components/StateProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
function orders() {
 

    const [{ user,user1 }, dispatch] = useStateValues();
  const basket =user1?.order;
  console.log('tesssst');
  
  console.log(basket);
  console.log(basket?.length);
  const router = useRouter();


  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("thu user is", authUser);
      if (authUser) {


        const get = async () => {
          const response = await axios(
            {
              method:'get',
          url:`http://localhost:8080/api/custumer/${authUser.uid}`,
        

            }
          );
          console.log(response.data);
        

  
       
          dispatch({
         type: "SET_USER",
         user: authUser,
         user1: response.data,
          username:response.data.fullname,
       adresse:response.data.adresse
        
       })
        };

          get();
          //dispatch({
          //  type: "SET_USER",
          //  user: authUser,
            //user1: response.data,
             //username:response.data.fullname,
          //adresse:response.data.adresse
           
         // })


       
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
          user1: null,
           username:"",
        adresse:""
         
        });
      }
    });
  }, []);
  
  return (
    <div>
      <Header />
      <div
      className="flex flex-col md:flex-row md:items-start   p-4 b h-max
     items-center"
    >
      <div className="checkout_left">
        <Orders/>
      </div>
      <div className="checkout_right">
       
      </div>
    </div>
    </div>
  );
}








export default orders;
