import { useValue } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import search from "../../assets/search.svg";

const PostsSlider = () => {
  const navigate = useNavigate();
  const { state } = useValue();
  const [titleFilter, setTitleFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(state.posts);

  useEffect(() => {
    // Función para eliminar tildes y caracteres acentuados
    function removeAccents(text) {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Función para filtrar los posts por título
    const filterPostsByTitle = () => {
      const lowercaseText = removeAccents(titleFilter.toLowerCase()); // Normaliza el texto
      const filtered = state.posts.filter((post) =>
        removeAccents(post.title.toLowerCase()).includes(lowercaseText)
      );
      setFilteredPosts(filtered);
    };

    // Filtrar los posts al inicio
    filterPostsByTitle();
  }, [titleFilter, state.posts]);

  const handleTitleFilterChange = (e) => {
    setTitleFilter(e.target.value);
  };

  return (
    <div className="root">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <img
            src={search} // Reemplaza con la ruta correcta a tu SVG
            alt="Search Icon"
            style={{
              width: "24px", // Ajusta el ancho y alto del icono según tus necesidades
              height: "24px",
              position: "absolute",
              left: "30px", // Ajusta la posición del icono al inicio izquierdo
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
        <input
          type="text"
          className="search"
          style={{
            width: "70%",
            padding: "10px",
            display: "flex",
            margin: "auto",
            background: "transparent",
            color: "#333",
            fontSize: "16px",
            borderRadius: "25px",
            border: "2px solid #bfcbde",
            paddingLeft: "45px", // Aumenta el padding izquierdo para acomodar el ícono
            paddingRight: "15px",
            outline: "none",
          }}
          placeholder="Buscar una ubicación"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
      </div>
      <div className="container">
        <div className="card-container">
          {filteredPosts.length === 0 ? (
            <p>No se encontraron resultados</p>
          ) : (
            filteredPosts.map((post) => (
              <div key={post._id} className="card">
                <div className="card-image">
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    loading="lazy"
                    onClick={() => navigate(`/post/${post._id}`)}
                  />
                </div>
                <div className="card-content">
                  <h2 className="title">{post.title}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsSlider;
