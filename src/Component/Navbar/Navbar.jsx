import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "./../../App.css";
import { Container } from "react-bootstrap";
import Logo from "./../../images/logo.png";
const Navbar = () => {
  return (
    <>
      <Container>
        <div className="navbar ">
          <img src={Logo}></img>
          <div className="navLinks">
            <a className="nav" href="#home">Home</a>
            <a className="nav" href="#about">About</a>
            <a className="nav" href="#token">Token</a>
            <Link to="/login">
              <button className="btnPrimary">Login</button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Navbar;
