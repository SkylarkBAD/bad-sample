import { useState, useEffect, useRef } from "react";
import { connect } from "frontity";

import Loading from "../loading";
import EventListView from "../eventListView";
import Card from "../card/card";
import TitleBlock from "../titleBlock";
import { colors } from "../../config/imports";
// CONTEXT --------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  setEventAnchorAction,
} from "../../context";
import { getEventsData } from "../../helpers";

import { muiQuery } from "../../context";
const EventLoopBlock = ({
  state,
  actions,
  libraries,
  block,
  searchFilter,
  gradesFilter,
  locationsFilter,
  recommended_events,
  specialtyFilter,
  yearFilter,
}) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  if (!block) return <Loading />;
  const { sm, md, lg, xl } = muiQuery();

  const dispatch = useAppDispatch();
  const { eventAnchor } = useAppState();

  const {
    post_limit,
    disable_vertical_padding,
    add_search_function,
    layout,
    grade_filter,
    title,
    colour,
    events_archive,
  } = block;

  const [eventList, setEventList] = useState(null); // event data

  const [gradeFilterId, setGradeFilterId] = useState(null); // data
  const useEffectRef = useRef(null);

  const layoutOne = layout === "layout_one";
  const layoutTwo = layout === "layout_two";
  const layoutThree = layout === "layout_three";
  const search = add_search_function;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  let STYLES = {};
  if (layoutTwo) STYLES = !lg ? styles.layoutTwo : styles.layoutTwoMobile;
  if (layoutThree) STYLES = !lg ? styles.layoutThree : styles.layoutTwoMobile;

  // DATA get for EVENTS ----------------------------------------------------------------
  useEffect(async () => {
    // pre fetch events data
    let iteration = 0;
    let data = state.source.events;

    while (!data) {
      // if iteration is greater than 10, break
      if (iteration > 10) break;
      // set timeout for async
      await new Promise((resolve) => setTimeout(resolve, 500));
      await getEventsData({ state, actions });
      data = state.source.post;
      iteration++;
    }

    // if !data then break
    if (!data) return;
    let eventList = Object.values(data);
    const grades = Object.values(state.source.event_grade);

    let gradeFilterId = grades.filter(
      (filter) => filter.name === grade_filter
    )[0];

    if (gradeFilterId) gradeFilterId = gradeFilterId.id;
    if (post_limit) eventList = eventList.slice(0, Number(post_limit)); // apply limit on posts

    // sort events in order by date accenting from
    eventList = eventList.sort(
      (a, b) =>
        new Date(a.acf.date_time[0].date) - new Date(b.acf.date_time[0].date)
    );

    setEventList(eventList);
    setGradeFilterId(gradeFilterId);

    // link to anchor for event
    if (eventAnchor) {
      setTimeout(() => {
        const anchor = document.getElementById(eventAnchor);
        if (anchor) anchor.scrollIntoView({ behavior: "smooth" });
      }, 500);
      console.log("🚀 anchor to event list", eventAnchor); // debug

      setEventAnchorAction({ dispatch, eventAnchor: null }); // reset
    }

    return () => {
      useEffectRef.current = false; // clean up function
    };
  }, []);

  if (!eventList) return <Loading />;
  if (eventList) console.log(eventList);
  console.log("EVENT LOOP BLOCK BLOCK", block);
  // RETURN ---------------------------------------------
  return (
    <div style={{ paddingBottom: `${marginVertical}px` }}>
      <TitleBlock
        block={{ title, text_align: "centre" }}
        margin={`0 0 ${marginVertical}px`}
      />
      <div style={STYLES}>
        {eventList.map((block, key) => {
          const { image, summary, public_or_members_only, date_time } =
            block.acf;
          const title = block.title.rendered;
          const event_grade = block.event_grade;
          const event_location = block.event_location;
          const event_specialty = block.event_specialty;

          // if page is set to events_archive return only events that date is in the past
          let isArchive = false;
          if (date_time) {
            // loop through date_time and check if date is in the past
            date_time.forEach((date) => {
              if (new Date(date.date) < new Date()) isArchive = true;
            });
          }
          // ⬇️ if page is event archive break out of loop
          if (events_archive && !isArchive) return null;
          // ⬇️  dont return past events if page is not archive
          if (!events_archive && isArchive) return null;

          if (!event_grade.includes(gradeFilterId) && gradeFilterId !== 97)
            return null;
          if (!!searchFilter) {
            if (!title && !summary) return null;
            if (
              title
                ? !title.toLowerCase().includes(searchFilter.toLowerCase())
                : null || summary
                ? !summary.toLowerCase().includes(searchFilter.toLowerCase())
                : null
            )
              return null;
          }
          // select filtering config
          if (gradesFilter) {
            if (!event_grade.includes(Number(gradesFilter))) return null;
          }
          if (locationsFilter) {
            if (!event_location.includes(Number(locationsFilter))) return null;
          }
          if (specialtyFilter) {
            if (!event_specialty.includes(Number(specialtyFilter))) return null;
          }
          if (yearFilter) {
            // get event month & year start
            const eventDate = date_time[0].date;
            const eventMont = new Date(eventDate).getMonth() + 1;
            const eventYear = new Date(eventDate).getFullYear();
            // get filter current month & year
            const filterMont = new Date(yearFilter).getMonth() + 1;
            const filterYear = new Date(yearFilter).getFullYear();

            // filter events based on mont & year start
            if (eventMont !== filterMont || eventYear !== filterYear)
              return null;
          }

          if (layoutOne) {
            const removeMargin = search && key === 0;
            return (
              <div key={key}>
                <EventListView
                  block={block}
                  removeMargin={removeMargin}
                  recommended_events={recommended_events ? true : false}
                />
              </div>
            );
          }

          if (layoutTwo)
            return (
              <Card
                key={key}
                title={title}
                url={image}
                imgHeight={200}
                link_label="Read More"
                link={block.link}
                colour={colour}
                date={date_time}
                seatNumber="seatNumber"
                cardHeight="100%"
                shadow
              />
            );

          if (layoutThree)
            return (
              <Card
                key={key}
                title={title}
                link_label="Read More"
                link={block.link}
                colour={colour}
                eventHeader={block.acf}
                isFrom4Col
                titleLimit={4}
                shadow
              />
            );
        })}
      </div>
    </div>
  );
};

const styles = {
  layoutTwo: {
    display: "grid",
    gridTemplateColumns: `1fr 1fr`,
    gap: 20,
  },
  layoutTwoMobile: {
    display: "grid",
    gridTemplateColumns: `1fr`,
    gap: 20,
  },
  layoutThree: {
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr)`,
    gap: 20,
  },
};

export default connect(EventLoopBlock);
