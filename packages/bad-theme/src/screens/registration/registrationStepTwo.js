import { useState, useEffect, useRef } from "react";
import { connect } from "frontity";
import { Form } from "react-bootstrap";

import { colors } from "../../config/imports";
import SideBarMenu from "./sideBarMenu";
import BlockWrapper from "../../components/blockWrapper";
import ActionPlaceholder from "../../components/actionPlaceholder";
import FormError from "../../components/formError";
// CONTEXT -----------------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  setGoToAction,
  handleApplyForMembershipAction,
  errorHandler,
} from "../../context";

const RegistrationStepTwo = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];

  const dispatch = useAppDispatch();
  const { applicationData, isActiveUser, dynamicsApps } = useAppState();

  const [isFetching, setFetching] = useState(false);
  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;
  const [formData, setFormData] = useState({
    bad_organisedfor: "",
    bad_categorytype: "",
  });

  // ⏬ populate form data values from applicationData
  useEffect(async () => {
    const handleSetData = ({ data, name }) => {
      console.log(name);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`${name}`]: data.value || "",
      }));
    };

    if (!applicationData) return null;
    const isSIG = applicationData[0].bad_organisedfor === "SIG";

    applicationData.map((data) => {
      // set data from Dynamics membership object
      if (data.name === "bad_organisedfor")
        handleSetData({ data, name: "bad_organisedfor" });
      // set data from custom object type based on CATEGORY
      if (data.bad_categorytype)
        setFormData((prevFormData) => ({
          ...prevFormData,
          bad_categorytype: isSIG
            ? data._bad_sigid_value
            : data.bad_categorytype,
        }));
    });
  }, []);

  // HANDLERS --------------------------------------------
  const handleSaveExit = async () => {
    await handleApplyForMembershipAction({
      state,
      actions,
      dispatch,
      applicationData,
      isActiveUser,
      dynamicsApps,
      category: formData.bad_organisedfor === "810170000" ? "BAD" : "SIG",
      type: formData.bad_categorytype, // application type name
      path: `/membership/`,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "bad_organisedfor")
      // reset form on category change
      setFormData((prevFormData) => ({
        ...prevFormData,
        bad_categorytype: "",
      }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValidated = ({ required }) => {
    if (!required && !required.length) return null;
    let isValid = true;

    required.map((input) => {
      if (!formData[input]) {
        errorHandler({ id: `form-error-${input}` });
        isValid = false;
      }
    });

    return isValid;
  };

  const handleNext = async () => {
    // form value validations
    const isValid = isFormValidated({
      required: ["bad_organisedfor", "bad_categorytype"],
    });

    if (!isValid) return null;
    // console.log(formData); // debug

    setFetching(true);
    await handleApplyForMembershipAction({
      state,
      actions,
      dispatch,
      applicationData,
      isActiveUser,
      dynamicsApps,
      membershipApplication: { stepTwo: true }, // set stepOne to complete
      category: formData.bad_organisedfor === "810170000" ? "BAD" : "SIG",
      type: formData.bad_categorytype, // application type name
      path: `/membership/step-3-personal-information/`,
    });
    setFetching(false);
  };

  // SERVERS ---------------------------------------------
  const ServeActions = () => {
    return (
      <div
        className="flex"
        style={{
          justifyContent: "flex-end",
          padding: `2em 1em 0 1em`,
        }}
      >
        <div
          className="transparent-btn"
          onClick={() => setGoToAction({ path: `/membership/`, actions })}
        >
          Back
        </div>
        <div
          className="transparent-btn"
          style={{ margin: `0 1em` }}
          onClick={handleSaveExit}
        >
          Save & Exit
        </div>
        <div className="blue-btn" onClick={handleNext}>
          Next
        </div>
      </div>
    );
  };

  const ServeForm = () => {
    const ServeBADMembershipCategory = () => {
      if (formData.bad_organisedfor !== "810170000") return null;

      return (
        <div>
          <label className="bold">Membership Category</label>
          <Form.Select
            name="bad_categorytype"
            value={formData.bad_categorytype}
            onChange={handleChange}
            className="input"
          >
            <option value="" hidden>
              Membership Category
            </option>
            <option value="Ordinary">Ordinary</option>
            <option value="Ordinary SAS">Ordinary SAS</option>
            <option value="Trainee">Trainee</option>
            <option value="Associate Trainee">Associate Trainee</option>
            <option value="Associate">Associate</option>
            <option value="Associate Overseas">Associate Overseas</option>
            <option value="GP">GP</option>
            <option value="Scientist and Allied Health Care Professionals">
              Scientist and Allied Health Care Professionals
            </option>
            <option value="Student">Student</option>
            <option value="Honorary">Honorary</option>
            <option value="Honorary Overseas">Honorary Overseas</option>
          </Form.Select>
          <FormError id="bad_categorytype" />
        </div>
      );
    };

    const ServeSIGMembershipCategory = () => {
      if (formData.bad_organisedfor !== "810170001") return null;

      return (
        <div>
          <label className="bold">Membership Category</label>
          <Form.Select
            name="bad_categorytype"
            value={formData.bad_categorytype}
            onChange={handleChange}
            className="input"
          >
            <option value="" hidden>
              Membership Category
            </option>

            <option value="Full:British Cosmetic Dermatology Group">
              British Cosmetic Dermatology Group
            </option>
            <option value="Full:British Hair and Nails Society">
              British Hair and Nails Society
            </option>
            <option value="Full:British Photodermatology Group">
              British Photodermatology Group
            </option>
            <option value="Full:British Society of Cutaneous Allergy">
              British Society of Cutaneous Allergy
            </option>
            <option value="Full:British Society of Cutaneous Allergy Overseas">
              British Society of Cutaneous Allergy Overseas
            </option>
            <option value="Full:British Society for Dermatopathology">
              British Society for Dermatopathology
            </option>
            <option value="Full:British Society for Dermatological Surgery">
              British Society for Dermatological Surgery
            </option>
            <option value="Full:British Society for Dermatological Surgery Associate">
              British Society for Dermatological Surgery Associate
            </option>
            <option value="Full:British Society for Dermatological Surgery International">
              British Society for Dermatological Surgery International
            </option>
            <option value="Full:British Society for Dermatological Surgery Trainnee">
              British Society for Dermatological Surgery Trainnee
            </option>
            <option value="Full:British Society for Investigative Dermatology">
              British Society for Investigative Dermatology
            </option>
            <option value="Full:British Society for Medical Dermatology">
              British Society for Medical Dermatology
            </option>
            <option value="Full:British Society for Medical Dermatology Associate">
              British Society for Medical Dermatology Associate
            </option>
            <option value="Full:British Society for Paediatric Dermatology">
              British Society for Paediatric Dermatology
            </option>
            <option value="Full:British Society for Paediatric Dermatology Trainee">
              British Society for Paediatric Dermatology Trainee
            </option>
            <option value="Full:British Society for Skin Care in Immunocompromised Individuals">
              British Society for Skin Care in Immunocompromised Individuals
            </option>
            <option value="Full:The Dowling Club">The Dowling Club</option>
            <option value="Full:DermpathPRO">DERMPATHPRO</option>
          </Form.Select>
          <FormError id="bad_categorytype" />
        </div>
      );
    };

    return (
      <div
        className="form-group"
        style={{
          display: "grid",
          gap: 10,
          marginTop: `1em`,
          paddingTop: `1em`,
          borderTop: `1px solid ${colors.silverFillTwo}`,
        }}
      >
        <label className="bold">Membership Type</label>
        <Form.Select
          name="bad_organisedfor"
          value={formData.bad_organisedfor}
          onChange={handleChange}
          className="input"
        >
          <option value="null" hidden>
            Membership Type
          </option>
          <option value="810170000">BAD Membership</option>
          <option value="810170001">SIG Membership</option>
        </Form.Select>
        <FormError id="bad_organisedfor" />

        <ServeBADMembershipCategory />
        <ServeSIGMembershipCategory />
      </div>
    );
  };

  return (
    <BlockWrapper>
      <div
        style={{
          margin: `${marginVertical}px ${marginHorizontal}px`,
        }}
      >
        <div style={styles.container}>
          <SideBarMenu />
          <div style={{ position: "relative" }}>
            <ActionPlaceholder
              isFetching={isFetching}
              background="transparent"
            />
            <div style={styles.wrapper}>
              <div className="primary-title" style={styles.title}>
                Please confirm your category selction. Or if you are unsure of
                the category you should be applying for please view the
                membership category descriptions for further clarification.
              </div>
              <div style={{ paddingTop: `0.75em` }}>
                Your selected category of membership is below. If you would like
                to change it you can select from the drop down options. Or if
                you are unsure of the category you should be applying for please
                view the membership category descriptions for further
                clarification.
              </div>
              <div
                className="caps-btn"
                onClick={() => setGoToAction({ path: `/membership/`, actions })}
                style={{ paddingTop: `1em` }}
              >
                Memberships Categories
              </div>
              <ServeForm />
            </div>
            <ServeActions />
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: `1fr 2fr`,
    justifyContent: "space-between",
    gap: 20,
  },
  wrapper: {
    borderBottom: `1px solid ${colors.silverFillTwo}`,
    padding: `0 1em 2em`,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontWeight: "bold",
    padding: `0.75em 0`,
  },
};

export default connect(RegistrationStepTwo);
