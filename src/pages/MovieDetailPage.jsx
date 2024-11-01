import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
        );
        const data = await response.json();
        setMovieDetails(data);

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
        );
        const videoData = await videoResponse.json();
        if (videoData.results.length > 0) {
          setTrailer(videoData.results[0].key);
        }

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
        );
        const castData = await castResponse.json();
        setCast(castData.cast);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.some((movie) => movie.id === movieDetails.id)) {
      watchlist.push(movieDetails);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert("Filme adicionado à lista de 'Para Ver Depois'");
    } else {
      alert("Este filme já está na lista de 'Para Ver Depois'");
    }
  };

  const handleMarkAsWatched = () => {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    if (!watched.some((movie) => movie.id === movieDetails.id)) {
      watched.push(movieDetails);
      localStorage.setItem("watched", JSON.stringify(watched));
      alert("Filme marcado como assistido");
    } else {
      alert("Este filme já está na lista de 'Assistidos'");
    }
  };

  if (!movieDetails) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="flex justify-center items-center min-h-screen  text-white p-4">
      <div className="max-w-lg w-full rounded-lg shadow-lg overflow-hidden my-8">
        <div className="w-full max-h-96 bg-gray-800 flex justify-center items-center">
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
            alt={`Poster de ${movieDetails.title}`}
            className="w-full max-h-96 object-contain pt-5"
          />
        </div>
        <div className="p-4 bg-gray-800 text-white">
          <h1 className="text-2xl font-bold mb-2">{movieDetails.title}</h1>
          <p className="mb-4">{movieDetails.overview}</p>
          <p>Avaliação: {movieDetails.vote_average}</p>
          <p>Data de Lançamento: {movieDetails.release_date}</p>

          <h2 className="text-xl font-semibold mt-4">Elenco:</h2>
          <ul className="list-disc list-inside">
            {cast.slice(0, 5).map((actor) => (
              <li key={actor.id}>
                {actor.name} como {actor.character}
              </li>
            ))}
          </ul>

          {trailer && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Trailer:</h2>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleAddToWatchlist}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-1 rounded"
            >
              Adicionar à Lista de Para Ver Depois
            </button>
            <button
              onClick={handleMarkAsWatched}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 mx-1 rounded"
            >
              Marcar como Assistido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
