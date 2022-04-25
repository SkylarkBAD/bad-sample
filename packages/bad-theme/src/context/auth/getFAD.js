import { authenticateAppAction, setFetchAction } from "../index";

export const getFadAction = async ({ state, dispatch, page, refreshJWT }) => {
  // console.log("getFadAction triggered");

  let perPage = 15;
  let skip = page ? page * perPage : 0; // define skip for pagination

  try {
    setFetchAction({ dispatch, isFetching: true });
    const jwt = await authenticateAppAction({ state, dispatch, refreshJWT });
    if (!jwt) throw new Error("error authenticating app");

    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    };

    // while result length is equal perPage, then fetch next page
    let URL =
      state.auth.APP_HOST + `/catalogue/fad?limit=${perPage}&skip=${skip}&md`;
    const data = await fetch(URL, requestOptions);
    if (!data) throw new Error("error fetching data form API");
    const result = await data.json();

    return result.data;
  } catch (error) {
    // console.log("error", error);
  } finally {
    setFetchAction({ dispatch, isFetching: false });
  }
};

export const getFADSearchAction = async ({
  state,
  dispatch,
  query,
  refreshJWT,
}) => {
  // console.log("getFADSearchAction triggered");

  try {
    const jwt = await authenticateAppAction({ state, dispatch, refreshJWT });
    if (!jwt) throw new Error("error authenticating app");

    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    };

    // while result length is equal perPage, then fetch next page
    let URL = state.auth.APP_HOST + `/catalogue/fad?md&search=${query}`;
    const data = await fetch(URL, requestOptions);
    if (!data) throw new Error("error fetching data form API");
    const result = await data.json();

    return result.data;
  } catch (error) {
    // console.log("error", error);
  }
};

export const getAllFadAction = async ({
  state,
  dispatch,
  page,
  refreshJWT,
}) => {
  // console.log("getFadAction triggered");

  let skip = page || 0;
  let perPage = 100;
  let postData = [];
  let responseLength = perPage;

  try {
    const jwt = await authenticateAppAction({ state, dispatch, refreshJWT });
    if (!jwt) throw new Error("error authenticating app");

    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    };

    while (responseLength === perPage) {
      // while result length is equal perPage, then fetch next page
      let URL =
        state.auth.APP_HOST + `/catalogue/fad?limit=${perPage}&skip=${skip}`;
      const data = await fetch(URL, requestOptions);
      if (!data) throw new Error("error fetching data form API");
      const result = await data.json();

      responseLength = result.data.length;
      skip++;
      // spread response to postData equal to previous postData + new response
      postData = [...postData, ...result.data];
    }

    return postData;
  } catch (error) {
    // console.log("error", error);
  } finally {
    setFetchAction({ dispatch, isFetching: false });
  }
};

// SET CONTEXT ---------------------------------------------------
export const setFadAction = ({ dispatch, fad }) => {
  // console.log("setFadAction triggered"); //debug
  dispatch({ type: "SET_FAD_ACTION", payload: fad });
};
