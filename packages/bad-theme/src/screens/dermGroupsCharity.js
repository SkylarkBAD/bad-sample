import { useState, useEffect, useRef } from "react";
import { connect } from "frontity";

import { colors } from "../config/imports";
import BlockBuilder from "../components/builder/blockBuilder";
import { muiQuery } from "../context";
import TitleBlock from "../components/titleBlock";
import Card from "../components/card/card";
import Loading from "../components/loading";
// CONTEXT -----------------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  handleApplyForMembershipAction,
  getMembershipDataAction,
} from "../context";
// BLOCK WIDTH WRAPPER -------------------------------------------------------
import BlockWrapper from "../components/blockWrapper";

const DermGroupsCharity = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const dispatch = useAppDispatch();
  const { applicationData, isActiveUser, dynamicsApps } = useAppState();

  const data = state.source.get(state.router.link);
  const dermGroupe = state.source[data.type][data.id];
  console.log("dermGroupe", dermGroupe); // debug

  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;

  const { content, title, dermo_group_type, acf } = dermGroupe;
  const useEffectRef = useRef(null);

  useEffect(async () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // force scrolling to top of page
    document.documentElement.scrollTop = 0; // for safari

    return () => {
      useEffectRef.current = false; // clean up function
    };
  }, []);

  // HANDLERS --------------------------------------------------
  const handleApply = async ({ catType }) => {
    await handleApplyForMembershipAction({
      state,
      actions,
      dispatch,
      applicationData,
      isActiveUser,
      dynamicsApps,
      category: "SIG",
      type: catType || "", // application type name
      membershipApplication: {
        stepOne: false,
      },
      path: "/membership/sig-questions/", // redirect to SIG form page
    });
  };

  // SERVERS ---------------------------------------------------
  const ServeContent = () => {
    return (
      <div>
        <TitleBlock
          block={{ title: title.rendered }}
          margin={`0 0 ${marginVertical}px 0`}
        />
        <Html2React html={content.rendered} />
        <ApplyForMembership />
      </div>
    );
  };

  const ApplyForMembership = () => {
    if (!dermo_group_type && dermo_group_type.length === 0) return null;

    let membershipTypes = Object.values(state.source.dermo_group_type);
    console.log(membershipTypes); // debug

    return (
      <div style={{ paddingTop: `2em` }}>
        {membershipTypes.map(({ name }, key) => {
          // get current application data from memberships object by id
          // console.log(type); // debug

          return (
            <div
              key={key}
              className="blue-btn"
              style={{ width: "fit-content", margin: `1em 0` }}
              onClick={() => handleApply({ catType: name })}
            >
              <Html2React html={`Apply for ${name} membership`} />
            </div>
          );
        })}
      </div>
    );
  };

  // RETURN ---------------------------------------------------
  return (
    <BlockWrapper>
      <div style={{ padding: `${marginVertical}px ${marginHorizontal}px` }}>
        <div style={styles.container}>
          <ServeContent />
          <div style={{ minWidth: 300 }}>
            <Card
              dermGroupe={acf}
              colour={colors.primary}
              cardHeight="fit-content"
              cardMinHeight={300}
              shadow
            />
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: `1fr auto`,
    gap: "2em",
  },
};

export default connect(DermGroupsCharity);
