import { connect } from "frontity";

import UpdateProfile from "../updateProfile";
import UpdateAddress from "../updateAddress";
// CONTEXT ------------------------------------------------------------------
import { useAppState, useAppDispatch } from "../../../context";

const MyAccount = ({ state, actions, libraries }) => {
  const { dashboardPath } = useAppState();

  if (dashboardPath !== "My Profile") return null;

  const marginHorizontal = state.theme.marginHorizontal;

  return (
    <div style={{ padding: `0 ${marginHorizontal}px` }}>
      <UpdateProfile />
      <UpdateAddress />
    </div>
  );
};

export default connect(MyAccount);
