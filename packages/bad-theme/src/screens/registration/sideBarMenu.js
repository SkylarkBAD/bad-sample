import React from "react";
import { connect } from "frontity";

import { colors } from "../../config/colors";

const SideBarMenu = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  const slug = state.router.link;

  const defaultStyle = { fontWight: "normal" };
  const activeStyle = {
    fontWeight: "bold",
    color: colors.black,
  };
  let stepOne,
    stepTwo,
    stepThree,
    stepFour = defaultStyle;
  if (slug.includes("step-1")) stepOne = activeStyle;
  if (slug.includes("step-2")) stepTwo = activeStyle;
  if (slug.includes("step-3")) stepThree = activeStyle;
  if (slug.includes("step-4")) stepFour = activeStyle;

  // HELPERS ---------------------------------------------
  const handleGoToPath = ({ path }) => {
    if (slug === "/registration/registration-thank-you/") return null;

    actions.router.set(path);
  };

  // SERVERS ---------------------------------------------
  const ServeTitle = () => {
    return (
      <div
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: colors.black,
          borderBottom: `1px solid ${colors.darkSilver}`,
          padding: `0 1em 1em 0`,
        }}
      >
        Apply to become a member of BAD
      </div>
    );
  };

  const ServeContent = () => {
    return (
      <div style={{ ...styles.titleWrapper, padding: `2em 0` }}>
        <div
          style={{ ...styles.title, ...stepOne }}
          onClick={() =>
            handleGoToPath({
              path: `/registration/step-1-the-process/`,
            })
          }
        >
          Step 1 - The Process
        </div>
        <div
          style={{ ...styles.title, ...stepTwo }}
          onClick={() =>
            handleGoToPath({
              path: `/registration/step-2-personal-information/`,
            })
          }
        >
          Step 2 - Personal Information
        </div>
        <div
          style={{ ...styles.title, ...stepThree }}
          onClick={() =>
            handleGoToPath({
              path: `/registration/step-3-category-selection/`,
            })
          }
        >
          Step 3 - Category Selection
        </div>
        <div
          style={{ ...styles.title, ...stepFour }}
          onClick={() =>
            handleGoToPath({
              path: `/registration/step-4-professional-details/`,
            })
          }
        >
          Step 4 - Professional Details
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex-col"
      style={{
        paddingRight: `4em`,
        borderRight: `1px solid ${colors.darkSilver}`,
      }}
    >
      <ServeTitle />
      <ServeContent />
    </div>
  );
};

const styles = {
  titleWrapper: {
    fontSize: 16,
  },
  title: {
    padding: `0.5em 0`,
    cursor: "pointer",
  },
};

export default connect(SideBarMenu);