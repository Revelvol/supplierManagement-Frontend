import React, {useState, useEffect} from 'react';
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useNavigate } from 'react-router-dom';


const getTokenUrl = "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/token/";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const sigIn = useSignIn();
    const navigate = useNavigate(); 
   
  
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { email, password };
        const jsonData = JSON.stringify(payload);
        const response = await fetch(getTokenUrl, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: jsonData,
            });
        
        if (response.ok) {
            const data = await response.json();
            sigIn({
                token: data.token,
                expiresIn: 3600,
                tokenType: "Token",
                authState: {email:email}
            });
            navigate("/")
            } else {
            console.log('Request failed:', response.status);
            }
        
    };

 
    return (
        <div>
        <h1>Login </h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
            />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
            />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    );
    
  }


export default Login 