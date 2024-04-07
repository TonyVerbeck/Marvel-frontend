import React from "react";

const Favoris = ({ favorites }) => {
  return (
    <div className="favorites-container">
      <h2>Favoris</h2>
      {favorites && favorites.length > 0 ? (
        <ul>
          {favorites.map((comic) => (
            <div key={comic._id}>
              <h3>{comic.title}</h3>
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt=""
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>Aucun favori pour le moment.</p>
      )}
    </div>
  );
};

export default Favoris;
