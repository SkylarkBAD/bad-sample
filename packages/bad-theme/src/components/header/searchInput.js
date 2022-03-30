import { useRef } from "react";
import { connect } from "frontity";

import SearchContainer from "../searchContainer";

// CONTEXT ----------------------------------------------------------------
import { useAppDispatch, useAppState } from "../../context";

const SearchInput = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const dispatch = useAppDispatch();
  const { filter } = useAppState();

  const searchFilterRef = useRef(null);

  // HELPERS ---------------------------------------------

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
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(SearchInput);
