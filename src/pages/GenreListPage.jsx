import { useEffect, useState } from "react";
import GenreCard from "../components/GenreCard"; 

export default function GenreListPage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7c572a9f5b3ba776080330d23bb76e1e&language=pt-BR');
        if (!response.ok) {
          throw new Error('Erro na api');
        }
        const data = await response.json();
        setGenres(data.genres); 
      } catch (error) {
        console.error("Erro ao carregar os gêneros:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gêneros</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.length === 0 ? (
          <p>Nenhum gênero encontrado.</p>
        ) : (
          genres.map(genre => (
            <GenreCard key={genre.id} genre={genre} />
          ))
        )}
      </div>
    </section>
  );
}