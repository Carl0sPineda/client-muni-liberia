import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TextField,
  Button,
  styled,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { Close, Send } from "@mui/icons-material";
import PasswordField from "./PasswordField";
import GoogleOneTapLogin from "./GoogleOneTapLogin";

const Login = () => {
  const ColoredDialog = styled(Dialog)(({ theme }) => ({
    // Estilo para el fondo del dialog (blur)
    backdropFilter: "blur(6px)", // Ajusta el valor según el nivel de desenfoque deseado

    // Estilo para el contenido del dialog (opcional)
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
  }));

  const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    // Cambiar el color del contenido del Dialog
    color: "green", // Cambia el color según tus preferencias
    backgroundColor: "lightgray", // Cambia el color de fondo según tus preferencias
    padding: theme.spacing(2),

    // Otros estilos específicos para el contenido del Dialog
    "& p": {
      fontSize: "18px",
      margin: 0,
    },
  }));

  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //TESTING LOADING
    dispatch({ type: "START_LOADING" });

    setTimeout(() => {
      dispatch({ type: "END_LOADING" });
    }, 6000);

    //testing

    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Contraseñas no coinciden",
        },
      });
    }
  };

  useEffect(() => {
    isRegister ? setTitle("Registrate") : setTitle("Login");
  }, [isRegister]);

  return (
    <ColoredDialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>Completa los siguientes campos</DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Nombre"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirmar contraseña"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Enviar
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        {isRegister
          ? "Ya tienes una cuenta? Inicia sesión"
          : "No tienes cuenta? Registrate ahora"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Registrate"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </ColoredDialog>
  );
};

export default Login;
