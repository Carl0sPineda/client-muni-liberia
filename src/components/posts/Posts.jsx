import {
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const Posts = () => {
  const {
    state: { filteredPosts },
  } = useValue();

  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {filteredPosts.map((post) => (
          <Card key={post._id}>
            <ImageListItem sx={{ height: "100% !important" }}>
              <img
                src={post.images[0]}
                alt={post.title}
                loading="lazy"
                style={{ cursor: "pointer" }}
              />
              <ImageListItemBar title={post.title} />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Posts;
