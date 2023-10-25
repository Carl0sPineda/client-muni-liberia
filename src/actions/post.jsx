import deleteImages from "./utils/deleteImages";
import fetchData from "./utils/fetchData";

const url = import.meta.env.VITE_SERVER_URL + "/posts";

export const createPost = async (post, currentUser, dispatch, setPage) => {
  dispatch({ type: "START_LOADING" });
  const result = await fetchData(
    {
      url,
      body: post,
      token: currentUser?.token,
    },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "El post ha sido agregado con éxito",
      },
    });
    dispatch({ type: "RESET_POST" });
    // setPage(0);
    dispatch({ type: "END_LOADING" });
  }
};

export const getPosts = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_POSTS", payload: result });
  }
};

export const deletePost = async (post, currentUser, dispatch) => {
  const result = await fetchData(
    { url: `${url}/${post._id}`, method: "DELETE", token: currentUser?.token },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Posts eliminado exitosamente!",
      },
    });

    dispatch({ type: "DELETE_POST", payload: result._id });
    deleteImages(post.images, post.uid);
  }
};

export const updatePost = async (post, currentUser, dispatch, updatedPost) => {
  const result = await fetchData(
    {
      url: `${url}/${updatedPost._id}`,
      method: "PATCH",
      body: post,
      token: currentUser?.token,
    },
    dispatch
  );

  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Posts actulizado exitosamente!",
      },
    });

    dispatch({ type: "RESET_POST" });
  }
};
