import fetchData from "./utils/fetchData";

const url = import.meta.env.VITE_SERVER_URL + "/users";

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url: url + "/register", body: user },
    dispatch
  );

  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Su cuenta ha sido registrada con éxito",
      },
    });
  }

  dispatch({ type: "END_LOADING" });
};

export const login = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData({ url: url + "/login", body: user }, dispatch);
  if (result) {
    dispatch({ type: "UPDATE_USER", payload: result });
    dispatch({ type: "CLOSE_LOGIN" });
  }

  dispatch({ type: "END_LOADING" });
};
