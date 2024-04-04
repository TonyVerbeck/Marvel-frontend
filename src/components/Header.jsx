import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  return (
    <>
      <header>
        <div className="header-bloc">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="search-container">
            <div>
              <input
                placeholder="   Recherche ton personnage"
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
            <div>
              <input
                placeholder="   Recherche ton comic"
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
