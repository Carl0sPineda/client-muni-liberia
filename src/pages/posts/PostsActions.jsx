import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { useValue } from "../../context/ContextProvider";
import { deletePost } from "../../actions/post";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PostsActions = ({ params }) => {
  const { _id, lng, lat, title, description, images, uid } = params.row;
  const navigate = useNavigate();
  const {
    dispatch,
    state: { currentUser },
  } = useValue();

  const handleEdit = () => {
    dispatch({ type: "UPDATE_LOCATION", payload: { lng, lat } });
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { title, description },
    });
    dispatch({ type: "UPDATE_IMAGES", payload: images });
    dispatch({ type: "UPDATE_UPDATED_POST", payload: { _id, uid } });
    navigate(`/add`);
  };

  const handleDeletePost = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "black",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(params.row, currentUser, dispatch);
      }
    });
  };

  return (
    <Box>
      <Tooltip title="Visualizar post">
        <IconButton
          onClick={() => window.open(`/post/${params.row._id}`, "_blank")}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Editar este post">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Eliminar este post">
        <IconButton onClick={handleDeletePost}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PostsActions;
