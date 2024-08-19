import './Login.module.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';


const Login = () => {
    const clientID = "627705116578-nv0d4j8hkqq1e89cqotp0pid7ll1vnf4.apps.googleusercontent.com"
    const [user, setUser] = useState({});
    const [loggeIn, setLoggetInfo] = useState(false); 
  
    const onSuccess = (response) => {
      setUser(response.profileObj);
      document.getElementsByClassName("btn").hidden = true;
    }
    const onFailure = (response) => {
      console.log("Something went wrong");
    }
    const handleLogout  = () => {
      setUser({}); 
    }
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: clientID,
        });
      }
      gapi.load("client:auth2", start);
    });
  
    return (
      <div className="center">
        <h1>Login</h1>
      
        <div className='btn'>
  
          <GoogleLogin
           
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText="Continue  with Google"
            cookiePolicy={"single_host_origin"}
          />
  
        </div>
  
        <div class={user ? "profile" : "hidden"}>
          <img src={user.imageUrl} />
          <h3>{user.name}</h3>
    
        </div>
  
  
  
      </div>
      );
}

export default Login