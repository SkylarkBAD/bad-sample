export const setLoginModalAction = ({ dispatch, loginModalAction }) => {
  // console.log("setLoginModalAction triggered"); //debug
  dispatch({ type: "SET_LOGIN_MODAL_ACTION", payload: loginModalAction });
};

export const setCreateAccountModalAction = ({
  dispatch,
  createAccountAction,
}) => {
  // console.log("setCreateAccountModalAction triggered"); //debug
  dispatch({ type: "SET_CREATE_ACCOUNT_ACTION", payload: createAccountAction });
};

export const setEnquireAction = ({ dispatch, enquireAction }) => {
  // console.log("setEnquireAction triggered"); //debug
  dispatch({ type: "SET_ENQUIRE_ACTION", payload: enquireAction });
};
