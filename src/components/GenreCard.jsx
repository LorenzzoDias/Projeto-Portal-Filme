import { Link } from "react-router-dom";

export default function GenreCard({ genre }) {
  return (
    <Link
      to={`/genres/${genre.id}`}
      className="block p-4 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition duration-200"
    >
      <h2 className="text-lg font-semibold">{genre.name}</h2>
    </Link>
  );
}
