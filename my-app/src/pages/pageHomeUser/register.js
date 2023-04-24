import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RegisterForm } from "../../components/style";

const url =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/create/";
const getTokenUrl =
  "http://ec2-54-199-2-15.ap-northeast-1.compute.amazonaws.com/api/user/token/";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [staff, setStaff] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  // check wheter password 1 == pasword 2, fix this with raise error
  function checkPassword(password1, password2) {
    // return password1===password2 ? password1 : NaN
    return password1;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = checkPassword(password1, password2);
    // check if password is valid
    if (!password) {
      throw new Error("Password Do not Match ");
    }
    const payload = { name, email, password, is_staff: staff };
    const jsonData = JSON.stringify(payload);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const userData = await response.json();
    // if response is ok, get the token for sign up it response in the user detail
    if (response.ok) {
      const tokenResponse = await fetch(getTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const data = await tokenResponse.json();
      console.log(response.data);
      signIn({
        token: data.token,
        expiresIn: 3600,
        tokenType: "Token",
        authState: userData,
      });
      navigate("/");
    } else {
      let alertMessage = "";
      if (userData.email) {
        alertMessage = alertMessage + userData.email + "\n";
        document.getElementById("email").value = "";
      }
      if (userData.password) {
        alertMessage = alertMessage + userData.password;
        document.getElementById("password1").value = "";
        document.getElementById("password2").value = "";
      }
      alert(alertMessage);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword1Change = (event) => {
    setPassword1(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };
  const handleStaffChange = () => {
    setStaff(!staff);
  };

  return (
    <RegisterForm>
      <h1>Register </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="string"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={handlePassword1Change}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">Reconfirm password</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={handlePassword2Change}
            required
          />
        </div>
        <div>
          <label htmlFor="staff">Staff:</label>
          <input
            type="checkbox"
            id="staff"
            name="staff"
            onChange={handleStaffChange}
          />
        </div>
        <button type="submit" >Register</button>
        <Link to="/login">Login</Link>
      </form>
    </RegisterForm>
  );
}

export default Register;
