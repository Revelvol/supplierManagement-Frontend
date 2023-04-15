import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

const getTokenUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/token/";
const getUserDetailUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/me/";
const demoEmail = "example123123@example.com";
const demoPassword = "123123123";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleDemo = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });

    if (response.ok) {
      const data = await response.json();
      // if response is ok, get the detail of the user
      const userDetail = await fetch(getUserDetailUrl, {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      });
      const userDetailData = await userDetail.json();
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: "Token",
        authState: userDetailData,
      });
      navigate("/");
    } else {
      if (response.ok) {
        const data = await response.json();
        // if response is ok, get the detail of the user
        const userDetail = await fetch(getUserDetailUrl, {
          headers: {
            Authorization: `Token ${data.token}`,
          },
        });
        const userDetailData = await userDetail.json();
        signIn({
          token: data.token,
          expiresIn: 3600,
          tokenType: "Token",
          authState: userDetailData,
        });
        navigate("/");
      } else {
        // clear the form
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        // show an alert to the user
        alert("Username or password is incorrect.");
      }
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
      <button type="button" onClick={handleDemo}>
        demo
      </button>
      <Link to="/register"> Register</Link>
    </div>
  );
}

export default Login;
