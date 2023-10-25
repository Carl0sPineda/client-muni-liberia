import {
  Box,
  Button,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import { Cancel, Send } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import AddDetails from "./addDetails/AddDetails";
import AddImages from "./addImages/AddImages";
import AddLocation from "./addLocation/AddLocation";
import { createPost, updatePost } from "../../actions/post";
import { useNavigate } from "react-router-dom";

const AddPost = ({ setPage }) => {
  const {
    state: { images, details, location, currentUser, updatedPost },
    dispatch,
  } = useValue();

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([
    { label: "Ubicación", completed: false },
    { label: "Detalles", completed: false },
    { label: "Imágenes", completed: false },
  ]);

  const [showSubmit, setShowSubmit] = useState(false);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    } else {
      const stepIndex = findUnfinished();
      setActiveStep(stepIndex);
    }
  };

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    const index = findUnfinished();
    if (index !== -1) return false;
    return true;
  };

  const findUnfinished = () => {
    return steps.findIndex((step) => !step.completed);
  };

  useEffect(() => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true);
    } else {
      if (steps[2].completed) setComplete(2, false);
    }
  }, [images]);

  useEffect(() => {
    if (details.title.length > 4 && details.description.length > 9) {
      if (!steps[1].completed) setComplete(1, true);
    } else {
      if (steps[1].completed) setComplete(1, false);
    }
  }, [details]);

  useEffect(() => {
    if (location.lng || location.lat) {
      if (!steps[0].completed) setComplete(0, true);
    } else {
      if (steps[0].completed) setComplete(0, false);
    }
  }, [location]);

  const setComplete = (index, status) => {
    setSteps((steps) => {
      steps[index].completed = status;
      return [...steps];
    });
  };

  const handleSubmit = () => {
    const post = {
      lng: location.lng,
      lat: location.lat,
      title: details.title,
      description: details.description,
      images,
    };
    if (updatedPost) {
      navigate("/dashboard/posts");
      return updatePost(post, currentUser, dispatch, updatedPost);
    }
    createPost(post, currentUser, dispatch, setPage);
  };

  const handleCancel = () => {
    navigate("/dashboard/posts");
  };

  useEffect(() => {
    if (findUnfinished() === -1) {
      if (!showSubmit) setShowSubmit(true);
    } else {
      if (showSubmit) setShowSubmit(false);
    }
  }, [steps]);

  return (
    <Container sx={{ my: 4 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ pb: 7 }}>
        {
          {
            0: <AddLocation />,
            1: <AddDetails />,
            2: <AddImages />,
          }[activeStep]
        }
        <Stack direction="row" sx={{ pt: 2, justifyContent: "space-around" }}>
          <Button
            color="inherit"
            disabled={!activeStep}
            onClick={() => setActiveStep((activeStep) => activeStep - 1)}
          >
            Regresar
          </Button>
          <Button disabled={checkDisabled()} onClick={handleNext}>
            Siguiente
          </Button>
        </Stack>

        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            direction: "row",
          }}
        >
          {showSubmit && (
            <Button
              variant="contained"
              endIcon={<Send />}
              onClick={handleSubmit}
            >
              {updatedPost ? "Actualizar" : "Agregar"}
            </Button>
          )}

          <Button
            variant="outlined"
            endIcon={<Cancel />}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddPost;
