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
    setPage(0);
  }

  dispatch({ type: "END_LOADING" });
};

export const getPosts = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_POSTS", payload: result });
  }
};
