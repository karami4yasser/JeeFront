import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValues } from "./StateProvider";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
        if (auth) {
          router.push("/");
        }
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (auth) {
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            router.push("/");
            // ...
          });
          router.push("/");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  return (
    <div className="flex flex-col items-center content-center    h-4">
      <img
        onClick={() => {
          router.push("/");
        }}
        className="mr-auto ml-auto mt-5 mb-20 object-contain w-52 hidden forsmall:hidden"
        src="https://i.ibb.co/FzBsVJh/AGRI-1.png"
        alt=""
      />
      <div className="  items-center   object-contain flex flex-col">
        <form>
          <h5>e-mail</h5>
          <input
            className="h-8 px-2 mb-5 bg-slate-900 "
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>password</h5>
          <input
            className="h-8 px-2   mb-5 bg-slate-900  "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <button
          onClick={signIn}
          type="submit"
          className=" hover:bg-slate-700  bg-slate-900  h-14 w-56   border-2 mx-8  "
        >
          sign in
        </button>
        <p className="mx-7 my-2 text-xl">You dont have account..</p>
        <button
          onClick={()=>{  router.push("/signup")}}
          type="submit"
          className=" hover:bg-slate-700 whitespace-nowrap bg-slate-900 w-30 h-14 w-56   border-2 mx-8"
        >
          create account
        </button>
      </div>
    </div>
  );
}

export default Login;
