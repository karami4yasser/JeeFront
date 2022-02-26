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
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";

function user() {
  const [email, setEmail] = useState("my email");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("yasser karami");
  const router = useRouter();
  const signout = () => {
    if (user) {
      signOut(auth);
      router.push("/");
    }
  };

  const [{ user }, dispatch] = useStateValues();

  let json = "no one";
  let id = "516564859891512591";

  let adresse = "adresse dyali alkhawa";

  return (
    <div className="flex flex-col w-300 object-contain  items-center pt-10 content-evenly">
      <form>
        <h5>name</h5>
        <input
          className="h-8 px-2 mb-5 bg-slate-900 "
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h5>e-mail</h5>
        <input
          className="h-8 px-2 mb-5 bg-slate-900 "
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h5>password</h5>
        <input
          className="h-8 px-2  w-auto mb-5 bg-slate-900  "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <button onClick={signout}>sign out</button>
    </div>
  );
}

export default user;
