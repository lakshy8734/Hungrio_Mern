import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./Signup.css";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setCredentials({ ...credentials, password: newPassword });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Geolocation:", credentials.geolocation);

    const response = await fetch("https://backend-bkc0.onrender.com/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        geolocation: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="container">
        <form
          className="w-50 m-auto mt-5 border form-container2 rounded"
          onSubmit={handleSubmit}
        >
          <p className="titlee">Sign up</p>
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder='"Enter your Full Name"'
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder='"Enter your Email Address"'
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="geolocation"
                placeholder='"Enter your Current Address"'
                value={credentials.geolocation}
                onChange={onChange}
                aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"} // Show password if showPassword is true
                placeholder='"Enter your Password"'
                className="form-control"
                value={credentials.password}
                onChange={handlePasswordChange}
                name="password"
              />
              {/* Toggle password visibility */}
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <PasswordStrengthMeter password={credentials.password} />
          </div>
          <div className="grou">
            <button type="submit" className="btn-53 m-3">
              <div className="original">Submit</div>
              <div className="letters">
                <span>S</span>
                <span>u</span>
                <span>b</span>
                <span>m</span>
                <span>i</span>
                <span>t</span>
              </div>
            </button>

            <Link to="/login" className="btn-53 m-3">
              <div className="original">Login</div>
              <div className="letters">
                <span>L</span>
                <span>o</span>
                <span>g</span>
                <span>i</span>
                <span>n</span>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
