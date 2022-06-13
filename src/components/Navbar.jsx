import React from "react";
import "../styles/bootstrap.min.css";
import "../styles/Navbar.css";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  React.useEffect(() => console.log("Renderizando Navbar..."));

  return (
    <div className="container mt-2">
      <nav
        className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
             <span className="navbar-brand">Judie</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto mr-md-3">
              <li className="nav-item">
                  <Link className="nav-link" to="/">Principal</Link> 
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/pay">Pagar</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/crud">Crud</Link>   
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
