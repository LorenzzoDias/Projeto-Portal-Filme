import { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]); 
  const [watchedMovies, setWatchedMovies] = useState([]);

  const fetchRecommendedMovies = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`
    );
    const data = await response.json();
    return data.results.slice(0, 4);
  };

  const fetchWatchedMovies = () => {
    const watched = JSON.parse(localStorage.getItem("watched")) || [];
    setWatchedMovies(watched);
    return watched;
  };

  const fetchData = async () => {
    const upcomingResponse = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR"
    );
    const tvResponse = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR"
    );

    const upcomingData = await upcomingResponse.json();
    const tvData = await tvResponse.json();

    setUpcomingMovies(upcomingData.results.slice(0, 4));
    setTvShows(tvData.results.slice(0, 4));

    // Recupera os filmes assistidos do localStorage
    const watched = fetchWatchedMovies();

    const fetchAllRecommendations = async () => {
      let allRecommendations = [];
      for (const movie of watched) {
        const recommendations = await fetchRecommendedMovies(movie.id);
        allRecommendations = [...allRecommendations, ...recommendations];
      }
      
      allRecommendations = Array.from(
        new Set(allRecommendations.map((a) => a.id))
      )
        .map((id) => allRecommendations.find((a) => a.id === id))
        .slice(0, 4);

      setRecommendedMovies(allRecommendations);
    };

    if (watched.length > 0) {
      fetchAllRecommendations();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <CardContainer titulo="Recomendações Para Você">
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))
        ) : (
          <p>Nenhuma recomendação disponível.</p>
        )}
      </CardContainer>

      <CardContainer titulo="Filmes que Estão por Vir">
        {upcomingMovies.map((filme) => (
          <MovieCard key={filme.id} {...filme} />
        ))}
      </CardContainer>

      <CardContainer titulo="Séries de TV Populares">
        {tvShows.map((show) => (
          <MovieCard key={show.id} {...show} />
        ))}
      </CardContainer>
    </section>
  );
}