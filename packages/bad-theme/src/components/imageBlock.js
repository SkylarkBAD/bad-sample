import { useState, useEffect } from "react";
import { connect } from "frontity";

import Image from "@frontity/components/image";
import Loading from "./loading";
import { colors } from "../config/imports";

const ImageBlock = ({ state, actions, libraries, block }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  if (!block) return <Loading />;

  const { image, image_ratio, disable_vertical_padding } = block;

  const BANNER_HEIGHT = state.theme.bannerHeight;
  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  // SERVERS ---------------------------------------------
  const ServeCardImage = () => {
    if (!image) return null;
    const alt = image.title || "BAD";

    let STYLES = { height: BANNER_HEIGHT, width: BANNER_HEIGHT };
    if (image_ratio === "16:9")
      STYLES = { height: BANNER_HEIGHT, width: BANNER_HEIGHT * (9 / 16) };
    if (image_ratio === "9:16")
      STYLES = { height: BANNER_HEIGHT, width: BANNER_HEIGHT * (16 / 9) };

    return (
      <div className="flex" style={{ justifyContent: "center" }}>
        <div className="shadow" style={STYLES}>
          <Image
            src={image.url}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );
  };

  // RETURN ---------------------------------------------
  return (
    <div style={{ padding: `${marginVertical}px ${marginHorizontal}px` }}>
      <ServeCardImage />
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(ImageBlock);
