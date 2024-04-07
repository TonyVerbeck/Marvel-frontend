import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CharacterId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--z2glzylh58rz.code.run/comics/${characterId}`
          // `http://localhost:3000/comics/${characterId}`
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [characterId]);
  return isLoading ? (
    <p className="waiting">Un peu de patience...</p>
  ) : data.comics.length === null ? (
    <p className="charid-message">
      Sorry, No more informations for this character 😌 !
    </p>
  ) : (
    <div className="charid-container">
      {data.comics.map((comic) => {
        return (
          <div className="charid-cards">
            <div className="charid-infos">
              <h2>{comic.title}</h2>
              <div className="charid-description">
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt=""
                />
                <p>{comic.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterId;
