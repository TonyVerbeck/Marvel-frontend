import marvel from "../assets/img/header-marvel.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="home" style={{ backgroundImage: `url(${marvel})` }}>
        <div className="btn-home">
          <Link to="/characters">
            <button>Personnages</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
        </div>
      </section>
    </>
  );
};
export default Home;
