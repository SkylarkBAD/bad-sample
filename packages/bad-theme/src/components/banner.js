import { connect } from "frontity";
import { colors } from "../config/imports";
import Image from "@frontity/components/image";

import Loading from "./loading";
import BlockWrapper from "./blockWrapper";
import { setGoToAction, muiQuery } from "../context";

const Banner = ({ state, actions, libraries, block }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  if (!block) return <Loading />;

  const { sm, md, lg, xl } = muiQuery();

  const { disable_vertical_padding } = block;

  const { background_image, label, link, title } = block;
  const BANNER_HEIGHT = state.theme.bannerHeight;
  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  // SERVERS ----------------------------------------------------------------
  const ServeFooter = () => {
    const ServeMoreAction = () => {
      if (!label && !link) return null;

      let LABEL = "More";
      if (label) LABEL = label;

      return (
        <div
          className="flex"
          style={{
            alignItems: !lg ? "flex-end" : "flex-start",
            justifyContent: !lg ? "flex-end" : "flex-start",
            marginTop: !lg ? null : "1em",
          }}
        >
          <div>
            <button
              className="banner-transparent-btn"
              onClick={() => setGoToAction({ path: link.url, actions })}
            >
              <div className="first-letter-capital">
                <Html2React html={LABEL} />
              </div>
            </button>
          </div>
        </div>
      );
    };

    return (
      <div style={{ position: "relative" }}>
        <div>
          <div
            className={!lg ? "flex-row" : "flow-col"}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: marginHorizontal,
              width: "100%",
              padding: `${marginVertical}px ${marginHorizontal}px`,
              marginBottom: `2em`,
            }}
          >
            <div className="flex" style={{ flex: 3 }}>
              <div
                className="flex-col title-no-bottom-margin colour-white"
                style={{
                  fontSize: 36,
                  lineHeight: 1.2,
                  justifyContent: "flex-end",
                  overflow: "hidden",
                }}
              >
                <Html2React html={title} />
              </div>
            </div>
            <ServeMoreAction />
          </div>
        </div>
      </div>
    );
  };

  const ServeCardImage = () => {
    if (!background_image) return null;
    const alt = title || "BAD";

    return (
      <div style={{ width: "100%", height: BANNER_HEIGHT, overflow: "hidden" }}>
        <Image
          src={background_image.url}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  };

  const ServeOverlay = () => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: BANNER_HEIGHT,
          background: `linear-gradient(0deg, rgba(31,51,94,1) 0%, rgba(133,133,148,0.1) 60%)`,
        }}
      />
    );
  };

  // RETURN ---------------------------------------------------
  return (
    <div
      className="flex-col"
      style={{
        position: "relative",
        height: BANNER_HEIGHT,
        margin: `${marginVertical}px 0`,
        overflow: "hidden",
      }}
    >
      <ServeCardImage />
      <ServeOverlay />
      <BlockWrapper>
        <ServeFooter />
      </BlockWrapper>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(Banner);
