import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const Comics = ({ search, setSearch }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setresultsPerPage] = useState(27);

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
        console.log(error);
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
            <Link to={`/comic/${comic._id}`} style={{ textDecoration: "none" }}>
              <article
                className="comic-card-info"
                style={{ color: "white" }}
                key={comic._id}
              >
                <div className="card-name">
                  <h2>{comic.title}</h2>
                </div>
                <div className="comic-img">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                  />
                </div>
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

export default Comics;
