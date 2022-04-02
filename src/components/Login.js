import React from "react";
import axios from "axios";
import Header from "./Header.js"
import { useNavigate } from "react-router-dom";

const Login = () => {
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [regusername, setregUsername] = React.useState("");
const [regpassword, setregPassword] = React.useState("");
const [regemail, setregEmail] = React.useState("");
const [repassword, setrePassword] = React.useState("");
const [message, setMessage] = React.useState("");
const LOGIN_ENDPOINT = "http://ec2-3-86-178-239.compute-1.amazonaws.com:8000/auth/jwt/create";
const REGISTER_ENDPOINT = "http://ec2-3-86-178-239.compute-1.amazonaws.com:8000/auth/users/create"
const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
  
    const userInfo = {
        username, password,
    }
    const response = await axios.post(LOGIN_ENDPOINT, userInfo);
    console.log(response);
    if(response.status == 200) {
      const access_token = response.data.access;
      const refresh_token = response.data.refresh;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      navigate('/dashboard')
    } else {
        setMessage("Unsuccessful Login, Wrong Username/Password");
    }
    
    
}

const handleSubmitRegister = async (event) => {
  event.preventDefault();
  
    const userInfo = {
        username:regusername, password: regpassword, re_password: regpassword,
        email:regemail
    }
    const response = await axios.post(LOGIN_ENDPOINT, userInfo);
    console.log(response);
    if(response.status == 200) {
      const access_token = response.data.access;
      const refresh_token = response.data.refresh;
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      navigate('/dashboard')
    } else {
        setMessage("Unsuccessful Login, Wrong Username/Password");
    }
    
    
}
return (
    <div>
      <Header/>
        <form
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="loginusername"
          placeholder="Username"
          value={username}
          onChange = {(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="loginpassword"
          placeholder="Password"
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="form-submit">
          Login
        </button>
        
      </form>
      <form
        onSubmit={handleSubmitRegister}
      >

        <input
          type="text"
          placeholder="Username"
          value={regusername}
          onChange = {(e) => setregUsername(e.target.value)}
        />
        <input
          type="email"
          name="register"
          placeholder="email"
          value={regemail}
          onChange = {(e) => setregEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={regpassword}
          onChange = {(e) => setregPassword(e.target.value)}
        />
        
        <button type="submit" className="form-submit">
          Login
        </button>
        
      </form>
      {message}
    </div>
    
  );
}
export default Login;