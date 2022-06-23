import { connect } from "frontity";
import Benefit from "./benefit";
import Loading from "./loading";

// CONTEXT ----------------------------------------------------------------
import { muiQuery } from "../context";

const BenefitsGrid = ({ state, actions, libraries, block }) => {
  const { sm, md, lg, xl } = muiQuery();

  if (!block) return <Loading />;
  if (!block.benefits_card) return null;

  const { disable_vertical_padding, background_colour } = block;

  const marginHorizontal = state.theme.marginHorizontal;
  let marginVertical = state.theme.marginVertical;
  if (disable_vertical_padding) marginVertical = 0;

  // RETURN ---------------------------------------------------
  return (
    <div
      style={{
        padding: `${marginVertical}px ${marginHorizontal}px`,
        backgroundColor: background_colour || "transparent",
      }}
    >
      <div style={!lg ? styles.container : styles.containerMobile}>
        {block.benefits_card.map((block, key) => {
          return <Benefit key={key} id={key} block={block} />;
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: `repeat(4, 1fr)`,
    justifyContent: "space-between",
    gap: 15,
  },
  containerMobile: {
    display: "grid",
    gridTemplateColumns: `repeat(2, 1fr)`,
    justifyContent: "space-between",
  },
};

export default connect(BenefitsGrid);
