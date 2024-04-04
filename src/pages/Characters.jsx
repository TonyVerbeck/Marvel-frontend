import { useEffect, useState } from "react";
import axios from "axios";

const Characters = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `site--marvel-backend--z2glzylh58rz.code.run/characters?&name=${search}`
        );
        console.log(response.data);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Un peu de patience...</p>
  ) : (
    <section className="character">
      {data.results.map((charact) => {
        <div className="heroes" key={charact._id}>
          <h2>{charact.name}</h2>
          <img
            src="{character.thumbnail.path + character.thumbnail.extension}"
            alt=""
          />
        </div>;
      })}
    </section>
  );
};

export default Characters;
