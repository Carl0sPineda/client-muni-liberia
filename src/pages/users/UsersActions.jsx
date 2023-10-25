import { Box, IconButton, Tooltip } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { updateStatus } from "../../actions/user";
import Swal from "sweetalert2";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const UsersActions = ({ params }) => {
  const { dispatch } = useValue();

  const handleAdmin = async (e) => {
    e.preventDefault();
    const { active, _id } = params.row;
    const role = "admin";

    Swal.fire({
      title: "Cambiar Rol a Admin",
      text: "¿Estás seguro de que deseas cambiar el rol a admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Cambiar a Admin",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateResult = await updateStatus(
          { role, active },
          _id,
          dispatch
        );
        if (updateResult) {
          Swal.fire(
            "¡Rol Cambiado!",
            "El rol se ha cambiado a admin.",
            "success"
          );
        } else {
          Swal.fire("Error", "Hubo un problema al cambiar el rol.", "error");
        }
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { active, _id } = params.row;
    const role = "editor";

    Swal.fire({
      title: "Cambiar Rol a Editor",
      text: "¿Estás seguro de que deseas cambiar el rol a editor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Cambiar a Editor",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateResult = await updateStatus(
          { role, active },
          _id,
          dispatch
        );
        if (updateResult) {
          Swal.fire(
            "¡Rol Cambiado!",
            "El rol se ha cambiado a editor.",
            "success"
          );
        } else {
          Swal.fire("Error", "Hubo un problema al cambiar el rol.", "error");
        }
      }
    });
  };

  const handleBasic = async (e) => {
    e.preventDefault();
    const { active, _id } = params.row;
    const role = "basic";

    Swal.fire({
      title: "Cambiar Rol a Basico",
      text: "¿Estás seguro de que deseas cambiar el rol a basico?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Cambiar a Basico",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateResult = await updateStatus(
          { role, active },
          _id,
          dispatch
        );
        if (updateResult) {
          Swal.fire(
            "¡Rol Cambiado!",
            "El rol se ha cambiado a basico.",
            "success"
          );
        } else {
          Swal.fire("Error", "Hubo un problema al cambiar el rol.", "error");
        }
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Admin role">
        <IconButton onClick={handleAdmin}>
          <AdminPanelSettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editor role">
        <IconButton onClick={handleEdit}>
          <BorderColorIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Basic role">
        <IconButton onClick={handleBasic}>
          <AccountBoxIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UsersActions;
