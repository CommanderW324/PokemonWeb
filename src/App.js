import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"
import * as components from "./components";

function App() {
  const initialLoginState = () => {
    if (!localStorage.hasOwnProperty("dollarfinderlogin")) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem("dollarfinderlogin")).loginState;
    }
  };
  const [loginState, setLoginState] = React.useState(initialLoginState());

  return (
    <div className="body">
      Halo World
    </div>
  );
}

export default App;
