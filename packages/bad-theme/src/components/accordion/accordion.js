import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import connect from "@frontity/connect";
import AccordionBody from "./alteraccordionBody";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
// --------------------------------------------------------------------------------
import CardHeader from "./alteraccordionHeader";
import Loading from "../loading";
import BlockWrapper from "../blockWrapper";
import { colors } from "../../config/colors";
import SearchContainer from "../searchContainer";
// --------------------------------------------------------------------------------
import { useAppState, muiQuery } from "../../context";

function AlterAccordion({
  state,
  actions,
  libraries,
  block,
  guidelines,
  leadershipBlock,
  fundingBlock,
  membershipApplications,
  hasPublishDate,
  hasPreview,
}) {
  // HELPERS -----------------------------------------------------------------------
  function CustomToggle({ children, eventKey, callback }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      callback && callback(eventKey);
    });

    return <div onClick={decoratedOnClick}>{children}</div>;
  }

  if (!block) return <Loading />;
  const { lg } = muiQuery();
  const { dynamicsApps } = useAppState();

  const data = state.source.get(state.router.link);
  const {
    add_search_function,
    disable_vertical_padding,
    accordion_item,
    approved_bad_members_only,
    background_colour,
  } = block;
  console.log("🐞 ACORDION ITEM", block); // debug

  const [searchFilter, setSearchFilter] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [searchInput, setInput] = useState(null);
  const searchFilterRef = useRef(null);

  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical / 2;
  if (disable_vertical_padding) marginVertical = 0;

  let isBADApproved = false;
  if (dynamicsApps && dynamicsApps.subs.data.length > 0) isBADApproved = true;
  let isForBADMembersOnly = false;
  if (approved_bad_members_only && !isBADApproved) isForBADMembersOnly = true;

  useLayoutEffect(() => {
    // ⬇️ re-set accordion data state on data change
    setSearchFilter(accordion_item);
    const id = uuidv4(); // add unique id
    setUniqueId(id);
  }, [accordion_item]);

  if (!searchFilter || isForBADMembersOnly) return null; // defensive programming

  // HANDLERS ---------------------------------------------
  const handleSearch = () => {
    const input = searchFilterRef.current.value;
    let filter = accordion_item;

    if (input) {
      filter = filter.filter((item) => {
        let title = item.title;
        let body = item.content;

        if (title) title = title.toLowerCase().includes(input.toLowerCase());
        if (body) body = content.toLowerCase().includes(input.toLowerCase());

        return title || body;
      });
    }

    setSearchFilter(filter);
    setInput(input);
  };

  const handleClearSearchFilter = () => {
    setSearchFilter(accordion_item);
    setInput(null);
  };

  // SERVERS ---------------------------------------------
  const ServeAccordionSearchFilter = () => {
    if (!add_search_function) return null;

    let searchTitle = "Search for content";
    if (data.link === "/education-training/bursaries-fellowships-awards/")
      searchTitle = "Search bursaries, fellowships and awards";

    const ServeSearchFilter = () => {
      if (!searchInput) return null;

      return (
        <div className="shadow filter">
          <div>{searchInput}</div>
          <div className="filter-icon" onClick={handleClearSearchFilter}>
            <CloseIcon
              style={{
                fill: colors.darkSilver,
                padding: 0,
              }}
            />
          </div>
        </div>
      );
    };

    return (
      <div
        style={{
          backgroundColor: colors.silverFillTwo,
          padding: "2em 0",
        }}
      >
        <BlockWrapper>
          <div
            style={{
              padding: `0 ${marginHorizontal}px`,
              width: `70%`,
            }}
            className="no-selector"
          >
            <div className="flex-row">
              <SearchContainer
                title={searchTitle}
                searchFilterRef={searchFilterRef}
                handleSearch={handleSearch}
              />
            </div>

            <div className="flex" style={{ margin: "0.5em 0" }}>
              <ServeSearchFilter />
            </div>
          </div>
        </BlockWrapper>
      </div>
    );
  };

  const SingleItem = ({ block, id }) => {
    let isActive = false;
    if (leadershipBlock && block.block) isActive = block.block.is_active;
    // 📌 apply show class to accordion item.
    // set timeout get the accordion body with the unique id
    if (isActive) {
      // get the accordion body with the unique id and add the show class
      useEffect(() => {
        const accordionBody = document.getElementById(uniqueId);
        if (accordionBody) accordionBody.classList.add("show");
      }, []);
    }

    return (
      <Card
        style={{
          borderRadius: 0,
          border: 0,
          margin: `${marginVertical}px 0`,
        }}
        // 📌 animation adds bug when using react-bootstrap accordion
        // uncoment to use css effects
        // data-aos={leadershipBlock ? "none" : "fade"}
        // data-aos-easing="ease-in-sine"
        // data-aos-delay={`${id}`}
        // data-aos-duration="1000"
        // data-aos-offset="-120"

        className="shadow"
      >
        <Card.Header
          style={{
            padding: 0,
            border: 0,
            backgroundColor: "#fff",
          }}
        >
          <CustomToggle eventKey={id}>
            <CardHeader
              id={id}
              uniqueId={id}
              block={block}
              guidelines={guidelines}
              leadershipBlock={leadershipBlock}
              fundingBlock={fundingBlock}
              membershipApplications={membershipApplications}
              hasPreview={hasPreview}
            />
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={id} id={uniqueId}>
          <Card.Body style={{ padding: "1em 3.25em" }}>
            <AccordionBody
              block={block}
              guidelines={guidelines}
              leadershipBlock={leadershipBlock}
              uniqueId={id}
              fundingBlock={fundingBlock}
              membershipApplications={membershipApplications}
              hasPublishDate={hasPublishDate}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  return (
    <div>
      <ServeAccordionSearchFilter />
      <div style={{ backgroundColor: background_colour || "transparent" }}>
        <BlockWrapper>
          <div style={{ padding: !lg ? "0 100px" : "0 0.5em" }}>
            <Accordion style={{ border: 0 }}>
              {searchFilter.map((block, key) => {
                return <SingleItem block={block} key={key} id={key} />;
              })}
            </Accordion>
          </div>
        </BlockWrapper>
      </div>
    </div>
  );
}

export default connect(AlterAccordion);
