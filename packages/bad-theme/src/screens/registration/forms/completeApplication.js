import { useState, useEffect } from "react";
import { connect } from "frontity";
import { Form } from "react-bootstrap";

import { ETHNIC_GROUPES } from "../../../config/data";

import { colors } from "../../../config/imports";
// CONTEXT ----------------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  setUserStoreAction,
  setGoToAction,
  setCompleteUserApplicationAction,
} from "../../../context";

const CompleteApplication = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const dispatch = useAppDispatch();
  const { applicationData, isActiveUser } = useAppState();

  const [formData, setFormData] = useState({
    bad_ethnicity: "",
    py3_constitutionagreement: "",
    privacyNotice: "",
  });

  // ⏬ populate form data values from applicationData
  useEffect(() => {
    const handleSetData = ({ data, name }) => {
      if (name === "bad_isbadmember") console.log(data.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`${name}`]: data.value || "",
      }));
    };

    if (!applicationData) return null;
    applicationData.map((data) => {
      if (data.name === "bad_ethnicity")
        handleSetData({ data, name: "bad_ethnicity" });
      if (data.name === "py3_constitutionagreement")
        handleSetData({ data, name: "py3_constitutionagreement" });
      if (data.name === "privacyNotice")
        handleSetData({ data, name: "privacyNotice" });
    });
  }, []);

  // HANDLERS --------------------------------------------
  const handleComplete = async () => {
    await setUserStoreAction({
      state,
      dispatch,
      applicationData,
      isActiveUser,
      data: formData,
    });

    // await setCompleteUserApplicationAction({
    //   state,
    //   isActiveUser,
    // });

    // let slug = `/membership/`;
    // if (isActiveUser) setGoToAction({ path: slug, actions });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // SERVERS ---------------------------------------------
  const ServeActions = () => {
    return (
      <div
        className="flex"
        style={{
          justifyContent: "flex-end",
          padding: `2em 1em 0 1em`,
          borderTop: `1px solid ${colors.silverFillTwo}`,
        }}
      >
        <div className="blue-btn" onClick={handleComplete}>
          Enter
        </div>
      </div>
    );
  };

  return (
    <div>
      <form>
        <div style={{ padding: `2em 1em` }}>
          <label style={styles.subTitle}>What is your Ethnic Group?</label>
          <Form.Select
            name="bad_ethnicity"
            value={formData.bad_ethnicity}
            onChange={handleInputChange}
            className="input"
          >
            <option value="" hidden>
              Ethnic Group
            </option>
            {ETHNIC_GROUPES.map((item, key) => {
              return (
                <option key={key} value={item}>
                  {item}
                </option>
              );
            })}
          </Form.Select>

          <div
            className="flex-col form-check"
            style={{
              padding: `1em 0`,
              marginTop: `2em`,
              borderTop: `1px solid ${colors.silverFillTwo}`,
            }}
          >
            <div
              className="flex"
              style={{ alignItems: "center", padding: `1em 0` }}
            >
              <div>
                <input
                  name="py3_constitutionagreement"
                  checked={formData.py3_constitutionagreement}
                  onChange={handleInputChange}
                  type="checkbox"
                  className="form-check-input"
                  style={styles.checkBox}
                />
              </div>
              <div>
                <label className="form-check-label flex-row">
                  <div>I agree to the </div>
                  <div
                    className="caps-btn required"
                    style={{ paddingTop: 6, marginLeft: 10 }}
                  >
                    BAD Constitution
                  </div>
                </label>
              </div>
            </div>

            <div
              className="flex"
              style={{ alignItems: "center", padding: `1em 0` }}
            >
              <div>
                <input
                  name="privacyNotice"
                  checked={formData.privacyNotice}
                  onChange={handleInputChange}
                  type="checkbox"
                  className="form-check-input"
                  style={styles.checkBox}
                />
              </div>
              <div>
                <label className="form-check-label flex-row">
                  <div>
                    <div
                      className="caps-btn required"
                      style={{
                        paddingTop: 6,
                        marginRight: 10,
                        whiteSpace: "nowrap",
                        float: "left",
                      }}
                    >
                      I agree - Privacy Notice
                    </div>
                    <span>
                      I agree - Privacy Notice* - justo donec enim diam
                      vulputate ut pharetra sit. Purus semper eget duis at
                      tellus at. Sed adipiscing diam.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ServeActions />
    </div>
  );
};

const styles = {
  title: {
    fontSize: 20,
  },
  checkBox: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    margin: `0 10px 0 0`,
  },
};

export default connect(CompleteApplication);
