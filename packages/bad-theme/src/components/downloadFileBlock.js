import { useState, useEffect } from "react";
import { connect } from "frontity";
import parse from "html-react-parser";

import { colors } from "../config/imports";
import Image from "@frontity/components/image";

import PDF from "../img/svg/badPDF.svg";
import DOC from "../img/svg/badDOC.svg";
import PPT from "../img/svg/badPPT.svg";
import XLS from "../img/svg/badXLS.svg";
// CONTEXT ---------------------------------------------
import { setGoToAction, muiQuery } from "../context";

const DownloadFileBlock = ({
  state,
  actions,
  libraries,
  block,
  guidelines,
  disableMargin,
}) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  const { sm, md, lg, xl } = muiQuery();

  if (!block) return null;

  const { file, guidline_file, disable_vertical_padding, title, label, type } =
    block;

  const ICON_WIDTH = 35;
  const isBtnStyle = type && type === "Button";

  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  // SERVERS ---------------------------------------------
  const ServeActions = () => {
    if (!file) return null;

    let fileName = "Download";
    if (file.title) fileName = file.title;
    if (label) fileName = label;

    return (
      <div
        className={isBtnStyle ? "" : "caps-btn-no-underline"}
        style={{ display: "grid", boxShadow: "none" }}
      >
        <a href={file.url} target="_blank" style={styles.link} download>
          <Html2React html={fileName} />
        </a>
      </div>
    );
  };

  const ServeGSActions = () => {
    if (!guidline_file) return null;

    let fileName = "Read Guideline";
    if (guidelines) fileName = guidline_file.title;
    if (title) fileName = title;

    return (
      <div
        className="caps-btn-no-underline"
        style={{ display: "grid", boxShadow: "none" }}
      >
        <a
          href={guidline_file.url}
          target="_blank"
          style={styles.link}
          download
        >
          {!lg ? <Html2React html={fileName} /> : "Download file"}
        </a>
      </div>
    );
  };

  const ServeIcon = () => {
    if (!file && !guidline_file) return null;
    if (type && type === "Button") return null;

    let fileType = "";
    if (file) fileType = file.subtype;
    if (guidline_file) fileType = guidline_file.subtype;

    let FILE_ICON = PDF;
    if (fileType.includes("doc")) FILE_ICON = DOC;
    if (fileType.includes("word")) FILE_ICON = DOC;
    if (fileType.includes("ppt")) FILE_ICON = PPT;
    if (fileType.includes("xls")) FILE_ICON = XLS;

    return (
      <div style={{ marginRight: `1em` }}>
        <Image
          src={FILE_ICON}
          style={{
            width: ICON_WIDTH,
            height: ICON_WIDTH,
          }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        margin: disableMargin ? 0 : `${marginVertical}px ${marginHorizontal}px`,
      }}
    >
      <div
        className={isBtnStyle ? "flex-row blue-btn" : "flex-row"}
        style={{
          alignItems: "center",
          width: isBtnStyle ? "fit-content" : "auto",
        }}
      >
        <ServeIcon />
        <ServeActions />
        <ServeGSActions />
      </div>
    </div>
  );
};

const styles = {
  link: { boxShadow: "none", color: "inherit" },
};

export default connect(DownloadFileBlock);
