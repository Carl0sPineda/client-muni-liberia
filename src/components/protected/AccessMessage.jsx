import { Lock } from "@mui/icons-material";
import { Alert, AlertTitle, Button, Container } from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const AccessMessage = () => {
  const { dispatch } = useValue();
  return (
    <Container sx={{ py: 5 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Acceso inhabilitado</AlertTitle>
        Favor realiza login o registrate
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          startIcon={<Lock />}
          onClick={() => dispatch({ type: "OPEN_LOGIN" })}
        >
          Login
        </Button>
      </Alert>
    </Container>
  );
};

export default AccessMessage;
