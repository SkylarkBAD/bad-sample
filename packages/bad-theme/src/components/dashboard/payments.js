import { useState, useEffect } from "react";
import { connect } from "frontity";

import { colors } from "../../config/imports";
import { muiQuery } from "../../context";

const Payments = ({ state, actions, libraries, setPage }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.
  const { sm, md, lg, xl } = muiQuery();

  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;
  const PAYMENTS = [1, 2, 3];

  // HELPERS ----------------------------------------------------------------
  const handlePayment = ({ block }) => {
    setPage({ page: "directDebit", data: block });
  };

  // SERVERS ---------------------------------------------
  const ServePayments = ({ block, item }) => {
    const ServeActions = () => {
      return (
        <div style={{ margin: `auto 0`, width: marginHorizontal * 2 }}>
          <div style={{ padding: !lg ? `0 2em` : 0 }}>
            <div
              type="submit"
              className="blue-btn"
              onClick={() => handlePayment({ block })}
            >
              Pay Now
            </div>
          </div>
        </div>
      );
    };

    const ServeInfo = () => {
      const dataLength = PAYMENTS.length;
      const isLastItem = dataLength === item + 1;

      return (
        <div
          className="flex"
          style={{
            borderBottom: isLastItem
              ? "none"
              : !lg
              ? `1px solid ${colors.darkSilver}`
              : null,
            padding: `1em`,
          }}
        >
          <div className="flex" style={styles.fontSize}>
            <div>Details of the invoice to be paid.</div>
          </div>
          <div className="flex" style={styles.fontSize}>
            <div>01/12/2021</div>
          </div>
        </div>
      );
    };

    return (
      <div className={!lg ? "flex-row" : "flex-col"}>
        <ServeInfo />
        <ServeActions />
      </div>
    );
  };

  const ServeSubTitle = ({ title }) => {
    return <div style={{ padding: `1em 0` }}>{title}</div>;
  };

  return (
    <div
      className="shadow"
      style={{
        padding: !lg ? `2em 4em` : `1em`,
        marginBottom: `${marginVertical}px`,
      }}
    >
      <div className="primary-title" style={{ fontSize: 20 }}>
        Payments:
      </div>
      <ServeSubTitle title="Invoices" />
      {PAYMENTS.map((block, key) => {
        return <ServePayments key={key} block={block} item={key} />;
      })}
    </div>
  );
};

const styles = {
  text: {
    fontSize: 12,
  },
};

export default connect(Payments);
