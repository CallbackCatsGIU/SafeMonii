import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Transactions from "../pages/Transactions";

export default function Navbar() {
  function signOut(){
    window.localStorage.clear(), (window.location.replace("http://localhost:3000"));
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-center">
      <ul className="navbar-nav ">
        <a className="navbar-brand">SafeMonii</a>
      </ul>
      <u1 className="navbar-nav ">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href='#' onClick={signOut}>Sign Out</a>
        </li>
      </u1>
    </nav>
  );
}
