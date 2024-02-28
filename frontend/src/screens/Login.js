import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./ScreensCss.css";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://backend-bkc0.onrender.com/api/login", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", json.authToken);
      // console.log("login:", json.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form
          className="w-50 m-auto mt-5 form-container border-success rounded"
          onSubmit={handleSubmit}
        >
          <p className="titlee">Login</p>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone.
            </div>
          </div>
          <div className="m-3 password-input">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Show password if showPassword is true
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
            {/* Toggle password visibility */}
            <div className="eye-icon1" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="grou">
            <button type="submit" className="btn-53 m-3">
              <div className="original">Sign in</div>
              <div className="letters">
                <span>S</span>
                <span>i</span>
                <span>g</span>
                <span>n</span>
                <span>&nbsp;</span>
                <span>i</span>
                <span>n</span>
              </div>
            </button>
            <Link to="/signup" className="btn-53 m-3">
              <div className="original">New User</div>
              <div className="letters">
                <span>N</span>
                <span>e</span>
                <span>w</span>
                <span>&nbsp;</span>
                <span>U</span>
                <span>s</span>
                <span>e</span>
                <span>r</span>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
