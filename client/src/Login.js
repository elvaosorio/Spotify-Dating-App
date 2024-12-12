/* eslint-disable */
import React from "react";
import "./Login.css";
//import { accessUrl } from "./spotify";
//import { accessUrl } from "./spotify";
// <a href={accessUrl}> LOGIN WITH SPOTIFY</a>
function Login({ user, artists }) {
  return (
    <div className="login">
      <a href={"http://localhost:3001/login"}> Login to Spotify </a>
    </div>
  );
}

export default Login;
