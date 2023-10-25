import { useNavigate } from "react-router-dom";
import error404 from "../assets/404.svg";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="content-404">
        <img src={error404} className="svg-404" alt="Error-404"></img>
        <div className="wrapper">
          <h1>Página no encontrada</h1>
          <p className="message">
            Lo sentimos, la página que buscas no existe.
          </p>
          <button onClick={() => navigate("/")} className="btn-404">
            Regresar al inicio
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
