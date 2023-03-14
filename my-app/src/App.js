import './App.css';
import React, {useState} from 'react';
import { Routes, Route,} from 'react-router-dom';
import Home from './pages/home';




const getTokenUrl = "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/token/";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const data = await response.json();
    console.log(data.token); 
  };

  if (!isAuthenticated) {
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" />
      </Routes>
    </>
  );
}


export default App;
