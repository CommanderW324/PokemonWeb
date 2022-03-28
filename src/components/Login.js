import React from "react";
import axios from "axios";
const Login = () => {
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const LOGIN_ENDPOINT = "";
const handleSubmit = () => {
    const userInfo = {
        username, password
    }
    axios.post(LOGIN_ENDPOINT, userInfo);
}
return (
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
  );
}
export default Login;