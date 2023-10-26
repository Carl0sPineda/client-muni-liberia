import { useValue } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PostsSlider = () => {
  const navigate = useNavigate();
  const { state } = useValue();
  const [titleFilter, setTitleFilter] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(state.posts);

  useEffect(() => {
    // Función para filtrar los posts por título
    const filterPostsByTitle = () => {
      const lowercaseText = titleFilter.toLowerCase();
      const filtered = state.posts.filter((post) =>
        post.title.toLowerCase().includes(lowercaseText)
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
      <input
        type="text"
        style={{
          width: "70%",
          height: "40px",
          display: "flex",
          margin: "auto",
          background: "white",
          color: "white",
          fontSize: "14px",
          borderRadius: "5px",
        }}
        placeholder="Buscar una ubicación"
        value={titleFilter}
        onChange={handleTitleFilterChange}
      />
      <div className="container">
        <div className="card-container">
          {filteredPosts.map((post) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsSlider;
