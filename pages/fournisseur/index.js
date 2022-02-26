import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValues } from "../../components/StateProvider";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";
import axios from "axios";


function Login() {
  const [{ _ }, dispatch] = useStateValues();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const get = async (email) => {
    const response = await axios(
      {
        method:'get',
    url:`http://localhost:8080/api/fournisseur/${email}`,
  

      }
    );
    console.log(response.data);
    console.log("test");
    dispatch({
      type: "SET_FOUR",
      four: response.data,
     
     
    })
    router.push('/fournisseur/data');
  };
  const signIn = (e) => {

    e.preventDefault();



    get(email)
      .then((res) => {
        // Signed in
        const four = res.data;
        dispatch({
          type: "SET_FOUR",
          four: four,
         
         
        })
        console.log("test");
        console.log(res.data);
        router.push('/');

        
        // ...
      })

      .catch((error) => {
        const errorCode = error.code;
        if(errorCode=404){
          alert('ID does not exist');
        }
        
        const errorMessage = error.message;
        //alert(errorMessage);
      });
  };


  return (
    <div className="flex flex-col items-center content-center    h-4">
      <img
       
        className="mr-auto ml-auto mt-5 mb-20 object-contain w-52 hidden forsmall:hidden"
        src="https://i.ibb.co/FzBsVJh/AGRI-1.png"
        alt=""
      />
      <div className="  items-center   object-contain flex flex-col">
        <form>
          <h5>YOUR ID</h5>
          <input
            className="h-8 px-2 mb-5 bg-slate-900 "
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        
        </form>
        <button
          onClick={signIn}
          type="submit"
          className=" hover:bg-slate-700  bg-slate-900  h-14 w-56   border-2 mx-8  "
        >
          sign in
        </button>
        
      </div>
    </div>
  );
}

export default Login;
