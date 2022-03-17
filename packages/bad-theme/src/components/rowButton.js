import { useState, useEffect } from "react";
import { connect } from "frontity";
import { colors } from "../config/imports";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import parse from "html-react-parser";

import { setGoToAction } from "../context";
// CONTEXT ----------------------------------------------------------------
import { useAppDispatch, setEnquireAction } from "../context";

const RowButton = ({
  state,
  actions,
  libraries,
  block,
  onClick,
  multiPostRowButtons,
}) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  const dispatch = useAppDispatch();

  let {
    title,
    colour,
    link,
    contact_form,
    allow_attachments,
    recipients,
    link_id,
    file_link,
  } = block;

  // initialize new enquireAction object
  let enquireAction = { ...block };
  // default to defaultContactList if no recipients are set
  if (!enquireAction.recipients) {
    // recipients = state.theme.defaultContactList;
    console.log("📧 contact list", state.contactList.defaultContactList); // debug
    enquireAction.recipients = state.contactList.defaultContactList;
    // enquireAction.recipients = [{ email: "ed@skylarkcreative.co.uk" }];
  }

  const THEME = colour || colors.primary;
  let LABEL = title;
  if (!title && link) LABEL = link.title;

  // SERVERS --------------------------------------------
  const ServeFooter = () => {
    return (
      <div
        style={{
          backgroundColor: THEME,
          height: 5,
          width: "100%",
        }}
      />
    );
  };

  const ServeButton = () => {
    return (
      <div className="flex-col">
        <div className="flex-col row-btn">
          <div className="flex-row" style={{ alignItems: "center" }}>
            <div className="flex">
              <div
                className={!multiPostRowButtons ? "caps-btn" : "mp-row-button"}
              >
                <Html2React html={LABEL} />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                paddingLeft: `1em`,
              }}
            >
              <KeyboardArrowRightIcon
                style={{
                  fill: colors.white,
                  backgroundColor: THEME,
                  borderRadius: "50%",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <ServeFooter />
      </div>
    );
  };

  return (
    <div
      className="flex shadow"
      style={{
        backgroundColor: colors.white,
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => {
        if (link_id) {
          window.location.href = "#" + link_id;
          return;
        }
        if (file_link) {
          window.open(file_link.url);
          return;
        }
        if (onClick) {
          onClick();
          return;
        }
        if (contact_form) {
          setEnquireAction({
            dispatch,
            // ⬇️ contact form config. Defaults to general contacts if values not provided to contact form ⬇️
            enquireAction,
          });
          return;
        }
        if (link) {
          setGoToAction({ path: link.url, actions });
          return;
        }
      }}
    >
      <ServeButton />
    </div>
  );
};

const styles = {
  conteiner: {},
};

export default connect(RowButton);
