import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DEFAULT_TRIES = 3;
const DEFAULT_RANGE = 5;
const DEFAULT_MIN = 0;
const CATCH_POKEMON_URL='http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/pokemon/capturedpokemon/';
const CatchPokemon = () => {
const handleGameStart = () => {
    if(isPlaying) {
        throw Error("You are already playing");
    }
    const randomNumber = Math.floor(Math.random() * DEFAULT_RANGE + DEFAULT_MIN);
    setHiddenNumber(randomNumber);
    setTries(0);
    setIsPlaying(true);
    setIsWon(false);
    setIsLost(false);
    setGuess(-1);
    setid(0);
    setPokemonName("");
}
const handleGuess = (event) => {
    event.preventDefault();
    if(guess == hiddenNumber && tries < 3) {
        setIsWon(true);
        setIsPlaying(false);
        

    } else if(tries == 2){
        setIsLost(true);
        setIsPlaying(false);
    } else {
        setTries(tries + 1);
    }
}
const [isPlaying, setIsPlaying] = React.useState(false);
const [guess, setGuess] = React.useState(-1);
const [isWon, setIsWon] = React.useState(false);
const [isLost, setIsLost] = React.useState(false);
const [tries, setTries] = React.useState(0);
const [pokemonName, setPokemonName] = React.useState("");
const [hiddenNumber, setHiddenNumber] = React.useState(0);
const [id, setid] = React.useState(0);
const[accessToken, setAccessToken] = React.useState(localStorage.getItem('accessToken'));
const[refToken, setRefToken] = React.useState(localStorage.getItem("refreshToken"));
const WILD_POKEMON_URL = 'http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/pokemon/wildpokemon/'
const REFRESH_API_URL = 'http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/auth/jwt/refresh/'
const navigate = useNavigate();
useEffect(() => {
    async function getWildPokemon() {
        const response = await axios.get(WILD_POKEMON_URL);
        console.log(response);
        const randomizer = Math.floor(Math.random() * response.data.length);

        setPokemonName(response.data[randomizer].name);
        setid(response.data[randomizer].id);
    }
    if(isPlaying == true) {
        getWildPokemon();
    }
},[isPlaying]);
useEffect(()=>{
    async function refreshToken(){
        try{
          const tokenInfo = {
            refresh: refToken
          }
          const response = await axios.post(REFRESH_API_URL, tokenInfo);
          if(response.status == 200) {
            setAccessToken(response.data.access);
            localStorage.setItem('accessToken', response.data.access);
          } else {
            navigate('/login');
          }
        } catch(e) {
          console.error(e);
          navigate('/login');
        }
      }
    async function postCapturePokemon() {
        const captured_pokemon = {
            id, level:hiddenNumber
        }
        try{
            const response = await axios.post(CATCH_POKEMON_URL, captured_pokemon, {headers: {
            'Authorization': `JWT ${accessToken}` 
                }
                });
        } catch(e) {
            refreshToken();
        }
        
    }
    if(isWon == true) {
        postCapturePokemon();
    }
},[isWon, accessToken]);
if(accessToken == null) {
    navigate('/login');
  }
if(isWon) {
    return (
        <div>
            Congratz you have won ! The hidden number is {hiddenNumber}
            <button onClick={handleGameStart}> Play Again </button>
        </div>
      );
}
if(isLost) {
    return (
        <div>
            Owh You lost! The hidden number is {hiddenNumber}
            <button onClick={handleGameStart}> Play Again </button>
        </div>
      );
}
if(isPlaying) {
    return (<div>
        Put in some number !
        The Pokemon in view is {pokemonName}  | Current Guess = {guess == -1 ? 'No previous guess' : guess} | Current Tries = {tries}
        <form onSubmit={handleGuess}>
            <input
                type="number"
                onChange = {(e) => {setGuess(e.target.value)}}
            
            />
            <button type="submit">
                Guess
            </button>
      
        </form>
    </div>)
} else  {
    return (
        <div>
            Hello You can catch a pokemon here !
            <button onClick={handleGameStart}> Start Playing </button>
        </div>
      );
}

}
export default CatchPokemon;