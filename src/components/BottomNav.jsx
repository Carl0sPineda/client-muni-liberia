import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { LocationOn, Bed, AddLocationAlt } from "@mui/icons-material";
import Posts from "./posts/Posts";
import Map from "./map/Map";
import AddPost from "./addPost/AddPost";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box ref={ref}>
      {
        {
          0: <Map />,
          1: <Posts />,
          2: <AddPost />,
        }[value]
      }
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Mapa" icon={<LocationOn />} />
          <BottomNavigationAction label="Fotos" icon={<Bed />} />
          <BottomNavigationAction label="Añadir" icon={<AddLocationAlt />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
