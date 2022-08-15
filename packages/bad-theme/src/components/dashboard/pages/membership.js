import { useState, useEffect } from "react";
import { connect } from "frontity";

import date from "date-and-time";
const DATE_MODULE = date;

import Loading from "../../loading";
import ProfileProgress from "../profileProgress";
import ActionPlaceholder from "../../actionPlaceholder";
// CONTEXT ------------------------------------------------------------------
import {
  useAppState,
  useAppDispatch,
  handleValidateMembershipChangeAction,
  getProofOfMembershipAction,
  handleUpdateMembershipApplication,
  setErrorAction,
  muiQuery,
  setGoToAction,
} from "../../../context";

const Membership = ({ state, actions, libraries }) => {
  const { lg } = muiQuery();

  const dispatch = useAppDispatch();
  const { dynamicsApps, applicationData, dashboardPath, isActiveUser } =
    useAppState();

  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;

  const [isFetching, setFetching] = useState(false);
  const [subsData, setSubs] = useState(null);

  useEffect(() => {
    if (!dynamicsApps) return;
    // --------------------------------------------------------------------------------
    // 📌  Current user subs
    // --------------------------------------------------------------------------------
    const currentYear = new Date().getFullYear(); // get current year
    // apps with core_endon that is current year
    const apps = dynamicsApps.subs.data.filter((app) => {
      return app.core_endon.includes(currentYear);
    });
    // 📌 set dynamic apps data
    setSubs(apps);
  }, [dynamicsApps]);

  // HANDLERS ----------------------------------------------------------------
  const handleDownloadConfirmationPDF = async ({ app }) => {
    try {
      setFetching(true);
      const url = await getProofOfMembershipAction({
        state,
        core_membershipsubscriptionid: app.core_membershipsubscriptionid,
        isActiveUser,
        dispatch,
      });
      // await for link to download & open in new window to download
      window.open(url, "_blank");
    } catch (error) {
      // console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const handleApplyForMembershipChangeAction = () => {
    // check if user have application in progress break & display error
    if (applicationData) {
      const type = applicationData[0].bad_categorytype;
      const confirmationMsg = `You already have ${type} application open and unsubmitted! Please complete it before changing BAD application category.`;

      setErrorAction({
        dispatch,
        isError: {
          message: confirmationMsg,
          image: "Error",
        },
      });
      return;
    }
    // otherwise handle create new application in Dynamics & redirect to application page
    setGoToAction({ state, path: "/membership/step-1-the-process/", actions });
  };

  if (dashboardPath !== "Membership") return null;

  // 📌 If user dont have any subscription dont render the component
  let isSubsData = subsData;
  if (subsData && subsData.length === 0) isSubsData = null;
  // RETURN -----------------------------------------------------------------
  return (
    <div style={{ padding: `0 ${marginHorizontal}px` }}>
      <ProfileProgress />
      {subsData && (
        <div style={{ position: "relative" }}>
          <ActionPlaceholder isFetching={isFetching} background="transparent" />
          <div
            className="flex-col shadow"
            style={{
              padding: !lg ? `2em 4em` : "1em",
              marginBottom: `${marginVertical}px`,
            }}
          >
            <div className="flex-col">
              <div
                className="flex primary-title"
                style={{
                  fontSize: 20,
                  justifyItems: "center",
                }}
              >
                Current Subscriptions
              </div>

              {!isSubsData && (
                <div
                  className="primary-title"
                  style={{
                    fontWeight: "bold",
                    display: "grid",
                    alignItems: "center",
                    paddingTop: "1em",
                  }}
                >
                  You have no current membership activity.
                </div>
              )}

              {subsData.map((app, key) => {
                if (subsData.length === 0) {
                  // 📌 if subsData is empty display no subscriptions message
                  return (
                    <div
                      key={key}
                      className="flex-col"
                      style={{
                        padding: `${marginVertical}px`,
                        marginBottom: `${marginVertical}px`,
                      }}
                    >
                      <div className="flex-col">
                        <div className="flex primary-title">
                          You have no subscriptions.
                        </div>
                      </div>
                    </div>
                  );
                }

                const {
                  bad_organisedfor,
                  core_name,
                  createdon,
                  core_membershipsubscriptionid,
                } = app;
                // get application date
                let appData = createdon.split(" ")[0];
                // split string and revert date with month format
                appData = appData.split("/");
                appData = `${appData[1]}/${appData[0]}/${appData[2]}`;

                const dateObject = new Date(appData);
                const formattedDate = DATE_MODULE.format(
                  dateObject,
                  "DD MMM YYYY"
                );

                const ServeChangeApplicationAction = ({ show }) => {
                  // return if bad_organisedfor is BAD & in dashboard only
                  if (dashboardPath !== "Dashboard" || show) return null;
                  const [appStatus, setStatus] = useState(null);
                  // check if application been previously submitted
                  useEffect(async () => {
                    try {
                      let isSubmitted =
                        await handleValidateMembershipChangeAction({
                          state,
                          core_membershipsubscriptionid,
                          isActiveUser,
                          dispatch,
                        });

                      if (isSubmitted) {
                        // check if user have submitted application for this category
                        isSubmitted = isSubmitted.filter((app) => {
                          return (
                            app._bad_existingsubscriptionid_value ===
                            core_membershipsubscriptionid
                          );
                        });
                      }

                      setStatus(isSubmitted); // set status to submitted
                    } catch (error) {
                      // console.log("APPCHANGE ERROR", error);
                    }
                  }, []);

                  if (!appStatus) return <Loading />;

                  if (appStatus.length > 0)
                    return (
                      <div
                        className="primary-title"
                        style={{
                          fontWeight: "bold",
                          justifyItems: "center",
                          display: "grid",
                          alignItems: "center",
                        }}
                      >
                        BAD category change pending approval.
                      </div>
                    );

                  return (
                    <div
                      style={{
                        display: "grid",
                        alignItems: "center",
                        marginRight: "2em",
                      }}
                    >
                      <div
                        className="blue-btn"
                        onClick={() =>
                          handleUpdateMembershipApplication({
                            state,
                            actions,
                            dispatch,
                            isActiveUser,
                            dynamicsApps,
                            app,
                            applicationData,
                            setFetching,
                          })
                        }
                      >
                        Apply for BAD category change
                      </div>
                    </div>
                  );
                };

                const ServeMembershipActions = ({ show }) => {
                  // dont allow download sertificates if membership is not active | frozen
                  const isFrozen =
                    isActiveUser.core_membershipstatus ===
                    state.theme.frozenMembership;

                  if (bad_organisedfor === "SIG" || show || isFrozen)
                    return null;

                  return (
                    <div style={{ display: "grid", alignItems: "center" }}>
                      <div className="flex">
                        {/* <div
                          className="blue-btn"
                          style={{ marginRight: "1em" }}
                          onClick={handleApplyForMembershipChangeAction}
                        >
                          Apply to change membership
                        </div> */}
                        <div
                          className="blue-btn"
                          onClick={() => handleDownloadConfirmationPDF({ app })}
                        >
                          Proof of membership certificate
                        </div>
                      </div>
                    </div>
                  );
                };

                // --------------------------------------------------------------------------------
                // 📌  Disable all action if application is not current year
                // --------------------------------------------------------------------------------
                const currentYear = new Date().getFullYear();
                const applicationYear = app.core_endon;

                if (!bad_organisedfor && !core_name) return null;

                return (
                  <div
                    key={key}
                    className="flex-col"
                    style={{ paddingTop: `1em` }}
                  >
                    <div
                      className="flex"
                      style={{ flexDirection: !lg ? null : "column" }}
                    >
                      <div
                        className="flex"
                        style={{ display: "grid", alignItems: "center" }}
                      >
                        <div className="primary-title">{bad_organisedfor}</div>
                        <div>{core_name}</div>
                      </div>
                      <ServeChangeApplicationAction
                        show={!applicationYear.includes(currentYear)}
                      />
                      <ServeMembershipActions
                        show={!applicationYear.includes(currentYear)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(Membership);
