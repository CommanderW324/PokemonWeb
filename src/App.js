import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"
import Header from "./components/Header.js";

function App() {
  const [data, setData] = React.useState([]);
  const API_URL = 'http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/pokemon/allpokemon';
  useEffect(()=>{
    async function getWildPokemon() {
      const axios = require('axios');
      const wildPokemon = await axios.get(API_URL);
      console.log(wildPokemon);
      setData(wildPokemon.data);
    }
    getWildPokemon();
  }, [])
  return (
    <div>
      This is a list of all pokemon available
      <Header/>
      {
        data.map((pokemon) => {
          return(
            <ul>
              {pokemon.id} {pokemon.name}
            </ul>
          )
        })
      }
      
    </div>
  );
}

export default App;
