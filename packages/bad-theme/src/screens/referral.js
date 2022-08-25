import { useState, useEffect } from "react";
import { connect } from "frontity";

import { colors } from "../config/imports";
import Loading from "../components/loading";

import TitleBlock from "../components/titleBlock";
import Card from "../components/card/card";
import HomeBannerCarousel from "../components/home/homeBannerCarousel";
// BLOCK WIDTH WRAPPER -------------------------------------------------------
import BlockWrapper from "../components/blockWrapper";
// --------------------------------------------------------------------------------
import { Parcer, muiQuery } from "../context";

const Referral = ({ state, actions, libraries }) => {
  const { sm, md, lg, xl } = muiQuery();

  const data = state.source.get(state.router.link);
  const referral = state.source[data.type][data.id];
  console.log("🐞 REFERRAL", referral); // debug

  const marginHorizontal = state.theme.marginHorizontal;
  const marginVertical = state.theme.marginVertical;
  const [position, setPosition] = useState(null);
  const [severity, setSeverity] = useState(null);

  useEffect(() => {
    // ⬇️ on component load defaults to window position TOP
    window.scrollTo({ top: 0, behavior: "smooth" }); // force scrolling to top of page
    document.documentElement.scrollTop = 0; // for safari
    setPosition(true);
  }, []);

  if (!referral || !position) return <Loading />;

  // HANDLERS --------------------------------------------

  // SERVERS ---------------------------------------------
  const ServeSeverityContainer = ({ description, name, status, url }) => {
    return (
      <div
        className="referral-card-wrapper"
        onClick={() => setSeverity(status)}
      >
        <Card
          title={name}
          subTitle="Description:"
          body={description}
          // --------------------------------------------------------------------------------
          url={url}
          imgHeight="200px" // image height in pixels
          colour={colors.primary}
          // bodyLimit={10} // limit body text
          cardMinHeight={250}
          backgroundColor={severity === name ? colors.lightSilver : null}
          shadow
          isReferalCard
        />
      </div>
    );
  };

  const ServeContentCard = ({
    title,
    body,
    resources,
    resources2,
    isRowItem,
  }) => {
    if (!body && !resources && !resources2) return null; // dont return component if no body or resources

    let classList = "flex-col";
    if (isRowItem) classList = "flex-contasiner";
    const isResources = resources || resources2;

    return (
      <div
        className="flex-col shadow"
        style={{
          padding: `${marginVertical}px 2em`,
          marginTop: `${marginVertical}px`,
        }}
      >
        {title && (
          <div
            className="flex primary-title divider"
            style={{
              fontSize: 20,
              paddingBottom: "1em",
              marginBottom: "0.5em",
            }}
          >
            <Parcer libraries={libraries} html={title} />
          </div>
        )}
        {body && (
          <div className={classList}>
            <Parcer libraries={libraries} html={body} />
          </div>
        )}
        {isResources && (
          <ServeDownloadAction resources={resources} resources2={resources2} />
        )}
      </div>
    );
  };

  const ServeContent = () => {
    if (!severity) return null;
    console.log("🐞 severity", severity); // debug

    const {
      severity_1_name,
      severity_1_referral_management,
      severity_1_treatment_therapy,
      severity_1_teledermatology,
      clinical_tips,
      severity_2_name,
      severity_2_referral_management,
      severity_2_treatment_therapy,
      severity_2_teledermatology,
      severity_3_name,
      severity_3_referral_management,
      severity_3_treatment_therapy,
      severity_3_teledermatology,

      icd_search_category,
      icd11_code,

      severity_1_image_gallery,
      severity_2_image_gallery,
      severity_3_image_gallery,

      clinical_resources,
      patient_information_resources,
    } = referral.acf;

    let condition = severity_1_name;
    let management = severity_1_referral_management;
    let treatment = severity_1_treatment_therapy;
    let teledermatology = severity_1_teledermatology;
    let tips = clinical_tips;
    let imgGalery = [];
    if (severity_1_image_gallery) {
      imgGalery = severity_1_image_gallery.map((item) => {
        return {
          background_image: { url: item.url },
        };
      });
    } else {
      imgGalery = [];
    }

    // contitional rendering based on type of referral
    if (severity === severity_2_name) {
      condition = severity_2_name;
      management = severity_2_referral_management;
      treatment = severity_2_treatment_therapy;
      teledermatology = severity_2_teledermatology;
      if (severity_2_image_gallery) {
        imgGalery = severity_2_image_gallery.map((item) => {
          return {
            background_image: { url: item.url },
          };
        });
      } else {
        imgGalery = [];
      }
    }
    if (severity === severity_3_name) {
      condition = severity_3_name;
      management = severity_3_referral_management;
      treatment = severity_3_treatment_therapy;
      teledermatology = severity_3_teledermatology;
      if (severity_3_image_gallery) {
        imgGalery = severity_3_image_gallery.map((item) => {
          return {
            background_image: { url: item.url },
          };
        });
      } else {
        imgGalery = [];
      }
    }

    return (
      <div className="flex-col">
        <HomeBannerCarousel block={{ slides: [...imgGalery] }} referrals />
        <ServeContentCard title="Treatment / Therapy" body={treatment} />
        <ServeContentCard title="Referral Management" body={management} />
        <ServeContentCard title="Teledermatology" body={teledermatology} />
        <ServeContentCard
          title="Clinical Resources"
          resources={clinical_resources}
        />
        <ServeContentCard title="Clinical Tips" body={tips} />
        <ServeContentCard
          title="Patient Information Leaflets"
          resources={patient_information_resources}
        />
        <ServeContentCard
          title="ICD search category(s)"
          body={`${icd_search_category}<span class="icd-code">ICD11 CODE</span>${icd11_code}`}
          isRowItem
        />
      </div>
    );
  };

  const ServeDownloadAction = ({ resources, resources2, isRowItem }) => {
    if (!resources) return null;

    // spread guidelines & pills into array to render as one resource
    let links = [];
    if (resources) links = [...resources];
    if (resources2) links = [...links, ...resources2];

    const downloadAction = ({ link }) => {
      // 📌 open download link in new tab or window
      window.open(link, "_blank");
    };

    let classList = "flex-col";
    if (isRowItem) classList = "flex-contasiner";

    return (
      <div className={classList} style={{ marginTop: `1em` }}>
        {links.map((item, key) => {
          const { label, link } = item;

          return (
            <div
              key={key}
              className="caps-btn"
              style={{ padding: "10px 30px 0 0" }}
              onClick={() => downloadAction({ link })}
            >
              {label}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <BlockWrapper>
      <div
        className="text-body"
        style={{
          margin: `${marginVertical}px ${marginHorizontal}px`,
        }}
      >
        <div
          className="flex-col shadow"
          style={{
            padding: `${marginVertical}px ${marginHorizontal}px`,
            margin: `${marginVertical}px 0`,
          }}
        >
          <div className="flex-contasiner">
            <div
              className="flex primary-title"
              style={{ fontSize: !lg ? 36 : 25 }}
            >
              {referral.title ? (
                <Parcer libraries={libraries} html={referral.title.rendered} />
              ) : null}
            </div>

            {/* {referral.acf && (
              <div className="referal-badge-container">
                <div className="referal-badge-wrapper">
                  <Parcer
                    libraries={libraries}
                    html={referral.acf.icd_search_category}
                  />{" "}
                  disease code:
                  <span style={{ color: colors.blue, paddingLeft: 10 }}>
                    <Parcer
                      libraries={libraries}
                      html={referral.acf.icd11_code}
                    />
                  </span>
                </div>
              </div>
            )} */}
          </div>

          {/* <ServeDownloadAction
            resources={referral.acf.condition_guideline_link}
            resources2={referral.acf.condition_pil_link}
            isRowItem
          /> */}

          <div className="flex-col">
            <Parcer
              libraries={libraries}
              html={referral.acf.condition_description}
            />
          </div>
          {referral.acf.severity_notice && (
            <div
              className="flex-col primary-title"
              style={{ marginTop: "1em" }}
            >
              <Parcer
                libraries={libraries}
                html={referral.acf.severity_notice}
              />
            </div>
          )}
        </div>

        <TitleBlock
          block={{
            text_align: "left",
            title:
              "Choose an option below to see the relevant treatment and management guidelines:",
          }}
          fontSize={20}
          margin="1em 0"
        />
        <div className="severity-container">
          <ServeSeverityContainer
            description={referral.acf.severity_1_description}
            name={referral.acf.severity_1_name}
            status={referral.acf.severity_1_name}
            url={
              referral.acf.mild_severity_image &&
              referral.acf.mild_severity_image.url
            }
          />
          <ServeSeverityContainer
            description={referral.acf.severity_2_description}
            name={referral.acf.severity_2_name}
            status={referral.acf.severity_2_name}
            url={
              referral.acf.moderate_severity_image &&
              referral.acf.moderate_severity_image.url
            }
          />
          <ServeSeverityContainer
            description={referral.acf.severity_3_description}
            name={referral.acf.severity_3_name}
            status={referral.acf.severity_3_name}
            url={
              referral.acf.severe_severity_image &&
              referral.acf.severe_severity_image.url
            }
          />
        </div>
        <ServeContent />
      </div>
    </BlockWrapper>
  );
};

const styles = {
  link: { boxShadow: "none", color: "inherit" },
};

export default connect(Referral);
