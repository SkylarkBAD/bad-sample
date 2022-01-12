import { useState, useEffect } from "react";
import { connect } from "frontity";

import Profile from "../profile";
import ProfileProgress from "../profileProgress";
import UpdateProfileAction from "../updateProfileAction";

import TitleBlock from "../../titleBlock";
import Events from "../../events/events";

const Dashboard = ({ state, actions, libraries, dashboardPath }) => {
  if (dashboardPath !== "Dashboard") return null;

  const marginHorizontal = state.theme.marginHorizontal;

  // SERVERS ---------------------------------------------
  const ServeDashboard = () => {
    return (
      <div style={{ padding: `0 ${marginHorizontal}px` }}>
        <Profile />
        <ProfileProgress />
        <UpdateProfileAction />
      </div>
    );
  };

  // RETURN ---------------------------------------------
  return (
    <div>
      <ServeDashboard />

      <TitleBlock block={{ text_align: "left", title: "Upcoming Events" }} />
      <Events
        block={{
          add_search_function: false,
          background_colour: "transparent",
          colour: "#F5F6F7",
          disable_vertical_padding: false,
          event_type: false,
          grade_filter: "All Levels",
          grades: false,
          layout: "layout_two",
          locations: false,
          post_limit: "2",
          view_all_link: false,
        }}
      />
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(Dashboard);
