import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ComicId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://site--marvel-backend--z2glzylh58rz.code.run/comic/${comicId}`
          `http://localhost:3000/comic/${comicId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [comicId]);
  return isLoading ? (
    <p className="waiting">Un peu de patience...</p>
  ) : (
    <div className="container">
      <div className="comicid">
        <h2>{data.title}</h2>
        <img
          src={data.thumbnail.path + "." + data.thumbnail.extension}
          alt=""
        />
        <p>{data.description}</p>
      </div>
    </div>
  );
};
export default ComicId;
