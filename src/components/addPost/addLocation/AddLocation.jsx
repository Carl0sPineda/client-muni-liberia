import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useValue } from "../../../context/ContextProvider";

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!lng && !lat) {
      fetch("https://ipapi.co/json")
        .then((response) => response.json())
        .then((data) => {
          mapRef.current.setView([data.latitude, data.longitude], 8);
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { lng: data.longitude, lat: data.latitude },
          });
        });
    }
  }, []);

  const handleMarkerDragEnd = (event) => {
    const { target } = event;
    const latlng = target.getLatLng();
    dispatch({
      type: "UPDATE_LOCATION",
      payload: { lng: latlng.lng, lat: latlng.lat },
    });
    // console.log(latlng);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0]; // Obtener las coordenadas de la primera coincidencia
        mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 10);
        dispatch({
          type: "UPDATE_LOCATION",
          payload: { lng: parseFloat(lon), lat: parseFloat(lat) },
        });
      } else {
        console.log("No se encontraron resultados");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ height: 430, position: "relative" }}>
      <MapContainer
        ref={mapRef}
        center={[lat, lng]}
        zoom={14}
        style={{ height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "white", // Agregar color de fondo
            padding: "10px", // Agregar espacio interno para separar el contenido
            borderRadius: "4px", // Agregar bordes redondeados
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Agregar sombra
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <TextField
            label="Ingresa una ubicación"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: "8px" }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
        <Marker
          position={[lat, lng]}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDragEnd }}
        />
      </MapContainer>
    </Box>
  );
};

export default AddLocation;
