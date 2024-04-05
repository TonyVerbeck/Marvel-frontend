import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-bloc">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="btn-header">
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>

            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
