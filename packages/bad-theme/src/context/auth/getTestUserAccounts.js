import { authenticateAppAction } from "../index";

export const getTestUserAccountsAction = async ({
  state,
  dispatch,
  refreshJWT,
}) => {
  // console.log("getTestUserAccountsAction triggered");

  const URL =
    state.auth.APP_HOST +
    `/catalogue/data/contacts?$filter=firstname eq 'Andy'`;
  const jwt = await authenticateAppAction({ state, dispatch, refreshJWT });

  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${jwt}` },
  };

  try {
    const data = await fetch(URL, requestOptions);
    const result = await data.json();
    if (!result) throw new Error("Error getting userData.");

    if (result.value) return result.value;
    return null;
  } catch (error) {
    // console.log("error", error);
  }
};
