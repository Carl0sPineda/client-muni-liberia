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
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  // [{ header: "1" }, { header: "2" }, { font: [] }],
  // [{ list: "ordered" }, { list: "bullet" }],
  // ["bold", "italic", "underline"],
  // ["image", "link"],
  // [{ align: [] }],
  // ["clean"],

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
      <Box sx={{ mb: 9 }}>
        <ReactQuill
          theme="snow"
          className="react-quill" // Aplicamos la clase CSS aquí
          style={{ height: "300px", width: "70vw", marginBottom: "3px" }}
          placeholder={"Añade una descripción"}
          modules={modules}
          value={description}
          onChange={handleQuillChange}
        />
      </Box>
    </Stack>
  );
};

export default AddDetails;
