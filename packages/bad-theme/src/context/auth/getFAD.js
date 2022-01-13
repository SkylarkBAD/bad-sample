import { authenticateAppAction, setFetchAction } from "../index";

export const getFadAction = async ({ state, dispatch }) => {
  console.log("getFadAction triggered");

  setFetchAction({ dispatch, isFetching: true });
  const URL = state.auth.APP_HOST + `/catalogue/fad`;
  const jwt = await authenticateAppAction({ state });

  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  };

  try {
    const data = await fetch(URL, requestOptions);
    const result = await data.json();
    const fad = result.values;
    console.log("fad", fad);

    setFetchAction({ dispatch, isFetching: null });
    setFadAction({ dispatch, fad });
  } catch (error) {
    console.log("error", error);
    setFetchAction({ dispatch, isFetching: null });
  }
};

// SET CONTEXT ---------------------------------------------------
export const setFadAction = ({ dispatch, fad }) => {
  console.log("setFadAction triggered"); //debug
  dispatch({ type: "SET_FAD_ACTION", payload: fad });
};
