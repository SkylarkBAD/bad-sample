import { useState, useEffect, useRef } from "react";
import { connect } from "frontity";
import parse from "html-react-parser";

import TitleBlock from "./titleBlock";
import Card from "./card/card";
import Accordion from "./accordion/accordion";
import Loading from "./loading";
import { colors } from "../config/imports";
import BlockWrapper from "./blockWrapper";
import SearchContainer from "./searchContainer";
import TypeFilters from "./typeFilters";

import CloseIcon from "@mui/icons-material/Close";

const CPTBlock = ({ state, actions, libraries, block }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const [postListData, setPostListData] = useState(null);
  const [groupeType, setGroupeType] = useState(null);

  const [searchFilter, setSearchFilter] = useState(null);

  const searchFilterRef = useRef(null);
  const currentSearchFilterRef = useRef(null);
  const typeFilterRef = useRef(null);
  const loadMoreRef = useRef(null);

  if (!block) return <Loading />;

  const {
    colour,
    background_colour,
    post_limit,
    disable_vertical_padding,
    add_search_function,
    layout,
    preview,
    funding_filter,
  } = block;

  const LIMIT = 100; // max limit

  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  const isAccordion = layout === "accordion";
  let postPath = `funding_awards`;
  let typePath = `funding_type`;

  let PADDING = `${marginVertical}px 0`;
  if (add_search_function) PADDING = `0 0 ${marginVertical}px 0`;

  // DATA pre FETCH ----------------------------------------------------------------
  useEffect(async () => {
    const path = `/${postPath}/`;
    await actions.source.fetch(path); // fetch CPT dermGroupeData

    let dermGroupeData = state.source.get(path);
    const { totalPages, page, next } = dermGroupeData; // check if dermGroupeData have multiple pages
    // fetch dermGroupeData via wp API page by page
    let isThereNextPage = next;
    while (isThereNextPage) {
      await actions.source.fetch(isThereNextPage); // fetch next page
      const nextPage = state.source.get(isThereNextPage).next; // check ifNext page & set next page
      isThereNextPage = nextPage;
    }
    let resultData = Object.values(state.source[postPath]);
    const GROUPE_TYPE = Object.values(state.source[typePath]);

    if (funding_filter !== "All Levels") {
      resultData = resultData.filter((item) =>
        item.funding_type.includes(Number(funding_filter))
      );
    }

    const limit = post_limit || LIMIT;
    setPostListData(resultData.slice(0, Number(limit))); // apply limit on posts
    setGroupeType(GROUPE_TYPE);

    return () => {
      searchFilterRef.current = false; // clean up function
    };
  }, []);
  // DATA pre FETCH ---------------------------------------------------------
  if (!postListData || !groupeType) return <Loading />;

  // HELPERS ----------------------------------------------------------------
  const handleLoadMoreFilter = async () => {
    if (postListData.length < LIMIT) return;
    let data = Object.values(state.source[postPath]);

    if (!loadMoreRef.current) {
      loadMoreRef.current = data;
      setPostListData(data);
    } else {
      setPostListData(loadMoreRef.current.slice(0, Number(LIMIT)));
      loadMoreRef.current = null;
    }
  };

  const handleSearch = () => {
    const input = searchFilterRef.current.value || searchFilter;
    currentSearchFilterRef.current = input;
    let data = Object.values(state.source[postPath]);

    if (typeFilterRef.current) {
      data = data.filter((item) =>
        item[typePath].includes(typeFilterRef.current)
      );
    }

    if (input) {
      data = data.filter((item) => {
        let title = item.title.rendered;
        let content = item.acf.overview;

        if (title) title = title.toLowerCase().includes(input.toLowerCase());
        if (content)
          content = content.toLowerCase().includes(input.toLowerCase());

        return title || content;
      });
    }

    setPostListData(data);
    setSearchFilter(input);
  };

  const handleTypeSearch = () => {
    const input = typeFilterRef.current;
    let data = Object.values(state.source[postPath]); // add postListData object to data array

    if (currentSearchFilterRef.current)
      data = data.filter((item) => {
        let title = item.title;
        if (title) title = title.rendered;
        let content = item.content;
        if (content) content = content.rendered;
        let overview = item.acf;
        if (overview) overview = overview.overview;

        if (title)
          title = title.toLowerCase().includes(currentSearchFilterRef.current);
        if (content)
          content = content
            .toLowerCase()
            .includes(currentSearchFilterRef.current);
        if (overview)
          overview = overview
            .toLowerCase()
            .includes(currentSearchFilterRef.current);

        return title || content || overview;
      });

    if (input) {
      data = data.filter((item) => {
        const list = item[typePath];
        if (list.includes(input)) return item;
      });

      setPostListData(data);
    }
  };

  const handleClearSearchFilter = () => {
    let data = Object.values(state.source[postPath]); // add postListData object to data array
    setSearchFilter(null);
    searchFilterRef.current = null;
    currentSearchFilterRef.current = null;

    if (!typeFilterRef.current) {
      setPostListData(data.slice(0, Number(post_limit || LIMIT)));
    } else {
      handleTypeSearch();
    }
  };

  const handleClearTypeFilter = () => {
    typeFilterRef.current = null;
    let data = Object.values(state.source[postPath]); // add postListData object to data array

    if (!currentSearchFilterRef.current) {
      setPostListData(data.slice(0, Number(post_limit || LIMIT)));
    } else {
      handleSearch();
    }
  };

  // SERVERS ----------------------------------------------------------------
  const ServeFilter = () => {
    if (!add_search_function) return null;

    const ServeSearchFilter = () => {
      if (!searchFilter) return null;

      return (
        <div className="shadow filter">
          <div>{searchFilter}</div>
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
          marginBottom: `${state.theme.marginVertical}px`,
          padding: `2em 0`,
        }}
        className="no-selector"
      >
        <BlockWrapper>
          <div style={{ padding: `0 ${marginHorizontal}px` }}>
            <SearchContainer
              title={isAccordion ? "Undergraduate Awards" : "Research Funding"}
              width="70%"
              searchFilterRef={searchFilterRef}
              handleSearch={handleSearch}
            />
            <div className="flex" style={{ margin: "0.5em 0" }}>
              <ServeSearchFilter />
            </div>
            <TypeFilters
              filters={groupeType}
              handleSearch={handleTypeSearch}
              typeFilterRef={typeFilterRef}
              handleClearTypeFilter={handleClearTypeFilter}
              title="Filter"
            />
          </div>
        </BlockWrapper>
      </div>
    );
  };

  const ServeLayout = () => {
    if (isAccordion)
      return (
        <div>
          <Accordion
            block={{
              accordion_item: postListData,
            }}
            fundingBlock
            hasPreview={preview}
          />
        </div>
      );

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(3, 1fr)`,
          justifyContent: "space-between",
          gap: 20,
          padding: `0 ${marginHorizontal}px`,
        }}
      >
        {postListData.map((block, key) => {
          const { title, content, link, date, dermo_group_type } = block.acf;

          return (
            <Card
              key={key}
              fundingHeader={block}
              publicationDate={date}
              body={block.acf.overview}
              bodyLimit={4}
              link_label="Read More"
              link={block.acf.external_application_link}
              colour={colour}
              shadow
            />
          );
        })}
      </div>
    );
  };

  const ServeMoreAction = () => {
    if (currentSearchFilterRef.current || typeFilterRef.current) return null;
    if (post_limit || postListData.length < LIMIT) return null;

    const value = loadMoreRef.current ? "Less" : "Load More";

    return (
      <div
        className="flex"
        style={{
          justifyContent: "center",
          paddingTop: `2em`,
        }}
      >
        <button
          type="submit"
          className="transparent-btn"
          onClick={handleLoadMoreFilter}
        >
          {value}
        </button>
      </div>
    );
  };

  // RETURN ---------------------------------------------------
  return (
    <div
      style={{
        padding: PADDING,
        backgroundColor: background_colour,
      }}
    >
      <BlockWrapper>
        <TitleBlock
          block={block}
          margin={{
            marginBottom: `${
              add_search_function ? 0 : state.theme.marginVertical
            }px`,
          }}
        />
      </BlockWrapper>
      <ServeFilter />
      <BlockWrapper>
        <ServeLayout />
        <ServeMoreAction />
      </BlockWrapper>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(CPTBlock);
