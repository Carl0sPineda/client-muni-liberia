import { useValue } from "../../context/ContextProvider";
import { getPosts } from "../../actions/post";
import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CallMissedOutgoingOutlinedIcon from "@mui/icons-material/CallMissedOutgoingOutlined";
import HomeIcon from "@mui/icons-material/Home";
import pin from "../../assets/pin.svg";

const Map = () => {
  const { BaseLayer } = LayersControl;
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const {
    state: { posts },
    dispatch,
  } = useValue();
  const [center, setCenter] = useState([10.6357, -85.4365]);

  useEffect(() => {
    getPosts(dispatch);
  }, []);

  const handleFlyToMarker = (lat, lng) => {
    const shouldFly = true;
    if (shouldFly && mapRef.current) {
      mapRef.current.flyTo([lat, lng], 15, {
        animate: true,
        duration: 3,
      });
    }
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
          setUserLocation({ lat: latitude, lng: longitude }); // Actualiza el estado userLocation
          mapRef.current.setView([latitude, longitude], 10);
        },
        (error) => {
          alert("Error obteniendo la ubicación del usuario:", error);
        }
      );
    } else {
      alert("Geolocalización no está disponible en este navegador.");
    }
  };

  const customIcon = new L.Icon({
    iconUrl: pin, // Reemplaza con la ruta de tu ícono personalizado
    iconSize: [30, 30], // Tamaño del ícono
    iconAnchor: [30, 30], // Punto de anclaje del ícono
    popupAnchor: [-15, -35], // Punto de anclaje del Popup
  });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 8000; // Radio de la Tierra en kilómetros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distancia en kilómetros
    return distance;
  };

  // Función para estimar el tiempo en base a la distancia y una velocidad promedio
  const estimateTime = (distance, speed) => {
    // Supongamos una velocidad promedio en km/h (ajusta según tus necesidades)
    const timeInHours = distance / speed;
    // Convierte el tiempo a minutos
    const timeInMinutes = timeInHours * 60;
    return timeInMinutes;
  };

  const handleZoomToLevel = (zoomLevel, centerCoordinates) => {
    if (mapRef.current) {
      mapRef.current.setView(centerCoordinates, zoomLevel);
    }
  };

  return (
    <Box sx={{ height: "90vh" }}>
      <button
        style={{
          color: "black",
          backgroundColor: "white",
          height: "50px",
          width: "50px",
          position: "absolute",
          top: "205px",
          cursor: "pointer",
          right: "10px",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "white",
          },
          border: "none",
        }}
        onClick={getUserLocation}
      >
        <MyLocationIcon />
      </button>

      <button
        style={{
          color: "black",
          backgroundColor: "white",
          height: "50px",
          width: "50px",
          cursor: "pointer",
          position: "absolute",
          top: "265px", // Ajusta la posición vertical según tu diseño
          right: "10px",
          zIndex: 1000,
          "&:hover": {
            backgroundColor: "white",
          },
          border: "none",
        }}
        onClick={() => handleZoomToLevel(10, [10.6357, -85.4365])}
      >
        <HomeIcon />
      </button>

      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%" }}
        ref={mapRef}
        zoomControl={false}
      >
        <ZoomControl position="topright" />

        <LayersControl position="topright">
          <BaseLayer checked name="Por defecto">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Satéllite">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </BaseLayer>
        </LayersControl>
        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>
              <div>
                <h2>Mi ubicación</h2>
              </div>
            </Popup>
          </Marker>
        )}
        {posts.map((post) => (
          <Marker key={post._id} position={[post.lat, post.lng]}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <h2 className="font-s">{post.title}</h2>
              </div>
              <img
                className="img-size"
                height="170px"
                width="300px"
                loading="lazy"
                src={post.images}
                style={{ cursor: "pointer" }}
                onClick={() => dispatch({ type: "UPDATE_POST", payload: post })}
              />
              <div>
                {userLocation && (
                  <div>
                    <p className="font-s">
                      Distancia desde mi ubicación actual:{" "}
                      {calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        post.lat,
                        post.lng
                      ).toFixed(2)}{" "}
                      km
                    </p>
                    <p className="font-s">
                      Tiempo estimado en llegar:{" "}
                      {estimateTime(
                        calculateDistance(
                          userLocation.lat,
                          userLocation.lng,
                          post.lat,
                          post.lng
                        ),
                        50
                      ).toFixed(0)}{" "}
                      minutos
                    </p>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "100px",
                      backgroundColor: "black",
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                    onClick={() => handleFlyToMarker(post.lat, post.lng)}
                  >
                    Zoom
                    <CallMissedOutgoingOutlinedIcon />
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
