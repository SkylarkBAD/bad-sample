import Root from "./screens/index";

import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import menuHandler from "./handlers/menu-handler";

// CONTEXT ----------------------------------------------------------------
import { getPILsDataAction, getGuidelinesDataAction } from "./context";
import { handleSetCookie } from "./helpers/cookie";

const BADTheme = {
  name: "bad-theme",
  roots: {
    theme: Root,
  },
  state: {
    data: {
      "/old-url/": {
        isReady: true,
        isRedirection: true,
        is301: true,
        redirectionStatus: 301,
        isExternal: false,
        location: "/new-url",
      },
    },
    theme: {
      menuUrl: "/menu/primary-menu",
      menu: null,
      filter: null,
      pilFilter: null,
      addressFilter: null,
      activeDropDownRef: "activeDropDownRef",
      childMenuRef: null,
      contentContainer: 1350, // px units
      bannerHeight: 425, // px units
      marginHorizontal: 100, // px units
      marginVertical: 40, // px units
      notification: false,
      perPageLimit: 50, // number of posts to fetch per page
    },
    auth: {
      // 📌 app auth service secrets
      APP_HOST: process.env.APP_HOST, // app server endpoint
      // APP_HOST: "https://8365-85-255-235-9.ngrok.io", // TESTING app server endpoint
      APP_USERNAME: process.env.APP_USERNAME,
      APP_PASSWORD: process.env.APP_PASSWORD,

      B2C: process.env.B2C, // B2C auth logon service
      WP_HOST: process.env.WP_HOST, // wp backend endpoint
      WP_HOST_CONTENT: process.env.WP_HOST_CONTENT,
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      DYNAMICS_BRIDGE: process.env.DYNAMICS_BRIDGE,
      APP_URL: process.env.APP_URL, // app host url
      COOKIE_NAME: "BAD-WebApp", // gen App cooie name
      AUTH_COOKIE: "BAD-AUTH", // gen App cooie name
      ENVIRONMENT: process.env.ENVIRONMENT,
    },
    contactList: {
      VENUE_HIRE_CONTACTS: process.env.VENUE_HIRE_CONTACTS
        ? JSON.parse(process.env.VENUE_HIRE_CONTACTS)
        : null, // [{ email: "conference@bad.org.uk" }]
      EVENT_CONTACTS: process.env.EVENT_CONTACTS
        ? JSON.parse(process.env.EVENT_CONTACTS)
        : null, // [{ email: "conference@bad.org.uk" }]
      ELECTION_CONTACTS: process.env.ELECTION_CONTACTS
        ? JSON.parse(process.env.ELECTION_CONTACTS)
        : null, // [{ email: "harriet@bag.org.uk" }]
      DEFAULT_CONTACT_LIST: process.env.DEFAULT_CONTACT_LIST
        ? JSON.parse(process.env.DEFAULT_CONTACT_LIST)
        : null, // [{ email: "ed@skylarkcreative.co.uk" }]
    },
  },
  actions: {
    theme: {
      beforeCSR: async ({ state, actions }) => {
        // console.log("beforeCSR triggered"); // debug
        await Promise.all([
          actions.source.fetch(`/home-page`), // pre fetch home page CONTENT
          // actions.source.fetch(`/menu_features`), // pre fetch menu featured CPT
        ]);

        // ⬇️ handle set cookie for video guide block. Silent auth login
        // https://www.skinhealthinfo.org.uk/support-resources/video-guides/
        handleSetCookie({
          name: "vuid",
          value: "pl2063596275.1804324093",
          domain: ".vimeo.com",
        });

        // pre load fonts from google
        import("webfontloader").then((WebFontLoader) => {
          // console.log("google fonts loaded"); // debug
          WebFontLoader.load({
            google: {
              families: ["Roboto:400,700", "Lato"],
            },
          });
        });
      },
      // notification
      setNotification: ({ state }) => {
        state.theme.notification = true;
        setTimeout(() => {
          state.theme.notification = false;
        }, 3000);
      },
      afterCSR: async ({ state, actions }) => {
        // console.log("afterCSR triggered"); // debug
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
    source: {
      handlers: [menuHandler],
    },
  },
};

export default BADTheme;
