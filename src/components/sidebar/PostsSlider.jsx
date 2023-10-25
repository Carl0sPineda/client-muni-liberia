import { useValue } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const PostsSlider = () => {
  const navigate = useNavigate();
  const {
    state: { posts },
  } = useValue();

  return (
    <div className="root">
      <div className="container">
        <div className="card-container">
          {posts.map((post) => (
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
