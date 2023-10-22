
import React, { useState, useEffect } from "react"
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import {  useNavigate,Link,Route } from "react-router-dom";
import Home from "../home/home";
import "./login.css";
import AuthService from "../../auth/auth-service";
import ErrorPopup from "../popups/errorPopup";


import axios from "axios";
import Register from "../register/register";

function Login(){
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const [email,setEmail]=useState();
    const [Authenticated,setIsAuthenticated]=useState();
    const [showErrorPopup,setShowErrorPopup]=useState();
    const [errorMessage,setErrorMessage]=useState();
    const navigate=useNavigate();
    
    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('email')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }
     const showErrorPopups=()=>{
        setShowErrorPopup(true);
        }
        const closeErrorPopup=()=>{
            setShowErrorPopup(false);
        }
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            await AuthService.login(email,password).then(
                ()=>{
                   var role=localStorage.getItem('role');
                
                   if(role==="ADMIN")
                    navigate("/selector",{replace:true})
                   else
                    navigate("/home",{replace: true});
                    window.location.reload();
                    setIsAuthenticated(true);
                    localStorage.setItem("userName",email);

                },
                (error) => {
                    setShowErrorPopup(true);
                    setErrorMessage("system error");
                  console.log(error);
                }
            );
        }
        catch (err) {
            console.log(err);
          }

    };
    const LoginAuth={
        Authenticated
    }
     const navigateToRegister=()=>{
        navigate("/register",{replace: true});

     }
return(
    <div className="main">
    <div className="login-page">
    <div className="form">
    <div className="login">
    <div className="login-header">
    <h3>Login</h3>
    </div>
    <p>please enter credentials to login</p>
    
    </div>
        <form className="login-form" onSubmit={handleLogin}>
        <input type="email" 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <br/>
        <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
             />
                  <Icon onClick={handleToggle} className="eye-icon" icon={icon} size={20}/>
                <input className="submitBtn" type="submit" 
                value="login"/>
                <p className="message">Not registered? <a onClick={navigateToRegister} >Create an account</a></p>
                </form>
                
        </div>
        {
                    showErrorPopup &&(
                        <ErrorPopup isVisible={showErrorPopups} onClose={closeErrorPopup} name={errorMessage}/>
                    )
                 }
    
    </div>
    </div>
);
}
export default Login;