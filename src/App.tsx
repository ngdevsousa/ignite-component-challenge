import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { GenresProvider } from "./hooks/useGenres";
import "./styles/content.scss";
import "./styles/global.scss";
import "./styles/sidebar.scss";

export function App() {
  return (
    <GenresProvider>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBar />
        <div className="container">
          <Header></Header>
          <Content></Content>
        </div>
      </div>
    </GenresProvider>
  );
}
