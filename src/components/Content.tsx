import { useEffect, useState } from "react";
import { useGenres } from "../hooks/useGenres";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { selectedGenreId } = useGenres();

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);
  return (
    <main>
      <div className="movies-list">
        {movies.map(({ Title, Poster, Runtime, Ratings }) => (
          <MovieCard
            key={Title}
            title={Title}
            poster={Poster}
            runtime={Runtime}
            rating={Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  );
}
