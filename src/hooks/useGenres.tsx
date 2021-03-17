import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { api } from "../services/api";

interface GenreProviderProps {
  children: ReactNode;
}

export interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface GenresContextData {
  genres: Array<Genre>;
  selectedGenre: Genre;
  setSelectedGenre: (data: Genre) => void;
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
  isLoading: boolean;
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData);
export function GenresProvider({ children }: GenreProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    setIsLoading(true);
    api.get<Genre[]>("genres").then((res) => {
      setGenres(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  return (
    <GenresContext.Provider
      value={{
        genres,
        selectedGenreId,
        setSelectedGenreId,
        selectedGenre,
        setSelectedGenre,
        isLoading
      }}
    >
      {children}
    </GenresContext.Provider>
  );
}

export function useGenres() {
  const ctx = useContext(GenresContext);
  return ctx;
}
