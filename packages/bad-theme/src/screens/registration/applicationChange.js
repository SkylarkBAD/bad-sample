import { useState, useEffect, useRef } from "react";
import { connect } from "frontity";
import { Form } from "react-bootstrap";
import Link from "@frontity/components/link";

import { colors } from "../../config/imports";
import BlockWrapper from "../../components/blockWrapper";
import ActionPlaceholder from "../../components/actionPlaceholder";
import Loading from "../../components/loading";
import FormError from "../../components/formError";
import { proAppFileds } from "../../config/data";
import SearchDropDown from "../../components/searchDropDown";
// CONTEXT -----------------------------------------------------------------
import {
  useAppDispatch,
  useAppState,
  setGoToAction,
  setErrorAction,
  errorHandler,
  getMembershipDataAction,
  getApplicationStatus,
  validateMembershipFormAction,
  getHospitalsAction,
  getHospitalNameAction,
  getBADMembershipSubscriptionData,
  setUserStoreAction,
} from "../../context";

const ApplicationChange = ({ state, actions, libraries }) => {
  const Html2React = libraries.html2react.Component; // Get the component exposed by html2react.

  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];

  const dispatch = useAppDispatch();
  const { isActiveUser, dynamicsApps, applicationData } = useAppState();

  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;

  const [formData, setFormData] = useState({
    bad_organisedfor: "810170000",
    bad_categorytype: "",
    core_membershipsubscriptionplanid: "",
    core_membershipsubscriptionid: "",

    py3_gmcnumber: "",
    py3_otherregulatorybodyreference: "",
    py3_ntnno: "",
    bad_currentpost: "",
    py3_hospitalid: "",
    bad_proposer1: "",
    bad_proposer2: "",
    bad_mrpcqualified: "",
    sky_cvurl: "",
    py3_currentgrade: "",
    sky_newhospitalname: "",
    bad_newhospitaladded: "",
    bad_expectedyearofqualification: "",
    py3_constitutionagreement: "",
    bad_readpolicydocument: "",
    sky_newhospitaltype: "",
    bad_memberdirectory: "",
  });
  const [inputValidator, setInputValidator] = useState({
    py3_gmcnumber: true,
    py3_otherregulatorybodyreference: true,
    py3_ntnno: true,
    bad_currentpost: true,
    py3_hospitalid: true,
    bad_proposer1: true,
    bad_proposer2: true,
    bad_mrpcqualified: true,
    sky_cvurl: true,
    py3_currentgrade: true,
    sky_newhospitalname: true,
    bad_newhospitaladded: true,
    bad_expectedyearofqualification: true,
    py3_constitutionagreement: true,
    bad_readpolicydocument: true,
    sky_newhospitaltype: true,
    bad_memberdirectory: true,
  });
  const [bodyCopy, setBodyCopy] = useState("");
  const [membershipData, setMembershipData] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [applicationType, setType] = useState("");

  const [hospitalData, setHospitalData] = useState("");
  const [canChangeHospital, setCanChangeHospital] = useState(true); // allow user to change hospital is no BAD applications are found
  const [selectedHospital, setSelectedHospital] = useState("");
  const documentRef = useRef("");
  const hospitalSearchRef = useRef("");
  const isHospitalValue = formData.py3_hospitalid;

  // ⏬ populate form data values from applicationData
  useEffect(async () => {
    // redirect to /dashboard if isActiveUser && !applicationData
    if (isActiveUser && !applicationData) {
      console.log(
        "⬇️ user have no application data created - redirect to /dashboard"
      );
      setGoToAction({ path: `/dashboard/`, actions });
      return;
    }
    // redirect to / if !isActiveUser || !applicationData
    if (!isActiveUser) {
      console.log("⬇️ no user - redirect to /");
      setGoToAction({ path: `/`, actions });
    }
    if (!applicationData) return null;

    // pre fetch membership data if not already present
    if (!state.source.memberships)
      await getMembershipDataAction({ state, actions });
    const membershipData = Object.values(state.source.memberships);
    setMembershipData(membershipData);

    // API to get membership data based in app ID

    // populate form data values from applicationData
    let appType = null;
    // set data from applicationData object
    if (applicationData) {
      // get application type from applicationData object
      appType = applicationData[0].bad_categorytype;
      setFormData((prevFormData) => ({
        ...prevFormData,
        bad_categorytype: appType || "",
      }));
    }

    // loop through membershipData & set bodyCopy to match current membership data
    if (membershipData && appType) {
      const membership = membershipData.find(
        (membership) => membership.acf.category_types === appType
      );
      if (membership) setBodyCopy(membership.acf.body_copy);
    }

    const handleSetFormData = ({ data, name }) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`${name}`]: data.value || "",
      }));
    };

    // ⏬ populate form data values from applicationData
    if (!applicationData) return null;

    if (dynamicsApps) {
      const subsData = dynamicsApps.subs.data; // get subs/approved apps data form dynamic apps
      // check if user have application under BAD as approved status
      const isApprovedBAD =
        subsData.filter((item) => item.bad_organisedfor === "BAD").length > 0;
      // if user have application pending under reviewed status redirect to application list
      if (isApprovedBAD) {
        console.log("🤖 user have BAD application approved");
        setCanChangeHospital(false);
      }
    }

    // hospital id initial value
    let hospitalId = null;

    applicationData.map((data) => {
      // ⬇️  map sigApp fields against applicationData & set formData with field name & value
      proAppFileds.map((item) => {
        if (data.name === item) {
          handleSetFormData({ data, name: item });
        }
        if (data.name === "py3_hospitalid") {
          // get hospital id from application data
          if (data.value) hospitalId = data.value;
        }
      });

      if (data.bad_categorytype) setType(data.bad_categorytype); // validate BAD application category type
    });

    if (hospitalId) {
      try {
        // get hospital data via API & populate form
        const hospitalData = await getHospitalNameAction({
          state,
          id: hospitalId,
        });
        if (hospitalData) {
          setSelectedHospital(hospitalData.name);
        }
      } catch (error) {
        console.log("🤖 error", error);
      }
    }

    // ⏬ validate inputs
    await validateMembershipFormAction({
      state,
      actions,
      setData: setInputValidator,
      applicationData,
    });

    return () => {
      documentRef.current = ""; // clean up function
    };
  }, []);

  if (!membershipData) return <Loading />;

  // HANDLERS --------------------------------------------
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // if checked value for hospital not found clear curet hospital input
    if (name === "bad_newhospitaladded" && !value) handleClearHospital();
  };

  const handleHospitalLookup = async () => {
    const input = hospitalSearchRef.current.value;
    // if (input.length < 2) return; // API call after 2 characters

    let hospitalData = await getHospitalsAction({
      state,
      input,
    });
    // refactor hospital data to match dropdown format
    hospitalData = hospitalData.map((hospital) => {
      return {
        title: hospital.name,
        link: hospital.accountid,
      };
    });

    if (hospitalData.length > 0) setHospitalData(hospitalData);
    if (!hospitalData.length || !input) setHospitalData(null);

    // console.log("Hospitals", hospitalData); // debug
  };

  const handleSelectHospital = ({ item }) => {
    setSelectedHospital(item.title);
    setHospitalData(null); // clear hospital data for dropdown
    console.log("selected hospital", item); // debug

    // guard if user have BAD apps approved dont allow hospital lookup
    if (!canChangeHospital) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      py3_hospitalid: item.link,
    }));
  };

  const handleClearHospital = () => {
    setSelectedHospital(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      py3_hospitalid: "",
    }));
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

    // set body copy to match current membership data
    if (membershipData) {
      const membership = membershipData.find(
        (membership) => membership.acf.category_types === value
      );
      if (membership) setBodyCopy(membership.acf.body_copy);

      // ⏬ validate inputs
      validateMembershipFormAction({
        state,
        actions,
        setData: setInputValidator,
        applicationData,
        membershipTypeChange: value,
      });
    }
    // console.log(value); // debug
  };

  const isFormValidated = ({ required }) => {
    if (!required && !required.length) return null;
    let isValid = true;

    required.map((input) => {
      if (!formData[input] && inputValidator[input]) {
        errorHandler({ id: `form-error-${input}` });
        isValid = false;
      }
    });

    return isValid;
  };

  const handleApplicationChange = async () => {
    // check if new hospital value been added
    const isNewHospital = formData.bad_newhospitaladded;
    // check if isAssociateType to apply mandatory fields
    const isAssociateType = applicationType.includes("Associate");

    const isValid = isFormValidated({
      required: [
        "py3_gmcnumber",
        "py3_otherregulatorybodyreference",
        "py3_ntnno",
        "bad_currentpost",
        isNewHospital ? "sky_newhospitaltype" : null,
        !isNewHospital ? "py3_hospitalid" : null,
        isAssociateType ? "bad_proposer1" : null,
        isAssociateType ? "bad_proposer2" : null,
        "py3_constitutionagreement",
        "bad_readpolicydocument",
      ],
    });

    if (!isValid) return null;
    let path = `/dashboard/`;
    // ⬇️ set new application data object
    let appFromData = formData;

    try {
      setFetching(true);
      // ⏬ get appropriate membership ID for BAD applications only
      const response = await getBADMembershipSubscriptionData({
        state,
        category: "BAD",
        type: formData.bad_categorytype,
      });
      if (!response) throw new Error("Failed to get membership data");

      // ⬇️  update application object with new membership ID
      appFromData.core_membershipsubscriptionplanid =
        response.core_membershipsubscriptionplanid;
      // ⬇️  update application object with previous membership ID
      let previousAppId = "";
      if (applicationData[0] && applicationData[0].changeAppCategory)
        previousAppId =
          applicationData[0].changeAppCategory.core_membershipsubscriptionid;
      appFromData.core_membershipsubscriptionid = previousAppId;
      console.log("appFromData", appFromData); // debug

      const store = await setUserStoreAction({
        state,
        actions,
        dispatch,
        applicationData,
        isActiveUser,
        dynamicsApps,
        data: appFromData,
      });
      if (!store.success) throw new Error("Failed to update application");

      // // set complete application if app = BAD
      // const appsResponse = await setCompleteUserApplicationAction({
      //   state,
      //   dispatch,
      //   isActiveUser,
      //   applicationData,
      // });
      // if (!appsResponse) throw new Error("Failed to create application"); // throw error if store is not successful

      // // fetch new dynamicsApps data from API
      // await getApplicationStatus({
      //   state,
      //   dispatch,
      //   contactid: isActiveUser.contactid,
      // });
      // // redirect to dashboard
      // setGoToAction({ path, actions });
      // // display error message
      // setErrorAction({
      //   dispatch,
      //   isError: {
      //     message: `Application been changed to BAD ${formData.bad_categorytype}.`,
      //   },
      // });
    } catch (error) {
      console.log(error);
      setErrorAction({
        dispatch,
        isError: {
          message: `Failed to update membership details. Please try again.`,
          image: "Error",
        },
      });
    } finally {
      setFetching(false);
    }
  };

  const handleDocUploadChange = async (e) => {
    let sky_cvurl = e.target.files[0];
    console.log("e", e); // debug

    if (sky_cvurl)
      sky_cvurl = await sendFileToS3Action({
        state,
        dispatch,
        attachments: sky_cvurl,
      });
    console.log("sky_cvurl", sky_cvurl); // debug

    setFormData((prevFormData) => ({
      ...prevFormData,
      ["sky_cvurl"]: sky_cvurl,
    }));
  };

  const isFormFooter =
    inputValidator.bad_mrpcqualified ||
    inputValidator.py3_currentgrade ||
    inputValidator.py3_constitutionagreement ||
    inputValidator.bad_readpolicydocument ||
    inputValidator.sky_cvurl;

  const isAgreementForm =
    inputValidator.py3_constitutionagreement ||
    inputValidator.bad_readpolicydocument ||
    inputValidator.bad_memberdirectory;

  // SERVERS ---------------------------------------------
  const ServeActions = () => {
    return (
      <div
        className="flex"
        style={{
          justifyContent: "flex-end",
        }}
      >
        <div
          className="transparent-btn"
          style={{ marginRight: "2em" }}
          onClick={() => setGoToAction({ path: `/dashboard/`, actions })}
        >
          Back
        </div>

        <div className="blue-btn" onClick={handleApplicationChange}>
          Submit Change
        </div>
      </div>
    );
  };

  const ServeContent = () => {
    if (!applicationData) return null;

    return (
      <div>
        <div
          className="primary-title"
          style={{
            fontSize: 20,
            borderBottom: `1px solid ${colors.silverFillTwo}`,
            padding: `0 1em 1em 0`,
          }}
        >
          BAD membership change
        </div>
        <div className="title-link-animation" style={{ padding: `2em 0` }}>
          Form - BAD Category Change Questions
        </div>
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
          <div
            className="flex-col"
            style={{
              paddingRight: `4em`,
              borderRight: `1px solid ${colors.silverFillTwo}`,
            }}
          >
            <ServeContent />
          </div>
          <div style={{ position: "relative" }}>
            <ActionPlaceholder
              isFetching={isFetching}
              background="transparent"
            />
            <div style={styles.wrapper}>
              <div style={{ padding: "0 1em" }}>
                <div className="primary-title" style={styles.title}>
                  Change of Category Application
                </div>
                <div style={{ paddingTop: `0.75em` }}>
                  If you are a current BAD member and now need to change your
                  membership category you can apply to do so here. All changes
                  of category applications must be approved by the BAD Executive
                  committee.
                </div>
                <Link
                  link={`/membership/`}
                  target="_blank"
                  className="caps-btn"
                  style={{ padding: `0.5em 0` }}
                >
                  Memberships Categories
                </Link>
              </div>
              <div style={{ padding: "0 1em" }}>
                <div>
                  <div
                    className="primary-title"
                    style={{ padding: `1em 0`, fontSize: 20 }}
                  >
                    Current BAD membership:{" "}
                    {applicationData[0].bad_categorytype}
                  </div>
                  <label className="bold">Change Membership Category to</label>
                  <Form.Select
                    name="bad_categorytype"
                    value={formData.bad_categorytype}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="" hidden>
                      Membership Category
                    </option>
                    {membershipData.map((item, key) => {
                      const { bad_or_sig, category_types } = item.acf;
                      if (bad_or_sig !== "bad") return null;

                      return (
                        <option key={key} value={category_types}>
                          {category_types}
                        </option>
                      );
                    })}
                  </Form.Select>
                  <FormError id="bad_categorytype" />
                </div>
                {bodyCopy && (
                  <div style={{ paddingTop: "2em" }}>
                    <Html2React html={bodyCopy} />
                  </div>
                )}
              </div>

              <form>
                <div style={{ padding: `2em 1em` }}>
                  {inputValidator.py3_gmcnumber && (
                    <div>
                      <label className="required form-label">
                        {applicationType === "Associate Overseas"
                          ? "GMC number or International equivalent"
                          : "GMC number"}
                      </label>
                      <input
                        name="py3_gmcnumber"
                        value={formData.py3_gmcnumber}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input"
                        placeholder="GMC Number"
                      />
                      <FormError id="py3_gmcnumber" />
                    </div>
                  )}

                  {inputValidator.py3_otherregulatorybodyreference && (
                    <div>
                      <label className="required form-label">
                        Regulatory Body Registration Number
                      </label>
                      <input
                        name="py3_otherregulatorybodyreference"
                        value={formData.py3_otherregulatorybodyreference}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input"
                        placeholder="Regulatory Body Registration Number"
                      />
                      <FormError id="py3_otherregulatorybodyreference" />
                    </div>
                  )}

                  {inputValidator.py3_ntnno && (
                    <div>
                      <label className="required form-label">NTN Number</label>
                      <input
                        name="py3_ntnno"
                        value={formData.py3_ntnno}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input"
                        placeholder="NTN Number"
                      />
                      <FormError id="py3_ntnno" />
                    </div>
                  )}

                  {inputValidator.bad_currentpost && (
                    <div>
                      <label className="required form-label">
                        Current post/job title
                      </label>
                      <input
                        name="bad_currentpost"
                        value={formData.bad_currentpost}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input"
                        placeholder="Current job title"
                      />
                      <FormError id="bad_currentpost" />
                    </div>
                  )}

                  {inputValidator.py3_hospitalid && (
                    <div>
                      <label className="form-label">
                        Main Place of Work / Medical School
                      </label>
                      <div style={{ position: "relative" }}>
                        {selectedHospital && (
                          <div className="form-control input">
                            <div className="flex-row">
                              <div
                                style={{
                                  position: "relative",
                                  width: "fit-content",
                                  paddingRight: 15,
                                }}
                              >
                                {selectedHospital}

                                {canChangeHospital && (
                                  <div
                                    className="filter-icon"
                                    style={{ top: -7 }}
                                    onClick={handleClearHospital}
                                  >
                                    <CloseIcon
                                      style={{
                                        fill: colors.darkSilver,
                                        padding: 0,
                                        width: "0.7em",
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {!selectedHospital && (
                          <div>
                            <input
                              ref={hospitalSearchRef}
                              onChange={handleHospitalLookup}
                              type="text"
                              className="form-control input"
                              placeholder="Main Hospital/Place of work"
                            />
                            <FormError id="py3_hospitalid" />
                          </div>
                        )}
                        <SearchDropDown
                          filter={hospitalData}
                          mapToName="name"
                          onClickHandler={handleSelectHospital}
                        />
                      </div>
                    </div>
                  )}

                  {!isHospitalValue && (
                    <div className="flex-col">
                      <label className="form-label">
                        Hospital / Medical School not listed
                      </label>
                      <input
                        name="bad_newhospitaladded"
                        checked={formData.bad_newhospitaladded}
                        onChange={handleInputChange}
                        type="checkbox"
                        className="form-check-input check-box"
                      />
                    </div>
                  )}

                  {formData.bad_newhospitaladded && (
                    <div>
                      <label className="required form-label">Select Type</label>
                      <Form.Select
                        name="sky_newhospitaltype"
                        value={formData.sky_newhospitaltype}
                        onChange={handleInputChange}
                        className="input"
                      >
                        <option value="" hidden>
                          Hospital / Medical School
                        </option>
                        <option value="Hospital">Hospital</option>
                        <option value="Medical School">Medical School</option>
                      </Form.Select>
                      <FormError id="sky_newhospitaltype" />
                    </div>
                  )}

                  {formData.bad_newhospitaladded &&
                    inputValidator.sky_newhospitalname && (
                      <div>
                        <label className="form-label">New Hospital Name</label>
                        <input
                          name="sky_newhospitalname"
                          value={formData.sky_newhospitalname}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control input"
                          placeholder="New Hospital Name"
                        />
                        <FormError id="sky_newhospitalname" />
                      </div>
                    )}

                  {inputValidator.bad_expectedyearofqualification && (
                    <div>
                      <label className="form-label">
                        Expected Year of Qualification
                      </label>
                      <input
                        name="bad_expectedyearofqualification"
                        value={formData.bad_expectedyearofqualification}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input"
                        placeholder="Expected Year of Qualification"
                      />
                      <FormError id="bad_currentpost" />
                    </div>
                  )}
                </div>

                {inputValidator.bad_proposer1 && (
                  <div
                    style={{
                      padding: `1em 1em 2em 1em`,
                      borderTop: `1px solid ${colors.silverFillTwo}`,
                      borderBottom: `1px solid ${colors.silverFillTwo}`,
                    }}
                  >
                    <label className="form-label">
                      Proposers must be BSDS Ordinary members
                    </label>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(2, 1fr)`,
                        gap: 20,
                      }}
                    >
                      {inputValidator.bad_proposer1 && (
                        <div>
                          <label
                            className={`${
                              applicationType.includes("Associate")
                                ? "required form-label"
                                : "form-label"
                            }`}
                          >
                            Supporting Member 1
                          </label>
                          <input
                            name="bad_proposer1"
                            value={formData.bad_proposer1}
                            onChange={handleInputChange}
                            type="text"
                            className="form-control input"
                            placeholder="MRCP"
                          />
                          <FormError id="bad_proposer1" />
                        </div>
                      )}

                      {inputValidator.bad_proposer2 && (
                        <div>
                          <label
                            className={`${
                              applicationType.includes("Associate")
                                ? "required form-label"
                                : "form-label"
                            }`}
                          >
                            Supporting Member 2
                          </label>
                          <input
                            name="bad_proposer2"
                            value={formData.bad_proposer2}
                            onChange={handleInputChange}
                            type="text"
                            className="form-control input"
                            placeholder="MRCP"
                          />
                          <FormError id="bad_proposer2" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isFormFooter && (
                  <div
                    style={{
                      padding: `2em 1em`,
                      borderTop: `1px solid ${colors.silverFillTwo}`,
                      borderBottom: `1px solid ${colors.silverFillTwo}`,
                    }}
                  >
                    {inputValidator.bad_mrpcqualified && (
                      <div className="flex-col">
                        <label className="form-label">MRCP Qualified</label>
                        <input
                          name="bad_mrpcqualified"
                          checked={formData.bad_mrpcqualified}
                          onChange={handleInputChange}
                          type="checkbox"
                          className="form-check-input check-box"
                        />
                      </div>
                    )}

                    {inputValidator.py3_currentgrade && (
                      <div>
                        <label className="form-label">Current Grade</label>
                        <input
                          name="py3_currentgrade"
                          value={formData.py3_currentgrade}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control input"
                          placeholder="Current Grade"
                        />
                      </div>
                    )}

                    {inputValidator.sky_cvurl && (
                      <div>
                        <label className="form-label">Upload Your CV</label>
                        <input
                          ref={documentRef}
                          onChange={handleDocUploadChange}
                          type="file"
                          className="form-control input"
                          placeholder="CV Document"
                          accept=".pdf,.doc,.docx"
                        />
                      </div>
                    )}

                    {isAgreementForm && (
                      <div
                        style={{
                          alignItems: "center",
                          marginTop: `2em`,
                          paddingTop: "1em",
                          borderTop: `1px solid ${colors.silverFillTwo}`,
                        }}
                      >
                        {inputValidator.bad_memberdirectory && (
                          <div>
                            <div
                              className="flex"
                              style={{ alignItems: "center", margin: `1em 0` }}
                            >
                              <div style={{ display: "grid" }}>
                                <input
                                  name="bad_memberdirectory"
                                  checked={formData.bad_memberdirectory}
                                  onChange={handleInputChange}
                                  type="checkbox"
                                  className="form-check-input check-box"
                                />
                              </div>
                              <div
                                className="tulip-pop"
                                citations="A member only service to search for the contact email of fellow BAD members"
                                style={{ color: "inherit" }}
                              >
                                Include in Members directory
                              </div>
                            </div>
                            <FormError id="bad_memberdirectory" />
                          </div>
                        )}

                        {inputValidator.py3_constitutionagreement && (
                          <div>
                            <div
                              className="flex"
                              style={{ alignItems: "center", margin: `1em 0` }}
                            >
                              <div style={{ display: "grid" }}>
                                <input
                                  name="py3_constitutionagreement"
                                  checked={formData.py3_constitutionagreement}
                                  onChange={handleInputChange}
                                  type="checkbox"
                                  className="form-check-input check-box"
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
                            <FormError id="py3_constitutionagreement" />
                          </div>
                        )}
                        {inputValidator.bad_readpolicydocument && (
                          <div>
                            <div
                              className="flex"
                              style={{ alignItems: "center", margin: `1em 0` }}
                            >
                              <div>
                                <input
                                  name="bad_readpolicydocument"
                                  checked={formData.bad_readpolicydocument}
                                  onChange={handleInputChange}
                                  type="checkbox"
                                  className="form-check-input check-box"
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
                                      onClick={() =>
                                        setGoToAction({
                                          path: `/privacy-policy/`,
                                          actions,
                                        })
                                      }
                                    >
                                      I agree - Privacy Notice
                                    </div>
                                    <span>
                                      I agree - Privacy Notice* - justo donec
                                      enim diam vulputate ut pharetra sit. Purus
                                      semper eget duis at tellus at. Sed
                                      adipiscing diam.
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <FormError id="bad_readpolicydocument" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </form>
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

export default connect(ApplicationChange);