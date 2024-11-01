import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MoviesByGenrePage() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=7c572a9f5b3ba776080330d23bb76e1e&with_genres=${id}&language=pt-BR`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    const fetchGenreName = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const genre = data.genres.find((g) => g.id === parseInt(id));
        if (genre) {
          setGenreName(genre.name); 
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do gênero:", error);
      }
    };

    fetchMoviesByGenre();
    fetchGenreName();
  }, [id]);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {genreName ? `Filmes de ${genreName}` : "Filmes do Gênero Selecionado"}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length === 0 ? (
          <p>Nenhum filme encontrado para este gênero.</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 text-white p-4 rounded shadow"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 rounded"
              />
              <h2 className="font-semibold">{movie.title}</h2>
              <p>Avaliação: {movie.vote_average}</p>
              <p>{movie.overview}</p>
              <Link
                to={`/movies/${movie.id}`}
                className="text-blue-400 hover:underline"
              >
                Saber Mais
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
