import { useState, useEffect } from "react";
import { connect } from "frontity";
import Image from "@frontity/components/image";

import date from "date-and-time";

import { colors } from "../../config/imports";
import ElectionInfo from "./electionInfo";

const DATE_MODULE = date;

const CardBody = ({
  state,
  actions,
  libraries,
  title,
  body,
  bodyLimit,
  date,
  publicationDate,
  seatNumber,
  heroBanner,
  TEXT_ALIGN,
  isFrom4Col,
  electionInfo,
  titleLimit,
  opacity,
}) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  let CONTENT_ALIGNMENT = 0;
  if (heroBanner) CONTENT_ALIGNMENT = `auto 0`;

  let PADDING = 0;
  if (heroBanner) PADDING = `1em 2em`;

  // SERVERS ---------------------------------------------
  const ServeTitle = () => {
    if (!title) return null;

    return (
      <div
        className="flex primary-title body-limit"
        style={{
          fontSize: heroBanner ? `2.25rem` : 20,
          minHeight: "auto",
          maxHeight: isFrom4Col ? "7em" : "auto", // restricting title height
          overflow: "hidden",
          fontWeight: "bold",
          color: heroBanner ? colors.trueBlack : colors.softBlack,
          alignItems: "flex-start",
          opacity: opacity || 1,
          WebkitLineClamp: titleLimit || "unset",
        }}
      >
        <Html2React html={title} />
      </div>
    );
  };

  const ServeBody = () => {
    if (!body) return null;

    return (
      <div
        className="body-limit"
        style={{
          fontSize: 16,
          paddingTop: title ? `1em` : 0,
          WebkitLineClamp: bodyLimit || "unset",
        }}
      >
        <Html2React html={body} />
      </div>
    );
  };

  const ServeSeatsRemaining = () => {
    if (!seatNumber) return null;

    return (
      <div
        className="flex"
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: colors.blue,
          fontStyle: "italic",
          textTransform: "capitalize",
          paddingBottom: `1em`,
        }}
      >
        <Html2React html={"TBC Seats remaining"} />
      </div>
    );
  };

  const ServeDate = () => {
    if (!date) return null;

    return (
      <div className="flex" style={{ paddingTop: `1em` }}>
        {date.map((block, key) => {
          const { date, end_time, start_time } = block;

          const dateObject = new Date(date);
          const formattedDate = DATE_MODULE.format(dateObject, "DD MMM YYYY");

          return (
            <div
              key={key}
              style={{
                fontSize: 12,
                fontWeight: "bold",
                paddingRight: `1em`,
              }}
            >
              <Html2React html={formattedDate} />
            </div>
          );
        })}
      </div>
    );
  };

  const ServePublicationDate = () => {
    if (!publicationDate) return null;

    const dateObject = new Date(publicationDate);
    const formattedDate = DATE_MODULE.format(dateObject, "DD MMM YYYY");

    return (
      <div className="flex" style={{ paddingTop: `1em` }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          <Html2React html={formattedDate} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex-col"
      style={{
        textAlign: `${TEXT_ALIGN}`,
        padding: PADDING,
      }}
    >
      <div style={{ margin: CONTENT_ALIGNMENT }}>
        <ServeSeatsRemaining />
        <ServeTitle />
        <ServePublicationDate />
        <ElectionInfo electionInfo={electionInfo} opacity={opacity} />
        <ServeBody />
        <ServeDate />
      </div>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(CardBody);
