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
import NewsCarouselHeader from "./newsCarouselHeader";
import EventCardHeader from "./eventCardHeader";

const Card = ({
  state,
  actions,
  libraries,
  colour,
  cardTitle,
  title,
  body,
  link_label,
  link,
  downloadFile,
  gallery,
  venueInfo,
  videoGalleryInfo,
  fundingPromo,
  textAlign,
  url,
  isFrom4Col,
  form_label,
  form_link,
  date,
  seatNumber,
  eventHeader,
  limitBodyLength,
  shadow,
  cardWidth,
  cardHeight,
  heroBanner,
  newsCarousel,
  journalCard,
  newsArticle,
}) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  const TEXT_ALIGN = textAlign || "start"; // takes values 'start' | 'center' | 'end'
  const THEME = colour || colors.primary;
  const SHADOW = shadow ? "shadow" : "";
  let CARD_HEIGHT = "100%";
  if (title || body) CARD_HEIGHT = "auto";
  if (cardHeight) CARD_HEIGHT = cardHeight;
  if (isFrom4Col) CARD_HEIGHT = "100%";

  // SERVERS ----------------------------------------------
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
      <div style={{ width: "100%", minHeight: 200, maxHeight: 300 }}>
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
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <div
            style={{
              backgroundColor: colors.lightSilver,
              fontSize: 12,
              letterSpacing: 2,
              borderRadius: 5,
              textTransform: "uppercase",
              marginBottom: `1em`,
              padding: `0.5em`,
            }}
          >
            <Html2React html={cardTitle} />
          </div>
        </div>
      </div>
    );
  };

  const ServeContent = () => {
    return (
      <div className="flex-col" style={{ padding: isFrom4Col ? `1em` : `2em` }}>
        <ServeCardHeader />
        <EventCardHeader eventHeader={eventHeader} />
        <ServeJournalCard />
        <CardBody
          title={title}
          body={body}
          date={date}
          seatNumber={seatNumber}
          heroBanner={heroBanner}
          TEXT_ALIGN={TEXT_ALIGN}
          isFrom4Col={isFrom4Col}
          newsCarousel={newsCarousel}
          limitBodyLength={limitBodyLength}
        />
        <VenueInfo venueInfo={venueInfo} />
        <VideoGalleryInfo videoGalleryInfo={videoGalleryInfo} />
        <CardActions
          link_label={link_label}
          link={link}
          form_label={form_label}
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
        height: CARD_HEIGHT,
        position: "relative",
      }}
    >
      <PromoHeader fundingPromo={fundingPromo} />
      <GalleryCarousel gallery={gallery} />
      <NewsArticleHeader newsArticle={newsArticle} />
      <NewsCarouselHeader newsCarousel={newsCarousel} />
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
