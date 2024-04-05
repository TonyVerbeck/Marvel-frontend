import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const Characters = ({ search, setSearch }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setresultsPerPage] = useState(27);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://site--marvel-backend--z2glzylh58rz.code.run/characters?name=${search}`
          `http://localhost:3000/characters?name=${search}`
        );
        setData(response.data.results);
        // console.log(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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
            <Link
              to={`/comics/${character._id}`}
              style={{ textDecoration: "none" }}
            >
              <article className="card-info" key={character._id}>
                <div className="card-name">
                  <h2>{character.name}</h2>
                </div>
                <div className="card-img">
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt=""
                  />
                </div>
                <p className="card-description">{character.description}</p>
              </article>
            </Link>
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
