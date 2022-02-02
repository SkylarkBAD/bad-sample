import { useState, useEffect } from "react";
import { connect } from "frontity";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import EventLoopBlock from "./eventLoopBlock";
import Loading from "../loading";
import { colors } from "../../config/imports";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Events = ({ state, actions, libraries, block }) => {
  const [grades, setGrades] = useState(null); // data
  const [locations, setLocations] = useState(null); // data
  const [searchFilter, setSearchFilter] = useState(null);
  const [gradesFilter, setGradesFilter] = useState(null);
  const [locationsFilter, setLocationsFilter] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;

  const isSearch = block.add_search_function;
  const id = uuidv4();

  useEffect(() => {
    let GRADES = null;
    let LOCATIONS = null;
    if (state.source.event_grade)
      GRADES = Object.values(state.source.event_grade);
    if (state.source.event_location)
      LOCATIONS = Object.values(state.source.event_location);

    setGrades(GRADES);
    setLocations(LOCATIONS);
    setIsReady(true);
  }, [state.source.event_grade, state.source.event_location]);

  // HELPERS ----------------------------------------------------------------
  const handleSearchSubmit = () => {
    const searchInput = document.querySelector(`#searchInput${id}`).value;

    const serveFilterOne = document.querySelector(`#serveFilterOne${id}`).value;
    const serveFilterTwo = document.querySelector(`#serveFilterTwo${id}`).value;

    if (!!searchInput) setSearchFilter(searchInput);
    if (!!serveFilterOne) setGradesFilter(serveFilterOne);
    if (!!serveFilterTwo) setLocationsFilter(serveFilterTwo);
  };

  // SERVERS ---------------------------------------------
  const ServeFilters = () => {
    if (!grades && !locations) return null; // props for filter options

    const ServeTitle = () => {
      return (
        <div
          className="primary-title"
          style={{ fontSize: 20, padding: `0 2em` }}
        >
          Filter:
        </div>
      );
    };

    const ServeFilterOne = () => {
      if (!grades) return null;

      return (
        <div className="flex" style={{ paddingRight: `1em` }}>
          <Form.Select id={`serveFilterOne${id}`} style={styles.input}>
            <option value="null" hidden>
              Event Grades
            </option>
            {grades.map((item, key) => {
              return (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </div>
      );
    };

    const ServeFilterTwo = () => {
      if (!locations) return null;

      return (
        <div className="flex">
          <Form.Select id={`serveFilterTwo${id}`} style={styles.input}>
            <option value="null" hidden>
              Location
            </option>
            {locations.map((item, key) => {
              return (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Form.Select>
        </div>
      );
    };

    return (
      <div className="flex" style={{ padding: `1em 0`, alignItems: "center" }}>
        <ServeTitle />
        <ServeFilterOne />
        <ServeFilterTwo />
      </div>
    );
  };

  const ServeSearchContainer = () => {
    return (
      <div className="flex-row">
        <div
          className="flex"
          style={{
            flex: 1,
            marginRight: `2em`,
            padding: `0.75em 0`,
            position: "relative",
          }}
        >
          <input
            id={`searchInput${id}`}
            type="text"
            className="form-control"
            placeholder="Find An Event"
            style={styles.input}
          />
          <span
            className="input-group-text toggle-icon-color"
            style={{
              position: "absolute",
              right: 0,
              height: 40,
              border: "none",
              background: "transparent",
              alignItems: "center",
              color: colors.darkSilver,
            }}
          >
            <SearchIcon />
          </span>
        </div>
        <div style={{ display: "grid", alignItems: "center" }}>
          <div className="blue-btn" onClick={handleSearchSubmit}>
            Search
          </div>
        </div>
      </div>
    );
  };

  const ServeFilter = () => {
    if (!isSearch) return null;

    const ServeSearchFilter = () => {
      if (!searchFilter) return null;

      return (
        <div className="shadow filter">
          <div>{searchFilter}</div>
          <div className="filter-icon" onClick={() => setSearchFilter(null)}>
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

    const ServeSelectedGradesFilter = () => {
      if (!gradesFilter) return null;
      const GRADES = Object.values(state.source.event_grade);
      const filter = GRADES.filter((item) => item.id === Number(gradesFilter));
      const name = filter[0].name;

      return (
        <div className="shadow filter">
          <div>{name}</div>
          <div className="filter-icon" onClick={() => setGradesFilter(null)}>
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

    const ServeSelectedLocationFilter = () => {
      if (!locationsFilter) return null;
      const LOCATIONS = Object.values(state.source.event_location);
      const filter = LOCATIONS.filter(
        (item) => item.id === Number(locationsFilter)
      );
      const name = filter[0].name;

      return (
        <div className="shadow filter">
          <div>{name}</div>
          <div className="filter-icon" onClick={() => setLocationsFilter(null)}>
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
      <div style={{ position: "relative" }}>
        <div className="flex-row">
          <ServeSearchContainer />
          <ServeFilters />
        </div>
        <div className="flex" style={{ marginTop: "0.5em" }}>
          <ServeSearchFilter />
          <ServeSelectedGradesFilter />
          <ServeSelectedLocationFilter />
        </div>
      </div>
    );
  };

  if (!isReady) return <Loading />;
  // RETURN ---------------------------------------------------
  return (
    <div style={{ padding: `0 ${marginHorizontal}px` }}>
      <ServeFilter />
      <EventLoopBlock
        block={block}
        searchFilter={searchFilter}
        gradesFilter={gradesFilter}
        locationsFilter={locationsFilter}
      />
    </div>
  );
};

const styles = {
  input: {
    borderRadius: 10,
    paddingRight: 35,
  },
};

export default connect(Events);
