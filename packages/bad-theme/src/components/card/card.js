import { useState, useEffect } from "react";
import { connect } from "frontity";
import { colors } from "../../config/colors";
import Image from "@frontity/components/image";

import CardBody from "./carBody";
import CardActions from "./cardActions";
import JournalCard from "../home/journalCard";
import PromoHeader from "./promoHeader";
import GalleryCarousel from "./galleryCarousel";
import VenueInfo from "./venueInfo";
import NewsArticleHeader from "./newsArticleHeader";
import VideoGalleryInfo from "./videoGalleryInfo";

const Card = ({
  state,
  actions,
  libraries,
  colour,
  cardTitle,
  title,
  body,
  label,
  link,
  downloadFile,
  gallery,
  venueInfo,
  videoGalleryInfo,
  fundingPromo,
  textAlign,
  url,
  form_link,
  shadow,
  cardWidth,
  heroBanner,
  journalCard,
  newsArticle,
}) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  const TEXT_ALIGN = textAlign || "start"; // takes values 'start' | 'center' | 'end'
  const THEME = colour || colors.primary;
  const SHADOW = shadow ? "shadow" : "";

  // SERVERS ----------------------------------------------
  const ServeFooter = () => {
    return (
      <div
        style={{
          backgroundColor: THEME,
          height: 8,
          width: "100%",
        }}
      />
    );
  };

  const ServeJournalCard = () => {
    if (!journalCard) return null;

    return (
      <JournalCard
        image={journalCard.image}
        title={journalCard.title}
        user={journalCard.user}
        tweet
      />
    );
  };

  const ServeCardImage = () => {
    if (!url) return null;
    const alt = title || "BAD";

    return (
      <div style={{ width: "100%", maxHeight: 300 }}>
        <Image
          src={url}
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

  const ServeCardHeader = () => {
    if (url) return null;
    if (!cardTitle) return null;

    return (
      <div>
        <div
          className="flex"
          style={{
            backgroundColor: colors.lightSilver,
            borderRadius: 5,
            textTransform: "uppercase",
            marginBottom: `1em`,
          }}
        >
          <Html2React html={cardTitle} />
        </div>
      </div>
    );
  };

  const ServeContent = () => {
    return (
      <div className="flex-col" style={{ padding: `1em 2em` }}>
        <ServeCardHeader />
        <ServeJournalCard />
        <CardBody
          title={title}
          body={body}
          heroBanner={heroBanner}
          TEXT_ALIGN={TEXT_ALIGN}
        />
        <VenueInfo venueInfo={venueInfo} />
        <VideoGalleryInfo videoGalleryInfo={videoGalleryInfo} />
        <CardActions
          label={label}
          link={link}
          form_link={form_link}
          downloadFile={downloadFile}
        />
      </div>
    );
  };

  // RETURN ----------------------------------------------------
  return (
    <div
      className={SHADOW}
      style={{
        ...styles.card,
        backgroundColor: colors.white,
        width: cardWidth || "100%",
      }}
    >
      <PromoHeader fundingPromo={fundingPromo} />
      <GalleryCarousel gallery={gallery} />
      <NewsArticleHeader newsArticle={newsArticle} />
      <ServeCardImage />
      <ServeContent />
      <ServeFooter />
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  footerActionTitle: {
    borderBottom: `1px solid ${colors.black}`,
    cursor: "pointer",
  },
};

export default connect(Card);