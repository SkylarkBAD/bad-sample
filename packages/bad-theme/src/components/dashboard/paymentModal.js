//

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "frontity";
import { Modal } from "react-bootstrap";

import CloseIcon from "@mui/icons-material/Close";

import { colors } from "../../config/imports";
// CONTEXT ----------------------------------------------------------------
import {
  setErrorAction,
  getApplicationStatus,
  useAppDispatch,
  useAppState,
} from "../../context";
const PaymentModal = ({ state, actions, payment_url, resetPaymentUrl }) => {
  const dispatch = useAppDispatch();
  const { isActiveUser } = useAppState();

  if (!payment_url) return null;
  const iFrameHandler = async (e) => {
    const iFrame = e.currentTarget;

    try {
      const iFramePath = iFrame.contentWindow.location.pathname;
      console.log("iFramePath", iFramePath); // debug

      // ⏬⏬  CORS validation on old type browsers ⏬⏬
      // if (
      //   !iframeLocation.includes(`3000`) ||
      //   !iframeLocation.includes(state.auth.APP_URL)
      // )
      //   throw new Error("Wrong redirection url");

      const iqs = new URLSearchParams(iFrame.contentWindow.location.search);
      console.log("iFrameRef iqs", iqs);

      setErrorAction({
        dispatch,
        isError: { message: "Your payment has been accepted." },
      });
      await getApplicationStatus({
        state,
        dispatch,
        contactid: isActiveUser.contactid,
      });
      resetPaymentUrl();
      if (iqs && iqs.has("transId")) {
        const transId = iqs.get("transId");
        console.log("*** WE FOUND A TRANSACTION ID IN THE IFRAME ** ", transId);
        setId(transId);
      } else {
        console.log("Error getting transId from iFrame");
      }
    } catch (error) {
      console.log("*** ERROR GETTING IFRAME CONTENT - CROSS-ORIGIN **");
      // console.log(error); // debug
    }
  };
  return (
    <Modal size="xl" centered show={payment_url ? true : false}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <CloseIcon onClick={resetPaymentUrl} />
      </div>
      <Modal.Body>
        <iframe
          className="contain"
          id="badPaymentFrame"
          onLoad={iFrameHandler}
          width="100%"
          height="1000"
          src={payment_url}
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

const styles = {
  container: {
    position: "absolute",
    zIndex: 700,
    top: 10,
    left: 10,
    width: "100%",
  },
};

export default connect(PaymentModal);