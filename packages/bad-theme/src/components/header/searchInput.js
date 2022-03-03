import { useState, useRef } from "react";
import { connect } from "frontity";

import { colors } from "../../config/imports";
import SearchContainer from "../searchContainer";
import SearchDropDown from "../searchDropDown";
// CONTEXT ----------------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  setFilterAction,
  setGoToAction,
} from "../../context";

const SearchInput = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const dispatch = useAppDispatch();
  const { filter } = useAppState();

  const searchFilterRef = useRef(null);

  // HELPERS ---------------------------------------------
  const onClickHandler = ({ link }) => {
    setGoToAction({ path: link, actions });
    setFilterAction({ dispatch, filter: null });
  };

  const handleSearch = () => {
    const input = searchFilterRef.current.value.toLowerCase();
    if (!input) return null;

    // let filter = eventList.filter((event) =>
    //   event.title.rendered.toLowerCase().includes(input)
    // );

    // if (!filter.length) filter = [{ title: { rendered: "No Results" } }];
    // setFilterAction({ dispatch, filter });
    console.log(input);
  };

  const handleMouseLeave = () => {
    if (!searchFilterRef.current.value) return null;

    searchFilterRef.current.value = null;
    setFilterAction({ dispatch, filter: null });
  };

  // RETURN ---------------------------------------------
  return (
    <div
      style={{ position: "relative", width: "100%" }}
      // onMouseLeave={handleMouseLeave} // clears search input on mouse leave
    >
      <SearchContainer
        searchFilterRef={searchFilterRef}
        handleSearch={() => console.log(searchFilterRef.current.value)}
        onChange
        inputOnly
      />
      {/* <SearchDropDown filter={filter} onClickHandler={onClickHandler} /> */}
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(SearchInput);
