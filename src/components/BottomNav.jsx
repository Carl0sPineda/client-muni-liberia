import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CollectionsIcon from "@mui/icons-material/Collections";
import { LocationOn, AddLocationAlt } from "@mui/icons-material";
import Posts from "./posts/Posts";
import Map from "./map/Map";
import AddPost from "./addPost/AddPost";
import Protected from "./protected/Protected";
import { useValue } from "../context/ContextProvider";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  const {
    state: { currentUser },
  } = useValue();

  return (
    <Box ref={ref}>
      {
        {
          0: <Map />,
          1: <Posts />,

          2: (
            <Protected>
              <AddPost setPage={setValue} />
            </Protected>
          ),
        }[value]
      }
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          // width: { xs: "100%", sm: "100%", md: "500px" }, // Ancho diferente para diferentes resoluciones
          // maxWidth: { xs: "none", sm: "none", md: "500px" }, // Máximo ancho para dispositivos de escritorio
          // marginLeft: "auto", // Centra horizontalmente en escritorio
          // marginRight: "auto", // Centra horizontalmente en escritorio
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Mapa" icon={<LocationOn />} />
          <BottomNavigationAction label="Fotos" icon={<CollectionsIcon />} />
          <BottomNavigationAction
            label="Añadir"
            icon={<AddLocationAlt />}
            // style={{
            //   display:
            //     currentUser?.name === "Carlos Pineda " ? "block" : "none",
            // }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
