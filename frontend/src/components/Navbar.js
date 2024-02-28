/* eslint-disable react/jsx-no-undef */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import "./Navbar.css";
export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  // console.log("navbar:", localStorage.getItem("token"));
  localStorage.setItem("temp", "first");
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
        style={{
          background:
            "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)",
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Hungrio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link navhov fs-5 mx-3 active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>{" "}
                {/* index.css - nav-link color white */}
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link navhov fs-5 mx-3 active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link className="btn-53" to="/login">
                  <div className="original">Login</div>
                  <div className="letters">
                    <span>L</span>
                    <span>o</span>
                    <span>g</span>
                    <span>i</span>
                    <span>n</span>
                  </div>
                </Link>

                {/* Signup link */}
                <Link className="btn-53" to="/signup">
                  <div className="original">Signup</div>
                  <div className="letters">
                    <span>S</span>
                    <span>i</span>
                    <span>g</span>
                    <span>n</span>
                    <span>u</span>
                    <span>p</span>
                  </div>
                </Link>
              </form>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2 "
                  onClick={loadCart}
                >
                  <Badge
                    color="secondary"
                    badgeContent={items.length}
                    overlap="rectangular"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}

                <button
                  onClick={handleLogout}
                  className="btn bg-white text-success"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
