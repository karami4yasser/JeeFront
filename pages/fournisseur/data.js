import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Resultsf from "../../components/Resultsf";
import requests from "../../utils/requests";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "../../components/firebase";
import { useStateValues } from "../../components/StateProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function Home({ results }) {
  const [{ four }, dispatch] = useStateValues();
  const router = useRouter();

  useEffect(() => {},
     []);
     
     
  return (
    
    <div>
      
      <Head>
        <title>Agri</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/AGRI (1).ico" />
      </Head>


 { four? <div className="flex flex-col items-center pt-10">
    <div className="flex flex-col items-stretch">
      <p>
        {four?.name}
      </p>
      <button onClick={()=>{
        dispatch({
          type: "SET_FOUR",
          four: null,
         
         
        });
        
        router.push('/')}} > disconnect </button>
      </div>
        {four ? <Resultsf results={four?.product} /> : console.log('')}
        </div> : console.log('')}
    </div>
  );
}


