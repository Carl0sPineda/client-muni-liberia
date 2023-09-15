import {
  AppBar,
  Container,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { forwardRef } from "react";
import { Close } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/lazy";
import "swiper/css/zoom";
import "./swiper.css";

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Post = () => {
  const {
    state: { post },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({ type: "UPDATE_POST", payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(post)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" sx={{ background: "#063970" }}>
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ me: 2, flex: 1 }}>
            {post?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {post?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="post" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack>
            <Typography variant="h6" component="span">
              {"Detalles: "}
            </Typography>
            <Typography
              sx={{ mb: 10 }}
              component="span"
              dangerouslySetInnerHTML={{ __html: post?.description }}
            />
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default Post;
