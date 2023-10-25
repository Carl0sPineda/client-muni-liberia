import { Box, Drawer, IconButton, styled, Typography } from "@mui/material";
import PostsSlider from "./PostsSlider";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useValue } from "../../context/ContextProvider";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  background: "#063970",
  position: "sticky",
  top: 0,
  zIndex: 1, // Ajusta según sea necesario
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useValue();
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography
          sx={{
            color: "white",
            marginLeft: "100px",
            fontSize: "20px",
          }}
        >
          Galería de sitios
        </Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <HighlightOffOutlinedIcon sx={{ color: "white" }} fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 350, p: 3, backgroundColor: "#ffff" }}>
        <Box ref={containerRef}></Box>
        <PostsSlider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
