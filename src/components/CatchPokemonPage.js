import axios from "axios";
import React, { useEffect } from "react";
import CatchPokemon from "./CatchPokemon";
import Header from "./Header";

const CatchPokemonPage = () => {
return (
    <div>
        <Header/>
        <CatchPokemon/>
    </div>
  );
}
export default CatchPokemonPage;
