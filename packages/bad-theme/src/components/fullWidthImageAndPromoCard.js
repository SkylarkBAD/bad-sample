import { useState, useEffect } from "react";
import { connect } from "frontity";

import Link from "@frontity/components/link";
import Card from "./card/card";
import Loading from "./loading";
// CONTEXT -------------------------------------
import { setLinkWrapperAction } from "../context";

const FullWidthImageAndPromoCard = ({ state, actions, block }) => {
  if (!block) return <Loading />;

  const { body, colour, image, disable_vertical_padding, link } = block;
  // console.log("promo card", block); // debug

  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  // RETURN ---------------------------------------------------
  return (
    <div style={{ margin: `${marginVertical}px ${marginHorizontal}px` }}>
      <div className="flex">
        <a
          className={`flex card-wrapper`}
          href={setLinkWrapperAction({ path: link.url })}
        >
          <Card
            imageAndPromoCard={block}
            colour={colour}
            removePadding
            shadow // optional param
          />
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(FullWidthImageAndPromoCard);
