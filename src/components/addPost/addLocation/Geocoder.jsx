// import React from "react";
// import { useLeafletContext } from "@react-leaflet/core";
// import { GeoSearchControl, OpenStreetMapProvider } from "react-leaflet-search";
// import { useValue } from "../../../context/ContextProvider";

// const Geocoder = () => {
//   const { dispatch } = useValue();
//   const leafletContext = useLeafletContext();

//   const handleResult = (e) => {
//     const coords = e.latlng;
//     dispatch({
//       type: "UPDATE_LOCATION",
//       payload: { lng: coords.lng, lat: coords.lat },
//     });
//   };

//   return (
//     <GeoSearchControl
//       provider={new OpenStreetMapProvider()}
//       showMarker={false}
//       searchLabel="Enter address, city or lat/lon"
//       onResultClick={handleResult}
//     />
//   );
// };

// export default Geocoder;
