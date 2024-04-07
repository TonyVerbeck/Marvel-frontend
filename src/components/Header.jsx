import React from "react";
import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  return (
    <>
      <header>
        <div className="header-bloc">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          {token ? (
            <>
              <div className="btn-header">
                <button
                  className="btn-disconnect"
                  onClick={() => {
                    handleToken(null);
                  }}
                >
                  Se déconnecter
                </button>
                <Link to="/favoris">
                  <button className="btn-favoris">Favoris</button>
                </Link>
              </div>
            </>
          ) : (
            <div className="btn-header">
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
