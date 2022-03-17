import { useState, useEffect, useRef } from "react";
import { connect } from "frontity";
import Image from "@frontity/components/image";

import BlockWrapper from "./blockWrapper";
import Loading from "./loading";
import Accordion from "./accordion/accordion";
import { colors } from "../config/imports";
import SearchContainer from "./searchContainer";
import TypeFilters from "./typeFilters";

import CloseIcon from "@mui/icons-material/Close";

import { muiQuery } from "../context";

const GuidelinesAndStandards = ({ state, actions, libraries, block }) => {
  const { sm, md, lg, xl } = muiQuery();

  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const searchFilterRef = useRef(null);
  const currentSearchFilterRef = useRef(null);
  const typeFilterRef = useRef(null);

  const [searchFilter, setSearchFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);

  const [guidelinesList, setGuidelinesList] = useState(null);
  const [guidelinesType, setGuidelinesType] = useState(null);

  if (!block) return <Loading />;

  const { disable_vertical_padding, background_colour } = block;

  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  // DATA pre FETCH ----------------------------------------------------------------
  useEffect(async () => {
    const path = `/guidelines_standards/`;
    await actions.source.fetch(path); // fetch CPT guidelines

    const guidelines = state.source.get(path);
    const { totalPages, page, next } = guidelines; // check if guidelines have multiple pages
    // fetch guidelines via wp API page by page
    let isThereNextPage = next;
    while (isThereNextPage) {
      await actions.source.fetch(isThereNextPage); // fetch next page
      const nextPage = state.source.get(isThereNextPage).next; // check ifNext page & set next page
      isThereNextPage = nextPage;
    }

    const guideType = Object.values(state.source.guidelines_type);
    let guideList = Object.values(state.source.guidelines_standards); // add guidelines object to data array
    // sort guidelines in alphabetically order by title name
    guideList = guideList.sort((a, b) => {
      const nameA = a.title.rendered.toUpperCase();
      const nameB = b.title.rendered.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setGuidelinesType(guideType);
    setGuidelinesList(guideList);

    return () => {
      searchFilterRef.current = false; // clean up function
    };
  }, []);
  // DATA pre FETCH ----------------------------------------------------------------
  if (!guidelinesList) return <Loading />;

  // HELPERS ----------------------------------------------------------------
  const handleSearch = () => {
    const input = searchFilterRef.current.value || searchFilter;
    currentSearchFilterRef.current = input;
    let guidelinesList = Object.values(state.source.guidelines_standards);

    if (typeFilterRef.current)
      guidelinesList = guidelinesList.filter((item) => {
        const list = item.guidelines_type;
        if (list.includes(typeFilterRef.current)) return item;
      });

    if (!!input) {
      const INPUT = input.toLowerCase();
      const filter = guidelinesList.filter((item) => {
        let title = item.title.rendered;
        let subtitle = item.acf.subtitle;
        if (title) title = title.toLowerCase().includes(INPUT);
        if (subtitle) subtitle = subtitle.toLowerCase().includes(INPUT);

        return title || subtitle;
      });
      setSearchFilter(input);
      setGuidelinesList(filter);
    }
  };

  const handleTypeSearch = () => {
    const input = typeFilterRef.current;
    let name = guidelinesType.filter((item) => item.id === input)[0];
    if (name) name = name.name;
    let guidelinesList = Object.values(state.source.guidelines_standards);
    // sort guidelines in alphabetically order by title name
    guidelinesList = guidelinesList.sort((a, b) => {
      const nameA = a.title.rendered.toUpperCase();
      const nameB = b.title.rendered.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    if (currentSearchFilterRef.current)
      guidelinesList = guidelinesList.filter((item) => {
        let title = item.title.rendered;
        let subtitle = item.acf.subtitle;
        if (title)
          title = title.toLowerCase().includes(currentSearchFilterRef.current);
        if (subtitle)
          subtitle = subtitle
            .toLowerCase()
            .includes(currentSearchFilterRef.current);

        return title || subtitle;
      });

    if (input) {
      const filter = guidelinesList.filter((item) => {
        const list = item.guidelines_type;
        if (list.includes(input)) return item;
      });

      setTypeFilter(name);
      setGuidelinesList(filter);
    }
  };

  const handleClearTypeFilter = () => {
    setTypeFilter(null);
    typeFilterRef.current = null;

    if (!searchFilter) {
      setGuidelinesList(Object.values(state.source.guidelines_standards));
    } else {
      handleSearch();
    }
  };

  const handleClearSearchFilter = () => {
    setSearchFilter(null);
    searchFilterRef.current = null;
    currentSearchFilterRef.current = null;

    if (!typeFilter) {
      setGuidelinesList(Object.values(state.source.guidelines_standards));
    } else {
      handleTypeSearch();
    }
  };

  // SERVERS --------------------------------------------------------
  const ServeType = () => {
    if (!guidelinesType) return null;

    return (
      <div style={{ padding: `1em ${marginHorizontal}px` }}>
        <TypeFilters
          filters={guidelinesType}
          handleSearch={handleTypeSearch}
          typeFilterRef={typeFilterRef}
          currentFilter={typeFilter}
        />
      </div>
    );
  };

  const ServeFilter = () => {
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

    const ServeTypeFilter = () => {
      if (!typeFilter || lg) return null;

      return (
        <div className="shadow filter" style={{ textTransform: "uppercase" }}>
          <div>{typeFilter}</div>
          <div className="filter-icon" onClick={handleClearTypeFilter}>
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
        style={{ backgroundColor: colors.silverFillTwo }}
        className="no-selector"
      >
        <BlockWrapper>
          <div
            className="flex-col"
            style={{ padding: `0 ${marginHorizontal}px` }}
          >
            <SearchContainer
              title="Search for Guidelines and PILS"
              width="70%"
              searchFilterRef={searchFilterRef}
              handleSearch={handleSearch}
            />

            <div className="flex" style={{ padding: "0.5em 0 1em" }}>
              <ServeSearchFilter />
              <ServeTypeFilter />
            </div>
          </div>
        </BlockWrapper>
      </div>
    );
  };

  // RETURN ----------------------------------------------------------------
  return (
    <div style={{ backgroundColor: background_colour }}>
      <ServeFilter />
      <BlockWrapper>
        <ServeType />
        <Accordion
          block={{ accordion_item: guidelinesList }}
          guidelines
          hasPublishDate
        />
      </BlockWrapper>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(GuidelinesAndStandards);
