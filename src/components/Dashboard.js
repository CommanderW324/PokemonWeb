import axios from "axios";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js"
import Button from '@mui/material/Button'

const Dashboard = () => {

const POKEMON_API_URL = 'http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/pokemon/capturedpokemon/';
const VERIFY_API_URL = 'http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/auth/jwt/verify/'
const REFRESH_API_URL = 'http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/auth/jwt/refresh/'
const [refToken, setrefreshToken] = React.useState(localStorage.getItem('refreshToken'));
const [ownedPokemon, setOwnedPokemon] = React.useState([]);
const [accessToken, setAccessToken] = React.useState(localStorage.getItem('accessToken'));
const RELEASE_POKEMON_URL = "http://ec2-3-86-178-239.compute-1.amazonaws.com:4000/pokemon/releasepokemon/"
const navigate = useNavigate();
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
useEffect(()=>{
  async function getOwnedPokemon(){
    try{
      const response = await axios.get(POKEMON_API_URL, {
        headers: {
          'Authorization': `JWT ${accessToken}` 
        }
      })
      setOwnedPokemon(response.data);
    } catch(e) {
        console.error(e);
        refreshToken();
    }
  }
  getOwnedPokemon();
}, [refToken])
if(accessToken == null) {
  navigate('/login');
}
const handleDelete = async (id) => {
  const captured_pokemon = {
    id
  }
  try{
      const response = await axios.post(RELEASE_POKEMON_URL, captured_pokemon, {headers: {
      'Authorization': `JWT ${accessToken}` 
          }
          });
  } catch(e) {
      refreshToken();
  }
}
return (
    <div>
      <Header/>
       Hello ! This is a list of all your captured pokemon!
        {ownedPokemon.map((pokemon => {
          return(
          <>
            <ul>
                {pokemon.id} {pokemon.name} {pokemon.hp} {pokemon.attack} {pokemon.defense} {pokemon.type} <Button variant="contained" onClick={handleDelete(pokemon.id)}> Delete Pokemon</Button>
            </ul>
            
          </>
          
          )
        }))}
    </div>
  );
}
export default Dashboard;
