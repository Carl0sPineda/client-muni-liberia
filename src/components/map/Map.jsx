import { useValue } from "../../context/ContextProvider";
import { getPosts } from "../../actions/post";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";

const Map = () => {
  const { BaseLayer } = LayersControl;
  const mapRef = useRef(null);
  const center = [10.6357, -85.4365];
  const {
    state: { posts },
    dispatch,
  } = useValue();

  useEffect(() => {
    getPosts(dispatch);
  }, []);

  const handleFlyToMarker = (lat, lng) => {
    const shouldFly = true;
    if (shouldFly && mapRef.current) {
      mapRef.current.flyTo([lat, lng], 18, {
        duration: 3,
      });
    }
  };

  return (
    <Box sx={{ height: "90vh" }}>
      <MapContainer
        center={center}
        zoom={9}
        style={{ height: "100%" }}
        ref={mapRef}
      >
        <LayersControl position="topleft">
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
        {posts.map((post) => (
          <Marker key={post._id} position={[post.lat, post.lng]}>
            <Popup>
              {post.title}
              <img
                height="170px"
                width="300px"
                loading="lazy"
                src={post.images}
                alt={post.title}
              />
              <div>
                <button onClick={() => handleFlyToMarker(post.lat, post.lng)}>
                  Ir
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
