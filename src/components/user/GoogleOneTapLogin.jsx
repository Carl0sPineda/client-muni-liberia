import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";

const GoogleOneTapLogin = () => {
  return (
    <Button variant="outlined" startIcon={<Google />}>
      Login con Google
    </Button>
  );
};

export default GoogleOneTapLogin;
