import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import CardContainer from "../components/CardContainer";

export default function MovieListPage() {
  const [search, setSearch] = useState("");
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR`)
      .then(response => response.json())
      .then(data => setFilmes(data.results))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filmesFiltrados = filmes.filter(filme => filme.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Veja o catálogo completo de filmes</h2>
      <div className="flex justify-center mb-6">
        <input
          className="w-full max-w-md p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-purple-600 text-black"
          type="text"
          id="search"
          placeholder="Buscar filmes..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <CardContainer>
        <section className="flex flex-wrap justify-center gap-4">
          {filmesFiltrados.length > 0 ? (
            filmesFiltrados.map(filme => (
              <MovieCard key={filme.id} {...filme} />
            ))
          ) : (
            <p className="text-center">Filme não encontrado</p>
          )}
        </section>
      </CardContainer>
    </div>
  );
}