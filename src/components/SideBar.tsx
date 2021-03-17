import { useGenres } from "../hooks/useGenres";
import { Button } from "./Button";

export function SideBar() {
  const { genres, selectedGenreId, setSelectedGenreId } = useGenres();

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(({ id, title, name }) => (
          <Button
            key={id}
            id={String(id)}
            title={title}
            iconName={name}
            onClick={() => handleClickButton(id)}
            selected={selectedGenreId === id}
          />
        ))}
      </div>
    </nav>
  );
}
