import React from 'react';
import styled from "styled-components";

const Nav = styled.nav`
  padding-top: 10px;
  padding-bottom: 10px;
  height: 50px;
`;

const NavBar =()=> {
  return (
    <Nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
      <div className="container"><a className="navbar-brand logo" href="index.html">Gorzej Sp Zoo</a>
        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span
          className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse"
             id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item" role="presentation"><a className="nav-link active" style={{fontSize: 'large'}} href="index.html">Dziś</a>
            </li>
            <li className="nav-item" role="presentation"><a className="nav-link active" style={{fontSize: 'large'}} href="index.html">tydzień</a>
            </li>
            <li className="nav-item" role="presentation"><a className="nav-link active" style={{fontSize: 'large'}} href="index.html">miesiąc</a>
            </li>
            <li className="nav-item" role="presentation"><a className="nav-link active" style={{fontSize: 'large'}} href="index.html">wybierz
              datę</a></li>
          </ul>
        </div>
      </div>
    </Nav>
  );
}
export default NavBar;
