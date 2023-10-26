import { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Lock, Menu, AddLocationAlt } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { useValue } from "../context/ContextProvider";
import UserIcons from "./user/UserIcons";
import Sidebar from "./sidebar/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import muniLogo from "../assets/logo-muni.png";

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const appBarHeight = isMobile ? "54x" : "70px";
  const access =
    currentUser?.role === "admin" || currentUser?.role === "editor";

  useEffect(() => {
    if (location.pathname === "/add") {
      setIsOpen(false);
    }

    if (location.pathname === "/dashboard") {
      setIsOpen(false);
    }

    // Agregar una condición para cerrar la barra lateral en las páginas de "post" con un ID
    if (
      location.pathname.startsWith("/post/") &&
      location.pathname !== "/post/"
    ) {
      setIsOpen(false);
    }

    // Agregar una condición para abrir el menú en resoluciones mayores a tablets y móviles
    const isDesktop = window.innerWidth > 767; // Cambiar el valor si es necesario
    if (location.pathname === "/" && isDesktop) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <AppBar
        sx={{
          background:
            "linear-gradient(to bottom, #556681, #424f63, #303946, #1f242b, #0d0f12)",
          height: appBarHeight,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              sx={{
                mr: 1,
                display: location.pathname === "/" ? "inline" : "none",
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                onClick={() => setIsOpen(true)}
              >
                <Menu />
              </IconButton>
            </Box>

            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{
                flexGrow: 1,
                transition: "margin 0.3s ease",
                display: { xs: "none", md: "flex" },
                marginLeft: isOpen ? "270px" : "0px", // Aplicar marginLeft si isOpen es true
              }}
            >
              <Avatar src={muniLogo} sx={{ marginRight: 2 }} />
              Sitios Históricos y Arquitectónicos Liberia
            </Typography>
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: "OPEN_LOGIN" })}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}

            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            {access && (
              <Button
                color="inherit"
                startIcon={<AddLocationAlt />}
                onClick={() => navigate("/add")}
              >
                Añadir
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Sidebar {...{ isOpen, setIsOpen }} />
    </>
  );
};

export default NavBar;
