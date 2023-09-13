import { Stack, Box } from "@mui/material";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddDetails = () => {
  const {
    state: {
      details: { title, description },
    },
    dispatch,
  } = useValue();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["image", "link"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const handleQuillChange = (content) => {
    // Actualiza el estado de la descripción utilizando la acción "UPDATE_DETAILS"
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { description: content },
    });
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <InfoField
        mainProps={{ name: "title", label: "Título", value: title }}
        minLength={5}
      />
      <Box sx={{ mb: 7 }}>
        <ReactQuill
          theme="snow"
          style={{ height: "300px", marginBottom: "3px" }}
          placeholder={"Descripción del sitio"}
          modules={modules}
          value={description}
          onChange={handleQuillChange}
        />
      </Box>
    </Stack>
  );
};

export default AddDetails;
