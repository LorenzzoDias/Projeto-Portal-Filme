import React from "react";
import { Link } from "react-router-dom";

export default function WatchedPage() {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Filmes Assistidos</h1>
      {watched.length === 0 ? (
        <p>Nenhum filme assistido.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watched.map((movie) => (
            <li key={movie.id} className="mb-2 bg-gray-800 rounded-lg p-2">
              <Link
                to={`/movies/${movie.id}`}
                className="text-blue-500 hover:underline flex flex-col items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={`Poster de ${movie.title}`}
                  className="w-full h-auto rounded"
                />
                <span className="mt-2">{movie.title}</span>{" "}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
