import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Nav = styled.nav`
  padding-top: 10px;
  padding-bottom: 10px;
  height: 50px;
`;

const NavBar = () => {
  return (
    <Nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div className="container">
        {" "}
        <NavLink className="navbar-brand logo" to="/">
          {" "}
          Gorzej Sp Zoo
        </NavLink>
        <button
          data-toggle="collapse"
          className="navbar-toggler"
          data-target="#navcol-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item" role="presentation">
              <NavLink
                className="nav-link active"
                style={{ fontSize: "large" }}
                to="/"
              >
                Dziś
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                className="nav-link active"
                style={{ fontSize: "large" }}
                to="/week"
              >
                tydzień
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};
export default NavBar;
