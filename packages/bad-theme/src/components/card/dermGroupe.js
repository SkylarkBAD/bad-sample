import { useState, useEffect } from "react";
import { connect } from "frontity";

import Image from "@frontity/components/image";
import Link from "@frontity/components/link";

import { colors } from "../../config/imports";
import { setGoToAction } from "../../context";

import ProfileAvatar from "../../img/svg/profile.svg";

const DermGroupe = ({ state, actions, libraries, dermGroupe }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  if (!dermGroupe) return null;

  const { email, logo, telephone_helpline, website_url } = dermGroupe;

  // SERVERS ---------------------------------------------
  const ServeCardImage = () => {
    if (!logo) return null;

    const alt = logo;

    return (
      <div className="flex" style={{ paddingBottom: `2em` }}>
        <div style={{ height: `100%` }}>
          <Image
            src={logo}
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

  const ServeEmail = () => {
    if (!email) return null;
    let padding = `2em`;
    if (!website_url && !telephone_helpline) padding = `0`;

    return (
      <div
        className="flex-col primary-title"
        style={{ paddingBottom: padding }}
      >
        <div style={{ fontSize: 20 }}>Contact Email:</div>
        <div className="title-link-animation">
          <Link
            link={`mailto:${email}?subject =BAD contact`}
            target="_blank"
            style={styles.link}
          >
            <Html2React html={email} />
          </Link>
        </div>
      </div>
    );
  };

  const ServeWebsite = () => {
    if (!website_url) return null;
    let padding = telephone_helpline ? `2em` : 0;

    return (
      <div
        className="flex-col primary-title"
        onClick={() => setGoToAction({ path: website_url, actions })}
        style={{ paddingBottom: padding }}
      >
        <div style={{ fontSize: 20 }}>Website:</div>
        <div className="title-link-animation">
          <Html2React html={website_url} />
        </div>
      </div>
    );
  };

  const ServePhone = () => {
    if (!telephone_helpline) return null;

    return (
      <div className="flex primary-title">
        <div style={{ fontSize: 20 }}>Phone Number:</div>
        <div className="title-link-animation" style={{ cursor: "pointer" }}>
          <Html2React html={telephone_helpline} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex-col text-wrap">
      <ServeCardImage />
      <ServeEmail />
      <ServeWebsite />
      <ServePhone />
    </div>
  );
};

const styles = {
  link: { boxShadow: "none", color: "inherit" },
};

export default connect(DermGroupe);
