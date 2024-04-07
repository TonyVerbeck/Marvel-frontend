import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart, faHeartCrack);

const Comics = ({ search, setSearch, token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setresultsPerPage] = useState(27);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://site--marvel-backend--z2glzylh58rz.code.run/comics?title=${search}`
          `http://localhost:3000/comics?title=${search}`
        );

        console.log(response.data);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [search, setSearch]);

  const lastItem = currentPage * resultsPerPage;
  const firstItem = lastItem - resultsPerPage;
  const currentItem = data.slice(firstItem, lastItem);

  return isLoading ? (
    <p className="waiting">Un peu de patience...</p>
  ) : (
    <main className="cards-main">
      <div className="search-container">
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
      <div className="comic-container">
        {currentItem.map((comic) => {
          return (
            <div key={comic._id}>
              <article className="comic-card-info" style={{ color: "white" }}>
                <div className="card-name">
                  <h2>{comic.title}</h2>
                  <button
                    className="btn-fav"
                    onClick={() => {
                      const newFavorites = [...favorites];
                      if (favorites.includes(comic._id)) {
                        const index = newFavorites.indexOf(comic._id);
                        newFavorites.splice(index, 1);
                      } else {
                        newFavorites.push(comic._id);
                      }
                      setFavorites(newFavorites);
                      Cookies.set("favorites", newFavorites);
                    }}
                  >
                    {favorites.includes(comic._id) ? (
                      <FontAwesomeIcon
                        style={{ color: "white" }}
                        icon="fa-solid fa-heart-crack"
                      />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-heart" />
                    )}
                  </button>
                </div>
                <Link
                  to={`/comic/${comic._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="comic-img">
                    <img
                      src={
                        comic.thumbnail.path + "." + comic.thumbnail.extension
                      }
                      alt=""
                    />
                  </div>
                </Link>
              </article>
            </div>
          );
        })}
      </div>
      <Pagination
        totalItem={data.length}
        resultsPerPage={resultsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Comics;
