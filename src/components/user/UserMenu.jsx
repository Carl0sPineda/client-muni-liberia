import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const {
    dispatch,
    state: { currentUser },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const testAuthorization = async () => {
    const url = import.meta.env.VITE_SERVER_URL + "/posts";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();

      console.log(data);
      if (!data.success) {
        if (response.status === 401)
          dispatch({ type: "UPDATE_USER", payload: null });
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
      console.log(error);
    }
  };

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloseUserMenu}
      onClick={handleCloseUserMenu}
    >
      <MenuItem onClick={testAuthorization}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Perfil
      </MenuItem>
      <MenuItem
        onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Cerrar Sesión
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
