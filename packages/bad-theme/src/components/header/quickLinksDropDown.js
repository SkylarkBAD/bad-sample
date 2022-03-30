import { connect } from "frontity";
import { colors } from "../../config/imports";
import { MENU_DATA } from "../../config/data";
// CONTEXT ----------------------------------------------------
import { setGoToAction } from "../../context";

const QuickLinksDropDown = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  // HANDLERS ----------------------------------------------------
  const handleActiveMenu = ({ mouseLeave }) => {
    const selector = document.querySelector(`#quick-link-menu`);
    const btn = document.querySelector(`#drop-down-btn`);

    if (mouseLeave) {
      if (selector) selector.style.display = "none";
      if (btn) btn.classList.remove = "shadow";
      return;
    }
    if (selector) selector.style.display = "block";
    if (btn) btn.classList.add = "shadow";
  };

  // SERVERS ----------------------------------------------------------
  const ServeDivider = () => {
    return (
      <div className="relative">
        <div
          style={{
            position: "absolute",
            height: 35,
            width: 155,
            backgroundColor: colors.lightSilver,
            top: -25,
            right: 0,
          }}
        />
      </div>
    );
  };

  const ServeMenu = () => {
    return (
      <ul
        id="quick-link-menu"
        className="dropdown-menu dropdown-menu-end shadow quick-link"
        style={{
          marginTop: `1em`,
          border: "none",
          backgroundColor: colors.lightSilver,
        }}
      >
        <ServeDivider />

        {MENU_DATA.map((item, key) => {
          const { title, url } = item;

          return (
            <li
              key={key}
              className="flex-row"
              style={{ marginRight: `2em` }}
              onClick={() => setGoToAction({ path: url, actions })}
            >
              <a className="dropdown-item" style={{ padding: `0.5em 0` }}>
                <div
                  className="quick-link-title"
                  style={{ width: `fit-content` }}
                >
                  <Html2React html={title} />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className="dropdown quick-link"
      onMouseEnter={handleActiveMenu}
      onMouseLeave={() => {
        handleActiveMenu({ mouseLeave: true });
      }}
    >
      <button
        id="drop-down-btn"
        className="dropdown-toggle drop-down-btn"
        type="button"
      >
        Quick Links
      </button>
      <ServeMenu />
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(QuickLinksDropDown);
