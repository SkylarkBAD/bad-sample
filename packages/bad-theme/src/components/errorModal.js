import { connect } from "frontity";
import { Modal } from "react-bootstrap";

import { colors } from "../config/imports";
import Image from "@frontity/components/image";
import CheckMark from "../img/svg/checkMark.svg";
import Error from "../img/svg/error.svg";
// CONTEXT ----------------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  setErrorAction,
  setGoToAction,
} from "../context";

const ErrorModal = ({ state, actions }) => {
  const dispatch = useAppDispatch();
  const { isError } = useAppState();

  const bannerHeight = state.theme.bannerHeight;

  if (!isError) return null; // error handler

  // HANDLERS ----------------------------------------------------
  const actionHandler = () => {
    setErrorAction({ dispatch, isError: null });
  };

  const gotToActionHandler = ({ path }) => {
    setGoToAction({ path, actions });
    setErrorAction({ dispatch, isError: null });
  };

  // SERVERS --------------------------------------------------
  const ServeActions = () => {
    const ServeGoToAction = () => {
      if (!isError.goToPath) return null;

      return (
        <div
          className="blue-btn"
          style={{ marginRight: "1em" }}
          onClick={() => gotToActionHandler({ path: isError.goToPath.path })}
        >
          {isError.goToPath.label}
        </div>
      );
    };

    const ServeAction = () => {
      if (!isError.action) return null;

      return (
        <div>
          <div className="flex">
            {isError.action.map((action, index) => {
              return (
                <div
                  key={index}
                  className="blue-btn"
                  style={{ marginRight: "1em" }}
                  onClick={action.handler}
                >
                  {action.label}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div>
        <div
          className="flex"
          style={{
            justifyContent: "flex-end",
          }}
        >
          <ServeGoToAction />
          <ServeAction />
          <div className="blue-btn" onClick={actionHandler}>
            Close
          </div>
        </div>
      </div>
    );
  };

  const ServeModalContent = () => {
    const { message, image } = isError;

    const ServeImage = () => {
      // error msg image options
      const errorImage = {
        Error,
        CheckMark,
      };
      let modalImage = image ? errorImage[image] : CheckMark;

      return (
        <div
          style={{
            width: 250,
            maxHeight: 250,
            margin: "0 auto",
          }}
        >
          <Image
            src={modalImage}
            alt="BAD Error Image"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      );
    };

    return (
      <div
        className="flex"
        style={{ padding: `1em 2em`, minHeight: bannerHeight }}
      >
        <div className="flex-col">
          <Modal.Body className="flex-col">
            <ServeImage />

            <div
              className="flex primary-title"
              style={{
                display: "grid",
                textAlign: "center",
                padding: `2em 0`,
                fontSize: 26,
              }}
            >
              {message}
            </div>
            <ServeActions />
          </Modal.Body>
        </div>
      </div>
    );
  };

  // RETURN ---------------------------------------------------
  return (
    <div>
      <Modal show={isError} size="lg" centered>
        <div className="flex-row">
          <ServeModalContent />
        </div>
      </Modal>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(ErrorModal);
