import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart, faHeartCrack);

const Characters = ({ search, setSearch, token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setresultsPerPage] = useState(27);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--z2glzylh58rz.code.run/characters?name=${search}`
          // `http://localhost:3000/characters?name=${search}`
        );
        setData(response.data.results);
        // console.log(response.data.results);
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
  // console.log(currentItem);

  return isLoading ? (
    <p className="waiting">Un peu de patience...</p>
  ) : (
    <main className="cards-main">
      <div className="search-container">
        <input
          placeholder="   Recherche ton personnage"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="cards-container">
        {currentItem.map((character) => {
          return (
            <article className="card-info">
              <div className="card-name">
                <h2>{character.name}</h2>

                <button
                  className="btn-fav"
                  onClick={() => {
                    const newFavorites = [...favorites];
                    if (favorites.includes(character._id)) {
                      const index = newFavorites.indexOf(character._id);
                      newFavorites.splice(index, 1);
                    } else {
                      newFavorites.push(character._id);
                    }
                    setFavorites(newFavorites);
                    Cookies.set("favorites", newFavorites);
                  }}
                >
                  {favorites.includes(character._id) ? (
                    <FontAwesomeIcon
                      style={{ color: "white" }}
                      icon="fa-solid fa-heart-crack"
                    />
                  ) : (
                    <FontAwesomeIcon icon="fa-solid fa-heart" />
                  )}
                </button>
              </div>
              <div className="card-img">
                <Link
                  to={`/comics/${character._id}`}
                  style={{ textDecoration: "none" }}
                  key={character._id}
                >
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt=""
                  />
                </Link>
              </div>
              <p className="card-description">{character.description}</p>
            </article>
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

export default Characters;
