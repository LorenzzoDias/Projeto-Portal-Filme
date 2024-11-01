import { Link } from "react-router-dom";

export default function MovieCard({ id, title, poster_path }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      {" "}
      <div className="max-w-xs rounded overflow-hidden shadow-lg mx-auto bg-gray-800">
        {" "}
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={`Poster de ${title}`}
          className="w-full h-auto object-cover"
        />
        <div className="p-3">
          {" "}
          <h2 className="font-bold text-md mb-2 text-center">{title}</h2>{" "}
          <Link
            to={`/movies/${id}`}
            className="text-blue-500 hover:text-blue-700 font-semibold text-center block"
          >
            Saber mais
          </Link>
        </div>
      </div>
    </div>
  );
}
