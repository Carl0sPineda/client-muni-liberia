import { Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";
import axios from "axios";
import Footer from "../Footer";
import Spinner from "../Spinner";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import Aos from "aos";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/posts/${id}`
        );
        if (response.data) {
          setPost(response.data.result);
          setLoading(false); // Marcar que la solicitud de fetch se ha completado
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="page-container" data-aos="fade-up">
        <h3
          className="title-post"
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginTop: "20px",
          }}
        >
          {post?.title}
        </h3>
        <Container sx={{ pt: 5 }}>
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
            centeredSlides
            grabCursor
            navigation
            autoplay
            lazy
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            slidesPerView={window.innerWidth > 768 ? "auto" : 1} // En móvil muestra una, en escritorio ajusta automáticamente
            spaceBetween={20} // Espacio entre las imágenes
            breakpoints={{
              768: {
                slidesPerView: 2, // En dispositivos con ancho mayor a 768px, muestra 2 imágenes
              },
            }}
          >
            {post?.images?.map((url) => (
              <SwiperSlide key={url}>
                <div className="swiper-zoom-container">
                  <img
                    src={url}
                    style={{ objectFit: "cover" }}
                    height={400}
                    width={500}
                    alt="post"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>

        <div
          style={{
            marginTop: "20px",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "30px",
          }}
        >
          {/* <div className="map-container">
            <MapContainer
              center={[post?.lat, post?.lng]}
              zoom={14}
              style={{
                marginTop: "30px",
                marginLeft: "20px",
                height: "300px",
                float: "right", // Flota el mapa a la derecha
                width: "50%", // Establece el ancho del mapa (puedes ajustarlo según tus necesidades)
              }}
            >
              <ZoomControl position="topright" />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[post?.lat, post?.lng]}>
                <Popup>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {post.title}
                  </h3>
                </Popup>
              </Marker>
            </MapContainer>
          </div> */}
          <div className="details-container">
            <Typography variant="h6" component="span">
              {"Detalles: "}
            </Typography>
            <p
              style={{
                textAlign: "justify",
                fontFamily: "Roboto",
                fontWeight: "300",
                fontSize: "1.3rem",
                marginBottom: "10px",
              }}
              component="span"
              dangerouslySetInnerHTML={{ __html: post?.description }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Post;
