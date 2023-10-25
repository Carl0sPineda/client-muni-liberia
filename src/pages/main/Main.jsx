import { Group, MapsHomeWork } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { getPosts } from "../../actions/post";
import { getUsers } from "../../actions/user";
import { useValue } from "../../context/ContextProvider";
import AreaPostsUsers from "./AreaPostsUsers";
import moment from "moment";

const Main = ({ setSelectedLink, link }) => {
  const {
    state: { posts, users },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (posts.length === 0) getPosts(dispatch);
    if (users.length === 0) getUsers(dispatch);
  }, []);

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "grid" },
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total de usuarios</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total de posts</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{posts.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
        <Box>
          <Typography>Usuarios registrados reciente</Typography>
          <List>
            {users.slice(0, 4).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={`Time Created: ${moment(user?.createdAt).format(
                      "DD-MM-YYYY H:mm:ss"
                    )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Posts agregados reciente</Typography>
          <List>
            {posts.slice(0, 4).map((post, i) => (
              <Box key={post._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={post?.title}
                      src={post?.images[0]}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={post?.title}
                    secondary={`Added: ${moment(post?.createdAt).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/3" }}>
        <AreaPostsUsers />
      </Paper>
    </Box>
  );
};

export default Main;
