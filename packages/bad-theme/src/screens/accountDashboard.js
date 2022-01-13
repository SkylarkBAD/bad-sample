import { useState } from "react";
import { connect } from "frontity";

import BlockBuilder from "../components/builder/blockBuilder";

import DashboardNavigation from "../components/dashboard/dashboardNavigation";
import Dashboard from "../components/dashboard/pages/dashboard";
import DashboardEvents from "../components/dashboard/pages/dashboardEvents";
import Directory from "../components/dashboard/pages/directory";
import Membership from "../components/dashboard/pages/membership";
import MyAccount from "../components/dashboard/pages/myAccount";
import Billing from "../components/dashboard/pages/billing";
import Settings from "../components/dashboard/pages/settings";

import BlockWrapper from "../components/blockWrapper";
// CONTEXT ----------------------------------------------------------------
import { useAppDispatch, useAppState } from "../context";

const AccountDashboard = ({ state, actions, libraries }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppState();

  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const [dashboardPath, setDashboardPath] = useState("Dashboard");
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];
  const wpBlocks = page.acf.blocks;

  return (
    <div className="flex-col">
      <div className="flex-col">
        <BlockWrapper>
          <DashboardNavigation
            dashboardPath={dashboardPath}
            setDashboardPath={setDashboardPath}
          />

          <Dashboard dashboardPath={dashboardPath} />
          <DashboardEvents dashboardPath={dashboardPath} />
          <Directory dashboardPath={dashboardPath} />
          <Membership dashboardPath={dashboardPath} />
          <MyAccount dashboardPath={dashboardPath} />
          <Billing dashboardPath={dashboardPath} />
          <Settings dashboardPath={dashboardPath} />
        </BlockWrapper>
      </div>

      <BlockBuilder blocks={wpBlocks} />
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(AccountDashboard);
